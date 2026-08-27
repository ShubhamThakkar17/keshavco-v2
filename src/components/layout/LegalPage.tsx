import PageHero from "@/components/layout/PageHero";
import Reveal from "@/components/motion/Reveal";
import { legalPages } from "@/content/misc";
import { site } from "@/content/site";

type LegalSlug = keyof typeof legalPages;

export default function LegalPage({ slug }: { slug: LegalSlug }) {
  const page = legalPages[slug];

  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={page.title}
        intro={page.intro}
        crumbs={[{ label: "Home", href: "/" }, { label: page.title }]}
      />

      <section className="bg-white py-24 sm:py-32">
        <div className="container-page max-w-3xl">
          {page.sections.map((section, index) => (
            <Reveal key={section.heading} delay={index * 0.05}>
              <div className="border-b border-navy-900/10 py-8 first:pt-0">
                <h2 className="font-display text-xl font-bold tracking-tight text-navy-900">
                  {section.heading}
                </h2>
                <p className="mt-4 text-[0.98rem] leading-relaxed text-navy-500">
                  {section.body}
                </p>
              </div>
            </Reveal>
          ))}

          <Reveal delay={0.2}>
            <p className="mt-10 text-sm text-navy-500">
              Questions about this page? Write to{" "}
              <a
                href={`mailto:${site.email}`}
                className="font-medium text-navy-900 underline-offset-4 hover:underline"
              >
                {site.email}
              </a>
              .
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
