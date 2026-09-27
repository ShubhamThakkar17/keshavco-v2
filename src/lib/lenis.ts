import type Lenis from "lenis";

/**
 * The page's Lenis instance, when smooth scrolling is on. Menus and overlays
 * use `lockScroll` / `unlockScroll` rather than touching Lenis directly, so the
 * lock also works when Lenis is off (reduced motion) and the page scrolls
 * natively.
 */
let instance: Lenis | null = null;

export function setLenis(lenis: Lenis | null) {
  instance = lenis;
}

export function getLenis(): Lenis | null {
  return instance;
}

export function lockScroll() {
  instance?.stop();
  document.documentElement.style.overflow = "hidden";
}

export function unlockScroll() {
  document.documentElement.style.overflow = "";
  instance?.start();
}
