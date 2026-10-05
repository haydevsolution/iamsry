// ─────────────────────────────────────────────────────────────
// Alle Texte, Namen und Bilder an einem Ort. Hier anpassen.
// ─────────────────────────────────────────────────────────────

export const HER_NAME = 'Madlin';

// WhatsApp-Nummer ohne + und ohne Leerzeichen, z.B. '4917612345678'
export const WHATSAPP_NUMBER = '4917647155348';
export const WHATSAPP_TEXT = 'Ja ❤️';

// Unsere Geschichte: Bilder und Videos in public/photos/story/.
// type 'video' spielt stumm im Loop, aber nur solange die Karte sichtbar ist.
// fit 'contain' zeigt Querformat-Bilder komplett statt beschnitten.
export const photos = [
  { src: 'photos/story/01-unser-anfang.jpg', caption: 'Unser Anfang', note: 'Alles hat damit angefangen, dass ich dir eine Website verkaufen wollte. Ich war sehr nervös bei unserem ersten Treffen.', emoji: '🌱', fit: 'contain' },
  { src: 'photos/story/02-dein-laecheln.jpg', caption: 'Dein Lächeln, das alles leichter macht', note: 'Dein Lachen hat mich innerlich beruhigt.', emoji: '😄' },
  { src: 'photos/story/03-erstes-fruehstueck.jpg', caption: 'Unser erstes gemeinsames Frühstück', note: 'Essen war nicht nur immer gut, ich hatte einfach sogar Spaß, mit dir zu essen.', emoji: '🥐' },
  { src: 'photos/story/04-china.jpg', caption: 'Unser erstes Mal in China', note: 'Wir waren beschäftigt mit Bilder machen, sonst hätten wir den schwarzen Koi-Fisch mitgenommen.', emoji: '🏮' },
  { type: 'video', src: 'photos/story/05-fahrradreise.mp4', poster: 'photos/story/05-fahrradreise-poster.jpg', caption: 'Unsere erste gemeinsame Fahrradreise', note: 'Gott sei Dank hat uns der Bus zurück mitgenommen.', emoji: '🚲' },
  { src: 'photos/story/06-strand.jpg', caption: 'Das erste Mal gemeinsam am Strand', note: 'Dort sind Stunden verflogen, weil ich es so genossen habe.', emoji: '🏖️' },
  { src: 'photos/story/07-snacks.jpg', caption: 'Unsere Lieblingssnacks', note: 'Ich ess es auf für dich. So wie ich sonst auch immer deine Reste aufesse.', emoji: '🍫' },
  { type: 'video', src: 'photos/story/08-lokma.mp4', poster: 'photos/story/08-lokma-poster.jpg', caption: 'Das erste Mal Lokma essen gewesen', note: 'Ich liebe es, mit dir „Erste Mal“-Erlebnisse zu sammeln. Das war eines davon.', emoji: '🍯' },
  { src: 'photos/story/09-schoenster-tag.jpg', caption: 'Der schönste und bedeutsamste Tag meines Lebens', note: 'Du bist die wundervollste Person, Madlin.', emoji: '💍', highlight: true },
];

export const sorryLines = [
  'Ich habe Mist gebaut.',
  'Keine Ausreden. Keine Abers.',
  'Ich habe dich verletzt, und das tut mir unendlich leid.',
  'Ich kann es nicht ungeschehen machen.',
  'Aber ich kann dir zeigen, dass ich es verstanden habe.',
];

export const reasons = [
  { emoji: '❤️', text: 'Dass du über meine Witze lachst und es genießt.' },
  { emoji: '❤️', text: 'Dass du deine Nase so süß streichelst, wenn du nervös wirst.' },
  { emoji: '❤️', text: 'Dass du ein wundervolles Mindset hast und so motiviert bist.' },
  { emoji: '❤️', text: 'Dass du verrückt und lustig bist und mich immer zum Lachen bringst.' },
  { emoji: '❤️', text: 'Dass dein Humor genauso behindert ist wie meiner.' },
  { emoji: '❤️', text: 'Dass du Frieden in mir hervorbringst.' },
  { emoji: '❤️', text: 'Dass du so eine tolle Supporterin bist, egal was ich mache. Sogar bei Beschdar.' },
  { emoji: '❤️', text: 'Dass ich bei dir so sein kann, wie ich bin.' },
];
export const reasonsOutro = 'Und es gibt noch Unmengen an Sachen, die ich an dir liebe und wertschätze.';

// Der Brief: jeder Eintrag ist ein Absatz. Mit *Sternchen* markierte Sätze werden hervorgehoben.
export const letterParagraphs = [
  'Ich weiß, der Anfang unserer Geschichte hatte jetzt schon Tiefen, und das tut mir leid.',
  'Ich wünschte, ich könnte alles rückgängig machen und es besser machen. Ich kann es aber nicht ungeschehen machen, und dafür hasse ich mich.',
  'Was ich an dieser Stelle tun kann, ist, das als Lektion zu nehmen und an mir zu arbeiten.',
  'Du hast mich schon mehr als oft auf meine Macken hingewiesen und mir sogar eine zweite Chance gegeben. Dafür danke ich dir von Herzen.',
  'Du bedeutest mir wirklich viel, und ich will um uns kämpfen, auch wenn die Chance wirklich bei 0,1 % liegt. *Du bist es wert.*',
  'Du bist der wundervollste Mensch. Ich fühle mich so unglaublich wohl bei dir, und es macht mir so unglaublich Spaß, dich zum Lachen zu bringen.',
  '*Ich will dich nicht verlieren.*',
];

