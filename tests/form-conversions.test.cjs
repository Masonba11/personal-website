const {test}=require('node:test');
const assert=require('node:assert/strict');
const ts=require('typescript');
const fs=require('node:fs');
const vm=require('node:vm');
function form(kind, {accepted=true, ready=true, receiptFails=false}={}) {
 const calls=[];let requests=0;let stateIndex=0;let resolveFetch;
 const landing=kind==='landing';
 const react={useState(value){const i=stateIndex++;return [i===0?(landing?3:4):value,()=>{}]},useRef:v=>({current:v}),useEffect(){},useId:()=> 'test',isValidElement:()=>false,cloneElement:x=>x};
 const jsx={jsx:(type,props)=>({type,props}),jsxs:(type,props)=>({type,props})};
 const tracking={eventId:'accepted-test',variant:'video',qualified:true};
 const result=ready?{status:'ready',delivery:{name:'test',email:'test@example.com',message:'test'},tracking}:{status:'invalid',fieldErrors:{},message:'invalid'};
 const actions={submitContact:async()=>result,submitLanding:async()=>result,confirmLandingReceipt:async()=>{if(receiptFails)throw Error('receipt offline')}};
 const deps={...actions,track:(...x)=>calls.push(x),site:{email:'test@example.com'},web3formsAccessKey:'TEST',formSteps:['a','b','c','d','e'],landingSteps:['a','b','c','d'],validateStep:()=>({}),validateLandingStep:()=>({})};
 const file=landing?'components/landing/LandingForm.tsx':'components/ContactForm.tsx';
 const output=ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX}}).outputText;
 const exports={};vm.runInNewContext(output,{exports,require:id=>id==='react'?react:id==='react/jsx-runtime'?jsx:id==='next/navigation'?{useRouter:()=>({push:()=>{}})}:deps,FormData,Date,window:{location:{href:'https://example.com/'}},fetch:async()=>{requests++;await new Promise(r=>{resolveFetch=r});return {ok:accepted,json:async()=>({success:accepted})}}});
 const tree=landing?exports.LandingForm({variant:'video'}):exports.ContactForm();
 return {submit:()=>tree.props.onSubmit({preventDefault(){}}),calls,release:()=>resolveFetch?.(),requests:()=>requests};
}
for(const kind of ['landing','contact']) {
 test(`${kind}: one accepted delivery produces one Lead trigger despite double submit`,async()=>{const f=form(kind);const first=f.submit();const second=f.submit();await new Promise(setImmediate);assert.equal(f.requests(),1);f.release();await Promise.all([first,second]);assert.equal(f.calls.filter(c=>c[0]==='application_received').length,1)});
 test(`${kind}: rejected delivery never produces a Lead`,async()=>{const f=form(kind,{accepted:false});const p=f.submit();await new Promise(setImmediate);f.release();await p;assert.equal(f.calls.filter(c=>c[0]==='application_received').length,0)});
 test(`${kind}: invalid applications never contact delivery or tracking`,async()=>{const f=form(kind,{ready:false});await f.submit();assert.equal(f.requests(),0);assert.equal(f.calls.filter(c=>c[0]==='application_received').length,0)});
}
test('optional receipt failure preserves accepted landing conversion',async()=>{const f=form('landing',{receiptFails:true});const p=f.submit();await new Promise(setImmediate);f.release();await p;assert.equal(f.calls.filter(c=>c[0]==='application_received').length,1)});
