/**
 * Small glyphs for the "With KeshavCo / Without" comparison (brief §9.2 S9):
 * a check, a cross, and one icon per row (plan, contact, review, ownership,
 * spend). Decorative; the row text carries the meaning.
 */
const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

export function CheckIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg {...base} className={className}>
      <path d="M5 12.5 L9.5 17 L19 7" />
    </svg>
  );
}

export function CrossIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg {...base} className={className}>
      <path d="M7 7 L17 17 M17 7 L7 17" />
    </svg>
  );
}

const rows: Record<string, string> = {
  // One plan: a page with three lines
  plan: "M6 3 H15 L19 7 V21 H6 Z M15 3 V7 H19 M9 11 H16 M9 14.5 H16 M9 18 H13",
  // One point of contact: a single person
  contact: "M16 8 a4 4 0 1 0 0.01 0 M4.5 21 c0.8 -4 3.8 -6 7.5 -6 s6.7 2 7.5 6",
  // Monthly reviews: a calendar page
  review: "M4 6 H20 V20 H4 Z M4 10 H20 M8 3 V7 M16 3 V7 M8 14 H10 M12 14 H14 M8 17 H10",
  // You own the accounts: a key
  ownership: "M8.5 15.5 a4.5 4.5 0 1 1 3.2 -1.3 L20 22 M17 19 L19 17 M14.5 16.5 L16.5 14.5",
  // Spend paid direct: a rupee in a coin
  spend: "M21 12 a9 9 0 1 0 0.01 0 M8.5 7.5 H15.5 M8.5 10.5 H15.5 M9.5 7.5 c4 0 4 5 0 5 H8.5 L14 17",
};

export function CompareRowIcon({
  kind,
  className = "h-5 w-5",
}: {
  kind: keyof typeof rows | string;
  className?: string;
}) {
  return (
    <svg {...base} className={className}>
      <path d={rows[kind] ?? rows.plan} />
    </svg>
  );
}
