"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useCallback, useEffect, useRef, useState, type FocusEvent } from "react";
import { LogoMark } from "@/components/ui/Logo";
import Button from "@/components/ui/Button";
import TextRoll from "@/components/motion/TextRoll";
import ScrollProgress from "@/components/motion/ScrollProgress";
import MobileMenu from "@/components/layout/MobileMenu";
import useSheetTone from "@/lib/useSheetTone";
import { ease } from "@/lib/motion";
import { cta, navV3, site } from "@/content/site";
import { pillars } from "@/content/services";

/**
 * v3 header (brief §9.1, decision log #6).
 *
 * Desktop: a floating nav pill with the mark, the four service pillars and
 * Packages · Industries · About, plus a separate CTA. Hovering (150ms intent)
 * or focusing a pillar opens a horizontal strip of its sub-services under the
 * bar. The whole header hides on scroll down after 160px and returns on
 * scroll up, and flips to night styling over night sheets.
 *
 * Below 1024px the pill holds the mark, the wordmark and a menu button that
 * opens the full-screen night menu.
 */
const OPEN_DELAY = 150;
const CLOSE_DELAY = 140;

function ServiceStrip({
  pillar,
  night,
  onNavigate,
}: {
  pillar: (typeof pillars)[number];
  night: boolean;
  onNavigate: () => void;
}) {
  return (
    <motion.div
      id={`strip-${pillar.slug}`}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.25, ease: ease.outExpo }}
      // The pill's backdrop blur makes it the containing block, so the strip
      // is sized to the page container explicitly (84rem minus its padding).
      className={`absolute left-0 top-full w-[calc(min(100vw,84rem)-4rem)] pt-2 xl:w-[calc(min(100vw,84rem)-6rem)] ${
        night ? "text-white" : "text-ink"
      }`}
    >
      <div
        className={`flex flex-wrap items-center gap-x-1 gap-y-1 rounded-[20px] border px-3 py-2.5 shadow-[0_1px_0_rgb(255_255_255/0.6)_inset,0_12px_32px_-12px_rgb(15_23_42/0.25)] backdrop-blur-[14px] ${
          night ? "border-white/10 bg-night-3/85" : "border-line bg-paper/90"
        }`}
      >
        <span className={`type-mono-s mr-2 px-2 ${night ? "text-white/60" : "text-ink-2"}`}>{pillar.name}</span>
        <ul className="contents">
          {pillar.subServices.map((service, index) => (
            <motion.li
              key={service.slug}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.02 * index, duration: 0.3, ease: ease.outExpo }}
            >
              <Link
                href={`/services/${pillar.slug}/${service.slug}`}
                onClick={onNavigate}
                className={`roll-host inline-flex items-center gap-2 rounded-full px-3 py-2 text-[0.875rem] font-medium transition-colors ${
                  night ? "hover:bg-white/[0.08]" : "hover:bg-paper-2"
                }`}
              >
                <span className={`type-mono-s ${night ? "text-white/55" : "text-ink-2"}`}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <TextRoll>{service.name}</TextRoll>
              </Link>
            </motion.li>
          ))}
        </ul>
        <Link
          href={`/services/${pillar.slug}`}
          onClick={onNavigate}
          className="roll-host ml-auto inline-flex items-center gap-2 rounded-full px-3 py-2 text-[0.875rem] font-medium text-signal night:text-white"
        >
          <TextRoll>{`${navV3.allServices}: ${pillar.name}`}</TextRoll>
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </motion.div>
  );
}

