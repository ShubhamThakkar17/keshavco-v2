/**
 * Resolves on the visitor's first interaction (pointer movement, touch,
 * scroll, key press) or after `timeout` ms, whichever comes first. Shared by
 * every caller, so the listeners are added once.
 *
 * Used to start the heavy decorative 3D scenes after the page has settled
 * (brief §12), so three.js never competes with first render or input.
 */
let awake: Promise<void> | null = null;

export function whenAwake(timeout = 8000): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (!awake) {
    awake = new Promise((resolve) => {
      const events = ["pointermove", "pointerdown", "touchstart", "scroll", "keydown", "wheel"] as const;
      let timer = 0;
      const done = () => {
        window.clearTimeout(timer);
        events.forEach((name) => window.removeEventListener(name, done));
        resolve();
      };
      events.forEach((name) => window.addEventListener(name, done, { once: true, passive: true }));
      timer = window.setTimeout(done, timeout);
    });
  }
  return awake;
}
