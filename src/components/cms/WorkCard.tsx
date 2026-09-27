import Link from "next/link";
import CoverArt from "@/components/cms/CoverArt";
import Chip from "@/components/ui/Chip";
import type { CaseStudySummary } from "@/lib/cms";

/** A case study on /our-work: cover, client and industry, title, summary. */
export default function WorkCard({ study }: { study: CaseStudySummary }) {
  return (
    <article className="group relative overflow-hidden rounded-[var(--radius-md)] border border-line bg-card">
      <CoverArt
        cover={study.cover}
        id={`work-${study.slug}`}
        className="aspect-[16/10] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.02]"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      <div className="p-6 sm:p-7">
        <p className="type-mono-s text-ink-2">{[study.client, study.industryLabel, study.year].filter(Boolean).join(" · ")}</p>
        <h3 className="mt-3 font-display text-[1.375rem] font-semibold leading-snug tracking-[-0.02em] text-ink">
          <Link href={`/our-work/${study.slug}`} className="after:absolute after:inset-0 after:content-['']">
            {study.title}
          </Link>
        </h3>
        {study.summary && <p className="type-body-s mt-3 text-pretty text-ink-2">{study.summary}</p>}
        {study.services.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-1.5">
            {study.services.map((service) => (
              <li key={service}>
                <Chip>{service}</Chip>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
