#!/usr/bin/env node
/**
 * Visible word count and page height, the two copy budgets in the v3 brief.
 *
 * "Visible" means a reader can see it at 1440 × 900 after scrolling the whole
 * page once: text inside `main` that is rendered, not transparent, larger than
 * a 1px screen-reader box and inside the horizontal viewport (so the off-screen
 * copies of a marquee are not counted four times). Closed accordion panels are
 * not in the DOM, so FAQ answers are excluded automatically.
 *
 * Components that draw a label as split letters (TextRoll, Odometer) mark the
 * letters `data-wc="skip"` and their screen-reader label `data-wc="count"`, so
 * the label is counted once as the word a reader sees.
 *
 * Usage: node scripts/wordcount.mjs [--path /] [--base http://localhost:3000] [--width 1440]
 */
import { chromium } from "playwright";

const args = Object.fromEntries(
  process.argv.slice(2).reduce((pairs, arg, index, all) => {
    if (arg.startsWith("--")) pairs.push([arg.slice(2), all[index + 1]]);
    return pairs;
  }, []),
);
const base = (args.base ?? "http://localhost:3000").replace(/\/$/, "");
const path = args.path ?? "/";
const width = Number(args.width ?? 1440);
const height = Number(args.height ?? 900);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width, height } });
await page.goto(`${base}${path}`, { waitUntil: "networkidle" });

// Scroll through once so every "reveal on enter" has fired.
await page.evaluate(async () => {
  const step = window.innerHeight * 0.6;
  for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
    window.scrollTo({ top: y, behavior: "instant" });
    await new Promise((resolve) => setTimeout(resolve, 120));
  }
  window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "instant" });
  await new Promise((resolve) => setTimeout(resolve, 1200));
});

const result = await page.evaluate(() => {
  const countIn = (root) => {
    if (!root) return { words: 0, sample: [] };
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let words = 0;
    const sample = [];
    const visible = (element) => {
      if (element.closest('[data-wc="skip"]')) return false;
      if (element.closest('[data-wc="count"]')) return true;
      let opacity = 1;
      for (let node = element; node && node !== document.body; node = node.parentElement) {
        const style = getComputedStyle(node);
        if (style.display === "none" || style.visibility === "hidden") return false;
        opacity *= Number(style.opacity);
      }
      if (opacity < 0.05) return false;
      const rect = element.getBoundingClientRect();
      if (rect.width <= 1 && rect.height <= 1) return false; // sr-only
      if (rect.right <= 0 || rect.left >= window.innerWidth) return false; // off-canvas copies
      return true;
    };
    for (let text = walker.nextNode(); text; text = walker.nextNode()) {
      const value = text.textContent?.replace(/\s+/g, " ").trim();
      if (!value) continue;
      const parent = text.parentElement;
      if (!parent || ["SCRIPT", "STYLE", "NOSCRIPT"].includes(parent.tagName)) continue;
      if (!visible(parent)) continue;
      const count = value.split(" ").filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
      words += count;
      if (sample.length < 400) sample.push(value);
    }
    return { words, sample };
  };
  const main = countIn(document.querySelector("main"));
  const footer = countIn(document.querySelector("footer"));
  const header = countIn(document.querySelector("header"));
  const sections = document.querySelectorAll("main > section, main > div > section, main [data-sheet]");
  return {
    mainWords: main.words,
    footerWords: footer.words,
    headerWords: header.words,
    height: document.documentElement.scrollHeight,
    sections: sections.length,
  };
});

await browser.close();
console.log(JSON.stringify({ path, viewport: `${width}x${height}`, ...result }, null, 2));
