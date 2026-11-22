document.body.classList.add('site-interactive');
const readingKey='kickmaths.reading',consentKey='kickmaths.cookies.v1';
const banner=document.querySelector('[data-cookie-banner]');
let consent=null;
try{const saved=JSON.parse(localStorage.getItem(consentKey));if(saved?.version===1&&typeof saved.preferences==='boolean')consent=saved;}catch{}
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
 consent={version:1,preferences:button.dataset.cookieChoice==='preferences'};
 try{localStorage.setItem(consentKey,JSON.stringify(consent));if(consent.preferences)localStorage.setItem(readingKey,String(document.body.classList.contains('reading-mode')));else localStorage.removeItem(readingKey);}catch{}
 if(banner)banner.hidden=true;
}));
document.querySelectorAll('[data-cookie-settings]').forEach(button=>button.addEventListener('click',()=>{if(banner){banner.hidden=false;banner.querySelector('button')?.focus();}}));
document.querySelectorAll('[data-quick-quiz]').forEach(form=>form.addEventListener('submit',event=>{
 event.preventDefault();const input=form.querySelector('input'),feedback=form.querySelector('[data-quiz-feedback]'),value=input.value.trim(),correct=value!==''&&Number.isFinite(Number(value))&&Number(value)===Number(form.dataset.answer);
 feedback.textContent=correct?'That’s right. Try the related division fact next.':`Use equal groups. The answer is ${form.dataset.answer}. Try it again after a short gap.`;feedback.className=correct?'correct':'working';
}));
const menus=[...document.querySelectorAll('.year-menu')];
document.addEventListener('keydown',event=>{if(event.key==='Escape')for(const menu of menus)if(menu.open){menu.open=false;menu.querySelector('summary').focus();}});
document.addEventListener('click',event=>{for(const menu of menus)if(menu.open&&!menu.contains(event.target))menu.open=false;});

const navToggle=document.querySelector('[data-nav-toggle]'),nav=document.querySelector('#site-navigation');
navToggle?.addEventListener('click',()=>{const open=navToggle.getAttribute('aria-expanded')!=='true';navToggle.setAttribute('aria-expanded',String(open));nav?.classList.toggle('is-open',open);});
