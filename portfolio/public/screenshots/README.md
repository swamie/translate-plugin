# Project screenshots

Drop real screenshots of the featured sites here, then point each project's
`screenshot` field in `../../lib/site.ts` at the file.

Recommended: **1440×900 (16:10)**, JPEG or PNG, named to match the project slug:

| File            | Set on project (in `lib/site.ts`)                          |
| --------------- | ---------------------------------------------------------- |
| `elite-line.jpg` | Elite Line Plumbing → `screenshot: "/screenshots/elite-line.jpg"` |
| `sisim.jpg`      | Sisim → `screenshot: "/screenshots/sisim.jpg"`             |

The preview (`components/site/browser-mock.tsx`) renders the image inside the
browser frame with `object-cover object-top`. Until a screenshot is present it
falls back to the branded gradient placeholder — so the site always looks
finished.
