import Link from "next/link";
import Button from "@/components/ui/Button";
import Brackets from "@/components/ui/Brackets";
import { cta } from "@/content/site";
import { servicesV3 } from "@/content/services";
import type { GrowthPackage } from "@/content/packages";

/**
 * The engagement a pillar most often starts with, as a compact night card:
 * name, who it is for, the first three inclusions, and the proposal button
 * pre-filled with the package.
 */
export default function PackageCard({ pkg, index }: { pkg: GrowthPackage; index: number }) {
  const copy = servicesV3.pillar.next;
  return (
    <div data-tone="night" className="grain relative h-full overflow-hidden rounded-[var(--radius-md)] bg-night p-7 text-white sm:p-9">
      <Brackets inset={10} />
      <div className="relative z-[1] flex h-full flex-col">
        <p className="type-mono-s text-white/60">{`${copy.packageNote} .${String(index + 1).padStart(2, "0")}`}</p>
        <h3 className="type-display-m mt-5">{pkg.name}</h3>
        <p className="type-body-s mt-2 text-white/70">{pkg.audience}</p>
        <ul className="mt-6 space-y-2.5">
          {pkg.includes.slice(0, 3).map((item) => (
            <li key={item} className="type-body-s flex gap-2.5 text-white/85">
              <span aria-hidden="true" className="font-mono text-white/60">
                &gt;
              </span>
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 pt-10">
          <Button href={`${cta.tertiary.href}&package=${pkg.slug}`} tone="night">
            {cta.tertiary.short}
          </Button>
          <Link href={`/growth-packages#${pkg.slug}`} className="type-mono-s text-white/70 underline-offset-4 hover:text-white hover:underline">
            {copy.packageLink}
          </Link>
        </div>
      </div>
    </div>
  );
}
