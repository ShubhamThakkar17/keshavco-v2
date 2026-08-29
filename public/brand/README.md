# Brand assets

Every logo on the site resolves through `src/content/brand.ts`, which points
here. **Replacing these files updates the header, footer, favicon and the large
hero graphic at once — no code change.**

| File | Where it appears |
| :--- | :--------------- |
| `mark.svg` | Light grounds — the condensed header |
| `mark-light.svg` | Dark grounds — the transparent header, footer, hero, page heroes |

`src/app/icon.svg` (the favicon) is generated from `mark-light.svg` on a navy
rounded square; regenerate or replace it when the mark changes.

## These are stand-ins

The supplied logo artwork reached the build as images, not as files, so it
could not be embedded. What ships here is a **close reconstruction** of the
Keshav Consultancy mark — nested pointed arches, the two-tone droplet, the
tiered plume and the stem, in the brand palette — not the master artwork.

To put the real logo on the site, drop the supplied files in at the two paths
above. Notes:

- **SVG is strongly preferred.** The mark renders anywhere from 36px in the
  header to ~600px in the hero; vector stays crisp at both.
- **Transparent background.** The supplied PNGs have a white background, which
  would show as a white box on the dark navy sections.
- **`mark-light.svg` needs to be a reversed version.** The master's outer barbs
  are deep navy, which disappears on the dark sections. If a reversed master
  does not exist, ask for one, or the mark can be lightened programmatically.
- If only PNG masters exist, save them as `mark.png` / `mark-light.png` and
  change the two paths in `src/content/brand.ts`. Supply at 1024px or larger.

The full horizontal and stacked lockups are not used on the site: the header
and footer pair the mark with live text so the wordmark stays crisp and can
recolour per background. Add them here if they are needed for other surfaces.
