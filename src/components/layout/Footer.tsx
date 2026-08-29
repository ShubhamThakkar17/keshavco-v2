"use client";

import Link from "next/link";
import { site, footer, footerColumns, cta, newsletter } from "@/content/site";
import Button from "@/components/ui/Button";
import Reveal from "@/components/motion/Reveal";
import RotatingWords from "@/components/motion/RotatingWords";
import { Eyebrow } from "@/components/ui/Section";
import { LogoMark } from "@/components/ui/Logo";
import { brand } from "@/content/brand";
import { useState } from "react";

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer className="grain relative overflow-hidden bg-navy-950 text-white">
      {/* Aurora wash behind the CTA */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[36rem] w-[72rem] -translate-x-1/2 rounded-full opacity-25 blur-[120px]"
        style={{
          background:
            "radial-gradient(closest-side, #4F46E5 0%, #7C3AED 45%, transparent 100%)",
        }}
      />

      <div className="container-page relative z-10 pb-14 pt-24 sm:pt-28">
        <Reveal>
          <Eyebrow tone="light">{footer.eyebrow}</Eyebrow>
        </Reveal>
        <h2 className="font-display mt-6 max-w-4xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
          {footer.headingPrefix}{" "}
          <RotatingWords words={footer.rotatingWords} interval={3000} />
        </h2>
        <Reveal delay={0.1}>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Button href={cta.primary.href} variant="light" size="lg" withArrow>
              {cta.primary.label}
            </Button>
            <a
              href={`mailto:${site.email}`}
              className="text-sm text-white/60 underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              {site.email}
            </a>
          </div>
        </Reveal>

        <div className="mt-20 grid gap-12 border-t border-white/10 pt-14 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-3">
              <LogoMark className="h-10 w-10" tone="light" />
              <span className="flex flex-col leading-none">
                <span className="font-display text-lg font-extrabold tracking-tight">Keshav</span>
                <span className="mt-1 text-[0.72rem] font-medium tracking-[0.16em] text-white/55">
                  CONSULTANCY
                </span>
              </span>
            </div>
            <p className="mt-4 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-white/35">
              {brand.tagline}
            </p>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/55">
              {site.description}
            </p>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white/40">
                {column.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-1.5 text-sm text-white/65 transition-colors hover:text-white"
                    >
                      <span
                        aria-hidden="true"
                        className="bg-gradient-brand h-px w-0 transition-all duration-300 group-hover:w-3"
                      />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white/40">
              Get in touch
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-white/65">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="transition-colors hover:text-white"
                >
                  {site.email}
                </a>
              </li>
              <li>
                <a href={site.phoneHref} className="transition-colors hover:text-white">
                  {site.phone}
                </a>
              </li>
            </ul>

            <div className="mt-8">
              <p className="font-display text-sm font-semibold">{newsletter.heading}</p>
              <p className="mt-2 text-xs leading-relaxed text-white/45">{newsletter.body}</p>
              <form
                className="mt-4 flex gap-2"
                onSubmit={(event) => {
                  event.preventDefault();
                  setSubscribed(true);
                }}
              >
                <label htmlFor="newsletter-email" className="sr-only">
                  {newsletter.placeholder}
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  placeholder={newsletter.placeholder}
                  className="h-11 min-w-0 flex-1 rounded-full border border-white/15 bg-white/5 px-4 text-sm text-white placeholder:text-white/35 focus:border-white/40 focus:outline-none"
                />
                <button
                  type="submit"
                  className="h-11 shrink-0 rounded-full bg-white px-4 text-sm font-medium text-navy-900 transition-opacity hover:opacity-90"
                >
                  {newsletter.button}
                </button>
              </form>
              <p
                role="status"
                className={`mt-2 text-xs text-green-brand transition-opacity ${subscribed ? "opacity-100" : "opacity-0"}`}
              >
                {newsletter.success}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-5 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/40">{footer.legalLine}</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {footer.legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-white/40 transition-colors hover:text-white/80"
              >
                {link.label}
              </Link>
            ))}
            {site.social.map((profile) => (
              <a
                key={profile.label}
                href={profile.href}
                className="text-xs text-white/40 transition-colors hover:text-white/80"
              >
                {profile.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Oversized wordmark, clipped by the viewport edge. */}
      <div
        aria-hidden="true"
        className="pointer-events-none relative z-0 select-none overflow-hidden"
      >
        <p className="font-display -mb-[0.22em] translate-y-[0.1em] text-center text-[19vw] font-extrabold leading-none tracking-tighter text-white/[0.045]">
          KeshavCo
        </p>
      </div>
    </footer>
  );
}
