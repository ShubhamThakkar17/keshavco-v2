/**
 * Isometric drawing helpers (30° projection) for the v3 illustrations.
 *
 * World axes: x runs down-right, y runs down-left, z is up. `iso()` projects a
 * world point to SVG coordinates; the shape helpers return path strings so
 * every illustration shares one projection and one line style.
 */
const COS = Math.cos(Math.PI / 6);
const SIN = Math.sin(Math.PI / 6);

export type Pt = [number, number];

export function iso(x: number, y: number, z = 0): Pt {
  return [(x - y) * COS, (x + y) * SIN - z];
}

const fmt = (p: Pt) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`;

/** Closed polygon through projected points. */
export function poly(...points: Pt[]): string {
  return `M${points.map(fmt).join(" L")} Z`;
}

/** Open polyline through projected points. */
export function line(...points: Pt[]): string {
  return `M${points.map(fmt).join(" L")}`;
}

/** The three visible faces of a cuboid at (x, y, z) sized w × d × h. */
export function box(x: number, y: number, z: number, w: number, d: number, h: number) {
  const t = z + h;
  return {
    top: poly(iso(x, y, t), iso(x + w, y, t), iso(x + w, y + d, t), iso(x, y + d, t)),
    right: poly(iso(x + w, y, t), iso(x + w, y + d, t), iso(x + w, y + d, z), iso(x + w, y, z)),
    left: poly(iso(x, y + d, t), iso(x + w, y + d, t), iso(x + w, y + d, z), iso(x, y + d, z)),
  };
}

/** A flat rectangle on the ground (or at height z). */
export function plane(x: number, y: number, z: number, w: number, d: number): string {
  return poly(iso(x, y, z), iso(x + w, y, z), iso(x + w, y + d, z), iso(x, y + d, z));
}

/** Grid lines covering a w × d area at height z, every `step`. */
export function grid(x: number, y: number, z: number, w: number, d: number, step: number): string {
  const parts: string[] = [];
  for (let i = 0; i <= w; i += step) parts.push(line(iso(x + i, y, z), iso(x + i, y + d, z)));
  for (let j = 0; j <= d; j += step) parts.push(line(iso(x, y + j, z), iso(x + w, y + j, z)));
  return parts.join(" ");
}

/** An ellipse approximating a circle of radius r lying flat at (cx, cy, z). */
export function ring(cx: number, cy: number, z: number, r: number, steps = 40): string {
  const pts: Pt[] = [];
  for (let i = 0; i < steps; i += 1) {
    const a = (i / steps) * Math.PI * 2;
    pts.push(iso(cx + Math.cos(a) * r, cy + Math.sin(a) * r, z));
  }
  return poly(...pts);
}

/**
 * SVG matrix that maps flat 2D artwork onto an upright isometric plane
 * facing right (its width runs along world x). Use on a <g> so cards,
 * screens and signs can be drawn in plain 2D coordinates.
 */
export function rightPlane(origin: Pt): string {
  return `matrix(${COS.toFixed(4)} ${SIN.toFixed(4)} 0 1 ${origin[0].toFixed(1)} ${origin[1].toFixed(1)})`;
}

/** As `rightPlane`, for a plane facing left (width runs along world y). */
export function leftPlane(origin: Pt): string {
  return `matrix(${(-COS).toFixed(4)} ${SIN.toFixed(4)} 0 1 ${origin[0].toFixed(1)} ${origin[1].toFixed(1)})`;
}
