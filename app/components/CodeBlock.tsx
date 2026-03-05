"use client";

import * as React from "react";

type CodeBlockProps = {
  title?: string;
  code: string;
  language?: string; // label only
  className?: string;
};

export default function CodeBlock({
  title,
  code,
  language,
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false);
  const taRef = React.useRef<HTMLTextAreaElement | null>(null);

  async function onCopy() {
    // Attempt modern clipboard first
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1200);
        return;
      }
    } catch {
      // fall through to textarea fallback
    }

    // Fallback: textarea select/copy
    try {
      const el = taRef.current;
      if (!el) return;

      el.value = code;
      el.focus();
      el.select();
      el.setSelectionRange(0, el.value.length); // iOS friendliness
      document.execCommand("copy");

      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch (e) {
      console.error("Copy failed:", e);
    }
  }

  return (
    <section className={["my-6", className ?? ""].join(" ")}>
      {(title || language) && (
        <div className="mb-2 flex items-center justify-between gap-3">
          <div className="min-w-0">
            {title && (
              <div className="text-sm font-semibold text-slate-900">{title}</div>
            )}
            {language && <div className="text-xs text-slate-500">{language}</div>}
          </div>

          <button
            type="button"
            onClick={onCopy}
            className="relative z-10 shrink-0 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
            aria-label="Copy code"
          >
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-950">
        <pre className="m-0 overflow-x-auto p-4 text-sm leading-6 text-slate-100">
          <code>{code}</code>
        </pre>

        {/* hidden fallback - MUST be per-instance (ref, not shared id) */}
        <textarea ref={taRef} readOnly className="sr-only" aria-hidden="true" />
      </div>
    </section>
  );
}