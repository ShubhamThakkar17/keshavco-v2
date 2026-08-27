import type { ReactNode } from "react";
import Reveal from "@/components/motion/Reveal";
import SplitText from "@/components/motion/SplitText";

export function Eyebrow({
  children,
  tone = "dark",
  className = "",
}: {
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.2em] ${
        tone === "light" ? "text-white/60" : "text-navy-400"
      } ${className}`}
    >
      <span
        aria-hidden="true"
        className="bg-gradient-brand inline-block h-[3px] w-6 rounded-full"
      />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  accent,
  body,
  tone = "dark",
  align = "left",
  className = "",
  children,
}: {
  eyebrow?: string;
  title: string;
  /** Rendered after the title in the brand gradient. */
  accent?: string;
  body?: string | string[];
  tone?: "dark" | "light";
  align?: "left" | "center";
  className?: string;
  children?: ReactNode;
}) {
  const paragraphs = Array.isArray(body) ? body : body ? [body] : [];

  return (
    <div
      className={`${align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"} ${className}`}
    >
      {eyebrow && (
        <Reveal duration={0.55}>
          <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
        </Reveal>
      )}
      <h2
        className={`mt-5 text-balance text-3xl font-bold leading-[1.08] sm:text-4xl lg:text-[2.9rem] ${
          tone === "light" ? "text-white" : "text-navy-900"
        }`}
      >
        <SplitText text={title} as="span" className="block" />
        {accent && (
          <SplitText text={accent} as="span" className="text-gradient-brand block" delay={0.1} />
        )}
      </h2>
      {paragraphs.map((paragraph, index) => (
        <Reveal key={index} delay={0.08 + index * 0.06}>
          <p
            className={`mt-5 text-pretty text-base leading-relaxed sm:text-[1.06rem] ${
              tone === "light" ? "text-white/70" : "text-navy-500"
            }`}
          >
            {paragraph}
          </p>
        </Reveal>
      ))}
      {children}
    </div>
  );
}

export function Section({
  children,
  className = "",
  id,
  tone = "light",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "light" | "soft" | "dark";
}) {
  const tones = {
    light: "bg-white text-navy-900",
    soft: "bg-navy-50 text-navy-900",
    dark: "bg-navy-950 text-white",
  } as const;

  return (
    <section id={id} className={`relative ${tones[tone]} ${className}`}>
      {children}
    </section>
  );
}
