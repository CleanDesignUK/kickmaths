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
  assert.doesNotMatch(html,/isAccessibleForFree":false/);
  assert.equal((html.match(/<h1>/g)||[]).length,1,page.slug);
  for(const match of html.matchAll(/href="([^\"]*play\/[^\"]*)"/g)){
   const url=new URL(match[1],'https://kickmaths.co.uk/'+(page.slug?page.slug+'/':''));
   if(url.searchParams.has('skill'))assert.ok(skillById(url.searchParams.get('skill')),`${page.slug}: ${url}`);
  }
 }
 for(const slug of ['about','contact','beta','dyslexia-friendly-maths'])assert.ok(pages.some(p=>p.slug===slug));
});

test('every public page describes the free beta without advertising paid access or old prices',()=>{
 for(const page of pages){
  const html=read(`dist/${page.slug?`${page.slug}/`:''}index.html`);
  assert.match(html,/aria-label="Free beta"/,page.slug);
  assert.match(html,/A paid version is coming soon\./,page.slug);
  assert.doesNotMatch(html,/£\d|per pupil per year|priceCurrency|price-card|href="[^"]*pricing\//,page.slug);
  const data=JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
  for(const resource of data.filter(x=>x['@type']==='LearningResource'))assert.equal(resource.isAccessibleForFree,true,page.slug);
 }
 const home=read('dist/index.html');
 const data=JSON.parse(home.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
 const app=data.find(x=>x['@type']==='SoftwareApplication');
 assert.equal(app.isAccessibleForFree,true);assert.equal(app.offers,undefined);
 const beta=read('dist/beta/index.html');
 assert.match(beta,/No payment or activation code is needed/);
 assert.ok(beta.includes(FEEDBACK_FORM_URL));
 const social=read('dist/assets/kickmaths-beta-social.svg');
 assert.match(social,/Free beta/);assert.doesNotMatch(social,/£\d/);
});

test('old pricing links lead to free beta information and do not remain in the sitemap',()=>{
 const redirect=read('dist/pricing/index.html');
 assert.match(redirect,/name="robots" content="noindex,follow"/);
 assert.match(redirect,/http-equiv="refresh" content="0;url=\.\.\/beta\/"/);
 assert.match(redirect,/href="\.\.\/beta\/"/);
 assert.doesNotMatch(redirect,/£\d|price-card/);
 assert.doesNotMatch(read('dist/sitemap.xml'),/\/pricing\//);
 assert.match(read('dist/sitemap.xml'),/\/beta\//);
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
