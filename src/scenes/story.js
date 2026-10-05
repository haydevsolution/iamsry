import { h, button, photo } from '../ui.js';
import { photos } from '../content.js';

export default {
  id: 'story',
  render({ el, next }) {
    const cards = photos.map((p, i) => {
      const card = h('article', { class: 'story-card' }, photo(p));
      card.style.setProperty('--tilt', `${(i % 2 ? 1 : -1) * (0.8 + Math.random() * 1.2)}deg`);
      return card;
    });
    const track = h('div', { class: 'story-track' }, cards);
    const hint = h('div', { class: 'swipe-hint hint' }, 'Wische', h('span', {}, '👉'));
    const cta = h('div', { class: 'btn-row hidden fade-in' }, button('Weiter', () => next()));

    // Weiter-Button erscheint, sobald sie beim letzten Bild angekommen ist
    const onScroll = () => {
      const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 40;
      if (atEnd) { cta.classList.remove('hidden'); hint.classList.add('hidden'); }
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    if (photos.length <= 1) onScroll();

    el.append(
      h('h2', { class: 'fade-in' }, 'Unsere Geschichte'),
      track, hint, cta,
    );

    // Beim Verlassen der Szene alle Videos stoppen
    return () => el.querySelectorAll('video').forEach((v) => v.pause());
  },
};
