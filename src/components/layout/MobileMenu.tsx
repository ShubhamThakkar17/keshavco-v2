"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import GridGuides from "@/components/ui/GridGuides";
import Button from "@/components/ui/Button";
import { lockScroll, unlockScroll } from "@/lib/lenis";
import { ease } from "@/lib/motion";
import { cta, navV3, site } from "@/content/site";
import { pillars } from "@/content/services";

/**
 * Mobile menu (brief §9.1): a full-screen night sheet revealed top-down with
 * a clip-path, the blueprint guides, large numbered links, and the CTA with
 * contact details at the bottom. Scroll is locked (Lenis stopped) while open;
 * focus is trapped inside; Escape or the × closes it and focus returns to the
 * menu button.
 */
export default function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const links = [
    ...pillars.map((pillar) => ({ label: pillar.name, href: `/services/${pillar.slug}` })),
    ...navV3.links,
  ];

  useEffect(() => {
    if (!open) return;
    lockScroll();
    const trigger = document.querySelector<HTMLElement>("[data-menu-trigger]");
    const panel = panelRef.current;
    const focusables = () =>
      Array.from(
        (panel?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? []) as NodeListOf<HTMLElement>,
      );
    window.setTimeout(() => focusables()[0]?.focus(), 80);

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      // The menu button lives outside the panel but must stay reachable.
      const items = [...focusables(), ...(trigger ? [trigger] : [])];
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      unlockScroll();
      trigger?.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          ref={panelRef}
          data-tone="night"
          initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
          animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
          exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
          transition={{ duration: 0.5, ease: ease.inOutQuart }}
          className="grain fixed inset-0 z-40 overflow-y-auto bg-night text-white lg:hidden"
          style={{ "--grain-opacity": 0.25 } as React.CSSProperties}
          data-lenis-prevent
        >
          <GridGuides accent={0} />
          <div className="container-page relative z-[1] flex min-h-full flex-col pb-10 pt-28">
            <nav aria-label={navV3.primaryLabel}>
              <ul>
                {links.map((link, index) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + index * 0.06, duration: 0.5, ease: ease.outExpo }}
                    className="border-b border-white/10"
                  >
                    <Link href={link.href} onClick={onClose} className="flex items-baseline gap-4 py-3.5">
                      <span className="type-mono-s text-white/55">{String(index + 1).padStart(2, "0")}</span>
                      <span className="type-display-m">{link.label}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                {navV3.mobileExtras.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} onClick={onClose} className="type-mono text-white/70">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-auto pt-10">
              <Button href={cta.primary.href} tone="night" size="lg" className="w-full">
                {cta.primary.short}
              </Button>
              <p className="type-mono mt-6 flex flex-col gap-2 text-white/70">
                <a href={`mailto:${site.email}`}>{site.email.toUpperCase()}</a>
                <a href={site.phoneHref}>{site.phone}</a>
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
