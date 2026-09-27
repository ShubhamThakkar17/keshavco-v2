#!/usr/bin/env node
/**
 * Route audit: visits every URL in the sitemap and records what search engines
 * see (status, title, description, canonical, H1s, JSON-LD types).
 *
 * Usage (against a running `npm start`):
 *   node scripts/route-audit.mjs --out docs/v3/routes-before.json
 *   node scripts/route-audit.mjs --base http://localhost:3000 --out docs/v3/routes-after.json
 *
 * The sitemap lists production URLs (site.url); they are rewritten onto --base.
 */
import { writeFile, mkdir } from "node:fs/promises";
import { dirname } from "node:path";
import { chromium } from "playwright";

const args = Object.fromEntries(
  process.argv.slice(2).reduce((pairs, arg, index, all) => {
    if (arg.startsWith("--")) pairs.push([arg.slice(2), all[index + 1]]);
    return pairs;
  }, []),
);
const base = (args.base ?? "http://localhost:3000").replace(/\/$/, "");
const out = args.out ?? "docs/v3/routes.json";

const sitemapXml = await (await fetch(`${base}/sitemap.xml`)).text();
const urls = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const paths = urls.map((url) => new URL(url).pathname || "/");

const browser = await chromium.launch();
const context = await browser.newContext({ reducedMotion: "reduce" });
const page = await context.newPage();

const routes = [];
for (const path of paths) {
  const response = await page.goto(`${base}${path}`, { waitUntil: "domcontentloaded" });
  const data = await page.evaluate(() => {
    const meta = (selector) => document.querySelector(selector)?.getAttribute("content") ?? null;
    const types = [];
    for (const node of document.querySelectorAll('script[type="application/ld+json"]')) {
      try {
        const json = JSON.parse(node.textContent ?? "null");
        for (const entry of Array.isArray(json) ? json : [json]) {
          if (entry && entry["@type"]) types.push(entry["@type"]);
        }
      } catch {
        types.push("INVALID_JSON");
      }
    }
    const h1s = [...document.querySelectorAll("h1")].map((h) =>
      (h.getAttribute("aria-label") ?? h.textContent ?? "").replace(/\s+/g, " ").trim(),
    );
    return {
      title: document.title,
      description: meta('meta[name="description"]'),
      canonical: document.querySelector('link[rel="canonical"]')?.getAttribute("href") ?? null,
      robots: meta('meta[name="robots"]'),
      ogTitle: meta('meta[property="og:title"]'),
      ogImage: meta('meta[property="og:image"]'),
      h1Count: h1s.length,
      h1: h1s,
      jsonLd: types.sort(),
    };
  });
  routes.push({ path, status: response?.status() ?? 0, ...data });
  process.stdout.write(`${response?.status()} ${path}\n`);
}

await browser.close();

const report = {
  generatedAt: new Date().toISOString(),
  base,
  count: routes.length,
  ok: routes.filter((r) => r.status === 200).length,
  routes,
};
await mkdir(dirname(out), { recursive: true });
await writeFile(out, `${JSON.stringify(report, null, 2)}\n`);
console.log(`\n${report.ok}/${report.count} routes returned 200 → ${out}`);
