import { h, button, buzz } from '../ui.js';
import { reasons, reasonsOutro } from '../content.js';
import { burst } from '../effects.js';

export default {
  id: 'reasons',
  render({ el, next }) {
    let flipped = 0;
    const cta = h('div', { class: 'btn-row hidden fade-in' }, button('Weiter', () => next()));
    const counter = h('p', { class: 'hint' }, `0 / ${reasons.length} aufgedeckt`);

    const grid = h('div', { class: 'reasons-grid' },
      reasons.map((r, i) => {
        const card = h('div', { class: 'flip' },
          h('div', { class: 'flip-inner' },
            h('div', { class: 'flip-face flip-front', style: { '--delay': `${i * 0.25}s` } }, '❤️'),
            h('div', { class: 'flip-face flip-back' }, h('span', {}, r.emoji), h('p', {}, r.text)),
          ),
        );
        card.addEventListener('pointerdown', () => {
          if (card.classList.contains('flipped')) return;
          card.classList.add('flipped');
          buzz(15);
          flipped += 1;
          counter.textContent = `${flipped} / ${reasons.length} aufgedeckt`;
          if (flipped === reasons.length) {
            burst({ particleCount: 60 });
            cta.classList.remove('hidden');
            counter.textContent = reasonsOutro;
            counter.className = 'lead fade-in';
          }
        }, { passive: true });
        return card;
      }),
    );

    el.append(
      h('h2', { class: 'fade-in' }, 'Was ich an dir liebe'),
      h('p', { class: 'fade-in hint' }, 'Tipp auf die Karten'),
      grid, counter, cta,
    );
  },
};
