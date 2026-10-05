import { h } from '../ui.js';
import { finalPage, WHATSAPP_NUMBER, WHATSAPP_TEXT } from '../content.js';
import { heartRain } from '../effects.js';

// Text mit *Hervorhebung* in Spans aufteilen
function richLine(text, delay) {
  const p = h('p', { style: { '--d': `${delay}s` } });
  text.split('*').forEach((part, i) => p.append(i % 2 ? h('strong', { class: 'em-glow' }, part) : part));
  return p;
}

export default {
  id: 'final',
  render({ el }) {
    const timer = setInterval(heartRain, 2600);
    heartRain();

    const lines = h('div', { class: 'final-lines' }, finalPage.lines.map((t, i) => richLine(t, 0.4 + i * 0.6)));
    const afterLines = 0.4 + finalPage.lines.length * 0.6;
    const wa = WHATSAPP_NUMBER
      ? h('div', { class: 'final-cta fade-in', style: { animationDelay: `${afterLines}s` } },
          h('a', { class: 'btn btn-whatsapp', href: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_TEXT)}`, target: '_blank', rel: 'noopener' }, finalPage.button),
        )
      : null;

    el.append(
      h('div', { class: 'big-heart' }, '❤️'),
      h('h1', { class: 'fade-in' }, finalPage.title),
      lines,
      ...(wa ? [wa] : []),
    );
    return () => clearInterval(timer);
  },
};
