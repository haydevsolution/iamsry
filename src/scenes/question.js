import { h, button, buzz } from '../ui.js';
import { questionPage, noTexts } from '../content.js';
import { celebrate } from '../effects.js';

// Prüft, ob zwei Rechtecke sich (mit Abstand) überschneiden
const overlaps = (a, b, gap = 10) =>
  a.left < b.right + gap && a.right > b.left - gap && a.top < b.bottom + gap && a.bottom > b.top - gap;

export default {
  id: 'question',
  render({ el, go }) {
    let attempts = 0;
    const comment = h('p', { class: 'lead question-comment' }, ' ');

    // Bild über der Frage; fehlt die Datei, wird es still ausgeblendet
    const picture = questionPage.image
      ? h('figure', { class: 'question-pic fade-in' }, h('img', { src: questionPage.image.src, alt: questionPage.image.alt, draggable: 'false' }))
      : null;
    picture?.querySelector('img').addEventListener('error', () => picture.remove());

    const yes = button('Ja ❤️', () => {
      yes.disabled = true;
      no.remove();
      celebrate();
      buzz([40, 60, 40, 60, 120]);
      setTimeout(() => go('final'), 1600);
    }, 'primary', { class: 'btn btn-primary btn-yes' });

    const no = button('Nein', () => {}, 'ghost', { class: 'btn btn-ghost btn-no' });

    // Spielfläche unter dem Text: "Ja" oben, "Nein" bewegt sich nur innerhalb dieser Fläche
    const stage = h('div', { class: 'question-stage' }, yes, no);

    // Sichtbare (skalierte) Größe von "Nein" und Versatz zur Layout-Box
    const noBox = () => {
      const r = no.getBoundingClientRect();
      return { vw: r.width, vh: r.height, dx: (no.offsetWidth - r.width) / 2, dy: (no.offsetHeight - r.height) / 2 };
    };

    // "Ja" wächst in Breite und Höhe, lässt aber unten immer Platz für "Nein"
    const grow = (n) => {
      const { vh } = noBox();
      const reserve = vh + 40;
      const cap = Math.max(56, stage.clientHeight - reserve);
      const w = Math.min(300 + n * 45, stage.clientWidth);
      const hgt = Math.min(56 + n * 55, cap);
      yes.style.minWidth = `${w}px`;
      yes.style.minHeight = `${hgt}px`;
      yes.style.fontSize = `${Math.min(1.15 + n * 0.3, 3.2)}rem`;
      yes.style.borderRadius = `${Math.max(28, 48 - n * 4)}px`;
    };

    // "Nein" sucht einen Platz in der Spielfläche, der das "Ja" nicht berührt
    const flee = () => {
      if (!no.isConnected) return;
      const pad = 4;
      const { vw, vh, dx, dy } = noBox();
      const s = stage.getBoundingClientRect();
      const y = yes.getBoundingClientRect();
      const yesLocal = { left: y.left - s.left, right: y.right - s.left, top: y.top - s.top, bottom: y.bottom - s.top };
      const maxX = Math.max(pad, s.width - vw - pad);
      const maxY = Math.max(pad, s.height - vh - pad);

      let best = null;
      for (let i = 0; i < 80 && !best; i += 1) {
        const x = pad + Math.random() * (maxX - pad);
        const yy = pad + Math.random() * (maxY - pad);
        const cand = { left: x, right: x + vw, top: yy, bottom: yy + vh };
        if (!overlaps(cand, yesLocal)) best = cand;
      }
      if (!best) {
        // Immer frei: der reservierte Streifen unterhalb vom "Ja"
        best = { left: pad + Math.random() * (maxX - pad), top: Math.min(yesLocal.bottom + 14, maxY) };
      }
      no.classList.add('fleeing');
      no.style.left = `${best.left - dx}px`;
      no.style.top = `${best.top - dy}px`;
    };

    // Nach jedem Tipp 1,5 s lang prüfen, ob "Ja" beim Wachsen das "Nein" berührt hat
    const ensureClear = () => {
      if (!no.isConnected || !no.classList.contains('fleeing')) return;
      if (overlaps(no.getBoundingClientRect(), yes.getBoundingClientRect())) flee();
    };
    let watch = null;
    const watchClear = () => {
      clearInterval(watch);
      const until = Date.now() + 1500;
      watch = setInterval(() => { ensureClear(); if (Date.now() > until) clearInterval(watch); }, 80);
    };

    const onNo = (e) => {
      e.preventDefault();
      attempts += 1;
      buzz(5);
      picture?.classList.add('collapsed'); // Foto macht ab dem ersten "Nein" Platz
      const commentIdx = attempts - 1;

      if (commentIdx < questionPage.noComments.length) {
        comment.textContent = questionPage.noComments[commentIdx];
        flee();
        watchClear();
        return;
      }

      const n = attempts - questionPage.noComments.length;
      grow(n);
      no.textContent = noTexts[Math.min(n, noTexts.length - 1)];
      no.style.transform = `scale(${Math.max(0.45, 1 - n * 0.09)})`;
      comment.textContent = ' ';
      flee();
      watchClear();
      if (n >= noTexts.length) {
        no.style.opacity = '0';
        setTimeout(() => no.remove(), 400);
      }
    };
    // Auf dem Handy gibt es kein Hover: pointerdown greift vor dem Klick
    no.addEventListener('pointerdown', onNo);
    no.addEventListener('click', (e) => e.preventDefault());

    el.append(
      ...(picture ? [picture] : []),
      h('h2', { class: 'fade-in' }, questionPage.title),
      h('p', { class: 'fade-in' }, questionPage.text),
      comment,
      stage,
    );
    return () => { clearInterval(watch); no.remove(); };
  },
};
