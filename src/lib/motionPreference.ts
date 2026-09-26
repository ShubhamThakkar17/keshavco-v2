/**
 * The site-level motion switch (footer "Motion: On / Off").
 *
 * The choice lives on `<html data-motion="off">` so CSS and every component
 * see it at once, and in localStorage so it survives a reload. The layout's
 * boot script restores it before first paint. Storage can be unavailable
 * (private mode, blocked site data), so every access is guarded.
 */
export const MOTION_STORAGE_KEY = "kc-motion";

export function isMotionOff(): boolean {
  if (typeof document === "undefined") return false;
  return document.documentElement.getAttribute("data-motion") === "off";
}

export function setMotionOff(off: boolean): void {
  const root = document.documentElement;
  if (off) root.setAttribute("data-motion", "off");
  else root.removeAttribute("data-motion");
  try {
    if (off) localStorage.setItem(MOTION_STORAGE_KEY, "off");
    else localStorage.removeItem(MOTION_STORAGE_KEY);
  } catch {
    // The attribute still applies for this page view.
  }
}
