const {test}=require('node:test');
const assert=require('node:assert/strict');
const ts=require('typescript');
const fs=require('node:fs');
const vm=require('node:vm');
function load(file, globals={}) {
 const output=ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
 const exports={};vm.runInNewContext(output,{exports,require,FormData,URL,Date,crypto:require('node:crypto').webcrypto,...globals});return exports;
}
function analytics(consent='granted',gpc=false) {
 const calls=[];const scripts=[];const window={location:{pathname:'/lp/video'},dispatchEvent(){},dataLayer:[]};
 const a=load('components/landing/track.ts',{window,navigator:{globalPrivacyControl:gpc},localStorage:{getItem:()=>consent,setItem(){}},document:{getElementById:()=>null,createElement:()=>({}),head:{appendChild:t=>scripts.push(t)}},CustomEvent:class {},process:{env:{NEXT_PUBLIC_META_PIXEL_ID:'TEST_PIXEL'}}});
 return {a,window,calls,scripts};
}
test('no marketing scripts or conversions without consent or with GPC',()=>{for(const [c,g] of [['denied',false],['granted',true]]){const t=analytics(c,g);t.a.bootAnalytics();t.a.track('application_received',{}, {eventId:'test'});assert.equal(t.scripts.length,0);assert.equal(t.window.fbq,undefined);}});
test('one PageView per route and one Lead per accepted event ID; no lead on submit or thanks',()=>{const {a,window,scripts}=analytics();a.bootAnalytics();a.bootAnalytics();a.track('application_submitted');assert.equal(window.fbq.queue.filter(x=>x[1]==='Lead').length,0);a.track('application_received',{}, {eventId:'accepted-1'});a.track('application_received',{}, {eventId:'accepted-1'});window.location.pathname='/lp/thank-you';a.bootAnalytics();assert.equal(scripts.length,1);assert.equal(window.fbq.queue.filter(x=>x[1]==='PageView').length,2);const leads=window.fbq.queue.filter(x=>x[1]==='Lead');assert.equal(leads.length,1);assert.equal(leads[0][3].eventID,'accepted-1');});
test('pixel forwards events after library loads rather than trapping them in a queue',()=>{const {a,window}=analytics();a.bootAnalytics();const seen=[];window.fbq.callMethod=(...x)=>seen.push(x);a.track('application_started');assert.equal(seen[0][1],'ApplicationStarted');});
test('preliminary application scoring never becomes a qualified conversion',()=>{const {a,window}=analytics();a.bootAnalytics();a.track('qualified_application');assert.equal(window.fbq.queue.filter(x=>/qualified/i.test(String(x[1]))).length,0);});
