import type { Metadata } from "next";
import LegalPage from "@/components/layout/LegalPage";
import { legalPages } from "@/content/misc";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: `${legalPages["privacy-policy"].title} — KeshavCo`,
  description: legalPages["privacy-policy"].intro,
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return <LegalPage slug="privacy-policy" />;
}
