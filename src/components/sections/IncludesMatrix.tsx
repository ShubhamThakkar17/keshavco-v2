import { packagesV3, type GrowthPackage } from "@/content/packages";

/**
 * Includes matrix (brief §9.4): one row per deliverable, one column per
 * package, a dot where it is included. A real table, so it reads correctly
 * to screen readers; on phones it scrolls sideways inside its own frame.
 */
export default function IncludesMatrix({ packages }: { packages: GrowthPackage[] }) {
  const copy = packagesV3.matrix;
  const rows = [...new Set(packages.flatMap((pkg) => pkg.includes))];

  return (
    <div
      className="overflow-x-auto rounded-[var(--radius-md)] border border-line bg-card"
      role="region"
      aria-label={copy.caption}
      tabIndex={0}
    >
      <table className="w-full min-w-[40rem] border-collapse text-left">
        <caption className="sr-only">{copy.caption}</caption>
        <thead>
          <tr className="border-b border-line">
            <th scope="col" className="type-mono-s px-5 py-4 font-medium text-ink-2">
              {copy.deliverable}
            </th>
            {packages.map((pkg) => (
              <th key={pkg.slug} scope="col" className="type-mono px-4 py-4 text-center font-medium text-ink">
                {pkg.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row} className="border-b border-line last:border-b-0 hover:bg-paper">
              <th scope="row" className="type-body-s px-5 py-3.5 font-normal text-ink">
                {row}
              </th>
              {packages.map((pkg) => {
                const included = pkg.includes.includes(row);
                return (
                  <td key={pkg.slug} className="px-4 py-3.5 text-center">
                    {included ? (
                      <span className="inline-block h-2.5 w-2.5 rounded-full bg-signal" />
                    ) : (
                      <span aria-hidden="true" className="inline-block h-px w-3 bg-ink/20 align-middle" />
                    )}
                    <span className="sr-only">{included ? copy.included : copy.notIncluded}</span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
