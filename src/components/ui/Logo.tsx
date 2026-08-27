import Link from "next/link";

/**
 * KeshavCo mark — the layered peacock-feather form from the brand guidelines,
 * drawn as stacked arcs over a central stem, in the indigo → purple → green
 * brand gradient.
 *
 * `tone` picks the gradient for the background it sits on: the dark tone
 * anchors in navy for white backgrounds, the light tone drops the navy stop so
 * the mark stays legible on the dark sections.
 *
 * NOTE: this is a code rendering of the mark for the build. Swap in the
 * supplied master SVG before launch (see README).
 */
export function LogoMark({
  className = "h-9 w-9",
  idSuffix = "",
  tone = "dark",
}: {
  className?: string;
  idSuffix?: string;
  tone?: "dark" | "light";
}) {
  const gradientId = `kc-feather-${idSuffix}`;
  const innerId = `kc-feather-inner-${idSuffix}`;
  const stroke = `url(#${gradientId})`;

  const stops =
    tone === "light"
      ? [
          { offset: "0%", color: "#818CF8" },
          { offset: "45%", color: "#A78BFA" },
          { offset: "100%", color: "#C4B5FD" },
        ]
      : [
          { offset: "0%", color: "#0F172A" },
          { offset: "42%", color: "#4F46E5" },
          { offset: "100%", color: "#7C3AED" },
        ];

  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" role="presentation">
      <defs>
        <linearGradient id={gradientId} x1="8" y1="60" x2="56" y2="6" gradientUnits="userSpaceOnUse">
          {stops.map((stop) => (
            <stop key={stop.offset} offset={stop.offset} stopColor={stop.color} />
          ))}
        </linearGradient>
        <linearGradient id={innerId} x1="26" y1="34" x2="40" y2="18" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={tone === "light" ? "#818CF8" : "#4F46E5"} />
          <stop offset="100%" stopColor="#22C55E" />
        </linearGradient>
      </defs>

      {/* Outer plume */}
      <path
        d="M32 4 55 27c0 12.7-10.3 23-23 23S9 39.7 9 27L32 4Z"
        fill="none"
        stroke={stroke}
        strokeWidth="4.5"
        strokeLinejoin="round"
      />
      {/* Middle plume */}
      <path
        d="M32 15 45 28c0 7.2-5.8 13-13 13s-13-5.8-13-13L32 15Z"
        fill="none"
        stroke={stroke}
        strokeWidth="4"
        strokeLinejoin="round"
      />
      {/* Eye */}
      <path d="M32 25.5 37.5 31a5.5 5.5 0 1 1-11 0L32 25.5Z" fill={`url(#${innerId})`} />
      {/* Barbs */}
      <path
        d="M32 46c-6-1.5-10-6-11.5-11.5M32 46c6-1.5 10-6 11.5-11.5"
        fill="none"
        stroke={stroke}
        strokeWidth="4"
        strokeLinecap="round"
      />
      {/* Stem */}
      <path d="M32 33v27" fill="none" stroke={stroke} strokeWidth="4.5" strokeLinecap="round" />
    </svg>
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
      aria-label="KeshavCo — home"
      className={`group inline-flex items-center gap-2.5 ${className}`}
    >
      <LogoMark
        className="h-8 w-8 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5"
        idSuffix={tone}
        tone={tone}
      />
      {showWordmark && (
        <span className="flex flex-col leading-none">
          <span
            className={`font-display text-[1.1rem] font-extrabold tracking-tight transition-colors duration-300 ${
              isLight ? "text-white" : "text-navy-900"
            }`}
          >
            Keshav
            <span className={isLight ? "text-indigo-300" : "text-indigo-brand"}>Co</span>
          </span>
          <span
            className={`mt-1 text-[0.55rem] font-medium uppercase tracking-[0.22em] transition-colors duration-300 ${
              isLight ? "text-white/50" : "text-navy-400"
            }`}
          >
            Growth Partner
          </span>
        </span>
      )}
    </Link>
  );
}
