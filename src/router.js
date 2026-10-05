// Mini-Router auf Hash-Basis mit Enter/Exit-Animation zwischen Szenen.

const scenes = new Map();
const order = [];
let currentCleanup = null;
let currentId = null;
let navigating = false;

const app = () => document.getElementById('app');

export function registerScene(scene) {
  scenes.set(scene.id, scene);
  order.push(scene.id);
}

export function sceneOrder() {
  return [...order];
}

export function currentScene() {
  return currentId;
}

export function go(id) {
  if (!scenes.has(id)) return;
  location.hash = `#/${id}`;
}

export function next() {
  const idx = order.indexOf(currentId);
  const nextId = order[idx + 1];
  if (nextId) go(nextId);
}

function idFromHash() {
  const raw = location.hash.replace(/^#\/?/, '');
  return scenes.has(raw) ? raw : order[0];
}

async function render() {
  if (navigating) return;
  navigating = true;
  const id = idFromHash();
  const container = app();

  const old = container.querySelector('.scene');
  if (old) {
    await old.animate(
      [{ opacity: 1, transform: 'translateY(0) scale(1)' }, { opacity: 0, transform: 'translateY(-24px) scale(0.98)' }],
      { duration: 280, easing: 'ease-in', fill: 'forwards' },
    ).finished;
  }
  if (typeof currentCleanup === 'function') currentCleanup();
  currentCleanup = null;
  container.innerHTML = '';

  const el = document.createElement('section');
  el.className = `scene scene-${id}`;
  container.appendChild(el);
  currentId = id;

  const ctx = { el, next, go, sceneIndex: order.indexOf(id), sceneCount: order.length };
  currentCleanup = (await scenes.get(id).render(ctx)) || null;
  window.scrollTo(0, 0);

  el.animate(
    [{ opacity: 0, transform: 'translateY(32px) scale(0.98)' }, { opacity: 1, transform: 'translateY(0) scale(1)' }],
    { duration: 420, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'both' },
  );
  document.dispatchEvent(new CustomEvent('scene:change', { detail: { id, index: ctx.sceneIndex } }));
  navigating = false;
}

export function startRouter() {
  window.addEventListener('hashchange', render);
  if (!location.hash) location.hash = `#/${order[0]}`;
  render();
}
