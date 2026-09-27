import type { Metadata } from "next";

import ContactTabs from "@/components/sections/ContactTabs";
import LinkCells from "@/components/sections/LinkCells";
import BlurInWords from "@/components/motion/BlurInWords";
import Reveal from "@/components/motion/Reveal";
import Sheet from "@/components/ui/Sheet";
import SectionTag from "@/components/ui/SectionTag";
import SectionHead from "@/components/ui/SectionHead";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Overview from "@/components/ui/Overview";
import Brackets from "@/components/ui/Brackets";
import JsonLd from "@/components/ui/JsonLd";

import { breadcrumbV3, contactPage, contactV3 } from "@/content/misc";
import { booking, site } from "@/content/site";
import { toParagraphs } from "@/lib/text";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ ...contactPage.seo, path: "/contact" });

/**
 * /contact (brief §9.4): a split inset sheet. Left: the H1, direct contact
 * rows and "what happens next" as a three-step flow. Right: the booking /
 * enquiry tabs (`#book` selects booking; `?intent=proposal&package=`
 * preselects the form; the 9-second Cal fallback is unchanged). Below: what
 * the consultation involves and the other ways to reach us.
 */
export default function ContactPage() {
  const copy = contactV3;
  const socials = site.social.filter((profile) => profile.href && profile.href !== "#");
  const rows = [
    { label: copy.direct.email, value: site.email, href: `mailto:${site.email}` },
    { label: copy.direct.phone, value: site.phone, href: site.phoneHref },
    { label: copy.direct.offices, value: site.offices.map((office) => office.city).join(" · ") },
  ];

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { label: "Home", href: "/" },
          { label: "Contact", href: "/contact" },
        ])}
      />

      <Sheet tone="paper-2" inset pad={false} guides={{ accent: 0, animate: true }}>
        <div className="container-page grid gap-12 pb-12 pt-28 md:pb-16 lg:grid-cols-12 lg:gap-8 lg:pb-20 lg:pt-36">
          <div className="lg:col-span-5">
            <Breadcrumb items={[{ label: breadcrumbV3.home, href: "/" }, { label: "Contact" }]} />
            <div className="mt-10">
              <SectionTag index={1} label={copy.tag} trigger="mount" />
            </div>
            <h1 className="type-display-page mt-6 max-w-[14ch] text-ink">
              <BlurInWords text={contactPage.h1} />
            </h1>
            <p className="type-body-l mt-6 max-w-md text-pretty text-ink-2">{copy.short}</p>

            <dl className="mt-10 border-t border-line">
              {rows.map((row) => (
                <div key={row.label} className="grid grid-cols-[6rem_1fr] items-baseline gap-4 border-b border-line py-4">
                  <dt className="type-mono-s text-ink-2">{row.label}</dt>
                  <dd className="text-[0.9375rem] text-ink">
                    {row.href ? (
                      <a href={row.href} className="underline-offset-4 transition-colors hover:text-signal hover:underline">
                        {row.value}
                      </a>
                    ) : (
                      row.value
                    )}
                  </dd>
                </div>
              ))}
              {socials.length > 0 && (
                <div className="grid grid-cols-[6rem_1fr] items-baseline gap-4 border-b border-line py-4">
                  <dt className="type-mono-s text-ink-2">{copy.direct.follow}</dt>
                  <dd className="flex flex-wrap gap-x-4 gap-y-1 text-[0.9375rem]">
                    {socials.map((profile) => (
                      <a key={profile.label} href={profile.href} className="text-ink hover:text-signal">
                        {profile.label}
                      </a>
                    ))}
                  </dd>
                </div>
              )}
            </dl>

            <div className="mt-10">
              <p className="type-mono-s text-ink-2">{copy.next.tag}</p>
              <ol className="relative mt-5 space-y-5">
                <span aria-hidden="true" className="absolute bottom-3 left-[15px] top-3 border-l border-dashed border-ink/25" />
                {copy.next.steps.map((step, index) => (
                  <li key={step} className="relative flex items-start gap-4">
                    <span className="type-mono-s relative grid h-8 w-8 shrink-0 place-items-center bg-card text-ink outline outline-1 outline-line">
                      {index === copy.next.steps.length - 1 && <Brackets inset={-4} size={7} />}
                      {`0${index + 1}`}
                    </span>
                    <span className="type-body pt-1 text-ink">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <p className="type-body-s mt-10 text-ink-2">
              {copy.phonePrompt}{" "}
              <a href={site.phoneHref} className="font-medium text-ink underline-offset-4 hover:underline">
                {site.phone}
              </a>
            </p>
          </div>

          <div className="lg:col-span-7">
            <ContactTabs />
          </div>
        </div>
      </Sheet>

      <Sheet tone="paper" guides={{ accent: 0 }}>
        <div className="container-page">
          <Overview note={copy.overview} text={contactPage.intro} />
          <div className="mt-20 grid gap-3 lg:mt-28 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <div className="relative h-full rounded-[var(--radius-md)] border border-line bg-card p-7 sm:p-10">
                <h2 className="type-display-m text-ink">{contactPage.consultation.heading}</h2>
                {toParagraphs(contactPage.consultation.body).map((paragraph) => (
                  <p key={paragraph} className="type-body mt-4 text-pretty text-ink-2">
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.08} className="lg:col-span-5">
              <div className="h-full rounded-[var(--radius-md)] border border-line bg-paper-2 p-7 sm:p-10">
                <p className="type-mono-s text-ink-2">{copy.covers.label}</p>
                <ul className="mt-5 space-y-3">
                  {copy.covers.items.map((item) => (
                    <li key={item} className="type-body flex gap-3 text-ink">
                      <span aria-hidden="true" className="font-mono text-signal">
                        &gt;
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="type-body-s mt-6 text-ink-2">{booking.body}</p>
              </div>
            </Reveal>
          </div>

          <SectionHead index={2} tag={copy.other.tag} title={copy.other.title} className="mt-24 lg:mt-32" />
          <div className="mt-12">
            <LinkCells
              items={contactPage.notes.map((note, index) => ({
                key: note.title,
                title: note.title,
                body: note.body,
                href:
                  index === contactPage.notes.length - 1
                    ? `mailto:${site.email}?subject=${encodeURIComponent(copy.careersSubject)}`
                    : `mailto:${site.email}`,
              }))}
            />
          </div>
        </div>
      </Sheet>
    </>
  );
}
