import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  NormalBlending,
  PerspectiveCamera,
  Points,
  Scene,
  ShaderMaterial,
  WebGLRenderer,
} from "three";
import { roundPointFragment, simplexNoise3D } from "../glsl";
import type { SceneFactory } from "../types";

export type ChevronOptions = {
  tone: "paper" | "night";
  /** "auto" assembles once on first view; "scroll" follows setProgress. */
  mode: "auto" | "scroll";
};

/**
 * The KeshavCo idea as a 3D particle sculpture: a cloud of scattered points
 * (the fragmented vendors) that converges into the brand's chevron stack,
 * three nested chevrons at different depths with the green "eye" in front.
 * This is the derived motif from the brief (§4), not the logo artwork.
 *
 * Each particle has its own start delay, so the sculpture assembles in a
 * wave. Once assembled it breathes and turns slowly, and tilts towards the
 * pointer. Driven by scroll ("scroll") or by time on first view ("auto").
 */

type Stroke = { points: [number, number][]; width: number; z: number; color: (u: number) => number[] };

const INDIGO = [0.31, 0.275, 0.898];
const PURPLE = [0.486, 0.227, 0.929];
const BLUE = [0.231, 0.388, 0.965];
const GREEN = [0.133, 0.773, 0.369];
const mixColor = (a: number[], b: number[], t: number) => a.map((v, i) => v + (b[i] - v) * t);

/** One chevron: rounded shoulders falling away from a pointed apex. */
function chevron(apex: number, half: number, drop: number): [number, number][] {
  const pts: [number, number][] = [];
  const steps = 40;
  for (let i = 0; i <= steps; i += 1) {
    const u = i / steps; // 0 = left foot, 1 = right foot
    const side = u < 0.5 ? -1 : 1;
    const k = u < 0.5 ? 1 - u * 2 : (u - 0.5) * 2; // 1 at feet, 0 at apex
    // Straight 45° slope to the shoulder, then a curve down to the foot.
    const shoulder = 0.7;
    let x: number;
    let y: number;
    if (k <= shoulder) {
      const s = k / shoulder;
      x = side * half * s;
      y = apex - half * s;
    } else {
      const s = (k - shoulder) / (1 - shoulder);
      const angle = (s * Math.PI) / 2;
      x = side * (half + Math.sin(angle) * half * 0.18 - s * s * half * 0.2);
      y = apex - half - Math.sin(angle) * drop;
    }
    pts.push([x, y]);
  }
  return pts;
}

function strokes(): Stroke[] {
  return [
    {
      points: chevron(3.3, 3.0, 2.2),
      width: 0.46,
      z: -0.9,
      color: (u) => mixColor(INDIGO, PURPLE, u),
    },
    {
      points: chevron(2.25, 2.05, 1.5),
      width: 0.4,
      z: 0,
      color: (u) => mixColor(BLUE, INDIGO, u),
    },
    {
      points: chevron(1.25, 1.2, 0.9),
      width: 0.34,
      z: 0.9,
      color: (u) => mixColor(INDIGO, BLUE, u),
    },
  ];
}

function sampleTargets(count: number) {
  const target = new Float32Array(count * 3);
  const color = new Float32Array(count * 3);
  const list = strokes();
  // Length-weighted share for each stroke, keeping 12% for the eye.
  const lengths = list.map((stroke) =>
    stroke.points.reduce((sum, p, i) => {
      if (i === 0) return 0;
      const q = stroke.points[i - 1];
      return sum + Math.hypot(p[0] - q[0], p[1] - q[1]);
    }, 0),
  );
  const total = lengths.reduce((a, b) => a + b, 0);
  const eyeCount = Math.floor(count * 0.12);
  let index = 0;

  list.forEach((stroke, s) => {
    const n = s === list.length - 1 ? count - eyeCount - index : Math.floor(((count - eyeCount) * lengths[s]) / total);
    for (let i = 0; i < n; i += 1) {
      const u = Math.random();
      const f = u * (stroke.points.length - 1);
      const a = stroke.points[Math.floor(f)];
      const b = stroke.points[Math.min(Math.ceil(f), stroke.points.length - 1)];
      const t = f - Math.floor(f);
      const x = a[0] + (b[0] - a[0]) * t;
      const y = a[1] + (b[1] - a[1]) * t;
      const spread = (Math.random() - 0.5) * stroke.width;
      const depth = (Math.random() - 0.5) * 0.35;
      target.set([x + spread * 0.7, y + spread * 0.7, stroke.z + depth], index * 3);
      color.set(stroke.color(u), index * 3);
      index += 1;
    }
  });

  // The eye: a small teardrop, pointed at the top, in front of the layers.
  for (let i = 0; index < count; i += 1) {
    const angle = Math.random() * Math.PI * 2;
    const r = Math.sqrt(Math.random()) * 0.5;
    let x = Math.cos(angle) * r;
    let y = Math.sin(angle) * r - 0.05;
    if (y > 0) {
      const taper = 1 - y / 0.75;
      x *= Math.max(taper, 0);
      y *= 1.5;
    }
    target.set([x, y + 0.35, 1.5 + (Math.random() - 0.5) * 0.2], index * 3);
    color.set(mixColor(GREEN, [0.078, 0.55, 0.47], Math.random() * 0.35), index * 3);
    index += 1;
  }
  return { target, color };
}

