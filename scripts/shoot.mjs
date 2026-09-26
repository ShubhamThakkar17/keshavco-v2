#!/usr/bin/env node
/**
 * Checkpoint screenshots. Scrolls the page once so every "on enter" reveal has
 * played, returns to the top, then captures the full page. Also reports any
 * console errors, page errors and React hydration warnings it saw.
 *
 * `--stitch` builds the full-page image from real viewport captures taken
 * while scrolling, instead of Chromium's full-page mode. Full-page mode lays
 * the page out in one very tall viewport, which misrepresents sticky and
 * scroll-linked sections (pinned stories, sheet stacking, panels); the
 * stitched version shows what a visitor actually sees at each position.
 *
 * Usage:
 *   node scripts/shoot.mjs --path /lab --widths 1440,390 --out docs/v3/shots [--reduced] [--name lab] [--stitch]
 */
import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";
import sharp from "sharp";

const args = process.argv.slice(2);
const flag = (name) => args.includes(`--${name}`);
const option = (name, fallback) => {
  const index = args.indexOf(`--${name}`);
  return index >= 0 ? args[index + 1] : fallback;
};

const base = option("base", "http://localhost:3000").replace(/\/$/, "");
const path = option("path", "/");
const widths = option("widths", "1440,390").split(",").map(Number);
const out = option("out", "docs/v3/shots");
const reduced = flag("reduced");
const name = option("name", path === "/" ? "home" : path.replace(/^\//, "").replace(/\//g, "-"));
const fullPage = !flag("viewport-only");
/** Also save the full page as consecutive slices of this many pixels. */
const split = Number(option("split", 0));
const stitch = flag("stitch");

await mkdir(out, { recursive: true });
const browser = await chromium.launch();
const problems = [];

for (const width of widths) {
  const height = width < 768 ? 844 : 900;
  const context = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: 1,
    reducedMotion: reduced ? "reduce" : "no-preference",
  });
  const page = await context.newPage();
  page.on("console", (message) => {
    if (message.type() === "error" || /hydrat/i.test(message.text())) {
      problems.push(`[${width}] console.${message.type()}: ${message.text().slice(0, 300)}`);
    }
  });
  page.on("pageerror", (error) => problems.push(`[${width}] pageerror: ${error.message}`));

  await page.goto(`${base}${path}`, { waitUntil: "networkidle" });
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.5;
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo({ top: y, behavior: "instant" });
      await new Promise((resolve) => setTimeout(resolve, 90));
    }
    window.scrollTo({ top: 0, behavior: "instant" });
    await new Promise((resolve) => setTimeout(resolve, 1400));
  });
  const file = `${out}/${name}-${width}${reduced ? "-reduced" : ""}.png`;
  if (stitch) {
    const total = await page.evaluate(() => document.documentElement.scrollHeight);
    const tiles = [];
    for (let top = 0; top < total; top += height) {
      const y = Math.min(top, total - height);
      await page.evaluate((to) => window.scrollTo({ top: to, behavior: "instant" }), y);
      // A fixed header would otherwise repeat in every tile of the stitch.
      if (tiles.length === 1) {
        await page.addStyleTag({ content: "body > header { visibility: hidden !important; }" });
      }
      await page.waitForTimeout(450);
      tiles.push({ input: await page.screenshot(), top: y, left: 0 });
    }
    await sharp({ create: { width, height: total, channels: 3, background: "#ffffff" } })
      .composite(tiles)
      .png()
      .toFile(file);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  } else {
    await page.screenshot({ path: file, fullPage });
  }
  const size = await page.evaluate(() => ({
    height: document.documentElement.scrollHeight,
    overflowX: document.documentElement.scrollWidth > window.innerWidth,
  }));
  console.log(`${file}  height=${size.height}${size.overflowX ? "  HORIZONTAL OVERFLOW" : ""}`);
  if (split > 0) {
    for (let top = 0, part = 0; top < size.height; top += split, part += 1) {
      await page.screenshot({
        path: file.replace(/\.png$/, `-part${part}.png`),
        fullPage: true,
        clip: { x: 0, y: top, width, height: Math.min(split, size.height - top) },
      });
    }
  }
  await context.close();
}

await browser.close();
if (problems.length) {
  console.log(`\n${problems.length} problem(s):\n${problems.join("\n")}`);
} else {
  console.log("\nNo console errors or hydration warnings.");
}
