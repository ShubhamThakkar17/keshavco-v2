import type { Metadata } from "next";

import HomeHero from "@/components/sections/HomeHero";
import IndustryStrip from "@/components/sections/IndustryStrip";
import ProblemStory from "@/components/sections/ProblemStory";
import Manifesto from "@/components/sections/Manifesto";
import CapabilityPanels from "@/components/sections/CapabilityPanels";
import IndustryGrid from "@/components/sections/IndustryGrid";
import ProcessFlow from "@/components/sections/ProcessFlow";
import PackagesPanel from "@/components/sections/PackagesPanel";
import Compare from "@/components/sections/Compare";
import FaqSplit from "@/components/sections/FaqSplit";

import Sheet from "@/components/ui/Sheet";
import SectionHead from "@/components/ui/SectionHead";
import GiantWord from "@/components/ui/GiantWord";
import Button from "@/components/ui/Button";
import JsonLd from "@/components/ui/JsonLd";

import { homeV3, showTestimonials } from "@/content/home";
import { homeFaqs } from "@/content/faq";
import { pillars } from "@/content/services";
import { industries } from "@/content/industries";
import { processStages } from "@/content/process";
import { growthPackages } from "@/content/packages";
import Testimonials from "@/components/sections/Testimonials";
import { faqSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "KeshavCo — Business Growth Partner in India",
  description:
    "We help businesses solve growth problems. Strategy, branding, technology and digital marketing under one partner. Book a growth consultation.",
  path: "/",
});

/**
 * v3 home (docs/REDESIGN-V3.md §9.2): ten sections, one idea. Scattered
 * marketing becomes one engineered growth system; the diagrams carry the
 * argument and the words stay short (≤ 350 visible). Every line comes from
 * `homeV3` in src/content/home.ts; the long approved copy lives on the inner
 * pages. The closing CTA is the footer (decision log #3).
 */
export default function HomePage() {
  const { capabilities, industries: industriesCopy, process, packages } = homeV3;
  const faqs = homeFaqs.slice(0, homeV3.faq.shown);
  const actionLink = (action: { label: string; href: string }) => (
    <Button href={action.href} variant="link">
      {action.label}
    </Button>
  );

  return (
    <>
      <JsonLd data={faqSchema(faqs)} />

      {/* S1 */}
      <HomeHero />
      {/* S2 */}
      <IndustryStrip />
      {/* S3 */}
      <ProblemStory />

      {/* S4 + S5: one night sheet */}
      <Sheet tone="night" guides={{ accent: 0 }}>
        <Manifesto />
        <GiantWord word={capabilities.giantWord} className="mt-16 lg:mt-24" />
        <div className="container-page mt-4">
          <SectionHead
            index={3}
            tag={capabilities.tag}
            title={capabilities.title}
            action={actionLink(capabilities.action)}
          />
          <div className="mt-12">
            <CapabilityPanels pillars={pillars} />
          </div>
        </div>
      </Sheet>

      {/* S6 */}
      <Sheet tone="paper" guides={{ accent: 0, rules: ["pad"] }}>
        <div className="container-page">
          <SectionHead
            index={4}
            tag={industriesCopy.tag}
            title={industriesCopy.title}
            action={actionLink(industriesCopy.action)}
          />
          <div className="mt-12">
            <IndustryGrid industries={industries} />
          </div>
        </div>
      </Sheet>

      {/* S7: a tone change, not an overlapping sheet */}
      <Sheet tone="paper-2" overlap={false} stack={false} guides={{ accent: 0, rules: ["pad"] }}>
        <div className="container-page">
          <SectionHead index={5} tag={process.tag} title={process.title} action={actionLink(process.action)} />
          <div className="mt-16">
            <ProcessFlow stages={processStages} />
          </div>
        </div>
      </Sheet>

      {/* S8 */}
      <Sheet tone="paper" guides={{ accent: 0 }}>
        <GiantWord word={packages.giantWord} className="-mb-6 lg:-mb-16" />
        <div className="container-page">
          <SectionHead index={6} tag={packages.tag} title={packages.title} action={actionLink(packages.action)} />
          <div className="mt-12">
            <PackagesPanel packages={growthPackages} />
          </div>
        </div>
      </Sheet>

      {/* S9 */}
      <Sheet tone="night" guides={{ accent: 3 }}>
        <div className="container-page">
          <SectionHead index={7} tag={homeV3.compare.tag} title={homeV3.compare.title} align="center" />
          <Compare />
        </div>
      </Sheet>

      {showTestimonials && <Testimonials />}

      {/* S10 */}
      <FaqSplit items={faqs} />
    </>
  );
}
