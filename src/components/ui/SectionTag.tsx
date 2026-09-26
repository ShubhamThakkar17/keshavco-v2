import ScrambleText from "@/components/motion/ScrambleText";

/**
 * Numbered section tag (Oberon): an Indigo square holding the two-digit index,
 * joined to a chip with the mono label, which decodes in on first view.
 * On night sheets the chip darkens and the tag becomes a pill.
 */
export default function SectionTag({
  index,
  label,
  className = "",
  trigger = "inView",
}: {
  index: number;
  label: string;
  className?: string;
  trigger?: "inView" | "mount";
}) {
  const number = String(index).padStart(2, "0");
  return (
    <p
      className={`type-mono inline-flex items-stretch overflow-hidden night:rounded-full ${className}`}
    >
      <span className="grid h-7 min-w-7 place-items-center bg-signal px-1 text-white night:pl-2">
        {number}
      </span>
      <span className="flex items-center whitespace-nowrap bg-paper-3 px-2.5 text-ink night:bg-night-3 night:pr-3.5 night:text-white/85">
        <ScrambleText text={label} trigger={trigger} delay={trigger === "mount" ? 150 : 0} />
      </span>
    </p>
  );
}
