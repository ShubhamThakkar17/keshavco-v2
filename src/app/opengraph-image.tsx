import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/content/site";
import { brand } from "@/content/brand";

/**
 * Open Graph image (brief §7.5): night background with a dot grid, the mark,
 * the tagline in Sora and the domain in mono. Rendered once at build time.
 * Fonts are the OFL-licensed files in `src/app/_og/`.
 */
export const alt = `${site.name}: ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const root = process.cwd();
  const [sora, mono, mark] = await Promise.all([
    readFile(join(root, "src/app/_og/sora-600.ttf")),
    readFile(join(root, "src/app/_og/geist-mono-500.ttf")),
    readFile(join(root, "public", brand.mark)),
  ]);
  const markSrc = `data:image/png;base64,${mark.toString("base64")}`;

  // Dot grid as an SVG layer (satori does not paint CSS radial gradients).
  // Dots brighten towards the bottom right, echoing the growth ridge.
  const dots: string[] = [];
  for (let y = 15; y < size.height; y += 30) {
    for (let x = 15; x < size.width; x += 30) {
      const t = (x / size.width) * 0.6 + (y / size.height) * 0.4;
      dots.push(`<circle cx="${x}" cy="${y}" r="1.5" fill="white" fill-opacity="${(0.04 + t * 0.16).toFixed(3)}"/>`);
    }
  }
  const dotSrc = `data:image/svg+xml;base64,${Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size.width}" height="${size.height}">${dots.join("")}</svg>`,
  ).toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          position: "relative",
          backgroundColor: "#080D18",
          color: "#FFFFFF",
          fontFamily: "Sora",
        }}
      >
        <img src={dotSrc} width={size.width} height={size.height} alt="" style={{ position: "absolute", top: 0, left: 0 }} />
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <img src={markSrc} width={74} height={80} alt="" />
          <div
            style={{
              display: "flex",
              fontFamily: "Geist Mono",
              fontSize: 22,
              letterSpacing: "0.04em",
              color: "rgba(255,255,255,0.7)",
            }}
          >
            {site.name.toUpperCase()}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ display: "flex", fontSize: 84, lineHeight: 1.02, letterSpacing: "-0.045em", maxWidth: 900 }}>
            {site.tagline}
          </div>
          <div
            style={{
              display: "flex",
              width: 320,
              height: 3,
              backgroundImage: "linear-gradient(90deg, #4F46E5 0%, #7C3AED 48%, #22C55E 100%)",
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontFamily: "Geist Mono",
            fontSize: 22,
            letterSpacing: "0.04em",
            color: "rgba(255,255,255,0.7)",
          }}
        >
          <span>{site.domain.toUpperCase()}</span>
          <span style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ width: 12, height: 12, borderRadius: 12, backgroundColor: "#22C55E" }} />
            {brand.tagline.toUpperCase()}
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Sora", data: sora, weight: 600, style: "normal" },
        { name: "Geist Mono", data: mono, weight: 500, style: "normal" },
      ],
    },
  );
}
