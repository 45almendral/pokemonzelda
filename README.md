# Zelda Z. | Pokemon TCG Juniors

Static site for GitHub Pages. Open `index.html`; no build step needed.

- `app.js` is the prebuilt bundle. `src/` holds its source (Preact + TSX) for reference; rebuild with
  `npx esbuild src/main.tsx --bundle --minify --jsx=automatic --jsx-import-source=preact/compat --outfile=app.js` after `npm i esbuild preact`.
- `images/cards/` card thumbnails, `images/cards/full/` full size.
- `images/photos/` gallery photos (1600px), `images/photos/full/` full size (2400px).
Click any card or photo to enlarge; Esc closes.
