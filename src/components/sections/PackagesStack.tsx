"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { growthPackages, type GrowthPackage } from "@/content/packages";
import { cta } from "@/content/site";
import Button from "@/components/ui/Button";
import useReducedMotionSafe from "@/lib/useReducedMotionSafe";

/**
 * The four engagements as a stack of sticky cards: each one pins under the
 * header, then the next slides over it and scales the one below down slightly,
 * so the section reads like a deck being dealt.
 */
export default function PackagesStack({ detailed = false }: { detailed?: boolean }) {
  return (
    <div className="relative">
      {growthPackages.map((pack, index) => (
        <PackageCard
          key={pack.slug}
          pack={pack}
          index={index}
          total={growthPackages.length}
          detailed={detailed}
        />
      ))}
    </div>
  );
}

function PackageCard({
  pack,
  index,
  total,
  detailed,
}: {
  pack: GrowthPackage;
  index: number;
  total: number;
  detailed: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 12%", "end 42%"],
  });
  // Cards further down the stack shrink as the next one covers them.
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduceMotion ? 1 : 0.93]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, reduceMotion ? 1 : 0.45]);

  const accents = [
    "from-indigo-brand to-purple-brand",
    "from-purple-brand to-indigo-brand",
    "from-indigo-brand to-green-brand",
    "from-green-brand to-indigo-brand",
  ];

  return (
    <div
      ref={ref}
      className="sticky"
      style={{ top: `calc(var(--header-h) + ${index * 18}px)` }}
    >
      <motion.article
        style={{ scale, opacity }}
        className="mb-6 origin-top overflow-hidden rounded-3xl border border-navy-900/10 bg-white shadow-[0_24px_70px_-40px_rgb(15_23_42/0.45)]"
      >
        <div className={`h-1 w-full bg-gradient-to-r ${accents[index % accents.length]}`} />
        <div className="grid gap-8 p-8 sm:p-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:p-12">
          <div>
            <div className="flex items-center gap-4">
              <span className="font-display text-xs font-semibold tabular-nums text-navy-300">
                {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
              <span className="h-px flex-1 bg-navy-900/10" />
            </div>
            <h3 className="font-display mt-6 text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">
              {pack.name}
            </h3>
            <p className="mt-3 text-sm italic text-navy-400">{pack.audience}</p>

            {detailed ? (
              <div className="mt-7 space-y-5">
                <div>
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-navy-400">
                    The situation
                  </p>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-navy-600">
                    {pack.situation}
                  </p>
                </div>
                <div>
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-navy-400">
                    What we do
                  </p>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-navy-600">
                    {pack.whatWeDo}
                  </p>
                </div>
              </div>
            ) : (
              <p className="mt-7 text-[0.98rem] leading-relaxed text-navy-500">{pack.summary}</p>
            )}
          </div>

          <div className="flex flex-col rounded-2xl bg-navy-50 p-7">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-navy-400">
              Includes
            </p>
            <ul className="mt-4 space-y-3">
              {pack.includes.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-navy-700">
                  <span
                    aria-hidden="true"
                    className="bg-gradient-brand mt-[0.5rem] h-1.5 w-1.5 shrink-0 rounded-full"
                  />
                  {item}
                </li>
              ))}
            </ul>

            {detailed && (
              <p className="mt-6 border-t border-navy-900/10 pt-5 text-[0.85rem] leading-relaxed text-navy-500">
                <span className="font-semibold text-navy-700">
                  You should consider {pack.name} if:
                </span>{" "}
                {pack.considerIf}
              </p>
            )}

            <div className="mt-auto pt-7">
              <Button href={cta.tertiary.href} size="md" withArrow className="w-full sm:w-auto">
                {cta.tertiary.label}
              </Button>
            </div>
          </div>
        </div>
      </motion.article>
    </div>
  );
}
