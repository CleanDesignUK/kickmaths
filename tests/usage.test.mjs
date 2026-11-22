import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {createUsage,readPrivacyChoice,safePage,MEASUREMENT_ID,PRIVACY_KEY} from '../dist/usage.mjs';

const granted={version:2,preferences:false,analytics:true,adult:true};
function memory(initial={}){const values=new Map(Object.entries(initial));return {getItem:k=>values.get(k)??null,setItem:(k,v)=>values.set(k,v),removeItem:k=>values.delete(k)};}
function harness({choice=null,url='https://kickmaths.co.uk/play/?name=PrivateChild#private-name',navigator={},sessionStore=memory(),brokenScript=false}={}){
 const storage=memory(choice?{[PRIVACY_KEY]:JSON.stringify(choice)}:{}),scripts=[],listeners={},writes=[];
 const win={navigator,addEventListener:(type,fn)=>{listeners[type]=fn;}};
 const doc={head:{append:node=>scripts.push(node)},createElement:()=>{if(brokenScript)throw Error('blocked');return {dataset:{}};},title:'PrivateChild',referrer:'https://private-school.example/class/PrivateChild'};
 Object.defineProperty(doc,'cookie',{get:()=> 'km_ga=example; km_ga_5226JP5Y9R=session; functional=keep',set:value=>writes.push(value)});
 const api=createUsage({win,doc,storage,sessionStore,location:new URL(url),now:()=>1700000000000});
 const commands=()=>win.dataLayer?.map(x=>Array.from(x))||[];
 const events=()=>commands().filter(x=>x[0]==='event');
 return {api,win,doc,storage,sessionStore,scripts,listeners,writes,commands,events};
}

test('no script, page view or gameplay data is sent before adult-confirmed analytics consent',()=>{
 const h=harness();h.api.init('game');h.api.answered();h.api.match('game_start',{id:'old-round'});
 assert.equal(h.scripts.length,0);assert.equal(h.events().length,0);
 assert.equal(h.win['ga-disable-'+MEASUREMENT_ID],true);
 assert.deepEqual(h.commands()[0],['consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',personalization_storage:'denied'}]);
 h.api.setChoice({analytics:true,adult:false,preferences:true});
 assert.equal(h.api.getChoice().analytics,false);assert.equal(h.scripts.length,0);
 h.api.setChoice(granted);
 assert.equal(h.scripts.length,1);
 assert.deepEqual(h.events().map(x=>x[1]),['page_view','game_open']);
});

test('old preference choices and corrupt or incomplete records cannot grant analytics',()=>{
 for(const value of [null,'broken',{version:1,preferences:true,analytics:true,adult:true},{version:2,preferences:false,analytics:true}]){
  const storage=memory({[PRIVACY_KEY]:typeof value==='string'?value:JSON.stringify(value)});
  const choice=readPrivacyChoice(storage);assert.ok(!choice?.analytics);
 }
 assert.equal(readPrivacyChoice({getItem(){throw Error('storage denied');}}),null);
});

test('one Google-only loader and explicit page views use privacy settings and redacted addresses',()=>{
 const h=harness({choice:granted});h.api.init('game');h.api.init('game');
 assert.equal(h.scripts.length,1);assert.equal(h.scripts[0].src,'https://www.googletagmanager.com/gtag/js?id='+MEASUREMENT_ID);
 assert.equal(h.scripts[0].referrerPolicy,'no-referrer');
 const config=h.commands().find(x=>x[0]==='config')[2];
 assert.equal(config.allow_google_signals,false);assert.equal(config.allow_ad_personalization_signals,false);
 assert.equal(config.send_page_view,false);assert.equal(config.cookie_expires,2592000);assert.equal(config.cookie_update,false);
 assert.equal(config.page_location,'https://kickmaths.co.uk/play/');assert.equal(config.page_referrer,'');assert.equal(config.page_title,'KickMaths game');
 assert.equal(h.events().filter(x=>x[1]==='page_view').length,1);
 assert.equal(h.events().filter(x=>x[1]==='game_open').length,1);
 assert.doesNotMatch(JSON.stringify(h.commands()),/PrivateChild|private-school|private-name|GTM-/);
});

test('gameplay counters whitelist parameters and never upload the round or pupil record',()=>{
 const h=harness({choice:granted});h.api.init('game');
 const round={id:'private-round-id',profileId:'private-profile-id',name:'PrivateChild',year:6,answer:'SecretAnswer',score:100,manual:'colAdd2'};
 assert.equal(h.api.match('game_start',round),true);
 h.api.track('game_complete',{match_type:'coach',name:'PrivateChild',answer:'SecretAnswer',school:'SecretSchool',year:6,score:100});
 assert.equal(h.api.track('answer_submitted',{answer:'SecretAnswer'}),false);
 const start=h.events().find(x=>x[1]==='game_start')[2];
 assert.deepEqual(Object.keys(start).sort(),['app_area','app_version','match_type','send_to']);
 assert.doesNotMatch(JSON.stringify(h.commands()),/PrivateChild|SecretAnswer|SecretSchool|private-round|private-profile/);
});

