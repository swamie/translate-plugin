'use strict';

// Generates the app icon (512x512 RGBA PNG) with zero dependencies — a green
// Spotify-ish rounded square with a white play triangle. Output is written to
// both build/icon.png (used by electron-builder) and src/icon.png (used as the
// runtime window icon). Regenerate with: npm run make-icon
//
// 2x supersampling keeps the edges smooth.

const zlib = require('zlib');
const fs = require('fs');
const path = require('path');

const SIZE = 512;
const SS = 2; // supersample factor
const RADIUS = 116; // corner radius of the rounded square

// Spotify green + white play glyph.
const GREEN = [30, 215, 96];
const WHITE = [255, 255, 255];

function insideRounded(x, y) {
  const cx = Math.min(Math.max(x, RADIUS), SIZE - 1 - RADIUS);
  const cy = Math.min(Math.max(y, RADIUS), SIZE - 1 - RADIUS);
  const dx = x - cx;
  const dy = y - cy;
  return dx * dx + dy * dy <= RADIUS * RADIUS;
}

// Play triangle (points right), centred with a slight optical shift right.
const T = [
  [196, 150],
  [196, 362],
  [378, 256],
];
function sign(ax, ay, bx, by, px, py) {
  return (px - bx) * (ay - by) - (ax - bx) * (py - by);
}
function insideTriangle(x, y) {
  const d1 = sign(T[0][0], T[0][1], T[1][0], T[1][1], x, y);
  const d2 = sign(T[1][0], T[1][1], T[2][0], T[2][1], x, y);
  const d3 = sign(T[2][0], T[2][1], T[0][0], T[0][1], x, y);
  const hasNeg = d1 < 0 || d2 < 0 || d3 < 0;
  const hasPos = d1 > 0 || d2 > 0 || d3 > 0;
  return !(hasNeg && hasPos);
}

function sampleColor(x, y) {
  // Returns [r,g,b,a] for a single (super)sample point.
  if (!insideRounded(x, y)) return [0, 0, 0, 0];
  if (insideTriangle(x, y)) return [WHITE[0], WHITE[1], WHITE[2], 255];
  return [GREEN[0], GREEN[1], GREEN[2], 255];
}

function buildRaw() {
  // One filter byte (0) per row followed by RGBA pixels.
  const raw = Buffer.alloc(SIZE * (1 + SIZE * 4));
  let o = 0;
  for (let y = 0; y < SIZE; y++) {
    raw[o++] = 0; // filter: none
    for (let x = 0; x < SIZE; x++) {
      let r = 0;
      let g = 0;
      let b = 0;
      let a = 0;
      for (let sy = 0; sy < SS; sy++) {
        for (let sx = 0; sx < SS; sx++) {
          const px = x + (sx + 0.5) / SS;
          const py = y + (sy + 0.5) / SS;
          const c = sampleColor(px, py);
          r += c[0] * c[3];
          g += c[1] * c[3];
          b += c[2] * c[3];
          a += c[3];
        }
      }
      const n = SS * SS;
      const alpha = a / n;
      // Un-premultiply so partially-covered edge pixels keep their true colour.
      if (a > 0) {
        raw[o++] = Math.round(r / a);
        raw[o++] = Math.round(g / a);
        raw[o++] = Math.round(b / a);
      } else {
        raw[o++] = 0;
        raw[o++] = 0;
        raw[o++] = 0;
      }
      raw[o++] = Math.round(alpha);
    }
  }
  return raw;
}

// --- Minimal PNG container ---------------------------------------------------

const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const body = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body), 0);
  return Buffer.concat([len, body, crc]);
}

function encodePng() {
  const sig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(SIZE, 0);
  ihdr.writeUInt32BE(SIZE, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // colour type: RGBA
  ihdr[10] = 0; // compression
  ihdr[11] = 0; // filter
  ihdr[12] = 0; // interlace
  const idat = zlib.deflateSync(buildRaw(), { level: 9 });
  return Buffer.concat([
    sig,
    chunk('IHDR', ihdr),
    chunk('IDAT', idat),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

const png = encodePng();
const targets = [
  path.join(__dirname, '..', 'build', 'icon.png'),
  path.join(__dirname, '..', 'src', 'icon.png'),
];
for (const target of targets) {
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, png);
  console.log(`wrote ${target} (${png.length} bytes)`);
}
