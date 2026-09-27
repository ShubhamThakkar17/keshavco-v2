"use client";

import type { MotionValue } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import useReducedMotionSafe from "@/lib/useReducedMotionSafe";
import type { SceneFactory, SceneHandle } from "./types";

/**
 * Host for every WebGL scene. It owns the lifecycle the brief asks of ambient
 * motion (§6.4, §12) so each scene only has to draw:
 *
 * - **Lazy**: the scene module (and three.js with it) is imported only when
 *   the canvas is near the viewport and the browser is idle, so it never adds
 *   to first-load JS or competes with the LCP.
 * - **Cheap**: device pixel ratio capped at 1.5; frames throttled to `fps`;
 *   the loop runs only while on screen and while the tab is visible.
 * - **Calm**: with reduced motion (OS or site toggle) it draws one static
 *   frame at `staticTime` and stops; scroll-driven scenes show their end state.
 * - **Safe**: if WebGL is unavailable the `fallback` renders instead.
 *
 * The container reserves its own size (via `className`), so nothing shifts
 * when the canvas arrives; the canvas then fades in.
 */
export default function GLCanvas<Options>({
  load,
  options,
  className = "",
  fallback = null,
  progress,
  interactive = false,
  fps = 30,
  staticTime = 4000,
}: {
  load: () => Promise<{ default: SceneFactory<Options> }>;
  options: Options;
  className?: string;
  fallback?: ReactNode;
  /** Drive the scene from a motion value (e.g. scroll progress). */
  progress?: MotionValue<number>;
  /** Forward pointer movement (fine pointers only). */
  interactive?: boolean;
  fps?: number;
  /** Time used for the single frame drawn under reduced motion. */
  staticTime?: number;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotionSafe();
  const [near, setNear] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  // Options are treated as fixed for the life of the scene.
  const optionsRef = useRef(options);
  const loadRef = useRef(load);

  useEffect(() => {
    const node = wrapRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!near) return;
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    let handle: SceneHandle | null = null;
    let cancelled = false;
    let frame = 0;
    let visible = true;
    let last = 0;
    let start = 0;
    let dirty = true;
    const interval = 1000 / fps;
    const cleanups: (() => void)[] = [];

    const measure = () => ({
      width: wrap.clientWidth,
      height: wrap.clientHeight,
      dpr: Math.min(window.devicePixelRatio || 1, 1.5),
    });

    const loop = (now: number) => {
      frame = 0;
      if (!handle || cancelled) return;
      if (!start) start = now;
      if (reduceMotion) {
        if (dirty) handle.render(staticTime);
        dirty = false;
        return;
      }
      if (now - last >= interval || dirty) {
        last = now;
        dirty = false;
        handle.render(now - start);
      }
      if (visible && !document.hidden) frame = requestAnimationFrame(loop);
    };
    const kick = () => {
      if (!frame && !cancelled) frame = requestAnimationFrame(loop);
    };

    const boot = async () => {
      try {
        const mod = await loadRef.current();
        if (cancelled) return;
        handle = await mod.default(canvas, measure(), optionsRef.current);
        if (cancelled) {
          handle.dispose();
          return;
        }
      } catch (error) {
        console.warn("[GLCanvas] WebGL scene unavailable, showing fallback.", error);
        if (!cancelled) setFailed(true);
        return;
      }

      handle.setProgress?.(reduceMotion ? 1 : (progress?.get() ?? 0));
      setReady(true);
      kick();

      const resize = new ResizeObserver(() => {
        handle?.resize(measure());
        dirty = true;
        kick();
      });
      resize.observe(wrap);
      cleanups.push(() => resize.disconnect());

      const io = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (visible) kick();
      });
      io.observe(wrap);
      cleanups.push(() => io.disconnect());

      const onVisibility = () => {
        if (!document.hidden) kick();
      };
      document.addEventListener("visibilitychange", onVisibility);
      cleanups.push(() => document.removeEventListener("visibilitychange", onVisibility));

      if (progress && !reduceMotion) {
        const unsubscribe = progress.on("change", (value) => {
          handle?.setProgress?.(value);
          dirty = true;
          kick();
        });
        cleanups.push(unsubscribe);
      }

      if (interactive && !reduceMotion && window.matchMedia("(pointer: fine)").matches) {
        const onMove = (event: PointerEvent) => {
          const rect = wrap.getBoundingClientRect();
          handle?.setPointer?.({ x: event.clientX - rect.left, y: event.clientY - rect.top });
        };
        const onLeave = () => handle?.setPointer?.(null);
        wrap.addEventListener("pointermove", onMove);
        wrap.addEventListener("pointerleave", onLeave);
        cleanups.push(() => {
          wrap.removeEventListener("pointermove", onMove);
          wrap.removeEventListener("pointerleave", onLeave);
        });
      }
    };

    // Wait for an idle moment so the scene never competes with first paint.
    const idle =
      typeof window.requestIdleCallback === "function"
        ? window.requestIdleCallback(() => void boot(), { timeout: 1500 })
        : window.setTimeout(() => void boot(), 300);

    return () => {
      cancelled = true;
      if (typeof window.cancelIdleCallback === "function") window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
      cancelAnimationFrame(frame);
      cleanups.forEach((fn) => fn());
      handle?.dispose();
      setReady(false);
    };
  }, [near, reduceMotion, fps, interactive, progress, staticTime]);

  return (
    <div ref={wrapRef} aria-hidden="true" className={`relative ${className}`}>
      {failed ? (
        fallback
      ) : (
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 h-full w-full transition-opacity duration-[800ms] ease-[var(--ease-out-expo)] ${
            ready ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </div>
  );
}
