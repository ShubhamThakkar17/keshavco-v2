"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import Button from "@/components/ui/Button";
import { CheckIcon } from "@/components/graphics/CompareIcons";
import { EMAIL_PATTERN, Field, Honeypot, describedBy, inputClass, textareaClass } from "@/components/forms/Field";
import { contactForm, site } from "@/content/site";
import { contactFormV3 } from "@/content/misc";
import { growthPackages } from "@/content/packages";

type Errors = Record<string, string>;
type Status = "idle" | "submitting" | "success" | "error";

export type EnquiryDefaults = { intent?: string; package?: string };

/**
 * The enquiry form, v3 look (underline inputs, mono labels). Still posts the
 * same JSON to `/api/enquiry`; the new `intent` and `package` fields are
 * preselected from `/contact?intent=proposal&package=…`, and a hidden
 * honeypot lets the Apps Script drop bot submissions.
 */
export default function ContactForm({ defaults = {} }: { defaults?: EnquiryDefaults }) {
  const copy = contactFormV3;
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const defaultIntent = copy.intents.some((item) => item.value === defaults.intent) ? defaults.intent : copy.intents[0].value;
  const defaultPackage = growthPackages.some((pkg) => pkg.slug === defaults.package) ? defaults.package : "";

  const validate = (data: FormData): Errors => {
    const next: Errors = {};
    for (const field of contactForm.fields) {
      if (!field.required) continue;
      if (!String(data.get(field.name) ?? "").trim()) next[field.name] = contactForm.requiredError;
    }
    const email = String(data.get("email") ?? "").trim();
    if (email && !EMAIL_PATTERN.test(email)) next.email = contactForm.emailError;
    if (!String(data.get("message") ?? "").trim()) next.message = contactForm.requiredError;
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
      // Focus the first invalid field (named before the re-render marks it).
      const first = Object.keys(found)[0];
      (form.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }

    // Readable labels in the sheet, not slugs.
    const intent = copy.intents.find((item) => item.value === data.get("intent"));
    const pkg = growthPackages.find((item) => item.slug === data.get("package"));
    const entries = Object.fromEntries(data.entries());
    const payload = { ...entries, intent: intent?.label ?? "", package: pkg?.name ?? "" };

    setStatus("submitting");
    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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
        className="flex min-h-[28rem] flex-col items-start justify-center"
        role="status"
      >
        <span aria-hidden="true" className="grid h-12 w-12 place-items-center rounded-full bg-growth/15 text-growth-ink">
          <CheckIcon className="h-5 w-5" />
        </span>
        <h3 className="type-display-m mt-6 text-ink">{contactForm.success.heading}</h3>
        <p className="type-body mt-3 max-w-md text-ink-2">{contactForm.success.body}</p>
      </motion.div>
    );
  }

  const control = (name: string) => ({
    id: `enquiry-${name}`,
    name,
    "aria-invalid": Boolean(errors[name]),
    "aria-describedby": describedBy(`enquiry-${name}`, errors[name]),
  });

  return (
    <form onSubmit={onSubmit} noValidate className="relative">
      <h2 className="type-display-m text-ink">{contactForm.heading}</h2>
      <p className="type-body mt-3 max-w-xl text-ink-2">{contactForm.body}</p>
      <Honeypot label={copy.honeypotLabel} />

      <fieldset className="mt-8">
        <legend className="type-mono-s text-ink-2">{copy.intentLabel}</legend>
        <div className="mt-3 inline-flex rounded-[10px] bg-paper-2 p-1">
          {copy.intents.map((item) => (
            <label key={item.value} className="relative cursor-pointer">
              <input
                type="radio"
                name="intent"
                value={item.value}
                defaultChecked={item.value === defaultIntent}
                className="peer absolute inset-0 cursor-pointer opacity-0"
              />
              <span className="type-mono-s flex min-h-10 items-center rounded-[7px] px-3.5 text-ink-2 transition-colors peer-checked:bg-ink peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-signal">
                {item.label}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-8 grid gap-x-6 gap-y-7 sm:grid-cols-2">
        {contactForm.fields.map((field) => (
          <Field
            key={field.name}
            id={`enquiry-${field.name}`}
            label={field.label}
            required={field.required}
            error={errors[field.name]}
            className={field.name === "name" ? "sm:col-span-2" : undefined}
          >
            <input
              {...control(field.name)}
              type={field.type}
              placeholder={field.placeholder}
              autoComplete={
                ({ email: "email", phone: "tel", name: "name", company: "organization" } as Record<string, string>)[
                  field.name
                ] ?? "off"
              }
              className={inputClass}
            />
          </Field>
        ))}

        <Field id="enquiry-industry" label={copy.industryLabel}>
          <select {...control("industry")} defaultValue="" className={inputClass}>
            <option value="" disabled>
              {copy.industryPlaceholder}
            </option>
            {contactForm.industries.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>

        <Field id="enquiry-interest" label={copy.interestLabel}>
          <select {...control("interest")} defaultValue="" className={inputClass}>
            <option value="" disabled>
              {copy.interestPlaceholder}
            </option>
            {contactForm.interests.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>

        <Field id="enquiry-package" label={copy.packageLabel} className="sm:col-span-2">
          <select {...control("package")} defaultValue={defaultPackage} className={inputClass}>
            <option value="">{copy.packagePlaceholder}</option>
            {growthPackages.map((pkg) => (
              <option key={pkg.slug} value={pkg.slug}>
                {`${pkg.name}: ${pkg.line}`}
              </option>
            ))}
          </select>
        </Field>

        <Field id="enquiry-message" label={contactForm.messageLabel} required error={errors.message} className="sm:col-span-2">
          <textarea {...control("message")} rows={4} placeholder={contactForm.messagePlaceholder} className={textareaClass} />
        </Field>
      </div>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" size="lg" disabled={status === "submitting"}>
          {status === "submitting" ? copy.sending : contactForm.submitLabel}
        </Button>
        <p className="type-body-s max-w-xs text-ink-2">{contactForm.consent}</p>
      </div>

      <AnimatePresence>
        {status === "error" && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            role="alert"
            className="type-body-s mt-6 rounded-[var(--radius-sm)] bg-red-50 px-4 py-3 text-red-800"
          >
            {Object.keys(errors).length > 0 ? (
              contactForm.error
            ) : (
              <>
                {copy.failed}{" "}
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
