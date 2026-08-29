import Image from "next/image";
import Link from "next/link";
import { brand } from "@/content/brand";

/**
 * The Keshav Consultancy mark.
 *
 * Sourced from `public/brand/` through `src/content/brand.ts`, so replacing
 * the artwork there updates the header, footer, hero and favicon at once.
 */
export function LogoMark({
  className = "h-9 w-9",
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={brand.mark}
      alt=""
      aria-hidden="true"
      width={brand.markSize.width}
      height={brand.markSize.height}
      priority={priority}
      className={`object-contain ${className}`}
    />
  );
}

export default function Logo({
  className = "",
  tone = "dark",
  showWordmark = true,
}: {
  className?: string;
  tone?: "dark" | "light";
  showWordmark?: boolean;
}) {
  const isLight = tone === "light";

  return (
    <Link
      href="/"
      aria-label={`${brand.wordmark} — home`}
      className={`group inline-flex items-center gap-3 ${className}`}
    >
      <LogoMark
        className="h-10 w-10 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5"
        priority
      />
      {showWordmark && (
        <span className="flex flex-col leading-none">
          <span
            className={`font-display text-[1.05rem] font-extrabold tracking-tight transition-colors duration-300 ${
              isLight ? "text-white" : "text-navy-900"
            }`}
          >
            Keshav
          </span>
          <span
            className={`mt-1 text-[0.72rem] font-medium tracking-[0.16em] transition-colors duration-300 ${
              isLight ? "text-white/65" : "text-navy-500"
            }`}
          >
            CONSULTANCY
          </span>
        </span>
      )}
    </Link>
  );
}
