import type { Metadata } from "next";
import { site } from "@/content/site";

/**
 * The site-wide social preview, rendered by `src/app/opengraph-image.tsx`.
 * Pages set their own `openGraph` object, which would otherwise drop the
 * file-based image, so it is attached explicitly here.
 */
const socialImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${site.name}: ${site.tagline}`,
};

/** Builds page metadata from the title/description pairs in the copy document. */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: `${site.url}${path === "/" ? "" : path}`,
      type: "website",
      images: [socialImage],
    },
    twitter: { card: "summary_large_image", title, description, images: [socialImage.url] },
  };
}

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  legalName: site.legalName,
  url: site.url,
  email: site.email,
  description:
    "KeshavCo is a business growth partner: one team that sets the strategy, runs the execution and answers for the outcome across strategy, branding, technology and digital marketing.",
  areaServed: "IN",
  slogan: site.tagline,
  address: site.offices.map((office) => ({
    "@type": "PostalAddress",
    addressLocality: office.city,
    addressRegion: office.region,
    addressCountry: "IN",
  })),
};

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function serviceSchema({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `${site.url}${path}`,
    provider: { "@type": "Organization", name: site.name, url: site.url },
    areaServed: "IN",
  };
}

export function breadcrumbSchema(items: { label: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: `${site.url}${item.href}`,
    })),
  };
}

/** Insights article (BlogPosting), published by the organisation. */
export function articleSchema({
  headline,
  description,
  path,
  datePublished,
  author,
  image,
}: {
  headline: string;
  description: string;
  path: string;
  datePublished: string | null;
  author: string;
  image?: string;
}) {
  const url = `${site.url}${path}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline,
    description,
    url,
    mainEntityOfPage: url,
    ...(datePublished ? { datePublished } : {}),
    image: `${site.url}${image ?? "/opengraph-image"}`,
    author:
      author && author !== site.name
        ? { "@type": "Person", name: author }
        : { "@type": "Organization", name: site.name, url: site.url },
    publisher: { "@type": "Organization", name: site.name, url: site.url },
  };
}
