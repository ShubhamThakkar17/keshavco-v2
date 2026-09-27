import type { Metadata } from "next";
import KeystaticApp from "./keystatic";
import { cmsAdmin } from "@/content/misc";
import { cmsConnected } from "@/lib/cmsConnected";

export const metadata: Metadata = {
  title: cmsAdmin.title,
  robots: { index: false, follow: false },
};

/**
 * The Insights / Our Work editor (Keystatic). The site header, footer and
 * smooth scrolling are left out on this route (see SiteChrome).
 *
 * Deployed, it needs the GitHub App variables from docs/cms/README.md; until
 * they exist the page explains that instead of showing a broken editor.
 */
export default function KeystaticLayout() {
  if (!cmsConnected()) {
    return (
      <div className="grid min-h-[100svh] place-items-center bg-paper px-6">
        <div className="max-w-md">
          <p className="type-mono-s text-ink-2">{cmsAdmin.tag}</p>
          <h1 className="type-display-m mt-4 text-ink">{cmsAdmin.notConnected.heading}</h1>
          <p className="type-body mt-3 text-ink-2">{cmsAdmin.notConnected.body}</p>
        </div>
      </div>
    );
  }
  return <KeystaticApp />;
}
