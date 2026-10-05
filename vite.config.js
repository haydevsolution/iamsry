import { defineConfig } from 'vite';

// base './' damit die Seite später auch auf GitHub Pages / Netlify läuft
export default defineConfig({
  base: './',
  server: { host: true, port: 5173 },
});
