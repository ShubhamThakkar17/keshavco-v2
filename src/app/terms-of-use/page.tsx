import type { Metadata } from "next";
import LegalPage from "@/components/layout/LegalPage";
import { legalPages } from "@/content/misc";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: `${legalPages["terms-of-use"].title} — KeshavCo`,
  description: legalPages["terms-of-use"].intro,
  path: "/terms-of-use",
});

export default function TermsOfUsePage() {
  return <LegalPage slug="terms-of-use" />;
}
