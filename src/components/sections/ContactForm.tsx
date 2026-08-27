"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { contactForm, site } from "@/content/site";
import Button from "@/components/ui/Button";

type Errors = Record<string, string>;
type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "h-12 w-full rounded-xl border border-navy-900/12 bg-white px-4 text-sm text-navy-900 transition-colors placeholder:text-navy-300 focus:border-indigo-brand focus:outline-none";

export default function ContactForm({ defaultInterest }: { defaultInterest?: string }) {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  const validate = (data: FormData): Errors => {
    const next: Errors = {};
    for (const field of contactForm.fields) {
      if (!field.required) continue;
      const value = String(data.get(field.name) ?? "").trim();
      if (!value) next[field.name] = contactForm.requiredError;
    }
    const email = String(data.get("email") ?? "").trim();
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = contactForm.emailError;
    }
    if (!String(data.get("message") ?? "").trim()) {
      next.message = contactForm.requiredError;
    }
    return next;
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setStatus("error");
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data.entries())),
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
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-3xl border border-navy-900/10 bg-white p-10 text-center"
        role="status"
      >
        <span
          aria-hidden="true"
          className="bg-gradient-brand mx-auto flex h-14 w-14 items-center justify-center rounded-full text-2xl text-white"
        >
          ✓
        </span>
        <h3 className="font-display mt-6 text-2xl font-bold tracking-tight text-navy-900">
          {contactForm.success.heading}
        </h3>
        <p className="mx-auto mt-3 max-w-md text-[0.95rem] leading-relaxed text-navy-500">
          {contactForm.success.body}
        </p>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-3xl border border-navy-900/10 bg-white p-8 sm:p-10"
    >
      <h2 className="font-display text-2xl font-bold tracking-tight text-navy-900">
        {contactForm.heading}
      </h2>
      <p className="mt-3 text-[0.92rem] leading-relaxed text-navy-500">{contactForm.body}</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {contactForm.fields.map((field) => (
          <div key={field.name} className={field.name === "name" ? "sm:col-span-2" : undefined}>
            <label
              htmlFor={field.name}
              className="mb-2 block text-[0.8rem] font-medium text-navy-700"
            >
              {field.label}
              {field.required && (
                <span className="text-indigo-brand" aria-hidden="true">
                  {" "}
                  *
                </span>
              )}
            </label>
            <input
              id={field.name}
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
              autoComplete={
                field.name === "email"
                  ? "email"
                  : field.name === "phone"
                    ? "tel"
                    : field.name === "name"
                      ? "name"
                      : field.name === "company"
                        ? "organization"
                        : "off"
              }
              aria-invalid={Boolean(errors[field.name])}
              aria-describedby={errors[field.name] ? `${field.name}-error` : undefined}
              className={`${inputClass} ${errors[field.name] ? "border-red-500" : ""}`}
            />
            {errors[field.name] && (
              <p id={`${field.name}-error`} className="mt-1.5 text-xs text-red-600">
                {errors[field.name]}
              </p>
            )}
          </div>
        ))}

        <div>
          <label htmlFor="industry" className="mb-2 block text-[0.8rem] font-medium text-navy-700">
            Industry
          </label>
          <select id="industry" name="industry" defaultValue="" className={inputClass}>
            <option value="" disabled>
              Select your industry
            </option>
            {contactForm.industries.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="interest" className="mb-2 block text-[0.8rem] font-medium text-navy-700">
            What do you need help with?
          </label>
          <select
            id="interest"
            name="interest"
            defaultValue={defaultInterest ?? ""}
            className={inputClass}
          >
            <option value="" disabled>
              Select an area
            </option>
            {contactForm.interests.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="message" className="mb-2 block text-[0.8rem] font-medium text-navy-700">
            {contactForm.messageLabel}
            <span className="text-indigo-brand" aria-hidden="true">
              {" "}
              *
            </span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            placeholder={contactForm.messagePlaceholder}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-error" : undefined}
            className={`w-full rounded-xl border border-navy-900/12 bg-white p-4 text-sm text-navy-900 transition-colors placeholder:text-navy-300 focus:border-indigo-brand focus:outline-none ${
              errors.message ? "border-red-500" : ""
            }`}
          />
          {errors.message && (
            <p id="message-error" className="mt-1.5 text-xs text-red-600">
              {errors.message}
            </p>
          )}
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" size="lg" withArrow disabled={status === "submitting"}>
          {status === "submitting" ? "Sending…" : contactForm.submitLabel}
        </Button>
        <p className="max-w-xs text-xs leading-relaxed text-navy-400">{contactForm.consent}</p>
      </div>

      <AnimatePresence>
        {status === "error" && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            role="alert"
            className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-xs text-red-700"
          >
            {Object.keys(errors).length > 0 ? (
              contactForm.error
            ) : (
              <>
                Something went wrong sending that. Please email{" "}
                <a className="underline" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
                .
              </>
            )}
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}
