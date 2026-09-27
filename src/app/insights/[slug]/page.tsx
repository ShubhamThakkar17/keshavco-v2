import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import MarkdocContent from "@/components/cms/Markdoc";
import CoverArt from "@/components/cms/CoverArt";
import InsightCard, { formatDate } from "@/components/cms/InsightCard";
import SubscribeForm from "@/components/sections/SubscribeForm";
import BlurInWords from "@/components/motion/BlurInWords";
import Sheet from "@/components/ui/Sheet";
import SectionTag from "@/components/ui/SectionTag";
import SectionHead from "@/components/ui/SectionHead";
import Breadcrumb from "@/components/ui/Breadcrumb";
import CtaRow from "@/components/ui/CtaRow";
import Brackets from "@/components/ui/Brackets";
import Button from "@/components/ui/Button";
import JsonLd from "@/components/ui/JsonLd";

import { breadcrumbV3, ctaBands, insightsV3 } from "@/content/misc";
import { cta, newsletter } from "@/content/site";
import { getInsight, getInsights } from "@/lib/cms";
import { articleSchema, breadcrumbSchema, pageMetadata } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  const { published } = await getInsights();
  return published.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = await getInsight(slug);
  if (!post) return {};
  return pageMetadata({
    title: post.seoTitle || `${post.title} — KeshavCo`,
    description: post.summary,
    path: `/insights/${slug}`,
  });
}

/**
 * An Insights article: inset header (topic, H1, summary, date, reading
 * time, cover), the body in a 68ch column with a sticky contents list on
 * desktop, then the CTA, more articles and the newsletter.
 */
export default async function InsightArticle({ params }: Params) {
  const { slug } = await params;
  const post = await getInsight(slug);
  if (!post) notFound();

  const copy = insightsV3.article;
  const path = `/insights/${slug}`;
  const { published } = await getInsights();
  const more = published.filter((other) => other.slug !== slug).slice(0, 3);
  const meta = [formatDate(post.publishedAt), `${post.readingMinutes} ${copy.minRead}`, `${copy.by} ${post.author.toUpperCase()}`]
    .filter(Boolean)
    .join(" · ");

  return (
    <>
      <JsonLd
        data={articleSchema({
          headline: post.title,
          description: post.summary,
          path,
          datePublished: post.publishedAt,
          author: post.author,
          image: post.cover.kind === "image" ? post.cover.src : undefined,
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { label: "Home", href: "/" },
          { label: "Insights", href: "/insights" },
          { label: post.title, href: path },
        ])}
      />

      <Sheet tone="paper-2" inset pad={false} guides={{ accent: 0, animate: true }}>
        <div className="container-page pb-12 pt-28 md:pb-16 lg:pb-20 lg:pt-36">
          <Breadcrumb items={[{ label: breadcrumbV3.home, href: "/" }, { label: "Insights", href: "/insights" }, { label: post.title }]} />
          <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-8">
            <div className={post.cover.kind === "none" ? "lg:col-span-10" : "lg:col-span-7"}>
              <SectionTag index={1} label={post.topicLabel.toUpperCase()} trigger="mount" />
              <h1 className="type-display-page mt-6 max-w-[22ch] text-ink">
                <BlurInWords text={post.title} />
              </h1>
              {post.summary && <p className="type-body-l mt-6 max-w-xl text-pretty text-ink-2">{post.summary}</p>}
              <p className="type-mono-s mt-8 text-ink-2">{meta}</p>
            </div>
            {post.cover.kind !== "none" && (
              <div className="relative lg:col-span-5">
                <Brackets inset={-6} />
                <CoverArt
                  cover={post.cover}
                  id={`cover-${slug}`}
                  priority
                  className="aspect-[4/3] overflow-hidden rounded-[var(--radius-md)] border border-line"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            )}
          </div>
        </div>
      </Sheet>

      <Sheet tone="paper" guides={{ accent: 0 }}>
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-8">
          {post.headings.length >= 2 && (
            <nav aria-label={copy.contents} className="hidden lg:col-span-3 lg:block">
              <div className="sticky top-32">
                <p className="type-mono-s text-ink-2">{copy.contents}</p>
                <ol className="mt-4 space-y-2 border-l border-line">
                  {post.headings.map((heading) => (
                    <li key={heading.id}>
                      <a href={`#${heading.id}`} className="-ml-px block border-l border-transparent py-1 pl-4 text-[0.875rem] text-ink-2 transition-colors hover:border-signal hover:text-ink">
                        {heading.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </nav>
          )}
          <div className="min-w-0 max-w-[68ch] lg:col-span-8 lg:col-start-5">
            <MarkdocContent content={post.content} idPrefix={`a-${slug}`} />
            <p className="mt-16 border-t border-line pt-6">
              <Link href={copy.all.href} className="type-mono-s text-ink-2 hover:text-signal">
                {`← ${copy.all.label}`}
              </Link>
            </p>
          </div>
        </div>
        <div className="container-page mt-20 lg:mt-28">
          <CtaRow
            heading={ctaBands.insights.heading}
            body={ctaBands.insights.body}
            actions={<Button href={cta.primary.href}>{cta.primary.short}</Button>}
          />
        </div>
      </Sheet>

      <Sheet tone="paper-2" guides={{ accent: 0, rules: ["pad"] }}>
        <div className="container-page">
          {more.length > 0 && (
            <>
              <SectionHead index={2} tag={copy.more.tag} title={copy.more.title} />
              <div className="mt-12 columns-1 gap-3 md:columns-2 lg:columns-3">
                {more.map((other, i) => (
                  <InsightCard key={other.slug} post={other} index={i} />
                ))}
              </div>
            </>
          )}
          <div
            data-tone="night"
            className={`grain relative overflow-hidden rounded-[var(--radius-lg)] bg-night p-7 text-white sm:p-10 lg:p-14 ${more.length > 0 ? "mt-16" : ""}`}
          >
            <div className="relative z-[1] grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-8">
              <div className="lg:col-span-6">
                <p className="type-mono-s text-white/60">{insightsV3.subscribe.tag}</p>
                <h2 className="type-display-l mt-5">{newsletter.heading}</h2>
              </div>
              <div className="lg:col-span-6">
                <SubscribeForm />
              </div>
            </div>
          </div>
        </div>
      </Sheet>
    </>
  );
}
