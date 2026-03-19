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
  marginBottom: 12,
};

const rowStyle: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 12,
  marginBottom: 12,
};

const fieldStyle: React.CSSProperties = {
  flex: "1 1 140px",
  minWidth: 140,
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  borderRadius: 8,
  border: "1px solid #e5e7eb",
  padding: "6px 10px",
  fontSize: 14,
  boxSizing: "border-box",
};

const selectStyle: React.CSSProperties = inputStyle;

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
  fontFamily:
    "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  fontSize: 13,
  wordBreak: "break-all",
};

export default function DMARCGenerator() {
  const [policy, setPolicy] = useState<"none" | "quarantine" | "reject">(
    "none"
  );
  const [rua, setRua] = useState("");
  const [ruf, setRuf] = useState("");
  const [pct, setPct] = useState("100");
  const [adkim, setAdkim] = useState<"r" | "s">("r");
  const [aspf, setAspf] = useState<"r" | "s">("r");
  const [output, setOutput] = useState("");

  function handleGenerate() {
    if (!rua) {
      setOutput("");
      return;
    }

    const parts: string[] = [];
    parts.push("v=DMARC1");
    parts.push(`p=${policy}`);
    parts.push(`rua=mailto:${rua}`);

    if (ruf.trim()) {
      parts.push(`ruf=mailto:${ruf.trim()}`);
    }

    const pctValue = pct.trim() || "100";
    parts.push(`pct=${pctValue}`);
    parts.push(`adkim=${adkim}`);
    parts.push(`aspf=${aspf}`);

    setOutput(parts.join("; "));
  }

  return (
    <section style={containerStyle}>
      <label style={labelStyle}>DMARC record generator</label>
      <p style={helperStyle}>
        Choose your policy, reporting addresses, and alignment settings. Then
        copy the generated DMARC TXT value into DNS at <code>_dmarc.yourdomain</code>.
      </p>

      <div style={rowStyle}>
        <div style={fieldStyle}>
          <label style={labelStyle} htmlFor="dmarc-policy">
            Policy (p)
          </label>
          <select
            id="dmarc-policy"
            style={selectStyle}
            value={policy}
            onChange={(e) =>
              setPolicy(e.target.value as "none" | "quarantine" | "reject")
            }
          >
            <option value="none">none (monitor only)</option>
            <option value="quarantine">quarantine</option>
            <option value="reject">reject</option>
          </select>
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle} htmlFor="dmarc-pct">
            pct (percentage)
          </label>
          <input
            id="dmarc-pct"
            type="number"
            min={1}
            max={100}
            style={inputStyle}
            value={pct}
            onChange={(e) => setPct(e.target.value)}
          />
        </div>
      </div>

      <div style={rowStyle}>
        <div style={fieldStyle}>
          <label style={labelStyle} htmlFor="dmarc-rua">
            rua (aggregate reports)
          </label>
          <input
            id="dmarc-rua"
            type="email"
            style={inputStyle}
            placeholder="dmarc@example.com"
            value={rua}
            onChange={(e) => setRua(e.target.value)}
          />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle} htmlFor="dmarc-ruf">
            ruf (forensic reports, optional)
          </label>
          <input
            id="dmarc-ruf"
            type="email"
            style={inputStyle}
            placeholder="dmarc-forensic@example.com"
            value={ruf}
            onChange={(e) => setRuf(e.target.value)}
          />
        </div>
      </div>

      <div style={rowStyle}>
        <div style={fieldStyle}>
          <label style={labelStyle} htmlFor="dmarc-adkim">
            adkim (DKIM alignment)
          </label>
          <select
            id="dmarc-adkim"
            style={selectStyle}
            value={adkim}
            onChange={(e) => setAdkim(e.target.value as "r" | "s")}
          >
            <option value="r">relaxed (r)</option>
            <option value="s">strict (s)</option>
          </select>
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle} htmlFor="dmarc-aspf">
            aspf (SPF alignment)
          </label>
          <select
            id="dmarc-aspf"
            style={selectStyle}
            value={aspf}
            onChange={(e) => setAspf(e.target.value as "r" | "s")}
          >
            <option value="r">relaxed (r)</option>
            <option value="s">strict (s)</option>
          </select>
        </div>
      </div>

      <button type="button" style={buttonStyle} onClick={handleGenerate}>
        Generate DMARC
      </button>

      {output && (
        <div style={outputBoxStyle}>
          <div style={{ marginBottom: 4, color: "#6b7280" }}>
            Generated DMARC record:
          </div>
          <div>{output}</div>
        </div>
      )}
    </section>
  );
}

