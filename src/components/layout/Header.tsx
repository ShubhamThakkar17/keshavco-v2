"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { nav, cta } from "@/content/site";
import { pillars } from "@/content/services";
import Logo from "@/components/ui/Logo";
import Button from "@/components/ui/Button";
import ScrollProgress from "@/components/motion/ScrollProgress";

export default function Header() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [condensed, setCondensed] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<number | undefined>(undefined);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setCondensed(latest > 24);
  });

  // Route change closes everything.
  useEffect(() => {
    setMegaOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  // The mobile sheet owns the viewport while it is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMegaOpen(false);
      setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const openMega = () => {
    window.clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };
  const scheduleCloseMega = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setMegaOpen(false), 140);
  };

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // Every page opens on a dark hero, so the transparent header runs light and
  // flips to dark once it has a white background under it.
  const linkClass = (active: boolean) => {
    if (condensed) return active ? "text-navy-900" : "text-navy-500 hover:text-navy-900";
    return active ? "text-white" : "text-white/65 hover:text-white";
  };

  return (
    <header
      className="fixed inset-x-0 top-0 z-50"
      onMouseLeave={scheduleCloseMega}
    >
      <motion.div
        className="relative border-b transition-colors duration-500"
        animate={{
          backgroundColor: condensed ? "rgba(255,255,255,0.82)" : "rgba(255,255,255,0)",
          borderColor: condensed ? "rgba(15,23,42,0.08)" : "rgba(15,23,42,0)",
          backdropFilter: condensed ? "blur(14px)" : "blur(0px)",
        }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <div className="container-page">
          <motion.div
            className="flex items-center justify-between"
            animate={{ height: condensed ? 66 : 84 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <Logo tone={condensed ? "dark" : "light"} />

            <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
              {nav.map((item) =>
                item.hasMegaMenu ? (
                  <div key={item.href} onMouseEnter={openMega}>
                    <Link
                      href={item.href}
                      aria-expanded={megaOpen}
                      className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${linkClass(
                        isActive(item.href),
                      )}`}
                    >
                      {item.label}
                      <span
                        aria-hidden="true"
                        className={`bg-gradient-brand absolute inset-x-4 bottom-0.5 h-px origin-left transition-transform duration-300 ${
                          isActive(item.href) ? "scale-x-100" : "scale-x-0"
                        }`}
                      />
                    </Link>
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    onMouseEnter={scheduleCloseMega}
                    className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${linkClass(
                      isActive(item.href),
                    )}`}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={`bg-gradient-brand absolute inset-x-4 bottom-0.5 h-px origin-left transition-transform duration-300 ${
                        isActive(item.href) ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </Link>
                ),
              )}
            </nav>

            <div className="hidden lg:block">
              <Button
                href={cta.primary.href}
                size="md"
                variant={condensed ? "primary" : "light"}
                withArrow
              >
                {cta.primary.label}
              </Button>
            </div>

            <button
              type="button"
              className="relative z-50 flex h-11 w-11 items-center justify-center lg:hidden"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              <span className="relative block h-4 w-6">
                <motion.span
                  className={`absolute left-0 block h-0.5 w-6 rounded transition-colors ${
                    condensed && !mobileOpen ? "bg-navy-900" : "bg-white"
                  }`}
                  animate={mobileOpen ? { top: 7, rotate: 45 } : { top: 0, rotate: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                />
                <motion.span
                  className={`absolute left-0 block h-0.5 w-6 rounded transition-colors ${
                    condensed && !mobileOpen ? "bg-navy-900" : "bg-white"
                  }`}
                  animate={mobileOpen ? { top: 7, rotate: -45 } : { top: 14, rotate: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                />
              </span>
            </button>
          </motion.div>
        </div>

        <ScrollProgress />
      </motion.div>

      {/* Services mega-menu */}
      <AnimatePresence>
        {megaOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-x-0 top-full hidden border-b border-navy-900/8 bg-white/95 backdrop-blur-xl lg:block"
            onMouseEnter={openMega}
          >
            <div className="container-page grid grid-cols-4 gap-8 py-10">
              {pillars.map((pillar, index) => (
                <motion.div
                  key={pillar.slug}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 * index, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={`/services/${pillar.slug}`}
                    className="group font-display inline-flex items-center gap-2 text-[0.95rem] font-semibold text-navy-900"
                  >
                    {pillar.name}
                    <span
                      aria-hidden="true"
                      className="text-indigo-brand opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
                    >
                      →
                    </span>
                  </Link>
                  <ul className="mt-4 space-y-2">
                    {pillar.subServices.map((service) => (
                      <li key={service.slug}>
                        <Link
                          href={`/services/${pillar.slug}/${service.slug}`}
                          className="block text-[0.82rem] text-navy-500 transition-colors hover:text-indigo-brand"
                        >
                          {service.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
            <div className="border-t border-navy-900/8 bg-navy-50/70">
              <div className="container-page flex items-center justify-between py-4">
                <p className="text-xs text-navy-500">
                  Not sure which you need? Start with the problem, not the service.
                </p>
                <Link
                  href="/services"
                  className="text-xs font-semibold text-navy-900 transition-colors hover:text-indigo-brand"
                >
                  View all services →
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile sheet */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 overflow-y-auto bg-navy-950 lg:hidden"
          >
            <div className="container-page flex min-h-full flex-col pb-12 pt-28">
              <nav aria-label="Mobile">
                <ul className="space-y-1">
                  {nav.map((item, index) => (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.06 + index * 0.05,
                        duration: 0.45,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <Link
                        href={item.href}
                        className="font-display block border-b border-white/10 py-4 text-2xl font-semibold text-white"
                      >
                        {item.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.34, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="mt-8"
              >
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white/40">
                  Capabilities
                </p>
                <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2">
                  {pillars.map((pillar) => (
                    <Link
                      key={pillar.slug}
                      href={`/services/${pillar.slug}`}
                      className="py-1 text-sm text-white/70"
                    >
                      {pillar.name}
                    </Link>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="mt-auto pt-10"
              >
                <Button href={cta.primary.href} variant="light" size="lg" withArrow className="w-full">
                  {cta.primary.label}
                </Button>
                <p className="mt-6 text-sm italic text-white/45">
                  One partner. Strategy to execution.
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
