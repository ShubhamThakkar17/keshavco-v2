import Link from "next/link";
import CoverArt from "@/components/cms/CoverArt";
import { insightsV3 } from "@/content/misc";
import type { InsightSummary } from "@/lib/cms";

export const formatDate = (value: string | null) =>
  value
    ? new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric" }).format(new Date(value))
    : "";

/**
 * Insights card for the masonry grid (Spartan): cards with a cover lead with
 * it; cards without one are text-only night cards, so the grid alternates
 * between image and text.
 */
export default function InsightCard({ post, index }: { post: InsightSummary; index: number }) {
  const meta = [formatDate(post.publishedAt), `${post.readingMinutes} ${insightsV3.article.minRead}`].filter(Boolean).join(" · ");
  const textOnly = post.cover.kind === "none";

  return (
    <article
      data-tone={textOnly ? "night" : "paper"}
      className={`group relative mb-3 break-inside-avoid overflow-hidden rounded-[var(--radius-md)] border ${
        textOnly ? "grain border-transparent bg-night text-white" : "border-line bg-card text-ink"
      }`}
    >
      {!textOnly && (
        <CoverArt
          cover={post.cover}
          id={`card-${post.slug}`}
          className={`${index % 3 === 1 ? "aspect-[4/5]" : "aspect-[16/11]"} transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.02]`}
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      )}
      <div className="relative z-[1] p-5 sm:p-6">
        <p className="type-mono-s text-ink-2 night:text-white/60">{post.topicLabel}</p>
        <h3 className={`mt-3 font-display font-semibold leading-snug tracking-[-0.02em] ${textOnly ? "text-[1.625rem]" : "text-[1.25rem]"}`}>
          <Link href={`/insights/${post.slug}`} className="after:absolute after:inset-0 after:content-['']">
            {post.title}
          </Link>
        </h3>
        {post.summary && <p className="type-body-s mt-3 text-pretty text-ink-2 night:text-white/70">{post.summary}</p>}
        <p className="type-mono-s mt-5 text-ink-2 night:text-white/60">{meta}</p>
      </div>
    </article>
  );
}