export const promises = [
  { emoji: '❤️', text: 'Ich rede mit dir, bevor etwas schiefgeht, nicht erst danach.' },
  { emoji: '❤️', text: 'Ich höre dir richtig zu, ohne mich sofort zu verteidigen.' },
  { emoji: '❤️', text: 'Ich bin ehrlich zu dir, auch wenn es unbequem ist.' },
  { emoji: '❤️', text: 'Ich arbeite an mir. Nicht nur diese Woche, sondern jeden Tag.' },
];

// "Denn ich will weiterhin...": verdeckte Karten, ein Tipp enthüllt Foto oder Video.
export const wishesTitle = 'Denn ich will weiterhin...';
export const wishes = [
  { src: 'photos/wishes/01-aufzug.jpg', text: 'meine Nase in deinen Hals stecken und nicht aufhören zu riechen.' },
  { src: 'photos/wishes/02-cookies.jpg', text: 'die besten Cookies mit dir machen.' },
  { type: 'video', src: 'photos/wishes/03-einkaufen.mp4', poster: 'photos/wishes/03-einkaufen-poster.jpg', text: 'gemeinsam Einkaufsläden unsicher machen.' },
  { src: 'photos/wishes/04-schminken.jpg', text: 'dich schminken.', fit: 'contain' },
  { src: 'photos/wishes/05-karten.jpg', text: 'mit dir Komkan spielen, und du darfst sogar schummeln.' },
  { type: 'video', src: 'photos/wishes/06-lieblingsumarmung.mp4', poster: 'photos/wishes/06-lieblingsumarmung-poster.jpg', text: 'dich umarmen.' },
  { src: 'photos/wishes/07-punks.jpg', text: 'gemeinsam wie Punks aussehen, damit unsere Eltern schockiert sind.', fit: 'contain' },
  { src: 'photos/wishes/08-kaffee.jpg', text: 'mit dir gemeinsam Kaffee trinken.' },
];

// Gemalt: zwei Zeichnungen untereinander, mit Spruch unter der zweiten.
export const drawings = {
  title: 'Übrigens',
  top: { src: 'photos/drawings/01-sie-malt-mich.jpg', caption: 'Diese rosa Farbe sieht immer noch zu Khe Khe aus' },
  bottom: { src: 'photos/drawings/02-ich-male-sie.jpg', caption: 'Aber du bist echt besser als ich im Malen' },
  note: 'Ich werde noch ein bisschen üben müssen.',
};

// Vorletzte Seite: "Madlin..."
export const madlinPage = {
  title: `${HER_NAME}...`,
  intro: 'Ich will mit dir Zeit verbringen und weitere Erinnerungen sammeln. Ich weiß, ich bin nicht perfekt, aber ich werde besser, ich verspreche es dir. *Ich will dich nicht verlieren.*',
  left: { src: 'photos/madlin/augen-zu.jpg', alt: 'Madlin mit geschlossenen Augen' },
  right: { src: 'photos/madlin/augen-offen.jpg', alt: 'Madlin mit offenen Augen' },
  outro: 'Ich liebe es, mit dir meine Zeit zu verbringen, und entschuldige mich nochmal aus tiefstem Herzen. *Ich liebe dich wirklich sehr.*',
  button: 'Deswegen die Frage...',
};

// Die Frage
export const questionPage = {
  image: { src: 'photos/question/herz-mond.jpg', alt: 'Unsere Hände formen ein Herz vor dem Mond' },
  title: `${HER_NAME}, gibst du mir eine letzte Chance?`,
  text: 'Ich verspreche dir, ich gebe mein Bestes, dich glücklich zu machen. Du bedeutest mir sehr viel.',
  // Kommentare bei den ersten "Nein"-Versuchen; danach flieht der Button
  noComments: [
    'Ich glaube, du hast dich verklickt.',
    'Ich glaube schon wieder. Das passiert, nicht schlimm.',
  ],
};

// Hintergrundmusik, läuft in dieser Reihenfolge in Endlosschleife (Dateien in public/audio/)
export const playlist = [
  'audio/01-hate-that-i-love-you-v2.mp3',
  'audio/02-take-a-bow.mp3',
];

// Texte für den weglaufenden "Nein"-Button, in Reihenfolge der Versuche
export const noTexts = [
  'Nein',
  'Bist du sicher?',
  'Wirklich?',
  'Überleg nochmal...',
  'Bitte 🥺',
  'Ich lauf dir ewig hinterher',
  'Okay, der Button gibt auf 😅',
];

export const finalPage = {
  title: `Danke, ${HER_NAME}.`,
  lines: [
    'Du hast gerade auf Ja getippt. Ich weiß, was das bedeutet, und ich nehme es nicht als selbstverständlich.',
    'Diese Chance verschwende ich nicht. Versprochen.',
    '*Ich liebe dich. Mehr als alles.*',
  ],
  button: 'Schreib mir auf WhatsApp ❤️',
};
