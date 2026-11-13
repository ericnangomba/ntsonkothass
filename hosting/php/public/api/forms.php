<?php
declare(strict_types=1);
ini_set('display_errors','0');
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');
function respond(int $status, array $body): never { http_response_code($status); echo json_encode($body); exit; }
try {
    // Expected location: public_html/api/forms.php. Nothing private lives in public_html.
    $private = dirname(__DIR__,2).'/school-forms';
    if (!is_file($private.'/config.php') || !is_file($private.'/forms.php')) respond(503,['accepted'=>false]);
    $config = require $private.'/config.php';
    if (($config['enabled'] ?? false) !== true || empty($_SERVER['HTTPS']) || $_SERVER['HTTPS']==='off') respond(503,['accepted'=>false]);
    if (!in_array($_SERVER['HTTP_HOST'] ?? '', ['ntsonkothasec.school.za','www.ntsonkothasec.school.za'],true)) respond(403,['accepted'=>false]);
    $method = $_SERVER['REQUEST_METHOD'] ?? '';
    if (!in_array($method,['GET','POST'],true)) {header('Allow: GET, POST');respond(405,['accepted'=>false]);}
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    if ($origin !== '' && !in_array($origin, $config['origins'] ?? [], true)) respond(403,['accepted'=>false]);
    session_name('school_forms');
    session_start(['cookie_secure'=>true,'cookie_httponly'=>true,'cookie_samesite'=>'Strict','use_strict_mode'=>true]);
    if ($method==='GET') {
        if (!isset($_SESSION['csrf'])) $_SESSION['csrf']=bin2hex(random_bytes(32));
        respond(200,['token'=>$_SESSION['csrf']]);
    }
    if (!isset($_SESSION['csrf']) || !hash_equals($_SESSION['csrf'],$_SERVER['HTTP_X_CSRF_TOKEN'] ?? '')) respond(403,['accepted'=>false]);
    if ((int)($_SERVER['CONTENT_LENGTH'] ?? 0) > 12*1024*1024) respond(413,['accepted'=>false]);
    if (!is_string($_POST['kind'] ?? null) || !in_array($_POST['kind'],['application','contact'],true) || ($_POST['website'] ?? '') !== '') respond(422,['accepted'=>false]);
    require $private.'/forms.php';
    $kind=$_POST['kind'];
    $fields=school_fields($kind,$_POST);
    $attachments=[];
    foreach ($_FILES as $field=>$file) {
        if ($kind !== 'application' || !in_array($field,['identityDocument','reportCard'],true) || !is_array($file) || !is_string($file['tmp_name'] ?? null) || !is_uploaded_file($file['tmp_name'])) throw new InvalidArgumentException('Invalid document.');
        $attachment=school_attachment($file,$field);
        if ($attachment) $attachments[]=$attachment;
    }
    if (!school_rate($config['state_dir'],$config['rate_key'],$_SERVER['REMOTE_ADDR'] ?? '',time())) respond(429,['accepted'=>false]);
    if (!school_rate($config['state_dir'],$config['rate_key'],'daily',time(),100,86400,true)) respond(429,['accepted'=>false]);
    $reference=gmdate('Ymd').'-'.bin2hex(random_bytes(6));
    $sender=$config['sender'] ?? '';
    if ($sender === '') respond(503,['accepted'=>false]);
    $message=school_message($kind,$fields,$attachments,$reference,$sender);
    // mail() true means local mail-system acceptance, NOT confirmed inbox delivery.
    if (!function_exists('mail') || !mail($message['to'],$message['subject'],$message['body'],$message['headers'],'-f'.$sender)) respond(503,['accepted'=>false]);
    unset($_SESSION['csrf']);
    respond(200,['accepted'=>true,'reference'=>$reference]);
} catch (InvalidArgumentException $e) {
    respond(422,['accepted'=>false]);
} catch (Throwable $e) {
    // No applicant data, attachments, IPs or exception messages in application logs.
    respond(503,['accepted'=>false]);
}
