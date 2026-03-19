"use client";

import { useState } from "react";

const containerStyle: React.CSSProperties = {
  background: "#fffbeb",
  border: "1px solid #facc15",
  borderRadius: 12,
  padding: 24,
  marginTop: 24,
  boxShadow: "0 1px 0 rgba(0,0,0,0.02)",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontWeight: 600,
  marginBottom: 8,
};

const helperStyle: React.CSSProperties = {
  fontSize: 13,
  color: "#6b7280",
  marginBottom: 8,
};

const textareaStyle: React.CSSProperties = {
  width: "100%",
  minHeight: 80,
  borderRadius: 8,
  border: "1px solid #e5e7eb",
  padding: 10,
  fontFamily:
    "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  fontSize: 13,
  resize: "vertical",
  boxSizing: "border-box",
  marginBottom: 16,
};

const buttonStyle: React.CSSProperties = {
  marginTop: 8,
  padding: "10px 18px",
  borderRadius: 999,
  border: "none",
  background: "#eab308",
  color: "#111827",
  fontWeight: 600,
  cursor: "pointer",
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
};

const outputBoxStyle: React.CSSProperties = {
  marginTop: 16,
  borderRadius: 8,
  border: "1px solid #e5e7eb",
  background: "#f9fafb",
  padding: 12,
  fontSize: 13,
};

export default function SPFLookupChecker() {
  const [input, setInput] = useState("");
  const [count, setCount] = useState<number | null>(null);

  function handleCheck() {
    const text = input.toLowerCase();

    const includeCount = (text.match(/include:/g) || []).length;
    const aCount = (text.match(/\ba\b/g) || []).length;
    const mxCount = (text.match(/\bmx\b/g) || []).length;
    const redirectCount = (text.match(/redirect=/g) || []).length;

    const total = includeCount + aCount + mxCount + redirectCount;
    setCount(total);
  }

  return (
    <section style={containerStyle}>
      <label style={labelStyle} htmlFor="spf-lookup-input">
        SPF DNS lookup checker
      </label>
      <p style={helperStyle}>
        Paste a single SPF record. This helper counts includes, A, MX, and
        redirect mechanisms to estimate DNS lookups.
      </p>
      <textarea
        id="spf-lookup-input"
        style={textareaStyle}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={`v=spf1 include:_spf.google.com include:sendgrid.net a mx ~all`}
      />
      <button type="button" style={buttonStyle} onClick={handleCheck}>
        Check lookups
      </button>
      {count !== null && (
        <div style={outputBoxStyle}>
          <div>Estimated DNS lookups: {count}</div>
          {count > 10 && (
            <div style={{ marginTop: 4, color: "#b91c1c" }}>
              This record likely exceeds the SPF limit of 10 DNS lookups. Consider
              simplifying includes, A, MX, or redirect mechanisms.
            </div>
          )}
        </div>
      )}
    </section>
  );
}

