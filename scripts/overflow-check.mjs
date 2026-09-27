#!/usr/bin/env node
/**
 * Horizontal-overflow check (brief §10: no horizontal scroll at any width).
 * Loads every sitemap URL at each width and reports pages whose document is
 * wider than the viewport, with the widest offending elements.
 *
 * Usage: node scripts/overflow-check.mjs [--base http://localhost:3000] [--widths 360,390]
 */
import { chromium } from "playwright";

const args = process.argv.slice(2);
const option = (name, fallback) => {
  const index = args.indexOf(`--${name}`);
  return index >= 0 ? args[index + 1] : fallback;
};
const base = option("base", "http://localhost:3000").replace(/\/$/, "");
const widths = option("widths", "360,390").split(",").map(Number);

const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
const paths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);

const browser = await chromium.launch();
let failures = 0;
for (const width of widths) {
  const page = await browser.newPage({ viewport: { width, height: 800 } });
  for (const path of paths) {
    await page.goto(`${base}${path}`, { waitUntil: "networkidle" });
    const result = await page.evaluate(() => {
      const doc = document.documentElement;
      const over = doc.scrollWidth - doc.clientWidth;
      if (over <= 0) return null;
      const culprits = [...document.querySelectorAll("body *")]
        .filter((el) => el.getBoundingClientRect().right > doc.clientWidth + 1)
        .slice(0, 4)
        .map((el) => `${el.tagName.toLowerCase()}.${String(el.className).slice(0, 60)}`);
      return { over, culprits };
    });
    if (result) {
      failures += 1;
      console.log(`[${width}] ${path} overflows by ${result.over}px`, result.culprits);
    }
  }
  await page.close();
}
await browser.close();
console.log(failures ? `${failures} overflow(s)` : `No horizontal overflow on ${paths.length} routes at ${widths.join(", ")}.`);
