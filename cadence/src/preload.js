'use strict';

// Runs in the page's context before YouTube Music's own scripts. It injects the
// Spotify-style theme as early as possible (to avoid a flash of the stock UI)
// and then starts the lightweight DOM tidy-up once the document is ready.

const fs = require('fs');
const path = require('path');

function readAsset(name) {
  try {
    return fs.readFileSync(path.join(__dirname, name), 'utf8');
  } catch (err) {
    console.error(`[Cadence] could not read ${name}:`, err);
    return '';
  }
}

function injectTheme() {
  if (document.getElementById('cadence-theme')) return;
  const style = document.createElement('style');
  style.id = 'cadence-theme';
  style.textContent = readAsset('theme.css');
  // documentElement exists extremely early, so we can style before <head> does.
  (document.head || document.documentElement).appendChild(style);
}

// Inject immediately — the sooner the CSS lands, the less flash of stock YTM.
injectTheme();

// Re-assert if the SPA ever removes our node, and mark the root so the theme
// can gate a few rules on "app is ready".
document.addEventListener('DOMContentLoaded', () => {
  injectTheme();
  document.documentElement.classList.add('cadence');
  try {
    require('./cleanup');
  } catch (err) {
    console.error('[Cadence] cleanup failed to start:', err);
  }
});
