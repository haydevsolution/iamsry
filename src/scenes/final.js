import { h } from '../ui.js';
import { finalMessage, MY_NAME, WHATSAPP_NUMBER, WHATSAPP_TEXT } from '../content.js';
import { heartRain } from '../effects.js';

export default {
  id: 'final',
  render({ el }) {
    const timer = setInterval(heartRain, 2600);
    heartRain();

    const lines = h('div', { class: 'final-lines' },
      finalMessage.map((t, i) => h('p', { style: { '--d': `${0.4 + i * 0.6}s` } }, t)),
    );
    const wa = WHATSAPP_NUMBER
      ? h('a', { class: 'btn btn-whatsapp fade-in', href: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_TEXT)}`, target: '_blank', rel: 'noopener' }, 'Schreib mir 💬')
      : h('p', { class: 'hint' }, '(WhatsApp-Button erscheint, sobald die Nummer eingetragen ist)');

    el.append(
      h('div', { class: 'big-heart' }, '❤️'),
      h('h1', { class: 'fade-in' }, 'Danke.'),
      lines,
      MY_NAME !== 'Ich' && h('p', { class: 'signature fade-in', style: { animationDelay: `${0.4 + finalMessage.length * 0.6}s` } }, `Für immer dein, ${MY_NAME}`),
      wa,
    );
    return () => clearInterval(timer);
  },
};
