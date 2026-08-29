"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect, useRef, useState } from "react";
import { booking, site } from "@/content/site";

/** How long to wait for Cal's iframe before showing the fallback. */
const TIMEOUT_MS = 9000;

/**
 * The Cal.com booking calendar, embedded inline.
 *
 * Readiness is judged by watching for Cal's `iframe` to appear in the
 * container, not by whether `getCalApi()` resolved — that promise settles as
 * soon as the queue is set up, long before (and regardless of whether)
 * `embed.js` actually loads. An ad blocker, a strict corporate network or a
 * Cal outage would otherwise leave a silent empty box on the page.
 */
export default function BookingEmbed() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "failed">("loading");

  useEffect(() => {
    let settled = false;

    const markReady = () => {
      if (settled) return;
      settled = true;
      setStatus("ready");
    };

    void getCalApi({ namespace: booking.namespace })
      .then((cal) => cal("ui", { hideEventTypeDetails: false, layout: "month_view" }))
      .catch(() => {
        /* Readiness is decided by the iframe check below, not by this call. */
      });

    const node = containerRef.current;
    if (node?.querySelector("iframe")) markReady();

    const observer = new MutationObserver(() => {
      if (node?.querySelector("iframe")) {
        markReady();
        observer.disconnect();
      }
    });
    if (node) observer.observe(node, { childList: true, subtree: true });

    const timer = window.setTimeout(() => {
      if (settled) return;
      settled = true;
      setStatus("failed");
    }, TIMEOUT_MS);

    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <div className="relative min-h-[36rem] overflow-hidden rounded-3xl border border-navy-900/10 bg-white">
      {status !== "ready" && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-white px-8 text-center">
          {status === "loading" ? (
            <>
              <span
                aria-hidden="true"
                className="bg-gradient-brand h-1 w-24 animate-pulse rounded-full"
              />
              <p className="text-sm text-navy-400">Loading available times…</p>
            </>
          ) : (
            <>
              <p className="font-display text-lg font-semibold text-navy-900">
                The calendar did not load.
              </p>
              <p className="max-w-sm text-sm leading-relaxed text-navy-500">
                Open it in a new tab, or use the enquiry form below and we will come back with
                times.
              </p>
              <div className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm font-semibold">
                <a
                  href={booking.directUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-indigo-brand underline-offset-4 hover:underline"
                >
                  Open the booking page →
                </a>
                <a
                  href={site.phoneHref}
                  className="text-navy-900 underline-offset-4 hover:underline"
                >
                  {site.phone}
                </a>
              </div>
            </>
          )}
        </div>
      )}

      <div ref={containerRef} className="h-full min-h-[36rem]">
        <Cal
          namespace={booking.namespace}
          calLink={booking.calLink}
          style={{ width: "100%", height: "100%", minHeight: "36rem", overflow: "scroll" }}
          config={{ layout: "month_view", useSlotsViewOnSmallScreen: "true" }}
        />
      </div>
    </div>
  );
}
