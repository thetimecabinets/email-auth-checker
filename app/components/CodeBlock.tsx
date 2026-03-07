"use client";

import * as React from "react";

type CodeBlockProps = {
  title?: string;
  code: string;
  language?: string;
  className?: string;
};

export default function CodeBlock({
  title,
  code,
  language,
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      const el = document.createElement("textarea");
      el.value = code;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);

      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    }
  }

  return (
    <section className={`codeblock ${className ?? ""}`}>
      {(title || language) && (
        <div className="codeblock-header">
          <div>
            {title && <div className="codeblock-title">{title}</div>}
            {language && <div className="codeblock-language">{language}</div>}
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className="codeblock-copy"
          >
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      )}

      <div className="codeblock-body">
        <pre className="codeblock-pre">
          <code>{code}</code>
        </pre>
      </div>
    </section>
  );
}