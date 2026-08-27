const paths: Record<string, string[]> = {
  // Compass / direction — Strategy
  strategy: [
    "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z",
    "m15.2 8.8-2 4.4-4.4 2 2-4.4 4.4-2Z",
  ],
  // Layered diamond — Branding
  branding: [
    "m12 2.8 8 5v8.4l-8 5-8-5V7.8l8-5Z",
    "m12 8.2 3.6 2.2v3.8L12 16.4l-3.6-2.2v-3.8L12 8.2Z",
  ],
  // Stacked systems — Technology
  technology: [
    "M4 6.6c0-1.4 3.6-2.6 8-2.6s8 1.2 8 2.6-3.6 2.6-8 2.6-8-1.2-8-2.6Z",
    "M4 12c0 1.4 3.6 2.6 8 2.6s8-1.2 8-2.6M4 6.6v10.8C4 18.8 7.6 20 12 20s8-1.2 8-2.6V6.6",
  ],
  // Rising signal — Digital Marketing
  "digital-marketing": [
    "M3.5 20.5h17",
    "M6.5 20.5v-5.2M11 20.5V9.8M15.5 20.5v-7.4M20 20.5V5",
  ],
};

export default function PillarIcon({
  slug,
  className = "h-6 w-6",
}: {
  slug: string;
  className?: string;
}) {
  const shape = paths[slug] ?? paths.strategy;

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {shape.map((d, index) => (
        <path key={index} d={d} />
      ))}
    </svg>
  );
}
