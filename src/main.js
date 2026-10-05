import './styles/base.css';
import './styles/animations.css';
import './styles/scenes.css';

import { registerScene, startRouter, sceneOrder } from './router.js';
import { startHearts } from './effects.js';
import { initMusic } from './music.js';

import intro from './scenes/intro.js';
import sorry from './scenes/sorry.js';
import story from './scenes/story.js';
import reasons from './scenes/reasons.js';
import heal from './scenes/heal.js';
import letter from './scenes/letter.js';
import promises from './scenes/promises.js';
import wishes from './scenes/wishes.js';
import drawingsScene from './scenes/drawings.js';
import madlin from './scenes/madlin.js';
import question from './scenes/question.js';
import final from './scenes/final.js';

// Reihenfolge der "Seiten". Neue Szene: Datei in src/scenes anlegen und hier einhängen.
// Herz-Spiel (heal) ist aktuell ausgehängt; zum Aktivieren wieder in die Liste aufnehmen.
[intro, sorry, story, reasons, letter, promises, wishes, drawingsScene, madlin, question, final].forEach(registerScene);
void heal;

// Fortschrittsanzeige oben
const progress = document.getElementById('progress');
const dots = sceneOrder().map(() => document.createElement('i'));
progress.append(...dots);
document.addEventListener('scene:change', ({ detail }) => {
  dots.forEach((d, i) => {
    d.classList.toggle('done', i < detail.index);
    d.classList.toggle('active', i === detail.index);
  });
  progress.style.opacity = detail.index === 0 ? '0' : '1';
});

startHearts(document.getElementById('hearts'));
initMusic();
startRouter();
