import Link from "next/link";

/**
 * Oberon-style cells split by dashed guides: a mono title, one line and an
 * arrow, each cell a link. Used for supporting capabilities and a pillar's
 * sub-services.
 */
export default function LinkCells({
  items,
  columns = 3,
}: {
  items: { key: string; title: string; body: string; href: string; index?: string }[];
  columns?: 2 | 3;
}) {
  return (
    <ul
      className={`grid border-l border-t border-dashed border-line night:border-line-night sm:grid-cols-2 ${
        columns === 3 ? "lg:grid-cols-3" : ""
      }`}
    >
      {items.map((item) => (
        <li key={item.key} className="border-b border-r border-dashed border-line night:border-line-night">
          <Link
            href={item.href}
            className="group flex h-full min-h-48 flex-col justify-between gap-8 p-5 transition-colors duration-300 hover:bg-card sm:p-6 night:hover:bg-white/[0.04]"
          >
            <span>
              {item.index && (
                <span className="type-mono mb-4 inline-flex items-center gap-1.5 text-ink-2 night:text-white/60">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-signal" />
                  {item.index}
                </span>
              )}
              <span className="type-mono block text-ink night:text-white">{item.title}</span>
              <span className="type-body-s mt-2 block max-w-[38ch] text-pretty text-ink-2 night:text-white/65">
                {item.body}
              </span>
            </span>
            <span
              aria-hidden="true"
              className="text-signal transition-transform duration-300 group-hover:translate-x-1 night:text-white"
            >
              →
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
