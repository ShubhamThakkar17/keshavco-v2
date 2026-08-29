"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { industries } from "@/content/industries";
import { industryImages } from "@/content/images";
import useReducedMotionSafe from "@/lib/useReducedMotionSafe";
import { Eyebrow } from "@/components/ui/Section";
import Reveal from "@/components/motion/Reveal";
import SplitText from "@/components/motion/SplitText";

/**
 * The pinned horizontal rail: the section holds still while seven industry
 * cards travel sideways. Under reduced motion it degrades to an ordinary
 * horizontally-scrollable row the visitor drives themselves.
 */
export default function IndustryRail() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-72%"]);

  const cards = industries.map((industry) => ({
    ...industry,
    image: industryImages[industry.slug],
  }));

  if (reduceMotion) {
    return (
      <section className="bg-navy-950 py-24 text-white">
        <div className="container-page">
          <Header />
        </div>
        <div className="mt-12 flex gap-5 overflow-x-auto px-5 pb-6 sm:px-8">
          {cards.map((card) => (
            <Card key={card.slug} card={card} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative h-[300vh] bg-navy-950">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden py-16">
        <div className="container-page">
          <Header />
        </div>

        <motion.div
          className="mt-12 flex gap-5 pl-[max(1.25rem,calc((100vw-84rem)/2+3rem))]"
          style={{ x }}
        >
          {cards.map((card) => (
            <Card key={card.slug} card={card} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Header() {
  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <Reveal duration={0.5}>
          <Eyebrow tone="light">Industries</Eyebrow>
        </Reveal>
        <h2 className="font-display mt-5 max-w-2xl text-balance text-3xl font-bold leading-[1.08] tracking-tight text-white sm:text-4xl lg:text-5xl">
          <SplitText text="Growth looks different in every industry" />
        </h2>
      </div>
      <Reveal delay={0.15}>
        <Link
          href="/industries"
          className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-white"
        >
          All seven industries
          <span
            aria-hidden="true"
            className="text-green-brand transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </Link>
      </Reveal>
    </div>
  );
}

function Card({
  card,
}: {
  card: { slug: string; name: string; tagline: string; image: { src: string; width: number; height: number; alt: string } };
}) {
  return (
    <Link
      href={`/industries#${card.slug}`}
      className="group relative block h-[24rem] w-[19rem] shrink-0 overflow-hidden rounded-3xl sm:h-[26rem] sm:w-[22rem]"
    >
      <Image
        src={card.image.src}
        alt={card.image.alt}
        width={card.image.width}
        height={card.image.height}
        sizes="22rem"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/45 to-transparent"
      />
      <span className="relative z-10 flex h-full flex-col justify-end p-7">
        <span className="font-display text-xl font-bold tracking-tight text-white sm:text-2xl">
          {card.name}
        </span>
        {/* One clause of the growth problem — the page carries the rest. */}
        <span className="mt-2 line-clamp-2 text-[0.85rem] leading-snug text-white/65">
          {card.tagline}
        </span>
        <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/50 transition-colors group-hover:text-white">
          See how we help
          <span aria-hidden="true" className="text-green-brand">
            →
          </span>
        </span>
      </span>
    </Link>
  );
}
