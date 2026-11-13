<?php
declare(strict_types=1);

const SCHOOL_TO = 'administrator@ntsonkothasec.school.za';
const SCHOOL_CC = 'principal@ntsonkothasec.school.za';
const SCHOOL_MAX_FILE = 5242880;

function school_fields(string $kind, array $input): array {
    $required = $kind === 'application'
        ? ['firstName','lastName','dob','gender','idNumber','nationality','homeLanguage','address','postalCode','cellNumber','guardianName','guardianPhone','relationship','currentSchool','currentGrade','gradeApplying','termApplying','yearApplying','boardingType','adultSubmitter','confirmTrue']
        : ['fullName','phone','email','subject','message'];
    $optional = $kind === 'application' ? ['middleName','email','guardianEmail'] : [];
    $result = [];
    foreach (array_merge($required, $optional) as $key) {
        $value = $input[$key] ?? '';
        if (!is_string($value) || strlen($value) > ($key === 'message' ? 10000 : 600)
            || preg_match('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/', $value)
            || !preg_match('//u', $value)) throw new InvalidArgumentException('Invalid form field.');
        $value = trim($value);
        if (in_array($key, $required, true) && $value === '') throw new InvalidArgumentException('Complete all required fields.');
        if (in_array($key, ['email','guardianEmail'], true) && $value !== '' && !filter_var($value, FILTER_VALIDATE_EMAIL)) throw new InvalidArgumentException('Invalid email address.');
        $result[$key] = $value;
    }
    foreach ($result as $key=>$value) {
        if (in_array($key,['firstName','lastName','fullName','guardianName','nationality','homeLanguage','relationship','currentSchool'],true) && strlen($value)<2) throw new InvalidArgumentException('Check required details.');
        if (in_array($key,['phone','cellNumber','guardianPhone'],true) && !preg_match('/^[+0-9 ()-]{10,30}$/D',$value)) throw new InvalidArgumentException('Check phone number.');
    }
    if ($kind === 'contact' && !in_array($result['subject'],['general','admissions','academics','other'],true)) throw new InvalidArgumentException('Choose a valid subject.');
    if ($kind === 'application') {
        foreach (['adultSubmitter','confirmTrue'] as $key) if ($result[$key] !== 'true') throw new InvalidArgumentException('Confirm all required declarations.');
        foreach (['gender'=>['male','female'], 'boardingType'=>['day','boarding'], 'gradeApplying'=>['Grade 8','Grade 9','Grade 10','Grade 11 (Special Cases)'], 'termApplying'=>['Term 1','Term 2','Term 3','Term 4']] as $key=>$allowed) {
            if (!in_array($result[$key],$allowed,true)) throw new InvalidArgumentException('Choose a valid option.');
        }
        $date = DateTimeImmutable::createFromFormat('!Y-m-d', $result['dob']);
        if (!$date || $date->format('Y-m-d') !== $result['dob'] || $date > new DateTimeImmutable('today')) throw new InvalidArgumentException('Invalid date of birth.');
        if (!preg_match('/^\d{13}$/D', $result['idNumber']) || !preg_match('/^20\d{2}$/D', $result['yearApplying'])) throw new InvalidArgumentException('Check ID number and academic year.');
    } elseif (strlen($result['message']) < 10) throw new InvalidArgumentException('Message must be at least 10 characters.');
    return $result;
}

