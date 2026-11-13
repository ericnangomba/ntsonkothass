<?php
require __DIR__.'/../hosting/php/private/forms.php';
$count=0;
function check($condition,$label) {global $count;if (!$condition) throw new Exception($label);$count++;echo "PASS $label\n";}
function rejects($fn,$label) {try {$fn();} catch (InvalidArgumentException $e) {check(true,$label);return;}throw new Exception('Expected rejection: '.$label);}
$contact=['fullName'=>'SYNTHETIC TEST ONLY','phone'=>'0000000000','email'=>'synthetic@example.invalid','subject'=>'general','message'=>'SYNTHETIC TEST ONLY - no enquiry'];
$c=school_fields('contact',$contact);check($c['fullName']===$contact['fullName'],'contact validates');
rejects(fn()=>school_fields('contact',array_replace($contact,['email'=>"bad\r\nBcc: attacker@example.invalid"])), 'email header injection rejected');
rejects(fn()=>school_fields('contact',array_replace($contact,['fullName'=>['array']])), 'array field rejected');
rejects(fn()=>school_fields('contact',array_replace($contact,['message'=>'short'])), 'short message rejected');
$app=array_fill_keys(['firstName','lastName','nationality','homeLanguage','address','postalCode','cellNumber','guardianName','guardianPhone','relationship','currentSchool','currentGrade'],'SYNTHETIC TEST ONLY');
$app=array_replace($app,['cellNumber'=>'0000000000','guardianPhone'=>'0000000000']);
$app+=['dob'=>'2010-01-01','gender'=>'female','idNumber'=>'0000000000000','gradeApplying'=>'Grade 8','termApplying'=>'Term 1','yearApplying'=>'2027','boardingType'=>'day','adultSubmitter'=>'true','confirmTrue'=>'true','agreeCode'=>'true'];
check(school_fields('application',$app)['gradeApplying']==='Grade 8','application enums match UI');
foreach (['dob'=>'2026-02-30','gradeApplying'=>'Grade 99','idNumber'=>'x','adultSubmitter'=>'false','confirmTrue'=>'false'] as $key=>$value) rejects(fn()=>school_fields('application',array_replace($app,[$key=>$value])),'invalid '.$key);
$tmp=tempnam(sys_get_temp_dir(),'synthetic-');file_put_contents($tmp,"%PDF-1.4\nSYNTHETIC TEST ONLY\n%%EOF\n");
$file=['error'=>0,'size'=>filesize($tmp),'tmp_name'=>$tmp,'name'=>"attacker\r\nname.pdf"];
$a=school_attachment($file,'identityDocument');check($a['name']==='identityDocument.pdf','attachment name fixed');
rejects(fn()=>school_attachment(array_replace($file,['size'=>SCHOOL_MAX_FILE+1]),'identityDocument'),'oversize rejected');
rejects(fn()=>school_attachment(array_replace($file,['name'=>'bad.exe']),'identityDocument'),'extension rejected');
file_put_contents($tmp,'<html>bad</html>');rejects(fn()=>school_attachment(array_replace($file,['size'=>filesize($tmp)]),'identityDocument'),'fake PDF MIME rejected');unlink($tmp);
$m=school_message('application',school_fields('application',$app),[$a],'SYNTHETIC-ONLY',SCHOOL_TO);
check($m['to']===SCHOOL_TO && str_contains($m['headers'],'Cc: '.SCHOOL_CC) && !str_contains($m['headers'],'Bcc:'),'fixed approved recipients without BCC');
check(str_contains($m['body'],'identityDocument.pdf') && !str_contains($m['headers'],'synthetic@example.invalid'),'safe attachment and fixed sender');
$dir=sys_get_temp_dir().'/school-rate-'.bin2hex(random_bytes(5));mkdir($dir,0700);
for($i=0;$i<3;$i++) check(school_rate($dir,str_repeat('k',32),'test-only',1000),'rate request '.$i);
check(!school_rate($dir,str_repeat('k',32),'test-only',1001),'fourth request throttled');
check(school_rate($dir,str_repeat('k',32),'test-only',2000),'rate expires');
foreach(glob($dir.'/*') as $f)unlink($f);rmdir($dir);echo "$count checks passed, no mail called\n";
