#!/usr/bin/env node
/**
 * Copy budget audit for inner pages (brief §8.1): every rendered paragraph in
 * `main` of 60 words or fewer, and the word length of each H1 and H2.
 * Accordion answers are opened first so they are checked too.
 *
 * Usage: node scripts/copy-audit.mjs [--base http://localhost:3000] [--out docs/v3/copy-audit.json]
 */
import { writeFile } from "node:fs/promises";
import { chromium } from "playwright";

const args = process.argv.slice(2);
const option = (name, fallback) => {
  const index = args.indexOf(`--${name}`);
  return index >= 0 ? args[index + 1] : fallback;
};
const base = option("base", "http://localhost:3000").replace(/\/$/, "");
const out = option("out", null);

const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
const paths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
const page = await context.newPage();
const report = [];
for (const path of paths) {
  await page.goto(`${base}${path}`, { waitUntil: "networkidle" });
  const result = await page.evaluate(async () => {
    const count = (text) => text.replace(/\s+/g, " ").trim().split(" ").filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
    const main = document.querySelector("main");
    // Open each accordion answer in turn and measure it.
    const answers = [];
    for (const button of main.querySelectorAll("button[aria-expanded]")) {
      if (button.getAttribute("aria-expanded") === "false") button.click();
      await new Promise((r) => setTimeout(r, 30));
      const panel = document.getElementById(button.getAttribute("aria-controls") ?? "");
      if (panel) answers.push(count(panel.textContent ?? ""));
    }
    const paragraphs = [...main.querySelectorAll("p")]
      .filter((p) => !p.closest(".sr-only") && !p.closest('[aria-hidden="true"]'))
      .map((p) => ({ words: count(p.textContent ?? ""), text: (p.textContent ?? "").trim().slice(0, 80) }));
    return {
      h1: [...main.querySelectorAll("h1")].map((h) => count(h.textContent ?? "")),
      h2: [...main.querySelectorAll("h2")].map((h) => ({ words: count(h.textContent ?? ""), text: (h.textContent ?? "").trim() })),
      longest: Math.max(0, ...paragraphs.map((p) => p.words), ...answers),
      over60: paragraphs.filter((p) => p.words > 60),
      answersOver60: answers.filter((w) => w > 60).length,
    };
  });
  report.push({ path, ...result });
}
await browser.close();

const offenders = report.filter((r) => r.over60.length || r.answersOver60);
for (const r of offenders) {
  console.log(`${r.path}: ${r.over60.length} paragraph(s) over 60 words, ${r.answersOver60} answer(s) over 60`);
  for (const p of r.over60) console.log(`   ${p.words}w  ${p.text}…`);
}
const longH2 = report.flatMap((r) => r.h2.filter((h) => h.words > 8).map((h) => `${r.path}: "${h.text}" (${h.words})`));
const longH1 = report.filter((r) => r.h1[0] > 8).map((r) => `${r.path} (${r.h1[0]})`);
console.log(`\nRoutes: ${report.length}. Longest paragraph: ${Math.max(...report.map((r) => r.longest))} words.`);
console.log(`Paragraph budget (≤ 60): ${offenders.length ? `${offenders.length} route(s) over` : "met on every route"}.`);
console.log(`H1 over 8 words (approved copy, unchanged): ${longH1.length}\n  ${longH1.join("\n  ")}`);
console.log(`H2 over 8 words: ${longH2.length}\n  ${longH2.join("\n  ")}`);
if (out) await writeFile(out, `${JSON.stringify({ generatedAt: new Date().toISOString(), base, routes: report }, null, 2)}\n`);
