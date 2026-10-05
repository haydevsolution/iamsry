import { h, button, buzz, sleep } from '../ui.js';
import { celebrate } from '../effects.js';

const TAPS_NEEDED = 12;

// Zwei Herzhälften als SVG-Pfade, die beim Tippen zusammenwachsen
const heartSvg = `
<svg viewBox="0 0 100 100" aria-hidden="true">
  <defs>
    <linearGradient id="hg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#ff8fa3"/><stop offset="1" stop-color="#ff4d6d"/>
    </linearGradient>
  </defs>
  <path class="half l" fill="url(#hg)" d="M50 88 C20 65 8 50 8 33 C8 20 18 12 29 12 C38 12 45 17 50 25 Z"/>
  <path class="half r" fill="url(#hg)" d="M50 88 C80 65 92 50 92 33 C92 20 82 12 71 12 C62 12 55 17 50 25 Z"/>
  <path class="crack" fill="none" stroke="#1a0b2e" stroke-width="3" stroke-linecap="round" d="M50 25 L46 40 L54 52 L47 66 L50 88"/>
</svg>`;

export default {
  id: 'heal',
  render({ el, next }) {
    let taps = 0;
    let healed = false;

    const heart = h('div', { class: 'heal-heart' });
    heart.innerHTML = heartSvg;
    const ring = h('div', { class: 'tap-ring' });
    const wrap = h('div', { class: 'heal-wrap', role: 'button', 'aria-label': 'Herz heilen' }, ring, heart);
    const bar = h('i');
    const meter = h('div', { class: 'meter' }, bar);
    const status = h('p', { class: 'lead' }, 'Tipp aufs Herz, so oft du kannst');
    const cta = h('div', { class: 'btn-row hidden fade-in' }, button('Weiter', () => next()));

    const spark = (x, y) => {
      const s = h('span', { class: 'sparkle', style: { left: `${x}px`, top: `${y}px` } }, ['✨', '💖', '⭐'][taps % 3]);
      wrap.appendChild(s);
      setTimeout(() => s.remove(), 1200);
    };

    wrap.addEventListener('pointerdown', async (e) => {
      if (healed) return;
      taps += 1;
      buzz(8);
      const r = wrap.getBoundingClientRect();
      spark(e.clientX - r.left, e.clientY - r.top);
      heart.classList.remove('hit');
      void heart.offsetWidth; // Animation neu starten
      heart.classList.add('hit');

      const progress = Math.min(taps / TAPS_NEEDED, 1);
      heart.style.setProperty('--gap', String(1 - progress));
      bar.style.width = `${progress * 100}%`;
      if (progress > 0.3) status.textContent = 'Weiter so...';
      if (progress > 0.7) status.textContent = 'Fast!';

      if (progress >= 1) {
        healed = true;
        ring.remove();
        heart.classList.remove('hit');
        heart.classList.add('healed');
        heart.querySelector('.crack').style.opacity = '0';
        status.textContent = 'Du hast es geheilt. Genau das kannst nur du.';
        buzz([30, 40, 60]);
        celebrate();
        await sleep(900);
        cta.classList.remove('hidden');
      }
    });

    el.append(
      h('h2', { class: 'fade-in' }, 'Ich hab was kaputt gemacht'),
      h('p', { class: 'fade-in hint' }, 'Hilf mir, es zu reparieren'),
      wrap, meter, status, cta,
    );
  },
};
