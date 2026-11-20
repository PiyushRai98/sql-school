import fs from 'node:fs/promises';
const assets=new URL('./dist/assets/',import.meta.url);
const pkg=await(await fetch('https://registry.npmjs.org/sql.js/latest')).json();
for(const file of ['sql-wasm.js','sql-wasm.wasm']){const r=await fetch(`https://cdn.jsdelivr.net/npm/sql.js@${pkg.version}/dist/${file}`);if(!r.ok)throw Error(`${file}: ${r.status}`);await fs.writeFile(new URL(file,assets),Buffer.from(await r.arrayBuffer()));}
for(const [weight,hash]of [[400,'V6pRDFza'],[500,'BWZEU5yA'],[600,'C8RAYTDA'],[700,'BYuf6tUa']]){const r=await fetch(`https://designed-to-scale.vercel.app/assets/jetbrains-mono-latin-${weight}-normal-${hash}.woff2`);if(!r.ok)throw Error('Font download failed');await fs.writeFile(new URL(`mono-${weight}.woff2`,assets),Buffer.from(await r.arrayBuffer()));}
for(const [url,file]of [['https://raw.githubusercontent.com/sql-js/sql.js/master/LICENSE','SQLJS-LICENSE.txt'],['https://raw.githubusercontent.com/JetBrains/JetBrainsMono/master/OFL.txt','FONT-LICENSE.txt']]){const r=await fetch(url);if(r.ok)await fs.writeFile(new URL(file,assets),await r.text());}
console.log(`Local SQL.js ${pkg.version} runtime, WASM and fonts downloaded.`);
