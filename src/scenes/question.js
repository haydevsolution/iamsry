import { h, button, buzz } from '../ui.js';
import { questionPage, noTexts } from '../content.js';
import { celebrate } from '../effects.js';

export default {
  id: 'question',
  render({ el, go }) {
    let attempts = 0;
    const comment = h('p', { class: 'lead question-comment' }, ' ');

    const yes = button('Ja ❤️', () => {
      yes.disabled = true;
      no.remove();
      comment.textContent = 'Danke.';
      celebrate();
      buzz([40, 60, 40, 60, 120]);
      // Weiter zur Finale-Seite; WhatsApp öffnet sie dort selbst per Button
      setTimeout(() => go('final'), 1600);
    }, 'primary', { class: 'btn btn-primary btn-yes' });

    const no = button('Nein', () => {}, 'ghost', { class: 'btn btn-ghost btn-no' });

    // Der Button flieht nur in den Bereich unterhalb des Textes, nie über die Worte.
    const flee = () => {
      const pad = 16;
      const w = no.offsetWidth, hgt = no.offsetHeight;
      const textBottom = comment.getBoundingClientRect().bottom + 12;
      const minY = Math.min(textBottom, window.innerHeight - hgt - pad);
      const maxY = window.innerHeight - hgt - pad;
      const x = pad + Math.random() * (window.innerWidth - w - pad * 2);
      const y = minY + Math.random() * Math.max(0, maxY - minY);
      no.classList.add('fleeing');
      no.style.left = `${x}px`;
      no.style.top = `${y}px`;
    };

    const onNo = (e) => {
      e.preventDefault();
      attempts += 1;
      buzz(5);
      const commentIdx = attempts - 1;

      if (commentIdx < questionPage.noComments.length) {
        // Erste Versuche: nur Kommentar und kurzes Wackeln
        comment.textContent = questionPage.noComments[commentIdx];
        flee();
        return;
      }

      // Ab jetzt: Button flieht, wird kleiner, "Ja" wächst
      const n = attempts - questionPage.noComments.length;
      flee();
      no.textContent = noTexts[Math.min(n, noTexts.length - 1)];
      no.style.transform = `scale(${Math.max(0.45, 1 - n * 0.09)})`;
      yes.style.transform = `scale(${Math.min(1.9, 1 + n * 0.14)})`;
      comment.textContent = ' ';
      if (n >= noTexts.length) {
        no.style.opacity = '0';
        setTimeout(() => no.remove(), 400);
      }
    };
    // Auf dem Handy gibt es kein Hover: pointerdown greift vor dem Klick
    no.addEventListener('pointerdown', onNo);
    no.addEventListener('click', (e) => e.preventDefault());

    // Bild über der Frage; fehlt die Datei, wird es still ausgeblendet
    const picture = questionPage.image
      ? h('figure', { class: 'question-pic fade-in' }, h('img', { src: questionPage.image.src, alt: questionPage.image.alt, draggable: 'false' }))
      : null;
    picture?.querySelector('img').addEventListener('error', () => picture.remove());

    el.append(
      ...(picture ? [picture] : []),
      h('h2', { class: 'fade-in' }, questionPage.title),
      h('p', { class: 'fade-in' }, questionPage.text),
      comment,
      h('div', { class: 'question-stage' }, yes, no),
    );
    return () => no.remove();
  },
};
