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
  minHeight: 120,
  borderRadius: 8,
  border: "1px solid #e5e7eb",
  padding: 10,
  fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  fontSize: 13,
  resize: "vertical",
  boxSizing: "border-box",
  marginBottom: 16,
};

const buttonStyle: React.CSSProperties = {
  marginTop: 12,
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
  padding: 12,
  borderRadius: 8,
  border: "1px solid #e5e7eb",
  background: "#f9fafb",
  fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  fontSize: 13,
  wordBreak: "break-all",
  marginTop: 16,
  marginBottom: 16,
};

export default function SPFMergeTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  function handleMerge() {
    const lines = input
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);

    const mechanisms: string[] = [];

    for (const line of lines) {
      // strip leading v=spf1 if present (case-insensitive)
      const withoutPrefix = line.replace(/^v=spf1\s*/i, "");
      // strip trailing all/qualifier if present
      const withoutAll = withoutPrefix.replace(/\s+[~+\-?]?all\s*$/i, "");

      const parts = withoutAll.split(/\s+/).filter(Boolean);
      for (const part of parts) {
        if (!mechanisms.includes(part)) {
          mechanisms.push(part);
        }
      }
    }

    const merged =
      mechanisms.length > 0
        ? `v=spf1 ${mechanisms.join(" ")} ~all`
        : "v=spf1 ~all";

    setOutput(merged);
  }

  return (
    <section style={containerStyle}>
      <label style={labelStyle} htmlFor="spf-merge-input">
        Merge multiple SPF records
      </label>
      <p style={helperStyle}>
        Paste multiple SPF records, one per line. We will merge the mechanisms
        into a single policy.
      </p>
      <textarea
        id="spf-merge-input"
        style={textareaStyle}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={`v=spf1 include:_spf.google.com ~all\nv=spf1 include:sendgrid.net ~all`}
      />
      <button type="button" style={buttonStyle} onClick={handleMerge}>
        Merge SPF
      </button>
      {output && (
        <div style={outputBoxStyle}>
          <div style={{ marginBottom: 4, color: "#6b7280" }}>Merged SPF:</div>
          <div>{output}</div>
        </div>
      )}
    </section>
  );
}

