import Link from "next/link";

export type Crumb = { label: string; href?: string };

export default function Breadcrumb({
  items,
  tone = "light",
}: {
  items: Crumb[];
  tone?: "light" | "dark";
}) {
  const muted = tone === "light" ? "text-white/45" : "text-navy-400";
  const active = tone === "light" ? "text-white/85" : "text-navy-700";

  return (
    <nav aria-label="Breadcrumb">
      <ol className={`flex flex-wrap items-center gap-2 text-xs ${muted}`}>
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center gap-2">
            {item.href ? (
              <Link href={item.href} className="transition-colors hover:text-indigo-brand">
                {item.label}
              </Link>
            ) : (
              <span className={active} aria-current="page">
                {item.label}
              </span>
            )}
            {index < items.length - 1 && (
              <span aria-hidden="true" className="opacity-50">
                »
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
