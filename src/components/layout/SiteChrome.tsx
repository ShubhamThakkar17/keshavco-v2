"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * The site frame (skip link, smooth scroll, header, `main`, footer), left
 * out on the /keystatic editor so the admin gets the whole window.
 */
export default function SiteChrome({
  skipLabel,
  smooth,
  header,
  footer,
  children,
}: {
  skipLabel: string;
  smooth: ReactNode;
  header: ReactNode;
  footer: ReactNode;
  children: ReactNode;
}) {
  const pathname = usePathname();
  if (pathname?.startsWith("/keystatic")) return <>{children}</>;

  return (
    <>
      <a href="#main" className="skip-link">
        {skipLabel}
      </a>
      {smooth}
      {header}
      {/* main lifts off the footer, which is revealed from behind it. */}
      <main
        id="main"
        className="relative z-[1] rounded-b-[20px] bg-paper pb-2 shadow-[0_24px_48px_-24px_rgb(8_13_24/0.45)] md:rounded-b-[var(--radius-lg)]"
      >
        {children}
      </main>
      {footer}
    </>
  );
}
