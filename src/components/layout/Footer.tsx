import Link from "next/link";
import FooterReveal from "@/components/motion/FooterReveal";
import RollingWords from "@/components/motion/RollingWords";
import SectionTag from "@/components/ui/SectionTag";
import Button from "@/components/ui/Button";
import MotionToggle from "@/components/ui/MotionToggle";
import DotField from "@/components/graphics/DotField";
import DotWordmark from "@/components/graphics/DotWordmark";
import { cta, footerV3, site } from "@/content/site";

/**
 * v3 footer (brief §9.1), revealed from behind the page. It is also the
 * page's closing CTA: the retired "Ready to solve your growth problem?" band
 * lives here now (decision log #3). Social links render only once they have a
 * real URL. The Motion switch turns decorative motion off site-wide.
 */
export default function Footer() {
  const socials = site.social.filter((profile) => profile.href && profile.href !== "#");

  return (
    <FooterReveal className="grain overflow-hidden bg-night text-white">
      <div data-tone="night" style={{ "--grain-opacity": 0.25 } as React.CSSProperties} className="relative">
        <div className="relative h-24 [mask-image:linear-gradient(to_bottom,black,transparent)] md:h-32">
          <DotField tone="night" amplitude={1.2} className="h-full w-full" />
        </div>

        <div className="container-page relative z-[1]">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-7">
              <SectionTag index={9} label={footerV3.tag} />
              <h2 className="type-display-l mt-6">
                <span className="block">{footerV3.headingPrefix}</span>
                <RollingWords words={footerV3.rotatingWords} className="text-white/70" />
              </h2>
              <p className="type-body-l mt-6 max-w-lg text-white/70">{footerV3.line}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href={cta.primary.href} tone="night" size="lg">
                  {cta.primary.short}
                </Button>
                <Button href={cta.secondary.href} variant="ghost" tone="night" size="lg">
                  {cta.secondary.short}
                </Button>
              </div>
            </div>

            <nav aria-label={footerV3.navLabel} className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5">
              {footerV3.columns.map((column) => (
                <div key={column.title}>
                  <h3 className="type-mono-s text-white/60">{column.title}</h3>
                  <ul className="mt-4 space-y-2.5">
                    {column.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="roll-host text-[0.875rem] text-white/80 transition-colors hover:text-white"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>

          <div className="type-mono mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-white/70 md:flex-row md:flex-wrap md:items-center md:gap-x-8">
            <a href={`mailto:${site.email}`} className="transition-colors hover:text-white">
              {site.email.toUpperCase()}
            </a>
            <a href={site.phoneHref} className="transition-colors hover:text-white">
              {site.phone}
            </a>
            <span>{site.offices.map((office) => office.city.toUpperCase()).join(" · ")}</span>
            {socials.map((profile) => (
              <a key={profile.label} href={profile.href} className="transition-colors hover:text-white">
                {profile.label.toUpperCase()}
              </a>
            ))}
            <MotionToggle className="text-white/80 md:ml-auto" />
          </div>
        </div>

        <div className="mt-6 px-2 md:px-4">
          <DotWordmark text={footerV3.wordmark} className="h-[clamp(5.5rem,15vw,13rem)] w-full" />
        </div>

        <div className="container-page pb-6 pt-2">
          <p className="type-mono-s text-white/60">{footerV3.legalLine}</p>
        </div>
      </div>
    </FooterReveal>
  );
}
