import { h, button } from '../ui.js';
import { madlinPage } from '../content.js';

// Text mit *Hervorhebung* in Spans aufteilen
function richText(text, cls) {
  const p = h('p', { class: cls });
  text.split('*').forEach((part, i) => p.append(i % 2 ? h('strong', { class: 'em-glow' }, part) : part));
  return p;
}

export default {
  id: 'madlin',
  render({ el, next }) {
    const pair = h('div', { class: 'pair' },
      h('figure', { class: 'pair-item from-left' }, h('img', { src: madlinPage.left.src, alt: madlinPage.left.alt, draggable: 'false' })),
      h('figure', { class: 'pair-item from-right' }, h('img', { src: madlinPage.right.src, alt: madlinPage.right.alt, draggable: 'false' })),
    );
    el.append(
      h('h2', { class: 'fade-in' }, madlinPage.title),
      richText(madlinPage.intro, 'madlin-text fade-in'),
      pair,
      richText(madlinPage.outro, 'madlin-text fade-in late'),
      h('div', { class: 'btn-row fade-in later' }, button(madlinPage.button, () => next())),
    );
  },
};
