import { h, button, buzz, photo, observeVideo } from '../ui.js';
import { wishes, wishesTitle } from '../content.js';
import { burst } from '../effects.js';

export default {
  id: 'wishes',
  render({ el, next }) {
    let revealed = 0;
    const cta = h('div', { class: 'btn-row hidden fade-in' }, button('Weiter', () => next()));
    const counter = h('p', { class: 'hint' }, `0 / ${wishes.length} enthüllt`);

    const cards = wishes.map((w, i) => {
      const fig = photo({ ...w, lazyVideo: true });
      const cover = h('div', { class: 'wish-cover' },
        h('div', { class: 'wish-half l' }), h('div', { class: 'wish-half r' }),
        h('div', { class: 'wish-cover-content' }, h('span', { class: 'wish-heart' }, '❤️'), h('p', {}, `${i + 1}`), h('small', {}, 'Tipp zum Aufdecken')),
      );
      const card = h('article', { class: 'wish card fade-in', style: { animationDelay: `${Math.min(i, 3) * 0.12}s` }, role: 'button' },
        h('div', { class: 'wish-media' }, fig, cover),
        h('p', { class: 'wish-text' }, `...${w.text}`),
      );

      card.addEventListener('pointerdown', (e) => {
        if (card.classList.contains('open')) return;
        card.classList.add('open');
        buzz([15, 30, 25]);
        // kleines Konfetti an der Tipp-Position
        burst({ particleCount: 35, spread: 60, startVelocity: 25, origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight } });
        const video = fig.querySelector('video');
        if (video) observeVideo(video);
        revealed += 1;
        counter.textContent = `${revealed} / ${wishes.length} enthüllt`;
        if (revealed === wishes.length) {
          counter.textContent = 'Und noch viel mehr. Und das alles nur mit dir.';
          counter.className = 'lead wish-outro fade-in';
          cta.classList.remove('hidden');
          setTimeout(() => cta.scrollIntoView({ block: 'end', behavior: 'smooth' }), 200);
        }
      }, { passive: true });
      return card;
    });

    el.append(
      h('h2', { class: 'fade-in' }, wishesTitle),
      h('div', { class: 'wish-list' }, cards),
      counter, cta,
    );
    return () => el.querySelectorAll('video').forEach((v) => v.pause());
  },
};