function school_attachment(array $file, string $field): ?array {
    if (($file['error'] ?? UPLOAD_ERR_NO_FILE) === UPLOAD_ERR_NO_FILE) return null;
    if (!isset($file['error'],$file['size'],$file['tmp_name'],$file['name']) || !is_int($file['error']) || $file['error'] !== UPLOAD_ERR_OK
        || !is_int($file['size']) || $file['size'] < 1 || $file['size'] > SCHOOL_MAX_FILE || !is_string($file['tmp_name']) || !is_string($file['name'])) throw new InvalidArgumentException('Invalid document upload.');
    $extension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    $mime = (new finfo(FILEINFO_MIME_TYPE))->file($file['tmp_name']);
    $allowed = ['pdf'=>'application/pdf','jpg'=>'image/jpeg','jpeg'=>'image/jpeg','png'=>'image/png'];
    if (!isset($allowed[$extension]) || $mime !== $allowed[$extension]) throw new InvalidArgumentException('Documents must be PDF, JPG or PNG.');
    $data = file_get_contents($file['tmp_name']);
    if ($data === false || strlen($data) !== $file['size']) throw new InvalidArgumentException('Incomplete upload.');
    if ($extension === 'pdf' && !str_starts_with($data, '%PDF-')) throw new InvalidArgumentException('Invalid PDF.');
    if ($extension !== 'pdf' && @getimagesize($file['tmp_name']) === false) throw new InvalidArgumentException('Invalid image.');
    // Never use a visitor-controlled filename in mail headers.
    return ['name'=>$field.'.'.$extension,'mime'=>$mime,'data'=>$data];
}

function school_message(string $kind, array $fields, array $attachments, string $reference, string $sender): array {
    if (!in_array($sender,[SCHOOL_TO,SCHOOL_CC],true)) throw new InvalidArgumentException('Invalid school sender.');
    $boundary = 'school_'.bin2hex(random_bytes(24));
    $headers = ['From: School website <'.$sender.'>', 'Cc: '.SCHOOL_CC, 'MIME-Version: 1.0', 'Content-Type: multipart/mixed; boundary="'.$boundary.'"'];
    $text = "School website ".($kind === 'application' ? 'application' : 'contact enquiry')."\r\nReference: $reference\r\n\r\n";
    foreach ($fields as $key=>$value) $text .= "$key: $value\r\n";
    $text .= "\r\nTreat attachments as untrusted. Scan before opening. Receipt is not admission.\r\n";
    $body = "--$boundary\r\nContent-Type: text/plain; charset=UTF-8\r\nContent-Transfer-Encoding: base64\r\n\r\n".chunk_split(base64_encode($text));
    foreach ($attachments as $a) $body .= "--$boundary\r\nContent-Type: ".$a['mime']."\r\nContent-Disposition: attachment; filename=\"".$a['name']."\"\r\nContent-Transfer-Encoding: base64\r\n\r\n".chunk_split(base64_encode($a['data']));
    $body .= "--$boundary--\r\n";
    return ['to'=>SCHOOL_TO,'subject'=>($kind === 'application' ? 'School application ' : 'School enquiry ').$reference,'body'=>$body,'headers'=>implode("\r\n",$headers)];
}

function school_rate(string $dir, string $key, string $address, int $now, int $limit = 3, int $window = 900, bool $global = false): bool {
    if (strlen($key) < 32 || !is_dir($dir) || is_link($dir)) throw new RuntimeException('Private rate storage unavailable.');
    // Fixed bucket count prevents unlimited visitor-created files. No raw IPs or form content stored.
    $bucket = hexdec(substr(hash_hmac('sha256',$address,$key),0,2));
    $path = $dir.'/'.($global ? 'daily' : 'bucket-'.$bucket).'.json';
    $file = fopen($path,'c+');
    if (!$file || !flock($file, LOCK_EX)) throw new RuntimeException('Rate lock unavailable.');
    try {
        chmod($path,0600);
        $data = json_decode(stream_get_contents($file),true) ?: [];
        $data = array_values(array_filter($data,fn($t)=>is_int($t) && $t > $now-$window));
        if (count($data) >= $limit) return false;
        $data[]=$now;
        rewind($file); ftruncate($file,0);
        if (fwrite($file,json_encode($data,JSON_THROW_ON_ERROR)) === false || !fflush($file)) throw new RuntimeException('Rate storage failed.');
        return true;
    } finally {flock($file,LOCK_UN);fclose($file);}
}
