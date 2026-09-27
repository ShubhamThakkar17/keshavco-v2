import LiveSvg from "@/components/motion/LiveSvg";
import DrawPath from "@/components/motion/DrawPath";

/**
 * 40px line icons for the seven industries (brief §7.1). Each draws itself on
 * when it scrolls in and carries one Indigo accent square, which hops 2px when
 * the surrounding `.group` is hovered or focused.
 */
type Icon = { paths: string[]; accent: [number, number] };

const icons: Record<string, Icon> = {
  manufacturing: {
    paths: [
      "M5 34 H35",
      "M7 34 V18 L14 22 V18 L21 22 V18 L28 22 V14 H33 V34",
      "M28 10 a3 3 0 1 0 0.01 0",
    ],
    accent: [10, 26],
  },
  healthcare: {
    paths: ["M20 5 L32 9.5 V19 C32 27 26.5 32.5 20 35 C13.5 32.5 8 27 8 19 V9.5 Z", "M20 13.5 V25.5 M14 19.5 H26"],
    accent: [30, 29],
  },
  education: {
    paths: ["M4 14 L20 7 L36 14 L20 21 Z", "M11 17.5 V24 C14 27 26 27 29 24 V17.5", "M33 15.5 V23", "M12 30 H28 M12 34 H22"],
    accent: [31, 24],
  },
  "real-estate": {
    paths: ["M5 35 H35", "M8 35 V12 H21 V35", "M12 17 H17 M12 22 H17 M12 27 H17", "M29 8 a5.5 5.5 0 0 1 5.5 5.5 c0 4.5 -5.5 10 -5.5 10 s-5.5 -5.5 -5.5 -10 a5.5 5.5 0 0 1 5.5 -5.5 Z"],
    accent: [27, 11.5],
  },
  d2c: {
    paths: ["M4 20 H8 L11 30 H29 L32 22 H10", "M14 34 a1.6 1.6 0 1 0 0.01 0 M26 34 a1.6 1.6 0 1 0 0.01 0", "M15 6 H27 V17 H15 Z M21 6 V10"],
    accent: [25, 12],
  },
  retail: {
    paths: ["M7 15 L9 8 H31 L33 15", "M7 15 c0 3 5 3 5 0 c0 3 5 3 5 0 c0 3 6 3 6 0 c0 3 5 3 5 0 c0 3 5 3 5 0", "M9 18 V34 H31 V18", "M17 34 V25 H23 V34"],
    accent: [25, 23],
  },
  "professional-services": {
    paths: ["M6 16 H34 V33 H6 Z", "M15 16 V12 H25 V16", "M6 23 H34", "M23 4 H33 V11"],
    accent: [11, 26],
  },
};

export default function IndustryIcon({
  slug,
  className = "h-10 w-10",
}: {
  slug: string;
  className?: string;
}) {
  const icon = icons[slug] ?? icons.manufacturing;
  return (
    <LiveSvg viewBox="0 0 40 40" className={className} fill="none">
      {icon.paths.map((d, index) => (
        <DrawPath
          key={index}
          d={d}
          index={index}
          className="stroke-current"
          strokeWidth={1.25}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
      <g className="accent-hop">
        <rect x={icon.accent[0]} y={icon.accent[1]} width={4} height={4} className="fill-signal" />
      </g>
    </LiveSvg>
  );
}
