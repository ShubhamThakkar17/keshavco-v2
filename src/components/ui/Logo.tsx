import Image from "next/image";
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
  sizes = "40px",
}: {
  className?: string;
  priority?: boolean;
  /** Rendered size, so the browser fetches a small file (the artwork is 946px). */
  sizes?: string;
}) {
  return (
    <Image
      src={brand.mark}
      alt=""
      aria-hidden="true"
      width={brand.markSize.width}
      height={brand.markSize.height}
      priority={priority}
      sizes={sizes}
      className={`object-contain ${className}`}
    />
  );
}
