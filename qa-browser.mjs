import {createRequire} from 'node:module';
import fs from 'node:fs/promises';
const require=createRequire('C:/Users/Piyush Kumar Raj/AppData/Local/npm-cache/_npx/af752b90495482d7/node_modules/rea-agents/package.json');
const {chromium}=require('playwright-core');
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1000},deviceScaleFactor:1});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
await fs.mkdir('qa',{recursive:true});
try{
 await page.goto('http://127.0.0.1:4180');await page.waitForFunction(()=>document.querySelector('#source-count')?.textContent==='8');await page.screenshot({path:'qa/desktop.png',fullPage:true});
 console.log('Initial:',await page.locator('h1').innerText());
 await page.getByRole('button',{name:'Next: The table',exact:true}).click();await page.waitForURL('**/#/query-journey/2');
 await page.getByRole('button',{name:'Step 6: The answer',exact:true}).click();await page.waitForSelector('.result-card');console.log('Result rows:',await page.locator('.result-card tbody tr').count());await page.screenshot({path:'qa/result.png'});
 await page.getByRole('button',{name:'Step 7: Recap',exact:true}).click();await page.reload();await page.waitForSelector('.result-card');console.log('Progress:',await page.locator('.progress-top').innerText());
 await page.getByRole('button',{name:'Search the course',exact:true}).click();await page.getByRole('combobox').fill('join');console.log('Search matches:',await page.getByRole('option').count());await page.getByRole('combobox').press('Enter');await page.waitForFunction(()=>!document.querySelector('.modal-backdrop'));
 await page.getByRole('button',{name:'Query Lab',exact:true}).click();await page.locator('#sql-editor').fill('SELECT name, price FROM products WHERE price < 50 ORDER BY price;');await page.getByRole('button',{name:'Run query',exact:true}).click();await page.waitForSelector('#query-output table');console.log('Lab rows:',await page.locator('#query-output tbody tr').count());await page.screenshot({path:'qa/lab.png'});
 await page.locator('#sql-editor').fill('SELECT broken FROM products;');await page.getByRole('button',{name:'Run query',exact:true}).click();await page.waitForSelector('.result-error');console.log('SQL error shown:',await page.locator('.result-error').innerText());
 await page.goto('http://127.0.0.1:4180/#/practice/query-journey');await page.locator('#sql-editor').fill('SELECT name, price FROM products WHERE price < 50;');await page.getByRole('button',{name:'Check answer',exact:true}).click();await page.waitForSelector('.challenge-feedback.success');console.log('Practice: pass');
 await page.getByRole('button',{name:'Switch to dark theme'}).click();await page.screenshot({path:'qa/dark.png'});
 await page.getByRole('button',{name:'Cheatsheets',exact:true}).click();console.log('Cheatsheets:',await page.locator('.cheat-card').count());
 const phone=await browser.newPage({viewport:{width:390,height:844},deviceScaleFactor:1,isMobile:true,hasTouch:true});phone.on('pageerror',e=>errors.push(e.message));await phone.goto('http://127.0.0.1:4180');await phone.waitForFunction(()=>document.querySelector('#source-count')?.textContent==='8');await phone.screenshot({path:'qa/mobile.png',fullPage:true});console.log('Mobile overflow:',await phone.evaluate(()=>document.documentElement.scrollWidth>innerWidth));await phone.getByRole('button',{name:'Open the course menu',exact:true}).click();await phone.waitForTimeout(300);await phone.screenshot({path:'qa/mobile-menu.png'});await phone.close();
 console.log('Browser errors:',errors);if(errors.length)throw Error(errors.join('\n'));
}finally{await browser.close()}
