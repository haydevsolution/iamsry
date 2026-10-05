import { h, button, buzz, sleep } from '../ui.js';
import { drawings } from '../content.js';

// Polaroid, das von oben einschwebt
function polaroid({ src, caption }, tilt, delay) {
  return h('figure', { class: 'polaroid', style: { '--tilt': `${tilt}deg`, animationDelay: `${delay}s` } },
    h('img', { src, alt: caption, draggable: 'false' }),
    h('figcaption', {}, caption),
  );
}

export default {
  id: 'drawings',
  render({ el, next }) {
    const top = polaroid(drawings.top, -3, 0.2);
    const bottom = polaroid(drawings.bottom, 2.5, 1.0);
    const note = h('p', { class: 'drawing-note hidden' }, drawings.note);
    const cta = h('div', { class: 'btn-row hidden fade-in' }, button('Weiter', () => next()));

    let cancelled = false;
    (async () => {
      await sleep(2300);
      if (cancelled) return;
      note.classList.remove('hidden');
      buzz(15);
      await sleep(900);
      if (cancelled) return;
      cta.classList.remove('hidden');
      cta.scrollIntoView({ block: 'end', behavior: 'smooth' });
    })();

    el.append(h('h2', { class: 'fade-in' }, drawings.title), h('div', { class: 'polaroid-stack' }, top, bottom), note, cta);
    return () => { cancelled = true; };
  },
};
