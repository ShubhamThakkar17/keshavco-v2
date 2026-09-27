import type { ReactNode } from "react";

/**
 * Oberon-style form controls (brief §9.4): underline inputs, mono labels,
 * errors tied to their field with `aria-describedby`. Shared by the enquiry,
 * careers and subscribe forms.
 */
export const inputClass =
  "block h-12 w-full rounded-none border-0 border-b border-ink/25 bg-transparent px-0 text-[0.9375rem] text-ink transition-colors placeholder:text-ink-2/70 focus:border-signal focus:outline-none aria-[invalid=true]:border-red-700 night:border-white/25 night:text-white night:placeholder:text-white/45 night:focus:border-white";

export const textareaClass = inputClass.replace("h-12", "min-h-32 py-3");

export function Field({
  id,
  label,
  required = false,
  error,
  hint,
  className = "",
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="type-mono-s block text-ink-2 night:text-white/60">
        {label}
        {required && (
          <span aria-hidden="true" className="text-signal night:text-white">
            {" *"}
          </span>
        )}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="type-body-s mt-1.5 text-ink-2 night:text-white/60">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="type-body-s mt-1.5 text-red-700 night:text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}

/** Describedby for a control: its error when shown, else its hint. */
export const describedBy = (id: string, error?: string, hint?: string) =>
  error ? `${id}-error` : hint ? `${id}-hint` : undefined;

/**
 * Hidden anti-spam field. People never see or reach it (off-screen, removed
 * from the tab order, hidden from assistive tech); bots that fill every
 * input do, and those submissions are dropped.
 */
export function Honeypot({ label }: { label: string }) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
      <label htmlFor="website">{label}</label>
      <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
    </div>
  );
}

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
