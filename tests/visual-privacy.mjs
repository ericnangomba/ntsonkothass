// Local privacy-route and pre-entry checks. No external calls or applications.
import {chromium} from 'playwright';
import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
const root=path.resolve('artifacts/ntsonkotha-website/dist');
const server=createServer(async(req,res)=>{try{let f=path.join(root,decodeURIComponent(req.url.split('?')[0]));if(!f.startsWith(root))throw Error();if(!path.extname(f))f=path.join(root,'index.html');res.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.css':'text/css'})[path.extname(f)]||'application/octet-stream');res.end(await readFile(f));}catch{res.statusCode=404;res.end();}});
await new Promise(r=>server.listen(0,'127.0.0.1',r));
const base=`http://127.0.0.1:${server.address().port}`;
const browser=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox']});
try{for(const width of [320,390,1280]){
 const page=await browser.newPage({viewport:{width,height:900}});let api=0;
 await page.route('**/*',r=>{const u=r.request().url();if(u.includes('/api/'))api++;return u.startsWith(base)?r.continue():r.abort();});
 await page.goto(base+'/register');await page.getByRole('link',{name:'application privacy notice',exact:true}).first().click();
 await page.getByRole('heading',{name:'Application privacy notice',exact:true}).waitFor();
 assert.equal(new URL(page.url()).pathname,'/privacy');
 await page.getByText('No fixed number of years is asserted here.',{exact:false}).waitFor();
 assert.equal(await page.locator('main a[href="mailto:administrator@ntsonkothasec.school.za"]').count(),1);
 assert.equal(await page.locator('main').getByText('principal@ntsonkothasec.school.za',{exact:true}).count(),1);
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
 await page.screenshot({path:`/downloads/school-privacy-local-${width}.png`,fullPage:true});
 await page.getByRole('heading',{name:'Retention and disposal',exact:true}).scrollIntoViewIfNeeded();
 await page.screenshot({path:`/downloads/school-privacy-retention-${width}.png`});
 await page.getByRole('link',{name:'Application form',exact:true}).first().click();
 await page.locator('form').waitFor();assert.equal(await page.locator('fieldset').evaluate(e=>e.disabled),true);
 await page.getByRole('link',{name:'application privacy notice',exact:true}).first().scrollIntoViewIfNeeded();
 await page.screenshot({path:`/downloads/school-privacy-before-entry-${width}.png`});
 assert.equal(api,0);await page.close();console.log(`PASS privacy direct route, pre-entry/footer links, full copy, optional-document truth, no overflow/API at${width}`);
}}finally{await browser.close();await new Promise(r=>server.close(r));}
