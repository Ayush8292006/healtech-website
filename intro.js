/* Healtech first-load intro
   The emblem draws itself in brass, the wordmark rises, then the navy "ward doors" part to reveal the page.
   Runs once per browser tab session. Skipped for reduced-motion. Click / Esc / Enter / Space skips it.
   Load it as a plain <script src="intro.js"></script> in <head>, after the Google Fonts link. */
(function () {
  var HOLD = 2400;        // ms from start of animation until the doors begin to open
  var DOORS = 1300;       // ms the doors take to open (match the CSS transition below)
  var ONCE_PER_SESSION = true;   // set false to play on every reload

  var H = document.documentElement;
  var resolveDone;
  window.__introDone = new Promise(function (r) { resolveDone = r; });
  window.__introRunning = false;

  try {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return resolveDone();
    if (ONCE_PER_SESSION) {
      if (sessionStorage.getItem('ht-intro')) return resolveDone();
      sessionStorage.setItem('ht-intro', '1');
    }
  } catch (e) { /* storage blocked: just play it */ }

  window.__introRunning = true;
  H.classList.add('ht-intro-on');

  var css = '' +
  'html.ht-intro-on{overflow:hidden}' +
  '.ht-intro{position:fixed;inset:0;z-index:2000;cursor:pointer;overflow:hidden}' +
  '.ht-door{position:absolute;top:0;bottom:0;width:50.3%;background:#0D1A36;transition:transform ' + DOORS + 'ms cubic-bezier(.76,0,.2,1)}' +
  '.ht-door.l{left:0;background:linear-gradient(90deg,#0A1530,#0D1A36)}' +
  '.ht-door.r{right:0;background:linear-gradient(270deg,#0A1530,#0D1A36)}' +
  '.ht-seam{position:absolute;left:50%;top:0;bottom:0;width:1px;margin-left:-.5px;background:linear-gradient(180deg,transparent,#D4AE5F 30%,#D4AE5F 70%,transparent);transform:scaleY(0);transition:opacity .4s}' +
  '.ht-go .ht-seam{animation:ht-seam 1.1s cubic-bezier(.6,0,.2,1) .1s forwards}' +
  '.ht-core{position:absolute;inset:0;z-index:2;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:20px;color:#D4AE5F;transition:opacity .55s,transform .9s cubic-bezier(.2,.7,.15,1)}' +
  '.ht-emb{width:clamp(88px,13vw,124px);height:auto;overflow:visible}' +
  '.ht-emb .s{fill:none;stroke:currentColor;stroke-width:1.3;stroke-dasharray:1;stroke-dashoffset:1}' +
  '.ht-emb .s2{opacity:.55}.ht-emb .s3{opacity:.7}' +
  '.ht-emb .x{fill:currentColor;opacity:0;transform-origin:24px 24px;transform:scale(.4)}' +
  '.ht-go .ht-emb .s{animation:ht-draw 1.5s cubic-bezier(.6,0,.2,1) .15s forwards}' +
  '.ht-go .ht-emb .s2{animation-delay:.35s}.ht-go .ht-emb .s3{animation-delay:.55s}' +
  '.ht-go .ht-emb .x{animation:ht-cross .7s cubic-bezier(.3,1.4,.5,1) 1.15s forwards}' +
  '.ht-word{display:flex;padding-left:.22em;overflow:hidden;font:600 clamp(1.6rem,4.2vw,2.5rem)/1.2 Cinzel,"Trajan Pro",Georgia,serif;color:#FBF8F1;padding-bottom:.08em}' +
  '.ht-word span{display:inline-block;margin-right:.22em;transform:translateY(120%)}' +
  '.ht-go .ht-word span{animation:ht-rise .9s cubic-bezier(.2,.7,.15,1) forwards;animation-delay:calc(.6s + var(--i) * 55ms)}' +
  '.ht-sub{font:500 .7rem/1 "Hanken Grotesk","Helvetica Neue",Arial,sans-serif;letter-spacing:.34em;text-transform:uppercase;color:rgba(251,248,241,.6);opacity:0;padding-left:.34em}' +
  '.ht-go .ht-sub{animation:ht-fade .8s ease 1.3s forwards}' +
  '.ht-bar{width:132px;height:1px;background:rgba(212,174,95,.22);overflow:hidden;margin-top:10px}' +
  '.ht-bar i{display:block;height:100%;background:#D4AE5F;transform:scaleX(0);transform-origin:left}' +
  '.ht-go .ht-bar i{animation:ht-load ' + (HOLD - 200) + 'ms cubic-bezier(.5,0,.2,1) .1s forwards}' +
  '.ht-open .ht-core{opacity:0;transform:scale(.94)}' +
  '.ht-open .ht-seam{opacity:0}' +
  '.ht-open .ht-door.l{transform:translateX(-101%)}' +
  '.ht-open .ht-door.r{transform:translateX(101%)}' +
  '@keyframes ht-draw{to{stroke-dashoffset:0}}' +
  '@keyframes ht-cross{to{opacity:1;transform:none}}' +
  '@keyframes ht-rise{to{transform:none}}' +
  '@keyframes ht-fade{to{opacity:1}}' +
  '@keyframes ht-load{to{transform:scaleX(1)}}' +
  '@keyframes ht-seam{to{transform:scaleY(1)}}';

  var st = document.createElement('style');
  st.textContent = css;
  (document.head || H).appendChild(st);

  var poly = '24,2 39.6,8.4 46,24 39.6,39.6 24,46 8.4,39.6 2,24 8.4,8.4';
  var letters = 'HEALTECH'.split('').map(function (c, i) {
    return '<span style="--i:' + i + '">' + c + '</span>';
  }).join('');

  var el = document.createElement('div');
  el.className = 'ht-intro';
  el.setAttribute('aria-hidden', 'true');
  el.innerHTML =
    '<div class="ht-door l"></div><div class="ht-door r"></div><div class="ht-seam"></div>' +
    '<div class="ht-core">' +
      '<svg class="ht-emb" viewBox="0 0 48 48">' +
        '<polygon class="s" pathLength="1" points="' + poly + '"/>' +
        '<polygon class="s s2" pathLength="1" points="' + poly + '" transform="rotate(22.5 24 24)"/>' +
        '<circle class="s s3" pathLength="1" cx="24" cy="24" r="14.5" transform="rotate(-90 24 24)"/>' +
        '<path class="x" d="M21 15h6v6h6v6h-6v6h-6v-6h-6v-6h6z"/>' +
      '</svg>' +
      '<div class="ht-word">' + letters + '</div>' +
      '<div class="ht-sub">Medical Innovations</div>' +
      '<div class="ht-bar"><i></i></div>' +
    '</div>';
  H.appendChild(el);

  var opened = false, timers = [];
  function later(fn, ms) { var t = setTimeout(fn, ms); timers.push(t); return t; }

  function openDoors() {
    if (opened) return;
    opened = true;
    timers.forEach(clearTimeout);
    el.classList.add('ht-open');
    // let the page's own entrance start while the doors are still parting
    later(function () { resolveDone(); }, Math.round(DOORS * 0.35));
    later(finish, DOORS + 120);
  }
  function finish() {
    H.classList.remove('ht-intro-on');
    if (el.parentNode) el.parentNode.removeChild(el);
    window.__introRunning = false;
    resolveDone();
  }

  // start once the brand font is ready (max 600ms) so the wordmark doesn't swap mid-animation
  var started = false;
  function start() {
    if (started) return;
    started = true;
    el.classList.add('ht-go');
    later(openDoors, HOLD);
  }
  var wait = new Promise(function (r) { setTimeout(r, 600); });
  try {
    Promise.race([document.fonts.load('600 40px Cinzel'), wait]).then(start, start);
  } catch (e) { start(); }

  // skip
  el.addEventListener('click', function () { start(); openDoors(); });
  addEventListener('keydown', function (e) {
    if (!opened && (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ')) { start(); openDoors(); }
  });
  // hard safety: never leave the overlay on screen
  setTimeout(finish, HOLD + DOORS + 4000);
})();