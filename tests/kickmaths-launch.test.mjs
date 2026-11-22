import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {initialData,newProfile,validateImport,skillById} from '../dist/engine.mjs';
import {coachView} from '../dist/academy-ui.mjs';
import {FEEDBACK_FORM_URL,feedbackMarkup} from '../dist/feedback.mjs';
const read=file=>readFileSync(file,'utf8');
const pages=JSON.parse(read('dist/marketing-pages.json'));

test('the launch website has valid routes, KickMaths metadata and no old brand attribution',()=>{
 for(const page of pages){
  const html=read(`dist/${page.slug?`${page.slug}/`:''}index.html`);
  assert.ok(page.url.startsWith('https://kickmaths.co.uk/'));
  assert.match(html,/<title>[^<]*KickMaths<\/title>/);
  assert.doesNotMatch(html,/Matchday|North Wales Tutoring|northwalestutoring|Their next goal starts/);
  assert.doesNotMatch(html,/isAccessibleForFree":true/);
  assert.equal((html.match(/<h1>/g)||[]).length,1,page.slug);
  for(const match of html.matchAll(/href="([^\"]*play\/[^\"]*)"/g)){
   const url=new URL(match[1],'https://kickmaths.co.uk/'+(page.slug?page.slug+'/':''));
   if(url.searchParams.has('skill'))assert.ok(skillById(url.searchParams.get('skill')),`${page.slug}: ${url}`);
  }
 }
 for(const slug of ['about','contact','pricing','dyslexia-friendly-maths'])assert.ok(pages.some(p=>p.slug===slug));
});

test('pricing consistently uses the confirmed £2 annual pupil rate for home and school',()=>{
 const home=read('dist/index.html'),pricing=read('dist/pricing/index.html'),schools=read('dist/teachers/index.html');
 assert.match(home,/£2 per pupil per year/);assert.match(pricing,/30<\/td><td>£60/);assert.match(pricing,/100<\/td><td>£200/);
 assert.match(schools,/30 pupils cost £60 per year/);
 const data=JSON.parse(home.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
 const offer=data.find(x=>x['@type']==='SoftwareApplication').offers;
 assert.equal(offer.price,'2.00');assert.equal(offer.priceCurrency,'GBP');
});

test('contact and game feedback point at the supplied form and email',()=>{
 const html=read('dist/contact/index.html');assert.match(html,/href="mailto:enquiries@kickmaths.co.uk"/);
 assert.ok(html.includes('href="https://forms.gle/SYBiVhoeEzwWpkvu9"'));
 assert.equal(FEEDBACK_FORM_URL,'https://forms.gle/SYBiVhoeEzwWpkvu9');
 assert.ok(feedbackMarkup().includes(FEEDBACK_FORM_URL));
});

test('website cookies are scoped away from the game and reading controls are explicitly labelled',()=>{
 for(const page of pages){const html=read(`dist/${page.slug?`${page.slug}/`:''}index.html`);assert.match(html,/data-cookie-banner hidden/);assert.match(html,/data-cookie-choice="essential"/);assert.match(html,/data-cookie-choice="preferences"/);assert.match(html,/Dyslexia-friendly mode/);}
 assert.doesNotMatch(read('dist/play/index.html'),/cookie-banner|marketing\.mjs/);
 assert.match(coachView(initialData()),/Dyslexia-friendly mode/);
});

test('audio is removed from game controls and old sound settings cannot re-enable it on restore',()=>{
 const app=read('dist/app.mjs'),coach=coachView(initialData());
 assert.doesNotMatch(app,/AudioContext|speechSynthesis|SpeechSynthesisUtterance|data-action="(?:hear|hear-help|sound|voice-test)"/);
 assert.doesNotMatch(coach,/voice-test|british-voice|auto-read|speech-rate|Reading and sound/);
 const backup=initialData();backup.profiles=[newProfile('Legacy reader',3)];
 backup.settings={sound:true,autoRead:true,voiceURI:'old',speechRate:1,dyslexia:true,reduceMotion:true};
 const restored=validateImport(structuredClone(backup));
 assert.deepEqual(restored.settings,{dyslexia:true,reduceMotion:true});
 assert.equal(restored.profiles[0].name,'Legacy reader');
});
