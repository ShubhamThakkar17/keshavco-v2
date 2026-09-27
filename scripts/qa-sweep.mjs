#!/usr/bin/env node
/**
 * QA sweep (brief §14): every sitemap route at each width. Reports console
 * errors, page errors and hydration warnings, the H1 count, and on phones
 * whether the H1 and the first button sit above the fold.
 *
 * Usage: node scripts/qa-sweep.mjs [--base http://localhost:3000] [--widths 1440,390] [--height 844]
 */
import { chromium } from "playwright";

const args = process.argv.slice(2);
const option = (name, fallback) => {
  const index = args.indexOf(`--${name}`);
  return index >= 0 ? args[index + 1] : fallback;
};
const base = option("base", "http://localhost:3000").replace(/\/$/, "");
const widths = option("widths", "1440,390").split(",").map(Number);
const phoneHeight = Number(option("height", 844));

const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
const paths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);

const browser = await chromium.launch();
const problems = [];
const fold = [];
for (const width of widths) {
  const height = width < 768 ? phoneHeight : 900;
  const page = await browser.newPage({ viewport: { width, height } });
  let current = "";
  page.on("console", (msg) => {
    if (msg.type() === "error" || /hydrat/i.test(msg.text())) problems.push(`[${width}] ${current} console.${msg.type()}: ${msg.text().slice(0, 160)}`);
  });
  page.on("pageerror", (error) => problems.push(`[${width}] ${current} pageerror: ${error.message.slice(0, 160)}`));
  for (const path of paths) {
    current = path;
    await page.goto(`${base}${path}`, { waitUntil: "networkidle" });
    await page.waitForTimeout(300);
    const r = await page.evaluate(() => {
      const h1s = document.querySelectorAll("main h1");
      const h1 = h1s[0]?.getBoundingClientRect();
      const button = document.querySelector("main a.roll-host.rounded-\\[10px\\], main button.roll-host.rounded-\\[10px\\]")?.getBoundingClientRect();
      return { h1Count: h1s.length, h1Bottom: Math.round(h1?.bottom ?? 0), buttonBottom: button ? Math.round(button.bottom) : null };
    });
    if (r.h1Count !== 1) problems.push(`[${width}] ${path}: ${r.h1Count} H1s`);
    if (width < 768) {
      const ok = r.h1Bottom <= height && (r.buttonBottom === null || r.buttonBottom <= height);
      fold.push({ path, ...r, ok });
    }
  }
  await page.close();
}
await browser.close();

console.log(problems.length ? problems.join("\n") : `No console errors, page errors or hydration warnings on ${paths.length} routes at ${widths.join(", ")}; one H1 each.`);
const below = fold.filter((row) => !row.ok);
console.log(
  below.length
    ? `Above the fold at ${phoneHeight}px, NOT met:\n${below.map((row) => `  ${row.path} h1=${row.h1Bottom} button=${row.buttonBottom}`).join("\n")}`
    : `Phone (${phoneHeight}px tall): H1 and first button above the fold on all ${fold.length} routes (lowest button ${Math.max(...fold.map((row) => row.buttonBottom ?? 0))}px).`,
);
