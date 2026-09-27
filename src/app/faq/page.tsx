import type { Metadata } from "next";

import PageHero from "@/components/layout/PageHero";
import FaqFilter from "@/components/sections/FaqFilter";
import Sheet from "@/components/ui/Sheet";
import CtaRow from "@/components/ui/CtaRow";
import SectionTag from "@/components/ui/SectionTag";
import Button from "@/components/ui/Button";
import JsonLd from "@/components/ui/JsonLd";

import { faqPage, faqs, faqV3 } from "@/content/faq";
import { cta } from "@/content/site";
import { breadcrumbSchema, faqSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ ...faqPage.seo, path: "/faq" });

/**
 * /faq (brief §9.4): short hero → topic chips over light accordion rows →
 * "still have a question?". FAQPage JSON-LD carries every question.
 */
export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqSchema(faqs)} />
      <JsonLd
        data={breadcrumbSchema([
          { label: "Home", href: "/" },
          { label: "FAQ", href: "/faq" },
        ])}
      />

      <PageHero
        short
        crumbs={[{ label: "FAQ" }]}
        tag={faqV3.tag}
        title={faqPage.h1}
        line={faqV3.short}
        actions={
          <Button href={cta.primary.href} size="lg">
            {cta.primary.short}
          </Button>
        }
      />

      <Sheet tone="paper" guides={{ accent: 0, rules: ["pad"] }}>
        <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-3">
            <SectionTag index={2} label={faqV3.tag} />
            <h2 className="type-display-m mt-6 text-ink">{faqV3.title}</h2>
          </div>
          <div className="lg:col-span-9">
            <FaqFilter items={faqs} />
          </div>
        </div>
        <div className="container-page mt-20 lg:mt-28">
          <CtaRow
            tag={faqV3.closing.tag}
            heading={faqPage.closing.heading}
            body={faqPage.closing.body}
            actions={
              <>
                <Button href={cta.secondary.href}>{cta.secondary.short}</Button>
                <Button href={cta.primary.href} variant="ghost">
                  {cta.primary.short}
                </Button>
              </>
            }
          />
        </div>
      </Sheet>
    </>
  );
}
