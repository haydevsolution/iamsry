import { h, buzz, sleep } from '../ui.js';
import { HER_NAME } from '../content.js';

export default {
  id: 'start',
  render({ el, next }) {
    let opened = false;
    // Schichten von hinten nach vorne: Rückwand, Zettel, vordere Tasche, Lasche, Siegel
    const envelope = h('div', { class: 'envelope', role: 'button', 'aria-label': 'Brief öffnen' },
      h('div', { class: 'env-back' }),
      h('div', { class: 'env-letter' }, h('span', { class: 'env-letter-heart' }, '❤️')),
      h('div', { class: 'env-front' }),
      h('div', { class: 'env-flap' }),
      h('div', { class: 'env-seal' }, '❤️'),
    );
    const hint = h('p', { class: 'tap-hint lead' }, 'Tipp auf den Brief');

    envelope.addEventListener('pointerdown', async () => {
      if (opened) return;
      opened = true;
      buzz(20);
      envelope.classList.add('open');
      el.classList.add('opening');
      hint.textContent = 'Öffnet sich...';
      await sleep(1700);
      next();
    });

    el.append(
      h('p', { class: 'hint fade-in' }, 'Eine Nachricht für'),
      h('h1', { class: 'fade-in' }, HER_NAME),
      envelope,
      hint,
    );
  },
};
