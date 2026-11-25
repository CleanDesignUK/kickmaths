export const MEASUREMENT_ID='G-5226JP5Y9R';
export const PRIVACY_KEY='kickmaths.cookies.v2';
export const USAGE_VERSION='8.0.4';
const denied={analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',personalization_storage:'denied'};
const events=new Set(['game_open','game_start','game_resume','game_complete','game_save','player_active','demo_answer']);
const types=new Set(['warmup','coach','practice','tables','written','promotion','progress_check','coach_drill']);
const paths=new Set(['','play','parents','teachers','beta','about','contact','privacy','accessibility','curriculum','how-it-works','times-tables','number-bonds','column-addition','column-subtraction','fractions','dyslexia-friendly-maths']);

export function readPrivacyChoice(storage){
 try{
  const value=JSON.parse(storage?.getItem(PRIVACY_KEY)||'null');
  if(value?.version!==2||typeof value.preferences!=='boolean'||typeof value.analytics!=='boolean')return null;
  return {version:2,preferences:value.preferences,analytics:value.analytics&&value.adult===true,adult:value.adult===true};
 }catch{return null;}
}
export function safePage(location){
 const base=location.hostname==='cleandesignuk.github.io'?'/kickmaths/':'/';
 let route=String(location.pathname||'/').startsWith(base)?String(location.pathname||'/').slice(base.length):'';
 route=route.replace(/\/index\.html$/,'').replace(/^index\.html$/,'').replace(/\/+$/,'');
 if(!paths.has(route)&&!/^year-[1-6]-maths$/.test(route)&&!/^([1-9]|1[0-2])-times-table$/.test(route))route='';
 return {url:location.origin+base+(route?route+'/':''),title:route==='play'?'KickMaths game':'KickMaths website'};
}
export function usageType(round){
 return round?.placement?'warmup':round?.progressCheck?'progress_check':round?.promotion?'promotion':round?.coachDrill?'coach_drill':round?.tableChallenge?'tables':round?.manual&&/^long|^short|^col|^decMult/.test(round.manual)?'written':round?.manual?'practice':'coach';
}

// Only explicit, adult-confirmed opt-in can load Google. Never replay earlier activity.
export function createUsage({win,doc,storage,sessionStore,location,now=()=>Date.now()}){
 let choice=readPrivacyChoice(storage),initialised=false,configured=false,pageSent=false,gameOpened=false,activeSent=false,failed=false,area='website';
 const sent=new Set();
 const disabledKey='ga-disable-'+MEASUREMENT_ID;
 const hostAllowed=()=>location.protocol==='https:'&&(['kickmaths.co.uk','www.kickmaths.co.uk'].includes(location.hostname)||(location.hostname==='cleandesignuk.github.io'&&location.pathname.startsWith('/kickmaths/')));
 const browserOptOut=()=>win.navigator?.globalPrivacyControl===true||win.navigator?.doNotTrack==='1'||win.doNotTrack==='1';
 const enabled=()=>!failed&&hostAllowed()&&choice?.analytics===true&&choice?.adult===true&&!browserOptOut();
 const command=(...args)=>win.gtag(...args);
 function init(nextArea=area){
  try{
  area=nextArea==='game'?'game':'website';
  if(!initialised){
   initialised=true;win.dataLayer=Array.isArray(win.dataLayer)?win.dataLayer:[];
   if(typeof win.gtag!=='function')win.gtag=function(){win.dataLayer.push(arguments);};
   // This site uses the Google-only ID directly, not a second GTM container.
   command('consent','default',{...denied});
  }
  sync();
  }catch{failed=true;win[disabledKey]=true;}
 }
 function sync(){
  win[disabledKey]=!enabled();
  if(!enabled())return;
  const page=safePage(location);
  command('consent','update',{...denied,analytics_storage:'granted'});
  if(!configured){
   configured=true;
   command('js',new Date(now()));
   command('set',{page_location:page.url,page_referrer:'',page_title:page.title,allow_google_signals:false,allow_ad_personalization_signals:false,ads_data_redaction:true});
   command('config',MEASUREMENT_ID,{send_page_view:false,page_location:page.url,page_referrer:'',page_title:page.title,ignore_referrer:true,allow_google_signals:false,allow_ad_personalization_signals:false,cookie_prefix:'km',cookie_domain:location.hostname,cookie_path:location.hostname==='cleandesignuk.github.io'?'/kickmaths/':'/',cookie_expires:2592000,cookie_update:false});
   const script=doc.createElement('script');script.async=true;script.referrerPolicy='no-referrer';script.src='https://www.googletagmanager.com/gtag/js?id='+MEASUREMENT_ID;script.dataset.kickmathsAnalytics='';script.onerror=()=>{failed=true;win[disabledKey]=true;};doc.head.append(script);
  }
  if(!pageSent){pageSent=true;command('event','page_view',{send_to:MEASUREMENT_ID,page_location:page.url,page_referrer:'',page_title:page.title,app_area:area,app_version:USAGE_VERSION});}
  if(area==='game'&&!gameOpened){gameOpened=true;track('game_open');}
 }
 function clearCookies(){
  try{sessionStore?.removeItem('kickmaths.usage.sent');}catch{}
  sent.clear();activeSent=false;
  const names=String(doc.cookie||'').split(';').map(x=>x.trim().split('=')[0]).filter(x=>/^km_ga(?:_|$)/.test(x));
  const bases=location.hostname==='cleandesignuk.github.io'?['/kickmaths/','/']:['/'];
  for(const name of names)for(const path of bases){
   doc.cookie=`${name}=; Max-Age=0; path=${path}; SameSite=Lax; Secure`;
   doc.cookie=`${name}=; Max-Age=0; path=${path}; domain=${location.hostname}; SameSite=Lax; Secure`;
  }
 }
 function setChoice(value){
  choice={version:2,preferences:value?.preferences===true,analytics:value?.analytics===true&&value?.adult===true,adult:value?.adult===true};
  try{storage?.setItem(PRIVACY_KEY,JSON.stringify(choice));}catch{}
  if(!initialised)init();
  else{
   if(!choice.analytics){win[disabledKey]=true;command('consent','update',{...denied});clearCookies();}
   try{sync();}catch{failed=true;win[disabledKey]=true;}
  }
  return {...choice};
 }
 function track(name,parameters={}){
  try{
   if(!initialised)init(area);
   if(!enabled()||!events.has(name))return false;
   const payload={send_to:MEASUREMENT_ID,app_area:area,app_version:USAGE_VERSION};
   if(types.has(parameters.match_type))payload.match_type=parameters.match_type;
   // No profile IDs/names, year, scores, answers, typed text or URLs enter events.
   command('event',name,payload);return true;
  }catch{return false;}
 }
 function once(name,key,parameters={}){
  if(!enabled())return false;
  const id=name+':'+String(key||'');
  let previous=[];
  try{previous=JSON.parse(sessionStore?.getItem('kickmaths.usage.sent')||'[]');if(!Array.isArray(previous))previous=[];}catch{}
  if(sent.has(id)||previous.includes(id))return false;
  if(!track(name,parameters))return false;
  sent.add(id);try{sessionStore?.setItem('kickmaths.usage.sent',JSON.stringify([...previous,id].slice(-100)));}catch{}
  return true;
 }
 function answered(){if(!activeSent&&track('player_active'))activeSent=true;}
 function match(name,round){
  if(!round?.id||!['game_start','game_resume','game_complete','game_save'].includes(name))return false;
  if(name==='game_complete'&&(!round.complete||!round.attempts))return false;
  if(name==='game_save'&&(round.complete||!round.attempts))return false;
  return once(name,round.id,{match_type:usageType(round)});
 }
 function storageChanged(event){if(event.key===PRIVACY_KEY){choice=readPrivacyChoice(storage);if(initialised){if(!choice?.analytics){win[disabledKey]=true;command('consent','update',{...denied});clearCookies();}sync();}}}
 win.addEventListener?.('storage',storageChanged);
 return {init,track,once,answered,match,setChoice,getChoice:()=>choice?{...choice}:null,enabled,browserOptOut};
}

let instance=null;
function current(){
 if(!instance&&typeof window!=='undefined'){
  let storage,sessionStore;try{storage=window.localStorage;sessionStore=window.sessionStorage;}catch{}
  instance=createUsage({win:window,doc:document,storage,sessionStore,location:window.location});
 }
 return instance;
}
export const initUsage=area=>current()?.init(area);
export const privacyChoice=()=>current()?.getChoice()||null;
export const setPrivacyChoice=value=>current()?.setChoice(value)||null;
export const recordUsageMatch=(name,round)=>current()?.match(name,round);
export const recordPlayerActive=()=>current()?.answered();
export function recordDemoAnswer(){current()?.track('demo_answer');current()?.answered();}

export function usageSettingsMarkup(){
 const choice=privacyChoice();
 return `<section class="panel usage-settings"><h2>Optional usage statistics</h2><p>For parents, carers and teachers. Help us count visits and games using Google Analytics. It uses cookies to recognise returning browsers. Our game events do not send player names, answers, scores or school details. This choice does not affect the game.</p><form data-usage-form><label class="setting-check"><input type="checkbox" name="analytics" ${choice?.analytics?'checked':''}> Allow Google Analytics usage statistics</label><label class="setting-check"><input type="checkbox" name="adult" ${choice?.adult?'checked':''}> I am 18 or over and am making this choice as a parent, carer or teacher.</label><button class="btn white" type="submit">Save statistics choice</button><p data-usage-status role="status"></p></form><p><a href="../privacy/#analytics">How usage statistics work</a></p></section>`;
}

if(typeof document!=='undefined')document.addEventListener('submit',event=>{
 const form=event.target;if(!form.matches?.('[data-usage-form]'))return;
 event.preventDefault();
 const analytics=form.elements.analytics.checked,adult=form.elements.adult.checked,status=form.querySelector('[data-usage-status]');
 if(analytics&&!adult){status.textContent='A parent, carer or teacher aged 18 or over must confirm this choice.';return;}
 setPrivacyChoice({...privacyChoice(),analytics,adult});
 status.textContent=analytics?'Statistics choice saved. Google Analytics is enabled where browser privacy settings allow it.':'Statistics choice saved. Google Analytics is off.';
});
