import Link from "next/link";
import { breadcrumbV3 } from "@/content/misc";

export type Crumb = { label: string; href?: string };

/**
 * Mono breadcrumb (brief §9.3): `HOME / SERVICES / STRATEGY`. The last crumb
 * is the current page. Structured data is emitted separately by each page
 * (`breadcrumbSchema`), so this is presentation only.
 */
export default function Breadcrumb({ items, className = "" }: { items: Crumb[]; className?: string }) {
  return (
    <nav aria-label={breadcrumbV3.label} className={className}>
      <ol className="type-mono-s flex flex-wrap items-center gap-x-2 gap-y-1 text-ink-2 night:text-white/60">
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="flex items-center gap-2">
            {item.href ? (
              <Link href={item.href} className="transition-colors hover:text-signal night:hover:text-white">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-ink night:text-white">
                {item.label}
              </span>
            )}
            {index < items.length - 1 && (
              <span aria-hidden="true" className="opacity-50">
                /
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
