import { h, button, buzz, sleep } from '../ui.js';
import { letterParagraphs } from '../content.js';
import { heartRain } from '../effects.js';

const WORD_MS = 95;      // Abstand zwischen zwei Wörtern
const PARA_PAUSE = 650;  // Pause zwischen Absätzen

// Zerlegt einen Absatz in Wort-Spans. *markierte* Passagen bekommen die Klasse "em".
function buildParagraph(text) {
  const p = h('p', { class: 'letter-p' });
  const parts = text.split('*');
  parts.forEach((part, i) => {
    const em = i % 2 === 1;
    for (const word of part.split(/\s+/).filter(Boolean)) {
      p.append(h('span', { class: `w${em ? ' em' : ''}` }, word), ' ');
    }
  });
  return p;
}

export default {
  id: 'letter',
  render({ el, next }) {
    let skipped = false;
    const paragraphs = letterParagraphs.map(buildParagraph);
    const words = paragraphs.flatMap((p) => [...p.querySelectorAll('.w')]);
    const paper = h('div', { class: 'letter card' }, h('div', { class: 'letter-head' }, '✉️'), ...paragraphs);
    const hint = h('p', { class: 'hint letter-hint' }, 'Tipp, um alles zu lesen');
    const cta = h('div', { class: 'btn-row hidden fade-in' }, button('Weiter', () => next()));

    // Hält das zuletzt geschriebene Wort im sichtbaren Bereich
    const keepInView = (node) => {
      const r = node.getBoundingClientRect();
      if (r.bottom > window.innerHeight - 140) {
        window.scrollBy({ top: r.bottom - (window.innerHeight - 200), behavior: 'smooth' });
      }
    };

    const finish = () => {
      hint.classList.add('hidden');
      cta.classList.remove('hidden');
      heartRain();
      buzz([20, 30, 40]);
      setTimeout(() => cta.scrollIntoView({ block: 'end', behavior: 'smooth' }), 150);
    };

    const run = async () => {
      for (const p of paragraphs) {
        p.classList.add('show');
        for (const w of p.querySelectorAll('.w')) {
          if (skipped) return;
          w.classList.add('in');
          keepInView(w);
          if (w.classList.contains('em')) buzz(6);
          await sleep(w.classList.contains('em') ? WORD_MS * 2.2 : WORD_MS);
        }
        if (skipped) return;
        await sleep(PARA_PAUSE);
      }
      finish();
    };

    // Ein Tipp aufs Papier zeigt sofort den ganzen Brief
    paper.addEventListener('pointerdown', () => {
      if (skipped) return;
      skipped = true;
      paragraphs.forEach((p) => p.classList.add('show'));
      words.forEach((w) => w.classList.add('in', 'instant'));
      finish();
    }, { passive: true });

    el.append(h('h2', { class: 'fade-in' }, 'Ein paar Worte von mir'), paper, hint, cta);
    run();
    return () => { skipped = true; };
  },
};
