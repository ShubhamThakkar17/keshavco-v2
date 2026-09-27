import type { Metadata, Viewport } from "next";
import { Sora, Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/motion/SmoothScroll";
import { site } from "@/content/site";
import { organizationSchema } from "@/lib/seo";
import { MOTION_STORAGE_KEY } from "@/lib/motionPreference";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sora",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: false,
});

/** Labels, tags and diagram annotations only (brief §5.2). */
const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-geist-mono",
  display: "swap",
  preload: false,
});

/**
 * Runs before first paint: marks the page as scripted (so CSS can park
 * odometers at 0 without a flash) and restores the visitor's "Motion: Off"
 * choice. Wrapped in try/catch because storage can be blocked.
 */
const bootScript = `(function(){var d=document.documentElement;d.classList.add("js");try{if(localStorage.getItem("${MOTION_STORAGE_KEY}")==="off")d.setAttribute("data-motion","off")}catch(e){}})();`;

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
    // The boot script adds a class and possibly data-motion before hydration.
    <html
      lang="en-IN"
      className={`${sora.variable} ${inter.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body className="bg-paper antialiased">
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
        {/* main lifts off the footer, which is revealed from behind it. */}
        <main
          id="main"
          className="relative z-[1] rounded-b-[20px] bg-paper pb-2 shadow-[0_24px_48px_-24px_rgb(8_13_24/0.45)] md:rounded-b-[var(--radius-lg)]"
        >
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
