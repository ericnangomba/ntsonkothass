"""Local-only HTTP tests. Mail command is a file capture, never a mail server."""
import tempfile,pathlib,shutil,subprocess,urllib.request,urllib.error,http.cookiejar,json,socket,time,os
repo=pathlib.Path(__file__).resolve().parents[1]
php=os.environ.get('PHP_BINARY','php')
with tempfile.TemporaryDirectory(prefix='school-http-') as root:
    root=pathlib.Path(root); private=root/'school-forms'; public=root/'public_html'; (public/'api').mkdir(parents=True);private.mkdir();(private/'state').mkdir(mode=0o700)
    for file in ['forms.php']:shutil.copy(repo/'hosting/php/private'/file,private/file)
    shutil.copy(repo/'hosting/php/public/api/forms.php',public/'api/forms.php')
    capture=root/'captured.eml'; mailcmd=root/'capture-mail.sh';mailcmd.write_text('#!/bin/sh\ncat > '+str(capture)+'\n');mailcmd.chmod(0o700)
    config=private/'config.php'
    def configure(enabled,applications=False):config.write_text("<?php return ['enabled'=>"+('true' if enabled else 'false')+",'application_enabled'=>"+('true' if applications else 'false')+",'origins'=>['https://ntsonkothasec.school.za'],'sender'=>'administrator@ntsonkothasec.school.za','state_dir'=>__DIR__.'/state','rate_key'=>'"+'k'*32+"'];")
    configure(False)
    router=root/'router.php';router.write_text("<?php $_SERVER['HTTPS']='on'; require __DIR__.'/public_html/api/forms.php';")
    sock=socket.socket();sock.bind(('127.0.0.1',0));port=sock.getsockname()[1];sock.close()
    server=subprocess.Popen([php,'-d','sendmail_path='+str(mailcmd),'-S',f'127.0.0.1:{port}',str(router)],stdout=subprocess.DEVNULL,stderr=subprocess.PIPE)
    jar=http.cookiejar.CookieJar();opener=urllib.request.build_opener(urllib.request.HTTPCookieProcessor(jar))
    # Secure cookies must remain secure. Test passes the test-only session cookie manually to loopback HTTP.
    session=''
    def request(method='GET',data=None,token='',origin='https://ntsonkothasec.school.za',content_type='application/x-www-form-urlencoded'):
        global session
        h={'Host':'ntsonkothasec.school.za','Origin':origin,'Content-Type':content_type}
        if session:h['Cookie']=session
        if token:h['X-CSRF-Token']=token
        req=urllib.request.Request(f'http://127.0.0.1:{port}/api/forms.php',data=data,headers=h,method=method)
        try:r=opener.open(req)
        except urllib.error.HTTPError as e:r=e
        if r.headers.get('Set-Cookie'):session=r.headers.get('Set-Cookie').split(';')[0]
        return r.status,json.loads(r.read())
    try:
        for i in range(100):
            try:status,_=request();break
            except OSError:time.sleep(.03)
        assert status==503 and not capture.exists();print('PASS disabled configuration fails closed')
        configure(True)
        status,result=request();assert status==200;token=result['token']
        assert request('POST',b'kind=contact')[0]==403;print('PASS missing CSRF rejected')
        assert request('POST',b'kind=contact',token,'https://attacker.invalid')[0]==403;print('PASS wrong origin rejected')
        assert request('POST',b'kind=contact',token)[0]==422;print('PASS incomplete data rejected')
        import urllib.parse
        data=urllib.parse.urlencode(dict(kind='contact',website='',fullName='SYNTHETIC TEST ONLY',phone='0000000000',email='synthetic@example.invalid',subject='general',message='SYNTHETIC TEST ONLY - local capture')).encode()
        status,result=request('POST',data,token);assert status==200 and result['accepted'] is True
        message=capture.read_text();assert 'To: administrator@ntsonkothasec.school.za' in message and 'Cc: principal@ntsonkothasec.school.za' in message and 'Bcc:' not in message
        print('PASS contact accepted only into local capture, fixed To/CC')
        assert request('POST',data,token)[0]==403;print('PASS consumed CSRF prevents replay')
        token=request()[1]['token'];boundary='synthetic-boundary'
        fields=dict(kind='application',website='',firstName='SYNTHETIC TEST ONLY',lastName='TEST ONLY',dob='2010-01-01',gender='female',idNumber='0000000000000',nationality='Test',homeLanguage='Test',address='TEST ONLY',postalCode='0000',cellNumber='0000000000',guardianName='TEST GUARDIAN',guardianPhone='0000000000',relationship='test',currentSchool='TEST ONLY',currentGrade='7',gradeApplying='Grade 8',termApplying='Term 1',yearApplying='2027',boardingType='day',adultSubmitter='true',confirmTrue='true')
        pdf=(repo/'tests/fixtures/identityDocument.pdf').read_bytes()
        parts=[f'--{boundary}\r\nContent-Disposition: form-data; name="{k}"\r\n\r\n{v}\r\n'.encode() for k,v in fields.items()]
        for field in ['identityDocument','reportCard']:
            pdf=(repo/'tests/fixtures'/(field+'.pdf')).read_bytes()
            parts.append(f'--{boundary}\r\nContent-Disposition: form-data; name="{field}"; filename="synthetic.pdf"\r\nContent-Type: application/pdf\r\n\r\n'.encode()+pdf+b'\r\n')
        body=b''.join(parts)+f'--{boundary}--\r\n'.encode()
        assert request('POST',body,token,content_type='multipart/form-data; boundary='+boundary)[0]==503;print('PASS application gate blocks intake while contact remains usable');configure(True,True)
        status,result=request('POST',body,token,content_type='multipart/form-data; boundary='+boundary);assert status==200 and result['accepted'];message=capture.read_text();assert 'identityDocument.pdf' in message and 'reportCard.pdf' in message
        from email import policy
        from email.parser import BytesParser
        parsed=BytesParser(policy=policy.default).parsebytes(capture.read_bytes())
        attached={a.get_filename():a.get_payload(decode=True) for a in parsed.iter_attachments()}
        for name in ['identityDocument.pdf','reportCard.pdf']:assert attached[name]==(repo/'tests/fixtures'/name).read_bytes()
        print('PASS both readable PDF attachments preserved byte-for-byte in captured MIME')
        # A transport refusal must not produce accepted:true.
        mailcmd.write_text('#!/bin/sh\ncat >/dev/null\nexit 1\n');token=request()[1]['token'];status,result=request('POST',data,token);assert status==503 and result['accepted'] is False;print('PASS failed transport has no false acceptance')
    finally:
        server.terminate();server.communicate(timeout=5)
print('HTTP tests passed. No external email or applicant data used.')
