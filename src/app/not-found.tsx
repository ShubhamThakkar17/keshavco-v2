import Link from "next/link";
import Sheet from "@/components/ui/Sheet";
import SectionTag from "@/components/ui/SectionTag";
import Button from "@/components/ui/Button";
import NotFoundArt from "@/components/graphics/NotFoundArt";
import { notFound as copy, notFoundV3 } from "@/content/misc";
import { pillars } from "@/content/services";

/**
 * 404 (brief §9.4): the file that slipped out of the grid, the approved
 * message, two actions and a row of places to start.
 */
export default function NotFound() {
  const links = [
    ...pillars.map((pillar) => ({ label: pillar.name, href: `/services/${pillar.slug}` })),
    notFoundV3.packages,
  ];
  return (
    <Sheet tone="paper-2" inset pad={false} guides={{ accent: 0, animate: true }} className="lg:min-h-[calc(100svh-24px)]">
      <div className="container-page grid items-center gap-12 pb-16 pt-32 lg:min-h-[calc(100svh-24px)] lg:grid-cols-12 lg:gap-8 lg:pb-24 lg:pt-36">
        <div className="lg:col-span-6">
          <SectionTag index={1} label={notFoundV3.tag} trigger="mount" />
          <h1 className="type-display-page mt-6 max-w-[16ch] text-ink">{copy.heading}</h1>
          <p className="type-body-l mt-6 max-w-md text-pretty text-ink-2">{copy.body}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button href={notFoundV3.home.href} size="lg">
              {notFoundV3.home.label}
            </Button>
            <Button href={notFoundV3.contact.href} variant="ghost" size="lg">
              {notFoundV3.contact.label}
            </Button>
          </div>
          <nav aria-label={notFoundV3.startHere} className="mt-12 border-t border-line pt-6">
            <p className="type-mono-s text-ink-2">{notFoundV3.startHere}</p>
            <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-1">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="inline-flex min-h-11 items-center text-[0.9375rem] font-medium text-ink transition-colors hover:text-signal">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div aria-hidden="true" className="mx-auto w-full max-w-md text-ink/70 lg:col-span-6">
          <NotFoundArt className="h-auto w-full" />
        </div>
      </div>
    </Sheet>
  );
}
