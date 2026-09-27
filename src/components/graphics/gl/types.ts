/**
 * Contract between `GLCanvas` (the React host) and a WebGL scene module.
 * Scenes are plain modules that import three.js; the host loads them with a
 * dynamic `import()` after first paint, so three.js never reaches first-load JS.
 */
export type SceneSize = {
  /** CSS pixels. */
  width: number;
  height: number;
  /** Device pixel ratio, already capped. */
  dpr: number;
};

export type SceneHandle = {
  resize(size: SceneSize): void;
  /** Draw one frame. `time` is milliseconds since the scene started. */
  render(time: number): void;
  /** Pointer in CSS pixels relative to the canvas, or null when it leaves. */
  setPointer?(point: { x: number; y: number } | null): void;
  /** Scroll or story progress, 0–1. */
  setProgress?(progress: number): void;
  dispose(): void;
};

export type SceneFactory<Options> = (
  canvas: HTMLCanvasElement,
  size: SceneSize,
  options: Options,
) => SceneHandle | Promise<SceneHandle>;
