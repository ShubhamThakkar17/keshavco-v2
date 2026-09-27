#!/usr/bin/env node
/**
 * Accessibility check with axe-core: one route per template (or --paths),
 * at each width, with motion on and off. Prints every violation and exits
 * non-zero when any is serious or critical.
 *
 * Usage: node scripts/axe.mjs [--base http://localhost:3000] [--widths 1440,390] [--paths /,/contact]
 */
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";

const args = process.argv.slice(2);
const option = (name, fallback) => {
  const index = args.indexOf(`--${name}`);
  return index >= 0 ? args[index + 1] : fallback;
};
const base = option("base", "http://localhost:3000").replace(/\/$/, "");
const widths = option("widths", "1440,390").split(",").map(Number);
const templates = [
  "/", "/services", "/services/strategy", "/services/strategy/growth-strategy", "/growth-packages",
  "/industries", "/process", "/about", "/contact", "/careers", "/faq", "/insights", "/privacy-policy", "/this-page-does-not-exist",
];
const paths = option("paths", templates.join(",")).split(",");

const browser = await chromium.launch();
let serious = 0;
for (const reducedMotion of ["no-preference", "reduce"]) {
  for (const width of widths) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion });
    const page = await context.newPage();
    for (const path of paths) {
      await page.goto(`${base}${path}`, { waitUntil: "networkidle" });
      // Scroll once so reveal-on-enter content is in its final state.
      await page.evaluate(async () => {
        for (let y = 0; y < document.documentElement.scrollHeight; y += innerHeight * 0.7) {
          window.scrollTo({ top: y, behavior: "instant" });
          await new Promise((r) => setTimeout(r, 80));
        }
        window.scrollTo({ top: 0, behavior: "instant" });
        await new Promise((r) => setTimeout(r, 600));
      });
      const { violations } = await new AxeBuilder({ page }).analyze();
      for (const v of violations) {
        if (["serious", "critical"].includes(v.impact)) serious += 1;
        console.log(`[${width} ${reducedMotion}] ${path} ${v.impact} ${v.id}: ${v.help} (${v.nodes.length})`);
        for (const node of v.nodes.slice(0, 3)) console.log(`    ${node.target.join(" ")}  ${node.failureSummary?.split("\n")[1] ?? ""}`);
      }
    }
    await context.close();
  }
}
await browser.close();
console.log(serious ? `${serious} serious/critical violation group(s).` : `axe: no serious or critical violations on ${paths.length} routes.`);
process.exit(serious ? 1 : 0);
