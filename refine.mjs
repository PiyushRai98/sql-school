import fs from 'node:fs';
const file='dist/app.js';let s=fs.readFileSync(file,'utf8');
s=s.replace("result:'A new result set. The source data stays put.'","result:'The database returns a result set.'");
s=s.replace("case 'run-lesson':try{state.result=await runSQL(state.lesson.steps[state.step].query);state.resultView=true;updateStageView()}catch(err){toast(err.message)}break;", "case 'run-lesson':{const token=state.renderToken;try{const r=await runSQL(state.lesson.steps[state.step].query);if(token!==state.renderToken)break;state.result=r;state.resultView=true;updateStageView()}catch(err){if(token===state.renderToken)toast(err.message)}break;}");
fs.writeFileSync(file,s);
