# Cadence 🎧

A lightweight **YouTube Music** desktop app, skinned to look and feel like
**Spotify**. It runs YouTube Music in its own dedicated window — no browser, no
tabs, no extra overhead — with a dark‑green Spotify‑style theme layered on top
and the clutter stripped out.

> **Honest scope:** Cadence is a native wrapper + skin around the real YouTube
> Music web app. It makes YT Music *look* like Spotify and feel much cleaner and
> snappier (dedicated window, hardware acceleration, no ambient‑blur/ripple
> effects, promo bars and "are you still there?" popups removed). It does **not**
> reimplement YouTube's playback engine, so it can't beat YouTube's own servers
> for raw speed — but day‑to‑day it feels a lot closer to Spotify than the
> browser does.

---

## Build the app (on your Windows PC)

You only need [**Node.js**](https://nodejs.org) installed once — click the big
green **LTS** button, run the installer, and accept the defaults.

Then, in this `cadence` folder, **double‑click `build.bat`**. It installs
everything and builds the app for you. The first run takes a few minutes; after
that it's quick. When it finishes it opens the **`dist`** folder, which contains:

- `Cadence-Setup-1.0.0.exe` — a normal installer (Start‑menu + desktop
  shortcut, pick where to install).
- `Cadence-Portable-1.0.0.exe` — a single self‑contained file, no install —
  just double‑click to run.

Prefer the command line? It's the same thing:

```sh
cd cadence
npm install
npm run dist      # → dist/Cadence-Setup-*.exe and Cadence-Portable-*.exe
```

Run it in dev without packaging with `npm start`.

Windows SmartScreen may warn on the first launch because the build isn't
code‑signed (signing needs a paid certificate). Click **More info → Run
anyway** — it's your own locally‑built app.

## Features

- 🟢 **Spotify skin** — dark `#121212` UI, green accents, rounded cards,
  restyled top bar, left rail, and bottom player bar.
- 🪶 **Snappy** — dedicated window, no browser chrome, hardware‑accelerated;
  expensive ambient blur and click‑ripple effects disabled.
- 🧹 **Clutter‑free** — removes upsell mealbars, promo banners, and the
  "Video paused — continue watching?" interruption.
- 🔐 **Stays logged in** — persistent session, so you sign in once.
- ⏯️ **Media keys / Windows controls** — playback controls work via YouTube
  Music's built‑in media session (system media overlay + hardware media keys).
- 🔗 **External links** open in your real browser; playback stays in the app.

## How it works

- `src/main.js` — the Electron main process. Creates a single window, loads
  `music.youtube.com`, uses a plain desktop‑Chrome user agent (so Google
  sign‑in isn't blocked), keeps a persistent login session, and remembers window
  size/position.
- `src/preload.js` — injects the theme as early as possible (no flash of the
  stock UI) and starts the tidy‑up.
- `src/theme.css` — the Spotify‑inspired skin. It works mostly by overriding
  YouTube Music's own design tokens (`--yt-spec-*`), so the recolour is broad and
  fairly resilient to YT Music updates.
- `src/cleanup.js` — a small, defensive `MutationObserver` that removes promo /
  upsell chrome as the single‑page app injects it.
- `scripts/make-icon.js` — regenerates the app icon (dependency‑free).

## Customising

Want a different accent or darker background? Edit the palette variables at the
top of [`src/theme.css`](src/theme.css) (`--cad-green`, `--cad-bg`, …) and
rebuild. To rename the app, change `productName` in `package.json`.

## Notes / limitations

- YouTube Music occasionally changes its DOM; if a specific element ever looks
  off, it's usually a one‑line selector tweak in `theme.css`. The token
  overrides keep the overall look stable regardless.
- This is an unofficial project and isn't affiliated with YouTube, Google, or
  Spotify. It just restyles the official web app for personal use.

## License

MIT
