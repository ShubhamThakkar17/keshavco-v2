import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  PerspectiveCamera,
  Points,
  Scene,
  ShaderMaterial,
  Vector2,
  WebGLRenderer,
} from "three";
import { brandRamp, roundPointFragment, simplexNoise3D } from "../glsl";
import type { SceneFactory } from "../types";

export type WordmarkOptions = {
  text: string;
  /** CSS font-family list; empty uses the page's Sora (next/font variable). */
  fontFamily?: string;
};

/**
 * DotWordmark (brief §6.4): the word drawn in Sora 700 on an offscreen canvas,
 * sampled on a 6px grid (4px on phones), one dot per filled cell, coloured
 * across the brand gradient. The dots sit in real 3D: a slow noise ripple
 * moves them in depth, the whole word tilts towards the pointer, and dots
 * within 80px of the cursor are pushed aside.
 *
 * World units equal CSS pixels at the z = 0 plane, so the sampling grid maps
 * straight onto the screen.
 */
const vertex = /* glsl */ `
${simplexNoise3D}
${brandRamp}
uniform float uTime;
uniform float uDpr;
uniform float uDot;
uniform float uWidth;
uniform vec2 uPointer;
uniform float uPointerOn;
varying vec3 vColor;
varying float vAlpha;

void main() {
  vec3 p = position;
  float time = uTime * 0.00018;
  float n = snoise(vec3(p.x * 0.006, p.y * 0.012, time));
  p.z += n * 12.0;

  vec2 delta = p.xy - uPointer;
  float d = length(delta);
  float push = uPointerOn * smoothstep(80.0, 0.0, d);
  p.xy += normalize(delta + 0.0001) * push * 22.0;
  p.z += push * 30.0;

  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = uDot * uDpr * (1.0 + n * 0.18);

  vColor = brandRamp(clamp(position.x / uWidth + 0.5, 0.0, 1.0));
  vAlpha = 0.72 + n * 0.2;
}
`;

async function sample(text: string, fontFamily: string | undefined, width: number, height: number, step: number) {
  // A container with no size yet (hidden, or not laid out) has nothing to
  // sample; the ResizeObserver rebuilds once it has a size.
  if (width < 1 || height < 1) return new Float32Array(0);
  const family =
    fontFamily ||
    getComputedStyle(document.documentElement).getPropertyValue("--font-sora").trim() ||
    "Sora, sans-serif";
  try {
    await document.fonts.load(`700 120px ${family}`);
  } catch {
    // Fall back to whatever the family resolves to.
  }
  const probe = document.createElement("canvas").getContext("2d")!;
  probe.font = `700 200px ${family}`;
  const metrics = probe.measureText(text);
  const fontSize = Math.min((200 * width * 0.98) / metrics.width, height * 1.18);

  const canvas = document.createElement("canvas");
  canvas.width = Math.ceil(width);
  canvas.height = Math.ceil(height);
  const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
  ctx.fillStyle = "white"; // mask only, never shown
  ctx.font = `700 ${fontSize}px ${family}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, width / 2, height * 0.54);
  const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

  const positions: number[] = [];
  for (let y = step / 2; y < height; y += step) {
    for (let x = step / 2; x < width; x += step) {
      const alpha = data[(Math.floor(y) * canvas.width + Math.floor(x)) * 4 + 3];
      if (alpha > 128) positions.push(x - width / 2, height / 2 - y, 0);
    }
  }
  return new Float32Array(positions);
}

const createWordmark: SceneFactory<WordmarkOptions> = async (canvas, size, options) => {
  const renderer = new WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: "low-power" });
  renderer.setClearColor(0x000000, 0);
  const scene = new Scene();
  // A narrow lens keeps the depth ripple from swelling the outer letters.
  const fov = 16;
  const camera = new PerspectiveCamera(fov, 1, 1, 5000);

  const uniforms = {
    uTime: { value: 0 },
    uDpr: { value: size.dpr },
    uDot: { value: 3 },
    uWidth: { value: size.width },
    uPointer: { value: new Vector2(99999, 99999) },
    uPointerOn: { value: 0 },
  };
  const material = new ShaderMaterial({
    uniforms,
    vertexShader: vertex,
    fragmentShader: roundPointFragment,
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
  });
  let points: Points | null = null;
  let pointerTarget = 0;
  const tilt = { x: 0, y: 0 };
  const aim = { x: 0, y: 0 };

  const build = async ({ width, height }: { width: number; height: number }) => {
    const step = width >= 768 ? 6 : 4;
    const positions = await sample(options.text, options.fontFamily, width, height, step);
    if (points) {
      scene.remove(points);
      points.geometry.dispose();
    }
    const geometry = new BufferGeometry();
    geometry.setAttribute("position", new BufferAttribute(positions, 3));
    points = new Points(geometry, material);
    points.frustumCulled = false;
    scene.add(points);
    uniforms.uDot.value = step * 0.62;
    uniforms.uWidth.value = width;
  };

  let pending: Promise<void> | null = null;
  const handle = {
    resize({ width, height, dpr }: { width: number; height: number; dpr: number }) {
      renderer.setPixelRatio(dpr);
      renderer.setSize(width, height, false);
      camera.aspect = width / Math.max(height, 1);
      camera.position.set(0, 0, height / 2 / Math.tan((fov * Math.PI) / 360));
      camera.updateProjectionMatrix();
      uniforms.uDpr.value = dpr;
      pending = build({ width, height });
    },
    render(time: number) {
      uniforms.uTime.value = time;
      uniforms.uPointerOn.value += (pointerTarget - uniforms.uPointerOn.value) * 0.1;
      tilt.x += (aim.x - tilt.x) * 0.05;
      tilt.y += (aim.y - tilt.y) * 0.05;
      if (points) {
        points.rotation.x = tilt.x;
        points.rotation.y = tilt.y;
      }
      renderer.render(scene, camera);
    },
    setPointer(point: { x: number; y: number } | null) {
      if (!point) {
        pointerTarget = 0;
        aim.x = 0;
        aim.y = 0;
        return;
      }
      const w = canvas.clientWidth || 1;
      const h = canvas.clientHeight || 1;
      uniforms.uPointer.value.set(point.x - w / 2, h / 2 - point.y);
      pointerTarget = 1;
      aim.y = ((point.x / w) * 2 - 1) * 0.12;
      aim.x = ((point.y / h) * 2 - 1) * 0.1;
    },
    dispose() {
      points?.geometry.dispose();
      material.dispose();
      renderer.dispose();
    },
  };
  handle.resize(size);
  await pending;
  return handle;
};

export default createWordmark;
