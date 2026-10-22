import puppeteer from 'puppeteer-core';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:8793';
const dir = process.env.TEST_ARTIFACT_DIR || '/tmp/slideprompt-round1-browser';
fs.mkdirSync(dir,{recursive:true});
const browser=await puppeteer.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--no-sandbox']});
try {
 const page=await browser.newPage();await page.setCacheEnabled(false);await page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'reduce'}]);const errors=[];const payloads=[];
 const click=async selector=>{
   for(let attempt=0;attempt<8;attempt++) {
     await page.$eval(selector,e=>e.scrollIntoView({behavior:'instant',block:'center'}));
     await page.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));
     const ready=await page.$eval(selector,e=>{const r=e.getBoundingClientRect();const h=document.elementFromPoint(r.x+r.width/2,r.y+r.height/2);return r.width>0&&r.height>0&&h&&(h===e||e.contains(h));});
     if(ready){await page.click(selector);return;}
   }
   throw new Error('Control not reachable: '+selector);
 };
 page.on('pageerror',e=>errors.push(e.message));
 await page.setRequestInterception(true);
 page.on('request',r=>{if(new URL(r.url()).pathname==='/api/events'){payloads.push(JSON.parse(r.postData()));void r.respond({status:204});}else void r.continue();});
 await page.goto(base+'/prompts/project-update',{waitUntil:'networkidle0'});
 await click('[data-load-worked-example]');
 await page.waitForFunction(()=>document.querySelector('#input-topic').value.includes('Weekly update'));
 await page.$eval('#input-notes',e=>{e.value='Private source example 771: customer facts must stay local';e.dispatchEvent(new Event('input',{bubbles:true}));});
 assert.ok((await page.$eval('#prompt-output',e=>e.value)).includes('Private source example 771'));
 await new Promise(r=>setTimeout(r,1700));assert.equal(payloads.length,0,'off by default');
 await click('#btn-save-local');await click('#btn-close-saved-drawer');
 await page.$eval('#input-notes',e=>{e.value='Changed';e.dispatchEvent(new Event('input',{bubbles:true}));});
 await click('#btn-open-saved-drawer');await click('.btn-load-saved');
 assert.equal(await page.$eval('#input-notes',e=>e.value),'Private source example 771: customer facts must stay local');
 await page.$eval('#usage-consent',e=>e.scrollIntoView());await click('#usage-consent');
 await click('#btn-download-txt');
 await page.waitForFunction(()=>document.querySelector('#usage-consent').checked);
 await new Promise(r=>setTimeout(r,400));
 assert.ok(payloads.some(p=>p.event==='download'));
 for(const payload of payloads){assert.deepEqual(Object.keys(payload).sort(),['event','lang','template']);assert.ok(!JSON.stringify(payload).includes('771'));}
 await click('#usage-consent');const before=payloads.length;
 await click('#btn-save-local');await new Promise(r=>setTimeout(r,300));assert.equal(payloads.length,before,'no sends after withdrawal');
 await click('#btn-close-saved-drawer');
 for (const lang of ['en','es','ja','zh-TW']) for (const slug of ['pitch-deck','project-update','lesson-plan']) {
  const prefix=lang==='en'?'':'/'+lang;
  const response=await page.goto(base+prefix+'/prompts/'+slug,{waitUntil:'networkidle0'});assert.equal(response.status(),200);
  assert.equal(await page.$$eval('#worked-example',e=>e.length),1);
  await click('[data-load-worked-example]');
  assert.ok((await page.$eval('#input-notes',e=>e.value)).length>60);
  const notes=await page.$eval('#input-notes',e=>e.value);assert.ok((await page.$eval('#prompt-output',e=>e.value)).includes(notes));
 }
 for(const width of [1280,390]) {
  await page.setViewport({width,height:width===390?844:800});await page.goto(base+'/',{waitUntil:'networkidle0'});
  assert.ok(await page.$$eval('[data-scenario-select]',e=>e.length>=3));
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  await page.screenshot({path:`${dir}/home-${width}.png`});
  await page.goto(base+'/prompts/project-update',{waitUntil:'networkidle0'});
  await page.$eval('#worked-example',e=>e.scrollIntoView());await page.screenshot({path:`${dir}/example-${width}.png`});
 }
 assert.deepEqual(errors,[]);
 console.log('Round 1 browser: notes inclusion/persistence, consent default/withdrawal, payload privacy, 12 localized examples, 2 viewport layouts and no JS exceptions passed.');
} finally {await browser.close();}
