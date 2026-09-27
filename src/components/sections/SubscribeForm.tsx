"use client";

import { useState, type FormEvent } from "react";
import Button from "@/components/ui/Button";
import { EMAIL_PATTERN, Honeypot, inputClass } from "@/components/forms/Field";
import { insightsV3, contactFormV3 } from "@/content/misc";
import { newsletter, site } from "@/content/site";

type Status = "idle" | "submitting" | "success" | "error" | "invalid";

/**
 * Insights newsletter sign-up (decision log #9): one email field, posting to
 * `/api/subscribe`, which forwards to the forms Apps Script ("subscribe" tab
 * and an email to hello@keshavco.com). Built for the night card.
 */
export default function SubscribeForm() {
  const copy = insightsV3.subscribe;
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") ?? "").trim();
    if (!EMAIL_PATTERN.test(email)) {
      setStatus("invalid");
      form.querySelector<HTMLInputElement>("#subscribe-email")?.focus();
      return;
    }
    setStatus("submitting");
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...Object.fromEntries(data.entries()), source: "insights" }),
      });
      if (!response.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <p role="status" className="type-body-l text-white">
        {newsletter.success}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative">
      <Honeypot label={contactFormV3.honeypotLabel} />
      <label htmlFor="subscribe-email" className="type-mono-s block text-white/60">
        {copy.emailLabel}
      </label>
      <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-end">
        <input
          id="subscribe-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder={newsletter.placeholder}
          aria-invalid={status === "invalid"}
          aria-describedby={status === "invalid" ? "subscribe-error" : undefined}
          className={`${inputClass} sm:flex-1`}
        />
        <Button type="submit" tone="night" disabled={status === "submitting"}>
          {status === "submitting" ? copy.sending : newsletter.button}
        </Button>
      </div>
      {status === "invalid" && (
        <p id="subscribe-error" className="type-body-s mt-2 text-red-300">
          {copy.error}
        </p>
      )}
      {status === "error" && (
        <p role="alert" className="type-body-s mt-2 text-red-300">
          {copy.failed}{" "}
          <a className="underline" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          .
        </p>
      )}
    </form>
  );
}
