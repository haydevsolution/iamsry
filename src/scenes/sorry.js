import { h, button, typewriter, sleep } from '../ui.js';
import { sorryLines } from '../content.js';

export default {
  id: 'sorry',
  render({ el, next }) {
    const face = h('div', { class: 'face', 'aria-hidden': 'true' },
      h('div', { class: 'brow l' }), h('div', { class: 'brow r' }),
      h('div', { class: 'eye l' }), h('div', { class: 'eye r' }),
      h('div', { class: 'tear l' }), h('div', { class: 'tear r' }),
      h('div', { class: 'mouth' }),
    );
    const line = h('p', { class: 'sorry-line' });
    const skip = button('Weiter', () => next(), 'ghost');
    const actions = h('div', { class: 'btn-row fade-in hidden' }, skip);

    let cancelled = false;
    let active = null;
    (async () => {
      for (const text of sorryLines) {
        if (cancelled) return;
        active = typewriter(line, text);
        await active.done;
        await sleep(1100);
      }
      if (!cancelled) {
        actions.classList.remove('hidden');
        skip.textContent = 'Lass es mich erklären';
        skip.className = 'btn btn-primary';
      }
    })();

    // Ungeduldig? Ein Tipp auf den Text überspringt zur letzten Zeile.
    line.addEventListener('pointerdown', () => {
      cancelled = true;
      active?.cancel();
      line.textContent = sorryLines[sorryLines.length - 1];
      actions.classList.remove('hidden');
    });

    el.append(h('h2', { class: 'fade-in' }, 'Es tut mir leid.'), face, line, actions);
    return () => { cancelled = true; active?.cancel(); };
  },
};
