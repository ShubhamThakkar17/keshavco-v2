"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import Button from "@/components/ui/Button";
import { CheckIcon } from "@/components/graphics/CompareIcons";
import { EMAIL_PATTERN, Field, Honeypot, describedBy, inputClass, textareaClass } from "@/components/forms/Field";
import { careersPage } from "@/content/careers";
import { contactFormV3 } from "@/content/misc";
import { site } from "@/content/site";

type Errors = Record<string, string>;
type Status = "idle" | "submitting" | "success" | "error";

/**
 * Open application form (decision log #7): the CV is a link (LinkedIn, Drive
 * or a portfolio), not an upload. Posts to `/api/careers`, which forwards to
 * the forms Apps Script (a "careers" tab in the sheet, and an email).
 */
export default function CareersForm() {
  const copy = careersPage.form;
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  const validate = (data: FormData): Errors => {
    const next: Errors = {};
    const value = (name: string) => String(data.get(name) ?? "").trim();
    if (!value("name")) next.name = copy.requiredError;
    if (!value("email")) next.email = copy.requiredError;
    else if (!EMAIL_PATTERN.test(value("email"))) next.email = copy.emailError;
    if (!value("link")) next.link = copy.requiredError;
    else if (!/^https?:\/\/\S+$/i.test(value("link"))) next.link = copy.linkError;
    if (!value("message")) next.message = copy.requiredError;
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
    setStatus("submitting");
    try {
      const response = await fetch("/api/careers", {
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
        className="flex min-h-[24rem] flex-col items-start justify-center"
        role="status"
      >
        <span aria-hidden="true" className="grid h-12 w-12 place-items-center rounded-full bg-growth/15 text-growth-ink">
          <CheckIcon className="h-5 w-5" />
        </span>
        <h3 className="type-display-m mt-6 text-ink">{copy.success.heading}</h3>
        <p className="type-body mt-3 max-w-md text-ink-2">{copy.success.body}</p>
      </motion.div>
    );
  }

  const control = (name: string, hint?: string) => ({
    id: `careers-${name}`,
    name,
    "aria-invalid": Boolean(errors[name]),
    "aria-describedby": describedBy(`careers-${name}`, errors[name], hint),
  });
  const f = copy.fields;

  return (
    <form onSubmit={onSubmit} noValidate className="relative">
      <Honeypot label={contactFormV3.honeypotLabel} />
      <div className="grid gap-x-6 gap-y-7 sm:grid-cols-2">
        <Field id="careers-name" label={f.name.label} required error={errors.name} className="sm:col-span-2">
          <input {...control("name")} type="text" autoComplete="name" placeholder={f.name.placeholder} className={inputClass} />
        </Field>
        <Field id="careers-email" label={f.email.label} required error={errors.email}>
          <input {...control("email")} type="email" autoComplete="email" placeholder={f.email.placeholder} className={inputClass} />
        </Field>
        <Field id="careers-phone" label={f.phone.label}>
          <input {...control("phone")} type="tel" autoComplete="tel" placeholder={f.phone.placeholder} className={inputClass} />
        </Field>
        <Field id="careers-city" label={f.city.label}>
          <input {...control("city")} type="text" autoComplete="address-level2" placeholder={f.city.placeholder} className={inputClass} />
        </Field>
        <Field id="careers-area" label={copy.areaLabel}>
          <select {...control("area")} defaultValue="" className={inputClass}>
            <option value="" disabled>
              {copy.areaPlaceholder}
            </option>
            {copy.areas.map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </select>
        </Field>
        <fieldset className="sm:col-span-2">
          <legend className="type-mono-s text-ink-2">{copy.joinLabel}</legend>
          <div className="mt-3 inline-flex flex-wrap rounded-[10px] bg-paper-2 p-1">
            {copy.joinOptions.map((option, index) => (
              <label key={option} className="relative cursor-pointer">
                <input
                  type="radio"
                  name="join"
                  value={option}
                  defaultChecked={index === copy.joinOptions.length - 1}
                  className="peer absolute inset-0 cursor-pointer opacity-0"
                />
                <span className="type-mono-s flex min-h-10 items-center rounded-[7px] px-3.5 text-ink-2 transition-colors peer-checked:bg-ink peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-signal">
                  {option}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
        <Field id="careers-link" label={f.link.label} required error={errors.link} hint={f.link.hint} className="sm:col-span-2">
          <input {...control("link", f.link.hint)} type="url" inputMode="url" placeholder={f.link.placeholder} className={inputClass} />
        </Field>
        <Field id="careers-message" label={f.message.label} required error={errors.message} className="sm:col-span-2">
          <textarea {...control("message")} rows={4} placeholder={f.message.placeholder} className={textareaClass} />
        </Field>
      </div>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" size="lg" disabled={status === "submitting"}>
          {status === "submitting" ? copy.sending : copy.submit}
        </Button>
        <p className="type-body-s max-w-xs text-ink-2">{copy.consent}</p>
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
              copy.error
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