export default function Header() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const tone = useSheetTone();
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const openTimer = useRef<number | undefined>(undefined);
  const closeTimer = useRef<number | undefined>(undefined);
  const night = tone === "night" || menuOpen;

  useMotionValueEvent(scrollY, "change", (y) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (y > 160 && y > previous + 2) setHidden(true);
    else if (y < previous - 2 || y <= 160) setHidden(false);
  });

  const closeAll = useCallback(() => {
    window.clearTimeout(openTimer.current);
    window.clearTimeout(closeTimer.current);
    setOpen(null);
  }, []);

  useEffect(() => {
    closeAll();
    setMenuOpen(false);
  }, [pathname, closeAll]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeAll();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeAll]);

  useEffect(() => () => {
    window.clearTimeout(openTimer.current);
    window.clearTimeout(closeTimer.current);
  }, []);

  const intentOpen = (slug: string) => {
    window.clearTimeout(closeTimer.current);
    window.clearTimeout(openTimer.current);
    openTimer.current = window.setTimeout(() => setOpen(slug), open ? 0 : OPEN_DELAY);
  };
  const intentClose = () => {
    window.clearTimeout(openTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(null), CLOSE_DELAY);
  };
  const onItemBlur = (event: FocusEvent<HTMLLIElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) intentClose();
  };

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const linkClass = `roll-host relative inline-flex h-9 items-center rounded-full px-2.5 text-[0.875rem] font-medium xl:px-3.5`;
  const dot = (active: boolean) =>
    active ? (
      <span aria-hidden="true" className="absolute bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-signal night:bg-white" />
    ) : null;

  return (
    <header className="fixed inset-x-0 top-0 z-50" data-tone={night ? "night" : "paper"}>
      <ScrollProgress />
      <motion.div
        className="container-page relative z-50 mt-3 lg:mt-5"
        animate={{ y: hidden && !open && !menuOpen ? "-190%" : "0%" }}
        transition={{ duration: 0.3, ease: ease.inOutQuart }}
      >
        <div className="flex items-center justify-between gap-3">
          <nav
            aria-label={navV3.primaryLabel}
            className={`flex h-[52px] flex-1 items-center justify-between rounded-full border pl-2 pr-1.5 shadow-[0_1px_0_rgb(255_255_255/0.5)_inset,0_12px_32px_-12px_rgb(15_23_42/0.25)] backdrop-blur-[14px] transition-colors duration-300 lg:flex-none lg:justify-start lg:pr-2 ${
              night ? "border-white/10 bg-night-3/70 text-white" : "border-line bg-paper/75 text-ink"
            }`}
          >
            <Link href="/" aria-label={site.name} className="flex shrink-0 items-center gap-2 rounded-full pr-2">
              <LogoMark className="h-7 w-7" priority />
              <span className="font-display text-base font-semibold tracking-[-0.02em] lg:hidden xl:inline">
                {site.name}
              </span>
            </Link>
            <span aria-hidden="true" className="mx-2 hidden h-5 w-px bg-current opacity-15 lg:block" />
            <ul className="hidden items-center lg:flex">
              {pillars.map((pillar) => {
                const href = `/services/${pillar.slug}`;
                const expanded = open === pillar.slug;
                return (
                  <li
                    key={pillar.slug}
                    onPointerEnter={(event) => event.pointerType === "mouse" && intentOpen(pillar.slug)}
                    onPointerLeave={(event) => event.pointerType === "mouse" && intentClose()}
                    onBlur={onItemBlur}
                  >
                    <Link
                      href={href}
                      aria-expanded={expanded}
                      aria-controls={`strip-${pillar.slug}`}
                      onFocus={() => {
                        window.clearTimeout(closeTimer.current);
                        setOpen(pillar.slug);
                      }}
                      className={linkClass}
                    >
                      <TextRoll>{pillar.name}</TextRoll>
                      {dot(isActive(href))}
                    </Link>
                    <AnimatePresence>
                      {expanded && (
                        <ServiceStrip pillar={pillar} night={night} onNavigate={closeAll} />
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
              <li aria-hidden="true" className="mx-1.5 h-5 w-px bg-current opacity-15" />
              {navV3.links.map((link) => (
                <li key={link.href} onPointerEnter={intentClose}>
                  <Link href={link.href} className={linkClass}>
                    <TextRoll>{link.label}</TextRoll>
                    {dot(isActive(link.href))}
                  </Link>
                </li>
              ))}
            </ul>
            <button
              type="button"
              className={`grid h-10 w-10 place-items-center rounded-[var(--radius-sm)] lg:hidden ${
                night ? "bg-white text-ink" : "bg-ink text-white"
              }`}
              aria-label={menuOpen ? navV3.menuClose : navV3.menuOpen}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((value) => !value)}
              data-menu-trigger=""
            >
              <span aria-hidden="true" className="relative block h-3 w-4">
                <span
                  className={`absolute left-0 block h-[1.5px] w-4 bg-current transition-transform duration-300 ${
                    menuOpen ? "top-[5px] rotate-45" : "top-0.5"
                  }`}
                />
                <span
                  className={`absolute left-0 block h-[1.5px] w-4 bg-current transition-transform duration-300 ${
                    menuOpen ? "top-[5px] -rotate-45" : "top-[9px]"
                  }`}
                />
              </span>
            </button>
          </nav>
          <div className="hidden lg:block">
            <Button href={cta.primary.href} tone={night ? "night" : "paper"}>
              {cta.primary.short}
            </Button>
          </div>
        </div>
      </motion.div>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
