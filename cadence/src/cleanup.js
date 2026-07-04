'use strict';

// Lightweight, defensive DOM tidy-up. YouTube Music periodically injects promo
// bars, "are you still there?" interruptions and upsell mealbars. Removing them
// keeps the surface clean and cuts a little layout/paint work. This intentionally
// only removes clearly-non-essential chrome — never playback controls.

const JUNK_SELECTORS = [
  'ytmusic-mealbar-promo-renderer', // "Get YouTube Music Premium" bar
  'ytmusic-statement-banner-renderer', // promotional statement banners
  'ytmusic-you-there-renderer', // "Video paused. Continue watching?"
  'ytmusic-popup-container tp-yt-paper-dialog[role="dialog"] ytmusic-mealbar-promo-renderer',
  'ytmusic-notification-action-renderer', // toast upsells
  'ytmusic-premium-plan-benefit-renderer',
  '.ytmusic-you-there-renderer',
];

function tidy() {
  for (const sel of JUNK_SELECTORS) {
    let nodes;
    try {
      nodes = document.querySelectorAll(sel);
    } catch {
      continue;
    }
    nodes.forEach((n) => n.remove());
  }
}

let scheduled = false;
function scheduleTidy() {
  if (scheduled) return;
  scheduled = true;
  const run = () => {
    scheduled = false;
    tidy();
  };
  if (typeof requestIdleCallback === 'function') {
    requestIdleCallback(run, { timeout: 500 });
  } else {
    setTimeout(run, 200);
  }
}

// Initial pass plus a watcher for anything injected later by the SPA.
tidy();
const observer = new MutationObserver(scheduleTidy);
observer.observe(document.documentElement, { childList: true, subtree: true });
