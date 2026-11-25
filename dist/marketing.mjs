import {initUsage,privacyChoice,setPrivacyChoice} from './usage.mjs?v=8.0.4';
document.body.classList.add('site-interactive');
const readingKey='kickmaths.reading';
const banner=document.querySelector('[data-cookie-banner]');
let consent=privacyChoice();
initUsage('website');
function syncChoiceFields(){
 if(!banner)return;
 banner.querySelector('[data-cookie-preferences]').checked=!!consent?.preferences;
 banner.querySelector('[data-cookie-analytics]').checked=!!consent?.analytics;
 banner.querySelector('[data-cookie-adult]').checked=!!consent?.adult;
 banner.querySelector('[data-cookie-adult-wrap]').hidden=!consent?.analytics;
 banner.querySelector('[data-cookie-error]').textContent='';
}
syncChoiceFields();
banner?.querySelector('[data-cookie-analytics]')?.addEventListener('change',event=>{banner.querySelector('[data-cookie-adult-wrap]').hidden=!event.target.checked;});
function reading(on){
 on=!!on;
 document.body.classList.toggle('reading-mode',on);
 document.querySelectorAll('[data-reading]').forEach(button=>button.setAttribute('aria-pressed',String(on)));
 if(consent?.preferences)try{localStorage.setItem(readingKey,String(on));}catch{}
}
try{reading(consent?.preferences&&localStorage.getItem(readingKey)==='true');}catch{reading(false);}
if(banner)banner.hidden=!!consent;
document.querySelectorAll('[data-reading]').forEach(button=>button.addEventListener('click',()=>reading(!document.body.classList.contains('reading-mode'))));
document.querySelectorAll('[data-cookie-choice]').forEach(button=>button.addEventListener('click',()=>{
 const essential=button.dataset.cookieChoice==='essential';
 const analytics=!essential&&banner.querySelector('[data-cookie-analytics]').checked;
 const adult=!essential&&banner.querySelector('[data-cookie-adult]').checked;
 if(analytics&&!adult){banner.querySelector('[data-cookie-error]').textContent='A parent, carer or teacher aged 18 or over must confirm the statistics choice.';return;}
 consent=setPrivacyChoice({preferences:!essential&&banner.querySelector('[data-cookie-preferences]').checked,analytics,adult});
 try{if(consent.preferences)localStorage.setItem(readingKey,String(document.body.classList.contains('reading-mode')));else localStorage.removeItem(readingKey);}catch{}
 if(banner)banner.hidden=true;
}));
document.querySelectorAll('[data-cookie-settings]').forEach(button=>button.addEventListener('click',()=>{if(banner){consent=privacyChoice();syncChoiceFields();banner.hidden=false;banner.querySelector('button')?.focus();}}));
document.querySelectorAll('[data-quick-quiz]').forEach(form=>form.addEventListener('submit',event=>{
 event.preventDefault();const input=form.querySelector('input'),feedback=form.querySelector('[data-quiz-feedback]'),value=input.value.trim(),correct=value!==''&&Number.isFinite(Number(value))&&Number(value)===Number(form.dataset.answer);
 feedback.textContent=correct?'That’s right. Try the related division fact next.':`Use equal groups. The answer is ${form.dataset.answer}. Try it again after a short gap.`;feedback.className=correct?'correct':'working';
}));
const menus=[...document.querySelectorAll('.year-menu')];
document.addEventListener('keydown',event=>{if(event.key==='Escape')for(const menu of menus)if(menu.open){menu.open=false;menu.querySelector('summary').focus();}});
document.addEventListener('click',event=>{for(const menu of menus)if(menu.open&&!menu.contains(event.target))menu.open=false;});

const navToggle=document.querySelector('[data-nav-toggle]'),nav=document.querySelector('#site-navigation');
navToggle?.addEventListener('click',()=>{const open=navToggle.getAttribute('aria-expanded')!=='true';navToggle.setAttribute('aria-expanded',String(open));nav?.classList.toggle('is-open',open);});
