import confetti from 'canvas-confetti';

// Schwebende Herzen im Hintergrund
export function startHearts(container, every = 450) {
  const glyphs = ['❤️', '💗', '💖', '🩷', '💕'];
  const timer = setInterval(() => {
    if (document.hidden) return;
    const heart = document.createElement('span');
    heart.className = 'heart';
    heart.textContent = glyphs[Math.floor(Math.random() * glyphs.length)];
    heart.style.left = `${Math.random() * 100}vw`;
    heart.style.fontSize = `${12 + Math.random() * 18}px`;
    heart.style.animationDuration = `${6 + Math.random() * 6}s`;
    heart.style.setProperty('--drift', `${(Math.random() - 0.5) * 120}px`);
    container.appendChild(heart);
    setTimeout(() => heart.remove(), 13000);
  }, every);
  return () => clearInterval(timer);
}

export function burst(opts = {}) {
  confetti({
    particleCount: 90,
    spread: 75,
    startVelocity: 38,
    origin: { y: 0.65 },
    colors: ['#ff4d6d', '#ff8fa3', '#ffd166', '#ffffff', '#c77dff'],
    ...opts,
  });
}

export function heartRain() {
  const shape = confetti.shapeFromText({ text: '❤️', scalar: 2 });
  confetti({ particleCount: 40, spread: 100, startVelocity: 30, shapes: [shape], scalar: 2, origin: { y: 0.3 } });
}

export function celebrate() {
  burst({ origin: { x: 0.2, y: 0.7 }, angle: 60 });
  burst({ origin: { x: 0.8, y: 0.7 }, angle: 120 });
  setTimeout(heartRain, 400);
  setTimeout(() => burst({ particleCount: 150, spread: 120, origin: { y: 0.5 } }), 900);
  setTimeout(heartRain, 1500);
}
