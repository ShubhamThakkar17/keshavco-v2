import Image from "next/image";
import { renderGraphic } from "@/components/cms/Graphic";
import type { Cover } from "@/lib/cms";

/**
 * An article's or case study's cover: the uploaded image, or the chosen
 * ready-made graphic on a paper panel. Decorative when it is a graphic.
 */
export default function CoverArt({
  cover,
  id,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  className = "",
}: {
  cover: Cover;
  id: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  if (cover.kind === "image") {
    return (
      <div className={`relative overflow-hidden bg-paper-2 ${className}`}>
        <Image src={cover.src} alt={cover.alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
    );
  }
  if (cover.kind === "graphic") {
    return (
      <div aria-hidden="true" className={`grid place-items-center bg-paper-2 p-6 text-ink/70 ${className}`}>
        <div className="w-full">{renderGraphic(cover.graphic, id)}</div>
      </div>
    );
  }
  return null;
}
