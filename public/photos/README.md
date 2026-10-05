# Fotos & Videos

- `story/` gehört zur Szene „Unsere Geschichte". Reihenfolge und Texte stehen in `src/content.js` unter `photos`.
- Originale liegen in `Photos/UnsereGeschichte` (nicht im Web-Ordner). Hier liegen nur die optimierten Versionen.

Neue Datei hinzufügen:
1. Bild: `sips -Z 1400 -s format jpeg -s formatOptions 82 original.jpg --out public/photos/story/10-name.jpg`
2. Video: `ffmpeg -i original.mp4 -an -c:v libx264 -crf 30 -maxrate 1800k -bufsize 3600k -vf "scale=720:-2,format=yuv420p" -movflags +faststart public/photos/story/10-name.mp4`
   plus Poster: `ffmpeg -ss 0.5 -i public/photos/story/10-name.mp4 -frames:v 1 public/photos/story/10-name-poster.jpg`
3. Eintrag in `src/content.js` ergänzen.
