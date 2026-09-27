import type { ReactNode } from "react";
import Sheet, { type SheetTone } from "@/components/ui/Sheet";
import SectionTag from "@/components/ui/SectionTag";
import Button from "@/components/ui/Button";
import Accordion, { type AccordionItem } from "@/components/ui/Accordion";
import SplitText from "@/components/motion/SplitText";
import { homeV3 } from "@/content/home";
import { cta } from "@/content/site";

/**
 * FAQ split (brief §9.2 S10, reused on inner pages): the heading and two
 * actions stay put on the left while the questions run down the right, as
 * dark pills (home) or light rows (inner pages). All answers start closed;
 * pages that carry FAQPage JSON-LD emit it themselves.
 */
export default function FaqSplit({
  items,
  index = 8,
  tag = homeV3.faq.tag,
  title = homeV3.faq.title,
  all = homeV3.faq.all,
  variant = "pills",
  tone = "paper",
  after,
}: {
  items: AccordionItem[];
  index?: number;
  tag?: string;
  title?: string;
  all?: { label: string; href: string };
  variant?: "pills" | "rows";
  tone?: SheetTone;
  /** Extra content under the split (e.g. a closing prompt). */
  after?: ReactNode;
}) {
  return (
    <Sheet tone={tone} guides={{ accent: 0, rules: ["pad"] }}>
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:sticky lg:top-32 lg:col-span-5 lg:self-start">
          <SectionTag index={index} label={tag} />
          <h2 className="type-display-l mt-6 max-w-md text-ink">
            <SplitText text={title} />
          </h2>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button href={cta.primary.href}>{cta.primary.short}</Button>
            <Button href={all.href} variant="ghost">
              {all.label}
            </Button>
          </div>
        </div>
        <div className="lg:col-span-7">
          <Accordion items={items} variant={variant} />
        </div>
      </div>
      {after && <div className="container-page mt-20 lg:mt-28">{after}</div>}
    </Sheet>
  );
}
