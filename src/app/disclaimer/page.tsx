import type { Metadata } from "next";
import LegalPage from "@/components/layout/LegalPage";
import { legalPages } from "@/content/misc";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: `${legalPages["disclaimer"].title} — KeshavCo`,
  description: legalPages["disclaimer"].intro,
  path: "/disclaimer",
});

export default function DisclaimerPage() {
  return <LegalPage slug="disclaimer" />;
}
