const screens = [
  ['home','Home','Begin with your numerology reading and find a tarot spread that speaks to you.'],
  ['readings','Readings','Choose your spread, set an intention, and explore a reading at your own pace.'],
  ['free-table','Free Table','An open canvas for your cards. Explore connections beyond a fixed spread.'],
  ['daily-arcana','Daily Arcana','A daily card, a moment of reflection, and an affirmation to carry with you.'],
  ['horoscopes','Horoscopes','Celestial perspective for love, purpose, wellness, and everyday reflection.'],
  ['numerology','Numerology','Explore the numbers within your name and birth date.'],
  ['deck-library','Deck Library','Step into the artwork and symbolism of the Arcana Forge deck library.'],
  ['deck-studio','Deck Studio','Bring your own artwork and meanings into a deck that is uniquely yours.'],
  ['spread-studio','Spread Studio','Shape your own spreads around the questions that matter to you.'],
  ['journal','Journal','Give your readings a home and return to your reflections over time.'],
  ['profiles','Profiles','Keep personal details and notes together for a more individual practice.'],
  ['settings','Settings','Make space for your preferences in reading, appearance, and exports.'],
  ['contact','Contact','A place to connect with MLDY Labs about support, feedback, and account questions.']
];
const image = document.querySelector('#screen-image');
const nav = document.querySelector('#app-nav');
const select = document.querySelector('#screen-select');
const variant = document.querySelector('#reading-variant');
let current = 'home', spread = false, request = 0;
screens.forEach(([id,label]) => {
  const button = document.createElement('button');
  button.type = 'button';button.setAttribute('aria-label',label);button.title = label;
  button.dataset.screen = id;button.setAttribute('aria-pressed',String(id === current));
  button.addEventListener('click',() => showScreen(id));nav.append(button);
  const option = document.createElement('option');option.value = id;option.textContent = label;select.append(option);
});
function showScreen(id, useSpread = false) {
  const screen = screens.find(item => item[0] === id);if (!screen) return;
  current = id;spread = useSpread;const token = ++request;
  const file = useSpread && id === 'readings' ? 'readings-spread' : id;
  image.src = `assets/${file}.webp`;
  image.alt = `Arcana Forge ${screen[1]} application screen. ${screen[2]}`;
  image.onload = () => {if(token === request) document.querySelector('#load-error').hidden = true;};
  image.onerror = () => {if(token === request) document.querySelector('#load-error').hidden = false;};
  select.value = id;
  nav.querySelectorAll('button').forEach(button => button.setAttribute('aria-pressed',String(button.dataset.screen === id)));
  document.querySelector('#current-screen').textContent = screen[1];
  document.querySelector('#screen-description').textContent = screen[2];
  variant.hidden = id !== 'readings';variant.textContent = spread ? 'View one-card reading' : 'View Celtic Cross spread';
  history.replaceState(null,'',`#preview/${id}`);
}
select.addEventListener('change',() => showScreen(select.value));
variant.addEventListener('click',() => showScreen('readings',!spread));
document.querySelector('#retry-image').addEventListener('click',() => showScreen(current,spread));
document.querySelectorAll('.feature-grid [data-screen]').forEach(button => button.addEventListener('click',() => {
  showScreen(button.dataset.screen);document.querySelector('#preview').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
}));
document.querySelector('#zoom-button').addEventListener('click',event => {
  const enlarged = document.querySelector('#screen-stage').classList.toggle('enlarged');
  event.currentTarget.setAttribute('aria-pressed',String(enlarged));event.currentTarget.textContent = enlarged?'Fit preview':'Enlarge preview';
  if(!enlarged) document.querySelector('#screen-scroll').scrollLeft=0;
});
nav.addEventListener('keydown',event => {
  if(!['ArrowDown','ArrowUp','Home','End'].includes(event.key)) return;
  event.preventDefault();const buttons = [...nav.querySelectorAll('button')];let index = buttons.indexOf(document.activeElement);
  if(event.key === 'Home') index=0;else if(event.key === 'End') index=buttons.length-1;else index=(index+(event.key==='ArrowDown'?1:-1)+buttons.length)%buttons.length;
  buttons[index].focus();buttons[index].click();
});
document.querySelector('#year').textContent = new Date().getFullYear();
const initial = location.hash.split('/')[1];if(screens.some(item=>item[0]===initial)) showScreen(initial);
window.addEventListener('hashchange',() => {const id=location.hash.split('/')[1];if(screens.some(item=>item[0]===id)) showScreen(id);});
// Preload the remaining optimized screens after the first page is usable.
window.addEventListener('load',() => {screens.slice(1).forEach(([id]) => {const preload=new Image();preload.src=`assets/${id}.webp`;});});
