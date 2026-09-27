"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import BookingEmbed from "@/components/sections/BookingEmbed";
import ContactForm, { type EnquiryDefaults } from "@/components/sections/ContactForm";
import { contactV3 } from "@/content/misc";

type Tab = "book" | "enquiry";
const order: Tab[] = ["book", "enquiry"];

/**
 * /contact card (brief §9.4): tabs for "Book a call" (the Cal.com embed) and
 * "Send an enquiry" (the form).
 *
 * - `/contact#book` (every "Book a consultation" button) selects booking,
 *   including when the link is followed from this page.
 * - `/contact?intent=proposal&package=grow` selects the form with those
 *   fields preselected.
 * - The booking embed mounts the first time its tab opens and then stays
 *   mounted, so its 9-second fallback timer starts when a visitor can see it.
 */
export default function ContactTabs() {
  const copy = contactV3.tabs;
  const [tab, setTab] = useState<Tab>("enquiry");
  const [bookingMounted, setBookingMounted] = useState(false);
  const [defaults, setDefaults] = useState<EnquiryDefaults>({});
  const [formKey, setFormKey] = useState(0);
  const buttons = useRef<Record<Tab, HTMLButtonElement | null>>({ book: null, enquiry: null });

  const select = useCallback((next: Tab) => {
    setTab(next);
    if (next === "book") setBookingMounted(true);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const intent = params.get("intent") ?? undefined;
    const pkg = params.get("package") ?? undefined;
    if (window.location.hash === "#book") {
      select("book");
    } else if (intent || pkg) {
      setDefaults({ intent, package: pkg });
      setFormKey((key) => key + 1);
    }

    const onHash = () => {
      if (window.location.hash === "#book") select("book");
    };
    // Next's client navigation to "#book" on the same page does not fire
    // hashchange, so catch the click on the link itself as well.
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.("a[href]");
      const href = link?.getAttribute("href") ?? "";
      if (href.endsWith("#book") && (href.startsWith("#") || href.startsWith("/contact"))) select("book");
      if (href === "#enquiry") select("enquiry");
    };
    window.addEventListener("hashchange", onHash);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("hashchange", onHash);
      document.removeEventListener("click", onClick);
    };
  }, [select]);

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const index = order.indexOf(tab);
    const next =
      event.key === "Home"
        ? order[0]
        : event.key === "End"
          ? order[order.length - 1]
          : order[(index + (event.key === "ArrowRight" ? 1 : -1) + order.length) % order.length];
    select(next);
    buttons.current[next]?.focus();
  };

  return (
    <div id="book" className="relative scroll-mt-24 rounded-[var(--radius-lg)] border border-line bg-card p-2 shadow-[0_24px_48px_-32px_rgb(15_23_42/0.35)]">
      {/* Target for "#enquiry" links (the phone jump buttons). */}
      <span id="enquiry" aria-hidden="true" className="absolute -top-24 left-0" />
      <div role="tablist" aria-label={copy.label} className="grid grid-cols-2 gap-1 rounded-[20px] bg-paper-2 p-1">
        {order.map((id) => (
          <button
            key={id}
            ref={(node) => {
              buttons.current[id] = node;
            }}
            type="button"
            role="tab"
            id={`contact-tab-${id}`}
            aria-selected={tab === id}
            aria-controls={`contact-panel-${id}`}
            tabIndex={tab === id ? 0 : -1}
            onClick={() => select(id)}
            onKeyDown={onKeyDown}
            className={`type-mono flex min-h-11 items-center justify-center gap-2 rounded-[16px] px-3 transition-colors ${
              tab === id ? "bg-card text-ink shadow-[0_1px_2px_rgb(15_23_42/0.12)]" : "text-ink-2 hover:text-ink"
            }`}
          >
            <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${tab === id ? "bg-signal" : "bg-ink/25"}`} />
            {copy[id]}
          </button>
        ))}
      </div>
      <div
        role="tabpanel"
        id="contact-panel-book"
        aria-labelledby="contact-tab-book"
        hidden={tab !== "book"}
        className="p-2 pt-3 sm:p-3"
      >
        {bookingMounted && <BookingEmbed />}
      </div>
      <div
        role="tabpanel"
        id="contact-panel-enquiry"
        aria-labelledby="contact-tab-enquiry"
        hidden={tab !== "enquiry"}
        className="px-4 pb-6 pt-8 sm:px-8 sm:pb-8"
      >
        <ContactForm key={formKey} defaults={defaults} />
      </div>
    </div>
  );
}
