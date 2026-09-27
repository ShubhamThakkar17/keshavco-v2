import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  NormalBlending,
  PerspectiveCamera,
  Points,
  Scene,
  ShaderMaterial,
  Vector2,
  WebGLRenderer,
} from "three";
import { brandRamp, roundPointFragment, simplexNoise3D } from "../glsl";
import type { SceneFactory } from "../types";

export type TerrainOptions = {
  tone: "paper" | "night";
  /** Height multiplier; the hero uses a calmer field than the footer. */
  amplitude?: number;
};

/**
 * DotField (brief §6.4): a dot-matrix growth landscape in real 3D.
 *
 * A grid of points on the ground plane, lifted in the vertex shader by two
 * octaves of simplex noise plus a smooth ramp that rises towards the right
 * (the growth curve, quietly). Seen through a 55° camera tilted 18° down,
 * so the rows recede into depth. On paper the dots are ink with a few Indigo;
 * on night the height maps to the brand ramp. The pointer drops a soft ripple.
 */
const density = (width: number) =>
  width >= 1024 ? { cols: 140, rows: 48 } : width >= 768 ? { cols: 100, rows: 36 } : { cols: 64, rows: 26 };

const vertex = /* glsl */ `
${simplexNoise3D}
${brandRamp}
uniform float uTime;
uniform float uAmp;
uniform float uNight;
uniform float uDpr;
uniform vec2 uPointer;
uniform float uPointerStrength;
uniform float uResolutionY;
attribute vec2 aGrid;
attribute float aSeed;
varying vec3 vColor;
varying float vAlpha;

void main() {
  vec3 p = position;
  float n = snoise(vec3(aGrid.x * 0.045, aGrid.y * 0.06, uTime * 0.00012));
  n += 0.5 * snoise(vec3(aGrid.x * 0.09, aGrid.y * 0.12, uTime * 0.00012 + 7.0));
  float ramp = smoothstep(-1.0, 1.0, p.x / 18.0);
  float h = (n * 0.55 + ramp * 1.1) * uAmp;
  p.y += h;

  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  vec4 clip = projectionMatrix * mv;

  // Pointer ripple, measured on screen so it feels attached to the cursor.
  vec2 ndc = clip.xy / clip.w;
  float dist = distance(ndc * vec2(1.0, uResolutionY), uPointer * vec2(1.0, uResolutionY));
  float ripple = uPointerStrength * exp(-dist * dist * 18.0) * sin(dist * 28.0 - uTime * 0.006);
  mv.y += ripple * 0.35;
  gl_Position = projectionMatrix * mv;

  float depth = clamp((-mv.z - 4.0) / 24.0, 0.0, 1.0);
  gl_PointSize = mix(2.2, 0.8, depth) * uDpr * 1.5;

  float heightT = clamp(h / (uAmp * 1.4) + 0.35, 0.0, 1.0);
  vec3 ink = vec3(0.059, 0.090, 0.165);
  vec3 indigo = vec3(0.310, 0.275, 0.898);
  vColor = uNight > 0.5 ? brandRamp(heightT) : (aSeed < 0.04 ? indigo : ink);
  float nearFade = smoothstep(0.0, 0.12, depth);
  float farFade = 1.0 - smoothstep(0.75, 1.0, depth);
  float base = uNight > 0.5 ? mix(0.9, 0.35, depth) : mix(0.28, 0.1, depth);
  if (uNight < 0.5 && aSeed < 0.04) base = mix(0.7, 0.3, depth);
  vAlpha = base * nearFade * farFade;
}
`;

const createTerrain: SceneFactory<TerrainOptions> = (canvas, size, options) => {
  const renderer = new WebGLRenderer({
    canvas,
    antialias: false,
    alpha: true,
    powerPreference: "low-power",
  });
  renderer.setClearColor(0x000000, 0);

  const scene = new Scene();
  // The field is usually a wide, short strip, so the camera keeps a fixed
  // horizontal field of view (80°) and derives the vertical one from the
  // aspect ratio. The ground then always spans the full width.
  const camera = new PerspectiveCamera(55, 1, 0.1, 120);
  camera.position.set(0, 3.2, 8);
  camera.rotation.x = (-18 * Math.PI) / 180;
  const horizontalFov = (80 * Math.PI) / 180;

  const night = options.tone === "night";
  const uniforms = {
    uTime: { value: 0 },
    uAmp: { value: options.amplitude ?? 1 },
    uNight: { value: night ? 1 : 0 },
    uDpr: { value: size.dpr },
    uPointer: { value: new Vector2(9, 9) },
    uPointerStrength: { value: 0 },
    uResolutionY: { value: 1 },
  };
  const material = new ShaderMaterial({
    uniforms,
    vertexShader: vertex,
    fragmentShader: roundPointFragment,
    transparent: true,
    depthWrite: false,
    blending: night ? AdditiveBlending : NormalBlending,
  });

  let points: Points | null = null;
  let builtFor = "";

  const build = (width: number) => {
    const { cols, rows } = density(width);
    const key = `${cols}x${rows}`;
    if (key === builtFor) return;
    builtFor = key;
    if (points) {
      scene.remove(points);
      points.geometry.dispose();
    }
    const count = cols * rows;
    const positions = new Float32Array(count * 3);
    const grid = new Float32Array(count * 2);
    const seeds = new Float32Array(count);
    let i = 0;
    for (let r = 0; r < rows; r += 1) {
      for (let c = 0; c < cols; c += 1) {
        const x = (c / (cols - 1) - 0.5) * 54;
        // Rows bunch up near the camera so the dots read evenly on screen.
        const z = 4 - Math.pow(r / (rows - 1), 1.5) * 28;
        positions.set([x, 0, z], i * 3);
        grid.set([c * (140 / cols), r * (48 / rows)], i * 2);
        seeds[i] = Math.random();
        i += 1;
      }
    }
    const geometry = new BufferGeometry();
    geometry.setAttribute("position", new BufferAttribute(positions, 3));
    geometry.setAttribute("aGrid", new BufferAttribute(grid, 2));
    geometry.setAttribute("aSeed", new BufferAttribute(seeds, 1));
    points = new Points(geometry, material);
    points.frustumCulled = false;
    scene.add(points);
  };

  let pointerTarget = 0;

  const handle = {
    resize({ width, height, dpr }: { width: number; height: number; dpr: number }) {
      renderer.setPixelRatio(dpr);
      renderer.setSize(width, height, false);
      camera.aspect = width / Math.max(height, 1);
      camera.fov = Math.min(
        70,
        (2 * Math.atan(Math.tan(horizontalFov / 2) / camera.aspect) * 180) / Math.PI,
      );
      camera.updateProjectionMatrix();
      uniforms.uDpr.value = dpr;
      uniforms.uResolutionY.value = height / Math.max(width, 1);
      build(width);
    },
    render(time: number) {
      uniforms.uTime.value = time;
      const s = uniforms.uPointerStrength;
      s.value += (pointerTarget - s.value) * 0.08;
      renderer.render(scene, camera);
    },
    setPointer(point: { x: number; y: number } | null) {
      if (!point) {
        pointerTarget = 0;
        return;
      }
      const w = canvas.clientWidth || 1;
      const h = canvas.clientHeight || 1;
      uniforms.uPointer.value.set((point.x / w) * 2 - 1, 1 - (point.y / h) * 2);
      pointerTarget = 1;
    },
    dispose() {
      points?.geometry.dispose();
      material.dispose();
      renderer.dispose();
    },
  };
  handle.resize(size);
  return handle;
};

export default createTerrain;