test('completed matches and saved partial matches are distinct and duplicate sends are suppressed across reloads',()=>{
 const sessionStore=memory(),h=harness({choice:granted,sessionStore});h.api.init('game');
 const round={id:'round-1',complete:false,attempts:2};
 assert.equal(h.api.match('game_start',round),true);assert.equal(h.api.match('game_start',round),false);
 assert.equal(h.api.match('game_complete',round),false);assert.equal(h.api.match('game_save',round),true);
 round.complete=true;assert.equal(h.api.match('game_complete',round),true);assert.equal(h.api.match('game_complete',round),false);
 assert.equal(h.api.match('game_save',{id:'never-played',complete:false,attempts:0}),false);
 const reloaded=harness({choice:granted,sessionStore});reloaded.api.init('game');
 assert.equal(reloaded.api.match('game_start',round),false);assert.equal(reloaded.api.match('game_complete',round),false);
 assert.equal(reloaded.events().filter(x=>x[1]==='game_start'||x[1]==='game_complete').length,0);
});

test('player_active means a measured browser answered, with no replay of pre-consent interaction',()=>{
 const h=harness();h.api.init('game');h.api.answered();h.api.answered();assert.equal(h.events().length,0);
 h.api.setChoice(granted);assert.equal(h.events().filter(x=>x[1]==='player_active').length,0);
 h.api.answered();h.api.answered();assert.equal(h.events().filter(x=>x[1]==='player_active').length,1);
});

test('withdrawal blocks future gameplay events and clears only this integration’s tracking storage',()=>{
 const h=harness({choice:granted});h.api.init('game');h.api.match('game_start',{id:'round'});
 h.api.setChoice({analytics:false,preferences:true,adult:true});const count=h.events().length;
 assert.equal(h.win['ga-disable-'+MEASUREMENT_ID],true);assert.equal(h.api.match('game_start',{id:'another'}),false);
 h.api.answered();assert.equal(h.events().length,count);assert.equal(h.sessionStore.getItem('kickmaths.usage.sent'),null);
 assert.ok(h.writes.some(x=>x.startsWith('km_ga=; Max-Age=0')));
 assert.ok(h.writes.some(x=>x.startsWith('km_ga_5226JP5Y9R=; Max-Age=0')));
 assert.ok(h.writes.every(x=>!x.startsWith('functional=')));
 assert.equal(h.api.getChoice().preferences,true);
});

test('cross-tab withdrawal also disables tracking in an already open game',()=>{
 const h=harness({choice:granted});h.api.init('game');h.storage.setItem(PRIVACY_KEY,JSON.stringify({...granted,analytics:false}));
 h.listeners.storage({key:PRIVACY_KEY});assert.equal(h.api.enabled(),false);assert.equal(h.api.track('game_start'),false);
});

test('privacy signals, localhost and unrelated project paths prevent loading or sending',()=>{
 for(const options of [{navigator:{globalPrivacyControl:true}},{navigator:{doNotTrack:'1'}},{url:'http://localhost:4173/play/'},{url:'https://cleandesignuk.github.io/primary-uk-maths/play/'},{url:'https://other.example/play/'}]){
  const h=harness({choice:granted,...options});h.api.init('game');h.api.track('game_start');assert.equal(h.scripts.length,0);assert.equal(h.events().length,0);
 }
 const h=harness({choice:granted,url:'https://cleandesignuk.github.io/kickmaths/play/?nickname=PrivateChild'});h.api.init('game');
 assert.equal(h.scripts.length,1);assert.equal(h.commands().find(x=>x[0]==='config')[2].cookie_path,'/kickmaths/');
});

test('analytics failure does not throw into gameplay',()=>{
 const h=harness({choice:granted,brokenScript:true});assert.doesNotThrow(()=>h.api.init('game'));assert.equal(h.api.enabled(),false);assert.doesNotThrow(()=>h.api.answered());
 const blocked=harness({choice:granted});blocked.api.init('game');blocked.scripts[0].onerror();assert.equal(blocked.api.track('game_start'),false);
});

test('only known public paths appear in measurement and dynamic or sensitive URLs are discarded',()=>{
 for(const [url,expected] of [
  ['https://kickmaths.co.uk/year-6-maths/?name=PrivateChild#answer','https://kickmaths.co.uk/year-6-maths/'],
  ['https://cleandesignuk.github.io/kickmaths/parents/?email=private@example.org','https://cleandesignuk.github.io/kickmaths/parents/'],
  ['https://kickmaths.co.uk/PrivateChild/SecretSchool','https://kickmaths.co.uk/'],
 ])assert.equal(safePage(new URL(url)).url,expected);
});

test('all public link previews use the exact owner-supplied 1200×630 image, including game and old pricing links',()=>{
 const name='kickmaths-share-00f8cc99ab2d.jpg',url='https://cleandesignuk.github.io/kickmaths/assets/'+name;
 const bytes=readFileSync('dist/assets/'+name);
 assert.equal(createHash('sha256').update(bytes).digest('hex').slice(0,12),'00f8cc99ab2d');
 const pages=JSON.parse(readFileSync('dist/marketing-pages.json','utf8'));
 for(const slug of [...pages.map(p=>p.slug),'play','pricing']){
  const html=readFileSync(`dist/${slug?slug+'/':''}index.html`,'utf8');
  assert.ok(html.includes(`<meta property="og:image" content="${url}">`),slug);
  assert.ok(html.includes(`<meta name="twitter:image" content="${url}">`),slug);
  assert.match(html,/<meta property="og:image:width" content="1200">/);
  assert.match(html,/<meta property="og:image:height" content="630">/);
 }
 for(const alias of ['kickmaths-social.jpg','kickmaths-beta-social.jpg'])assert.deepEqual(readFileSync('dist/assets/'+alias),bytes);
 // Report credentials or a pretend client-side admin gate must never be shipped.
 assert.ok(!readdirSync('dist').some(name=>/^(admin|usage-dashboard|analytics-dashboard)$/.test(name)));
});
