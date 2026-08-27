import type { Metadata, Viewport } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/motion/SmoothScroll";
import { site } from "@/content/site";
import { organizationSchema } from "@/lib/seo";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-sora",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "KeshavCo — Business Growth Partner in India",
    template: "%s",
  },
  description:
    "We help businesses solve growth problems. Strategy, branding, technology and digital marketing under one partner. Book a growth consultation.",
  applicationName: site.name,
  authors: [{ name: site.legalName }],
  keywords: [
    "business growth partner",
    "growth strategy consulting India",
    "branding agency",
    "digital marketing services",
    "fractional CMO",
  ],
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_IN",
    url: site.url,
    title: "KeshavCo — Business Growth Partner",
    description:
      "One partner for strategy, branding, technology and digital marketing. We help businesses solve growth problems.",
  },
  twitter: {
    card: "summary_large_image",
    title: "KeshavCo — Business Growth Partner",
    description:
      "One partner for strategy, branding, technology and digital marketing. We help businesses solve growth problems.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#0F172A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${sora.variable} ${inter.variable}`}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          // Static, first-party schema — no user input reaches this string.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SmoothScroll />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
