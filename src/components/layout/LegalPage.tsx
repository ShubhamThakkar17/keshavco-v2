import Sheet from "@/components/ui/Sheet";
import SectionTag from "@/components/ui/SectionTag";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Reveal from "@/components/motion/Reveal";
import { breadcrumbV3, legalPages, legalV3 } from "@/content/misc";
import { site } from "@/content/site";

type LegalSlug = keyof typeof legalPages;

/**
 * Legal pages (brief §9.4): a plain reading layout. 68ch measure, mono
 * section headings, fade-in only, no art.
 */
export default function LegalPage({ slug }: { slug: LegalSlug }) {
  const page = legalPages[slug];

  return (
    <Sheet tone="paper" inset pad={false} guides={{ accent: 0, animate: true }}>
      <div className="container-page pb-24 pt-28 lg:pb-32 lg:pt-36">
        <Breadcrumb items={[{ label: breadcrumbV3.home, href: "/" }, { label: page.title }]} />
        <div className="mt-10 max-w-[68ch]">
          <SectionTag index={1} label={legalV3.tag} trigger="mount" />
          <h1 className="type-display-page mt-6 text-ink">{page.title}</h1>
          <p className="type-body-l mt-6 text-pretty text-ink-2">{page.intro}</p>

          <div className="mt-14 border-t border-line">
            {page.sections.map((section, index) => (
              <Reveal key={section.heading} direction="none" delay={index * 0.04}>
                <section className="border-b border-line py-8">
                  <h2 className="type-mono text-ink">{`${String(index + 1).padStart(2, "0")} ${section.heading}`}</h2>
                  <p className="type-body mt-4 text-pretty text-ink-2">{section.body}</p>
                </section>
              </Reveal>
            ))}
          </div>

          <p className="type-body-s mt-10 text-ink-2">
            {legalV3.questions}{" "}
            <a href={`mailto:${site.email}`} className="font-medium text-ink underline-offset-4 hover:underline">
              {site.email}
            </a>
            .
          </p>
        </div>
      </div>
    </Sheet>
  );
}
