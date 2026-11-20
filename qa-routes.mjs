import {createRequire} from 'node:module';
import fs from 'node:fs/promises';
import {modules} from './dist/course.js';
const require=createRequire('C:/Users/Piyush Kumar Raj/AppData/Local/npm-cache/_npx/af752b90495482d7/node_modules/rea-agents/package.json');
const {chromium}=require('playwright-core');const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:900}});const errors=[];page.on('pageerror',e=>errors.push(e.message));const checks=[];
try{
await page.goto('http://127.0.0.1:4180');
for(const l of modules.flatMap(m=>m.lessons)){await page.goto(`http://127.0.0.1:4180/#/${l.id}/3`);await page.waitForFunction(()=>document.querySelector('#query-time')?.textContent!=='—');const heading=await page.locator('h1').innerText();checks.push({id:l.id,heading:heading===l.title,queryTime:await page.locator('#query-time').innerText()});}
await page.goto('http://127.0.0.1:4180/#/inner-join/3');await page.waitForSelector('.data-diagram');await page.waitForTimeout(600);await page.screenshot({path:'qa/join.png'});
await page.setViewportSize({width:1280,height:720});await page.goto('http://127.0.0.1:4180/#/query-journey/1');await page.waitForTimeout(600);await page.screenshot({path:'qa/desktop-720.png'});console.log('720 layout:',await page.evaluate(()=>({overflow:document.documentElement.scrollHeight>innerHeight,timeline:document.querySelector('.timeline').getBoundingClientRect().bottom,viewport:innerHeight})));
await page.setViewportSize({width:390,height:844});await page.goto('http://127.0.0.1:4180/#/where/3');await page.waitForSelector('.mobile-data');await page.waitForTimeout(500);await page.screenshot({path:'qa/mobile-filter.png',fullPage:true});
console.log(JSON.stringify({tested:checks.length,failed:checks.filter(c=>!c.heading),errors},null,2));await fs.writeFile('qa/routes.json',JSON.stringify(checks,null,2));if(checks.some(c=>!c.heading)||errors.length)throw Error('QA failed');
}finally{await browser.close()}
