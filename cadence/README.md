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

## Get the `.exe` (no build tools needed)

The Windows installer is built automatically by GitHub Actions.

1. Go to the repo's **Actions** tab → **Build Cadence (Windows)**.
2. Open the most recent successful run (or click **Run workflow** to start one).
3. Download the **`Cadence-Windows`** artifact at the bottom of the run.
4. Unzip it — you'll get:
   - `Cadence-Setup-1.0.0.exe` — a normal installer (Start‑menu + desktop
     shortcut, choose install location).
   - `Cadence-Portable-1.0.0.exe` — a single self‑contained file, no install;
     just double‑click it.

Windows SmartScreen will likely warn on first run because the build isn't
code‑signed (signing needs a paid certificate). Click **More info → Run anyway**.

## Build it yourself (optional)

If you have [Node.js](https://nodejs.org) on your PC:

```sh
cd cadence
npm install
npm run dist      # → dist/Cadence-Setup-*.exe and Cadence-Portable-*.exe
```

Run it in dev without packaging:

```sh
npm start
```

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
