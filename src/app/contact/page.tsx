import type { Metadata } from "next";

import PageHero from "@/components/layout/PageHero";
import ContactForm from "@/components/sections/ContactForm";
import Reveal, { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/Section";
import JsonLd from "@/components/ui/JsonLd";

import { contactPage } from "@/content/misc";
import { site } from "@/content/site";
import { images } from "@/content/images";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ ...contactPage.seo, path: "/contact" });

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { label: "Home", href: "/" },
          { label: "Contact", href: "/contact" },
        ])}
      />

      <PageHero
        eyebrow={contactPage.eyebrow}
        title={contactPage.h1}
        intro={contactPage.intro}
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        image={images.consultation}
      />

      <section className="bg-navy-50 py-24 sm:py-32">
        <div className="container-page grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <Reveal amount={0.02}>
            <ContactForm />
          </Reveal>

          <div className="space-y-6">
            <Reveal direction="left" delay={0.1}>
              <div className="rounded-3xl border border-navy-900/10 bg-white p-8">
                <h2 className="font-display text-xl font-bold tracking-tight text-navy-900">
                  {contactPage.consultation.heading}
                </h2>
                {contactPage.consultation.body.map((paragraph, index) => (
                  <p
                    key={index}
                    className="mt-4 text-[0.92rem] leading-relaxed text-navy-500"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>

            <Reveal direction="left" delay={0.16}>
              <div className="grain overflow-hidden rounded-3xl bg-navy-950 p-8 text-white">
                <dl className="relative z-10 space-y-6">
                  <div>
                    <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-white/40">
                      Email
                    </dt>
                    <dd className="mt-1.5">
                      <a
                        href={`mailto:${site.email}`}
                        className="text-sm text-white/85 underline-offset-4 transition-colors hover:text-white hover:underline"
                      >
                        {site.email}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-white/40">
                      Phone
                    </dt>
                    <dd className="mt-1.5 text-sm text-white/85">{site.phone}</dd>
                  </div>
                  <div>
                    <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-white/40">
                      Office
                    </dt>
                    <dd className="mt-1.5 text-sm text-white/85">
                      {site.addressLines.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-white/40">
                      Working hours
                    </dt>
                    <dd className="mt-1.5 text-sm text-white/85">{site.workingHours}</dd>
                  </div>
                  <div>
                    <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-white/40">
                      Follow
                    </dt>
                    <dd className="mt-2 flex flex-wrap gap-x-4 gap-y-2">
                      {site.social.map((profile) => (
                        <a
                          key={profile.label}
                          href={profile.href}
                          className="text-sm text-white/60 transition-colors hover:text-white"
                        >
                          {profile.label}
                        </a>
                      ))}
                    </dd>
                  </div>
                </dl>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className="container-page">
          <SectionHeading title="Other ways to reach us" />
          <RevealGroup className="mt-12 grid gap-5 md:grid-cols-3">
            {contactPage.notes.map((note) => (
              <RevealItem key={note.title}>
                <div className="h-full rounded-2xl border border-navy-900/10 bg-navy-50/60 p-7">
                  <h3 className="font-display text-base font-semibold tracking-tight text-navy-900">
                    {note.title}
                  </h3>
                  <p className="mt-3 text-[0.88rem] leading-relaxed text-navy-500">{note.body}</p>
                  <a
                    href={`mailto:${site.email}`}
                    className="mt-4 inline-block text-xs font-semibold text-indigo-brand underline-offset-4 hover:underline"
                  >
                    {site.email}
                  </a>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>
    </>
  );
}