const vertex = /* glsl */ `
${simplexNoise3D}
uniform float uTime;
uniform float uProgress;
uniform float uDpr;
uniform float uNight;
attribute vec3 aTarget;
attribute vec3 aColor;
attribute float aSeed;
varying vec3 vColor;
varying float vAlpha;

void main() {
  float start = aSeed * 0.45;
  float t = smoothstep(start, start + 0.55, uProgress);
  t = t * t * (3.0 - 2.0 * t);

  float time = uTime * 0.00025;
  vec3 drift = vec3(
    snoise(position * 0.18 + vec3(time, 0.0, 0.0)),
    snoise(position * 0.18 + vec3(0.0, time, 3.0)),
    snoise(position * 0.18 + vec3(7.0, 0.0, time))
  ) * 0.9;
  vec3 scattered = position + drift;
  vec3 breathe = vec3(
    snoise(aTarget * 1.3 + vec3(time * 2.0)),
    snoise(aTarget * 1.3 + vec3(5.0, time * 2.0, 1.0)),
    0.0
  ) * 0.035;
  vec3 p = mix(scattered, aTarget + breathe, t);

  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = uDpr * mix(1.6, 2.6, t) * (14.0 / -mv.z);

  vColor = uNight > 0.5 ? aColor : aColor * 0.85;
  vAlpha = mix(uNight > 0.5 ? 0.45 : 0.35, uNight > 0.5 ? 0.95 : 0.9, t);
}
`;

const createChevrons: SceneFactory<ChevronOptions> = (canvas, size, options) => {
  const renderer = new WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: "low-power" });
  renderer.setClearColor(0x000000, 0);
  const scene = new Scene();
  const camera = new PerspectiveCamera(38, 1, 0.1, 100);
  camera.position.set(0, 0.2, 14);

  const count = size.width >= 768 ? 7000 : 3600;
  const { target, color } = sampleTargets(count);
  const scatter = new Float32Array(count * 3);
  const seeds = new Float32Array(count);
  for (let i = 0; i < count; i += 1) {
    // A wide, flattened cloud: pieces everywhere, nothing lined up.
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = 4 + Math.random() * 6;
    scatter.set(
      [r * Math.sin(phi) * Math.cos(theta) * 1.4, r * Math.cos(phi) * 0.8, r * Math.sin(phi) * Math.sin(theta)],
      i * 3,
    );
    seeds[i] = Math.random();
  }

  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new BufferAttribute(scatter, 3));
  geometry.setAttribute("aTarget", new BufferAttribute(target, 3));
  geometry.setAttribute("aColor", new BufferAttribute(color, 3));
  geometry.setAttribute("aSeed", new BufferAttribute(seeds, 1));

  const night = options.tone === "night";
  const uniforms = {
    uTime: { value: 0 },
    uProgress: { value: 0 },
    uDpr: { value: size.dpr },
    uNight: { value: night ? 1 : 0 },
  };
  const material = new ShaderMaterial({
    uniforms,
    vertexShader: vertex,
    fragmentShader: roundPointFragment,
    transparent: true,
    depthWrite: false,
    blending: night ? AdditiveBlending : NormalBlending,
  });
  const points = new Points(geometry, material);
  points.frustumCulled = false;
  points.position.y = -0.4;
  scene.add(points);

  let pointer = { x: 0, y: 0 };
  const tilt = { x: 0, y: 0 };
  let autoStart = -1;
  let progress = 0;

  const handle = {
    resize({ width, height, dpr }: { width: number; height: number; dpr: number }) {
      renderer.setPixelRatio(dpr);
      renderer.setSize(width, height, false);
      camera.aspect = width / Math.max(height, 1);
      // Keep the sculpture fully in frame in narrow containers.
      camera.position.z = camera.aspect < 0.9 ? 14 / Math.max(camera.aspect, 0.5) : 14;
      camera.updateProjectionMatrix();
      uniforms.uDpr.value = dpr;
    },
    render(time: number) {
      uniforms.uTime.value = time;
      if (options.mode === "auto") {
        if (autoStart < 0) autoStart = time;
        progress = Math.min(1, (time - autoStart) / 2600);
      }
      uniforms.uProgress.value = progress;
      tilt.x += (pointer.y * 0.25 - tilt.x) * 0.05;
      tilt.y += (pointer.x * 0.4 - tilt.y) * 0.05;
      points.rotation.y = Math.sin(time * 0.00032) * 0.38 + tilt.y;
      points.rotation.x = -0.08 + tilt.x;
      renderer.render(scene, camera);
    },
    setProgress(value: number) {
      if (options.mode === "scroll") progress = value;
      else if (value >= 1) progress = 1;
    },
    setPointer(point: { x: number; y: number } | null) {
      if (!point) {
        pointer = { x: 0, y: 0 };
        return;
      }
      const w = canvas.clientWidth || 1;
      const h = canvas.clientHeight || 1;
      pointer = { x: (point.x / w) * 2 - 1, y: (point.y / h) * 2 - 1 };
    },
    dispose() {
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    },
  };
  handle.resize(size);
  return handle;
};

export default createChevrons;
