import { h, button, buzz } from '../ui.js';
import { promises } from '../content.js';
import { burst } from '../effects.js';

export default {
  id: 'promises',
  render({ el, next }) {
    let sealed = 0;
    const cta = h('div', { class: 'btn-row hidden fade-in' }, button('Ich hab noch eine Frage', () => next()));

    const list = h('div', { class: 'promise-list' },
      promises.map((p, i) => {
        const item = h('div', { class: 'promise card fade-in', style: { animationDelay: `${i * 0.12}s` }, role: 'button' },
          h('span', { class: 'ico' }, p.emoji),
          h('p', {}, p.text),
          h('span', { class: 'stamp' }, 'Versprochen'),
        );
        item.addEventListener('pointerdown', () => {
          if (item.classList.contains('sealed')) return;
          item.classList.add('sealed');
          buzz(20);
          sealed += 1;
          if (sealed === promises.length) {
            burst({ particleCount: 80, colors: ['#ffd166', '#fff', '#ff4d6d'] });
            cta.classList.remove('hidden');
          }
        }, { passive: true });
        return item;
      }),
    );

    el.append(
      h('h2', { class: 'fade-in' }, 'Meine Versprechen'),
      h('p', { class: 'fade-in hint' }, 'Tipp auf jedes, um es zu besiegeln'),
      list, cta,
    );
  },
};
