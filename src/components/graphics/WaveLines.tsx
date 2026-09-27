import type { CSSProperties } from "react";
import LiveSvg from "@/components/motion/LiveSvg";

/**
 * Fourteen thin sine lines drifting sideways (Spartan's Pro column texture),
 * for the featured package column. Each line is two periods wide and slides
 * one period on a 20s loop, so the drift is seamless; it pauses offscreen.
 */
export default function WaveLines({ className = "absolute inset-0 h-full w-full" }: { className?: string }) {
  const lines = Array.from({ length: 14 }, (_, i) => {
    const y = 40 + i * 40;
    const amp = 8 + (i % 5) * 3;
    let d = `M0 ${y}`;
    for (let x = 0; x <= 800; x += 20) {
      d += ` L${x} ${(y + Math.sin((x / 400) * Math.PI * 2 + i * 0.5) * amp).toFixed(1)}`;
    }
    return { d, i };
  });
  return (
    <LiveSvg viewBox="0 0 400 600" preserveAspectRatio="xMidYMid slice" className={className} fill="none">
      {lines.map(({ d, i }) => (
        <g
          key={i}
          className="wave-drift loop-anim"
          style={{ "--dur": `${18 + (i % 4) * 2}s`, "--delay": `${i * -1.3}s` } as CSSProperties}
        >
          <path d={d} stroke="currentColor" strokeWidth={1} strokeOpacity={0.12} />
        </g>
      ))}
    </LiveSvg>
  );
}
