// Kleine UI-Helfer: Elemente bauen, Buttons, Typewriter, Haptik

export function h(tag, attrs = {}, ...children) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'class') el.className = v;
    else if (k === 'style' && typeof v === 'object') Object.assign(el.style, v);
    else if (k.startsWith('on') && typeof v === 'function') el.addEventListener(k.slice(2).toLowerCase(), v);
    else if (v !== false && v != null) el.setAttribute(k, v);
  }
  for (const c of children.flat()) {
    if (c == null || c === false) continue;
    el.append(c instanceof Node ? c : document.createTextNode(String(c)));
  }
  return el;
}

export function button(label, onTap, variant = 'primary', extra = {}) {
  const btn = h('button', { class: `btn btn-${variant}`, type: 'button', ...extra }, label);
  btn.addEventListener('click', (e) => {
    buzz(12);
    onTap(e, btn);
  });
  return btn;
}

export function buzz(ms = 10) {
  if (navigator.vibrate) navigator.vibrate(ms);
}

export function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

// Schreibt Text Zeichen für Zeichen in ein Element. Gibt ein Abbruch-Handle zurück.
export function typewriter(el, text, speed = 32) {
  let cancelled = false;
  const run = async () => {
    el.textContent = '';
    for (const ch of text) {
      if (cancelled) return;
      el.textContent += ch;
      await sleep(ch === '.' || ch === ',' ? speed * 6 : speed);
    }
  };
  const done = run();
  return { done, cancel: () => (cancelled = true) };
}

// Beobachtet Videos: abspielen, sobald die Karte größtenteils sichtbar ist, sonst pausieren.
let videoObserver = null;
export function observeVideo(video) {
  if (!videoObserver) {
    videoObserver = new IntersectionObserver((entries) => {
      for (const { target, isIntersecting, intersectionRatio } of entries) {
        if (isIntersecting && intersectionRatio >= 0.6) target.play().catch(() => {});
        else { target.pause(); }
      }
    }, { threshold: [0, 0.6] });
  }
  videoObserver.observe(video);
}

// Bild oder Video mit Fallback-Platzhalter, falls die Datei (noch) fehlt
export function photo({ type = 'image', src, poster, caption, note, emoji, fit = 'cover', highlight = false, lazyVideo = false }) {
  const wrap = h('figure', { class: `photo fit-${fit}${highlight ? ' photo-highlight' : ''}` });
  const placeholder = () =>
    wrap.prepend(h('div', { class: 'photo-placeholder' }, h('span', {}, emoji || '📷'), h('small', {}, 'Datei fehlt')));

  let media;
  if (type === 'video') {
    media = h('video', { src, poster, muted: '', loop: '', playsinline: '', 'webkit-playsinline': '', preload: 'metadata', 'aria-label': caption });
    media.muted = true; // Attribut allein reicht iOS nicht
    media.setAttribute('disableremoteplayback', '');
    media.addEventListener('error', () => { media.remove(); placeholder(); });
    // Fallback: blockiert iOS das Autoplay (z.B. Stromsparmodus), startet ein Tipp das Video
    media.addEventListener('pointerdown', () => { if (media.paused) media.play().catch(() => {}); }, { passive: true });
    if (!lazyVideo) observeVideo(media);
  } else {
    media = h('img', { src, alt: caption, loading: 'lazy', draggable: 'false' });
    media.addEventListener('error', () => { media.remove(); placeholder(); });
  }

  // Bei 'contain' liegt eine weichgezeichnete Kopie des Bildes hinter dem Motiv statt leerer Balken
  const blurBg = fit === 'contain' && type !== 'video'
    ? h('div', { class: 'photo-bg', style: { backgroundImage: `url("${src}")` } })
    : null;

  wrap.append(
    h('div', { class: 'photo-frame' }, blurBg, media, type === 'video' ? h('span', { class: 'video-badge' }, '▶ Video') : null),
    ...(caption ? [h('figcaption', {}, caption)] : []),
    ...(note ? [h('p', { class: 'photo-note' }, note)] : []),
  );
  return wrap;
}
