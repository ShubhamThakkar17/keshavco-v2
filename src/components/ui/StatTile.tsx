import Brackets from "@/components/ui/Brackets";
import Odometer from "@/components/motion/Odometer";

/**
 * Micro-stat tile: rolling number, mono label, optional one-line note, framed
 * with corner brackets. Only ever fed structural facts from content (brief
 * §2 rule 1), never performance claims.
 */
export default function StatTile({
  value,
  label,
  note,
  delay = 0,
  className = "",
}: {
  value: number | string;
  label: string;
  note?: string;
  delay?: number;
  className?: string;
}) {
  return (
    <div className={`relative px-4 py-4 sm:px-5 ${className}`}>
      <Brackets />
      <p className="type-stat text-ink night:text-white">
        <Odometer value={value} delay={delay} />
      </p>
      <p className="type-mono-s mt-3 text-ink-2 night:text-white/60">{label}</p>
      {note && <p className="type-body-s mt-1 text-ink-2 night:text-white/60">{note}</p>}
    </div>
  );
}
