importScripts('./assets/sql-wasm.js');
const runtime=initSqlJs({locateFile:()=>new URL('./assets/sql-wasm.wasm',self.location).href});
self.onmessage=async({data})=>{let db;try{const SQL=await runtime;db=new SQL.Database();db.run(data.seed);const start=performance.now();const result=db.exec(data.sql);const elapsed=performance.now()-start;self.postMessage({id:data.id,result,elapsed,modified:db.getRowsModified()});}catch(error){self.postMessage({id:data.id,error:error.message});}finally{db?.close();}};
