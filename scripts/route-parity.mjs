#!/usr/bin/env node
/**
 * Route parity report (brief §13, Phase 6): compares two route-audit files
 * and writes a Markdown report. Titles, descriptions, canonicals, robots and
 * JSON-LD types must match; each page must have exactly one H1. H1 wording,
 * og:image and routes that exist on only one side are reported separately.
 *
 * Usage: node scripts/route-parity.mjs --before docs/v3/routes-before.json --after docs/v3/routes-after.json --out docs/v3/route-parity.md
 */
import { readFile, writeFile } from "node:fs/promises";

const args = process.argv.slice(2);
const option = (name, fallback) => {
  const index = args.indexOf(`--${name}`);
  return index >= 0 ? args[index + 1] : fallback;
};
const load = async (file) => JSON.parse(await readFile(file, "utf8"));
const before = await load(option("before", "docs/v3/routes-before.json"));
const after = await load(option("after", "docs/v3/routes-after.json"));
const out = option("out", "docs/v3/route-parity.md");

const byPath = (audit) => new Map(audit.routes.map((route) => [route.path, route]));
const a = byPath(before);
const b = byPath(after);
const strict = ["status", "title", "description", "canonical", "robots"];
const sameTypes = (x = [], y = []) => [...x].sort().join(",") === [...y].sort().join(",");
const clean = (text = "") => text.replace(/\s+/g, " ").trim();

const rows = [];
const failures = [];
for (const [path, old] of a) {
  const now = b.get(path);
  if (!now) {
    failures.push(`${path}: missing after`);
    rows.push({ path, ok: false, notes: "missing" });
    continue;
  }
  const notes = [];
  for (const key of strict) if (old[key] !== now[key]) notes.push(`${key} changed`);
  if (!sameTypes(old.jsonLd, now.jsonLd)) notes.push(`JSON-LD ${old.jsonLd.join("+")} → ${now.jsonLd.join("+")}`);
  if (now.h1Count !== 1) notes.push(`${now.h1Count} H1s`);
  if (notes.length) failures.push(`${path}: ${notes.join("; ")}`);
  const h1Changed = clean(old.h1[0]) !== clean(now.h1[0]);
  rows.push({
    path,
    ok: notes.length === 0,
    notes: notes.join("; "),
    h1Changed,
    h1Before: clean(old.h1[0]),
    h1After: clean(now.h1[0]),
    og: !old.ogImage && Boolean(now.ogImage),
  });
}
const added = [...b.keys()].filter((path) => !a.has(path));

const matched = rows.filter((row) => row.ok).length;
const lines = [
  "# Route parity: v2 → v3",
  "",
  `Generated ${new Date().toISOString().slice(0, 10)} from \`${option("before", "docs/v3/routes-before.json")}\` and \`${option("after", "docs/v3/routes-after.json")}\` (\`scripts/route-parity.mjs\`).`,
  "",
  "## Result",
  "",
  `- **${matched}/${a.size}** original routes match on status, title, meta description, canonical, robots and JSON-LD types, with exactly one H1 each.`,
  `- **${added.length}** new route${added.length === 1 ? "" : "s"}: ${added.map((path) => `\`${path}\``).join(", ") || "none"}.`,
  `- **${rows.filter((row) => row.og).length}** routes gained an \`og:image\` (\`/opengraph-image\`, 1200 × 630).`,
  `- **${rows.filter((row) => row.h1Changed).length}** H1s read differently (listed below).`,
  failures.length ? `- **Failures:** ${failures.join(" · ")}` : "- **Failures:** none.",
  "",
];

const changed = rows.filter((row) => row.h1Changed);
if (changed.length) {
  lines.push("## H1 wording changes", "", "| Route | Before | After |", "| :-- | :-- | :-- |");
  for (const row of changed) lines.push(`| \`${row.path}\` | ${row.h1Before} | ${row.h1After} |`);
  lines.push("");
}

for (const path of added) {
  const now = b.get(path);
  lines.push(
    `## New route: \`${path}\``,
    "",
    `- Status ${now.status}, title "${now.title}"`,
    `- Description: ${now.description}`,
    `- Canonical ${now.canonical}, robots \`${now.robots}\`, ${now.h1Count} H1 ("${clean(now.h1[0])}")`,
    `- JSON-LD: ${now.jsonLd.join(", ")}`,
    "",
  );
}

lines.push("## Every route", "", "| Route | Match | JSON-LD | H1 |", "| :-- | :-: | :-- | :-- |");
for (const [path, now] of b) {
  const row = rows.find((entry) => entry.path === path);
  const status = !row ? "new" : row.ok ? "yes" : `**no**: ${row.notes}`;
  lines.push(`| \`${path}\` | ${status} | ${now.jsonLd.join(", ")} | ${clean(now.h1[0])} |`);
}
lines.push("");

await writeFile(out, lines.join("\n"));
console.log(`${matched}/${a.size} match, ${added.length} new, ${failures.length} failure(s) → ${out}`);
if (failures.length) console.log(failures.join("\n"));
process.exit(failures.length ? 1 : 0);
