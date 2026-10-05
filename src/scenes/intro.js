import { h, buzz, sleep } from '../ui.js';
import { HER_NAME } from '../content.js';

export default {
  id: 'start',
  render({ el, next }) {
    let opened = false;
    const envelope = h('div', { class: 'envelope', role: 'button', 'aria-label': 'Brief öffnen' },
      h('div', { class: 'body' }),
      h('div', { class: 'letter' }, '💌'),
      h('div', { class: 'flap' }),
      h('div', { class: 'seal' }, '❤️'),
    );
    const hint = h('p', { class: 'tap-hint lead' }, 'Tipp auf den Brief');

    envelope.addEventListener('pointerdown', async () => {
      if (opened) return;
      opened = true;
      buzz(20);
      envelope.classList.add('open');
      hint.textContent = 'Öffnet sich...';
      await sleep(1400);
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
