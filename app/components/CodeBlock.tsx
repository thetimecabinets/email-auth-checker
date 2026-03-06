"use client";

import { useState, useRef } from "react";

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
  className = "",
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleCopy = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(code);
      } else {
        const el = textareaRef.current;
        if (!el) return;

        el.value = code;
        el.select();
        document.execCommand("copy");
      }

      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  return (
    <div className={`codeblock ${className}`}>
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
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      <div className="codeblock-wrapper">
        <pre className="codeblock-pre">
          <code>{code}</code>
        </pre>

        {/* hidden fallback textarea */}
        <textarea
          ref={textareaRef}
          readOnly
          className="codeblock-hidden"
        />
      </div>
    </div>
  );
}