// Hintergrundmusik: Playlist in Endlosschleife.
// Handy-Browser erlauben Ton erst nach einer Berührung, deshalb startet die
// Musik beim ersten Tipp (pointerup/touchend) und nicht beim Laden.

import { playlist } from './content.js';

const audio = new Audio();
audio.preload = 'auto';
audio.volume = 0.65;
audio.setAttribute('playsinline', '');

let index = 0;
let started = false;
let muted = false;
let button = null;

function load(i) {
  index = (i + playlist.length) % playlist.length;
  audio.src = playlist[index];
}

function playCurrent() {
  return audio.play().catch(() => { /* wird beim nächsten Tipp erneut versucht */ });
}

audio.addEventListener('ended', () => {
  load(index + 1);
  playCurrent();
});

function updateButton() {
  if (!button) return;
  button.textContent = muted ? '🔇' : '🔊';
  button.setAttribute('aria-label', muted ? 'Musik an' : 'Musik aus');
  button.classList.toggle('is-muted', muted);
}

function start() {
  if (started) return;
  started = true;
  load(0);
  playCurrent();
  if (button) button.classList.add('visible');
}

export function toggleMute() {
  muted = !muted;
  audio.muted = muted;
  if (!muted && audio.paused) playCurrent();
  updateButton();
}

export function initMusic() {
  if (!playlist.length) return;
  button = document.getElementById('music-toggle');
  if (button) {
    button.addEventListener('click', (e) => { e.stopPropagation(); toggleMute(); });
    updateButton();
  }
  // Erste Berührung irgendwo auf der Seite startet die Musik
  const onFirstTouch = () => start();
  document.addEventListener('pointerup', onFirstTouch, { once: true, passive: true });
  document.addEventListener('touchend', onFirstTouch, { once: true, passive: true });
  document.addEventListener('click', onFirstTouch, { once: true });
  // Wenn iOS die Wiedergabe unterbrochen hat (Anruf, Sperre), beim nächsten Tipp weiterspielen
  document.addEventListener('pointerup', () => { if (started && !muted && audio.paused) playCurrent(); }, { passive: true });
}
