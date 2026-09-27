"use client";

import { useState } from "react";
import Reveal from "@/components/motion/Reveal";
import { CheckIcon, CompareRowIcon, CrossIcon } from "@/components/graphics/CompareIcons";
import { homeV3 } from "@/content/home";

/**
 * S9 With / Without (brief §9.2): two columns in one card with a centre VS
 * chip. Rows arrive in pairs from either side; hovering a row lights up its
 * pair so the contrast reads straight across. On phones: the With card, the
 * VS chip, then the Without card.
 */
export default function Compare() {
  const { compare } = homeV3;
  const [row, setRow] = useState<number | null>(null);
  const rowClass = (index: number) =>
    `flex min-h-14 items-center gap-3.5 rounded-[10px] px-3 py-2 transition-colors duration-300 ${
      row === index ? "bg-white/[0.06]" : ""
    }`;

  return (
    <div className="relative mx-auto mt-14 max-w-[60rem] rounded-[20px] border border-line-night bg-night-2 p-2">
      <div className="grid gap-2 md:grid-cols-2">
        <div className="relative overflow-hidden rounded-[var(--radius-md)] bg-night-3 p-5 md:p-7">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full opacity-50 blur-[70px]"
            style={{ background: "radial-gradient(closest-side, var(--color-signal), var(--color-signal-2), transparent)" }}
          />
          <h3 className="type-mono relative text-white">{compare.with}</h3>
          <ul className="relative mt-5 space-y-1">
            {compare.rows.map((item, index) => (
              <Reveal key={item.with} as="li" direction="right" delay={index * 0.08} className="block">
                <span className={rowClass(index)} onPointerEnter={() => setRow(index)} onPointerLeave={() => setRow(null)}>
                  <span className="text-white/80">
                    <CompareRowIcon kind={item.icon} />
                  </span>
                  <span className="flex-1 text-[0.9375rem] text-white">{item.with}</span>
                  <span className="text-growth">
                    <CheckIcon />
                  </span>
                </span>
              </Reveal>
            ))}
          </ul>
        </div>

        <span
          aria-hidden="true"
          className="type-mono mx-auto grid h-11 w-11 place-items-center rounded-full bg-white text-ink md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2"
        >
          {compare.vs}
        </span>

        <div className="p-5 md:p-7">
          <h3 className="type-mono text-white/60">{compare.without}</h3>
          <ul className="mt-5 space-y-1">
            {compare.rows.map((item, index) => (
              <Reveal key={item.without} as="li" direction="left" delay={index * 0.08} className="block">
                <span className={rowClass(index)} onPointerEnter={() => setRow(index)} onPointerLeave={() => setRow(null)}>
                  <span className="text-white/55">
                    <CrossIcon />
                  </span>
                  <span className="flex-1 text-[0.9375rem] text-white/60">{item.without}</span>
                </span>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
