import Sheet from "@/components/ui/Sheet";
import SectionTag from "@/components/ui/SectionTag";
import Button from "@/components/ui/Button";
import Accordion, { type AccordionItem } from "@/components/ui/Accordion";
import SplitText from "@/components/motion/SplitText";
import { homeV3 } from "@/content/home";
import { cta } from "@/content/site";

/**
 * S10 FAQ (brief §9.2): the heading and two actions stay put on the left
 * while the questions, as dark pills, run down the right. All answers start
 * closed (they are also in the page's FAQPage JSON-LD).
 */
export default function FaqSplit({ items }: { items: AccordionItem[] }) {
  const { faq } = homeV3;
  return (
    <Sheet tone="paper" guides={{ accent: 0, rules: ["pad"] }}>
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:sticky lg:top-32 lg:col-span-5 lg:self-start">
          <SectionTag index={8} label={faq.tag} />
          <h2 className="type-display-l mt-6 max-w-md text-ink">
            <SplitText text={faq.title} />
          </h2>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button href={cta.primary.href}>{cta.primary.short}</Button>
            <Button href={faq.all.href} variant="ghost">
              {faq.all.label}
            </Button>
          </div>
        </div>
        <div className="lg:col-span-7">
          <Accordion items={items} variant="pills" />
        </div>
      </div>
    </Sheet>
  );
}
