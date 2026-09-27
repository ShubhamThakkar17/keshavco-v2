import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { stat } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";
import Brackets from "@/components/ui/Brackets";
import StatTile from "@/components/ui/StatTile";
import { calloutTones } from "@/content/cms";

/**
 * The simpler article blocks and the Markdoc node overrides (images, links).
 * Server components: they render to HTML with no client JavaScript.
 */

export function KeyFigure({ value, label, source }: { value: string; label: string; source: string }) {
  return (
    <figure className="not-prose relative my-10 rounded-[var(--radius-md)] border border-line bg-card">
      <StatTile value={value} label={label} />
      <figcaption className="type-mono-s border-t border-line px-4 py-3 text-ink-2 sm:px-5">{source}</figcaption>
    </figure>
  );
}

const toneClass: Record<string, string> = {
  note: "border-signal",
  takeaway: "border-growth",
  warning: "border-ink",
};

export function Callout({ tone = "note", title, children }: { tone?: string; title?: string; children: ReactNode }) {
  const label = calloutTones.find((option) => option.value === tone)?.label ?? calloutTones[0].label;
  return (
    <aside className={`not-prose my-8 rounded-r-[var(--radius-sm)] border-l-2 bg-paper-2 px-5 py-4 sm:px-6 ${toneClass[tone] ?? toneClass.note}`}>
      <p className="type-mono-s text-ink-2">{label}</p>
      {title && <p className="type-body-l mt-1 font-medium text-ink">{title}</p>}
      <div className="article-callout mt-2">{children}</div>
    </aside>
  );
}

export function PullQuote({ text }: { text: string }) {
  return (
    <figure className="not-prose relative my-12 px-6 py-6 sm:px-10">
      <Brackets />
      <blockquote className="type-display-m text-balance text-ink">{text}</blockquote>
    </figure>
  );
}

/** Images uploaded in the editor live in /public; their size is read at build. */
async function dimensions(src: string) {
  try {
    const file = join(process.cwd(), "public", decodeURI(src));
    await stat(file);
    const meta = await sharp(file).metadata();
    if (meta.width && meta.height) return { width: meta.width, height: meta.height };
  } catch {
    // Remote or missing file: fall back to a 16:10 box.
  }
  return { width: 1600, height: 1000 };
}

export async function ArticleImage({ src, alt = "", title }: { src: string; alt?: string; title?: string }) {
  const local = src.startsWith("/");
  const { width, height } = local ? await dimensions(src) : { width: 1600, height: 1000 };
  return (
    <figure className="not-prose my-10">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(max-width: 768px) 100vw, 720px"
        className="h-auto w-full rounded-[var(--radius-md)] border border-line"
        unoptimized={!local}
      />
      {title && <figcaption className="type-mono-s mt-3 text-ink-2">{title}</figcaption>}
    </figure>
  );
}

export function ArticleLink({ href, title, children }: { href: string; title?: string; children: ReactNode }) {
  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href} title={title}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} title={title} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}
