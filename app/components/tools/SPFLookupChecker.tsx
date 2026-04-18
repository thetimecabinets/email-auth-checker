"use client";

import { useEffect, useState } from "react";

type Breakdown = {
  include: number;
  a: number;
  mx: number;
  redirect: number;
  total: number;
};

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

function computeBreakdown(raw: string): Breakdown {
  const text = raw.toLowerCase().trim();
  const includeCount = (text.match(/include:/g) || []).length;
  const redirectCount = (text.match(/redirect=/g) || []).length;

  let aCount = 0;
  let mxCount = 0;
  const tokens = text.split(/\s+/).filter(Boolean);
  for (const token of tokens) {
    const cleaned = token.replace(/^[+?~-]/, "");
    if (cleaned.startsWith("include:") || cleaned.startsWith("redirect=")) {
      continue;
    }
    if (cleaned === "a" || cleaned.startsWith("a:") || cleaned.startsWith("a/")) {
      aCount++;
    } else if (
      cleaned === "mx" ||
      cleaned.startsWith("mx:") ||
      cleaned.startsWith("mx/")
    ) {
      mxCount++;
    }
  }

  const total = includeCount + aCount + mxCount + redirectCount;
  return {
    include: includeCount,
    a: aCount,
    mx: mxCount,
    redirect: redirectCount,
    total,
  };
}

export default function SPFLookupChecker() {
  const [input, setInput] = useState("");
  const [breakdown, setBreakdown] = useState<Breakdown | null>(null);
  const [hasRun, setHasRun] = useState(false);

  useEffect(() => {
    setBreakdown(null);
    setHasRun(false);
  }, [input]);

  function handleCheck() {
    const trimmed = input.trim();
    if (!trimmed) return;
    setBreakdown(computeBreakdown(trimmed));
    setHasRun(true);
  }

  const tier =
    breakdown === null
      ? null
      : breakdown.total === 0
      ? "empty"
      : breakdown.total <= 7
      ? "safe"
      : breakdown.total <= 10
      ? "warn"
      : "risk";

  return (
    <>
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
          placeholder="v=spf1 include:_spf.google.com include:sendgrid.net a mx ~all"
        />

        <button
          type="button"
          style={{
            ...buttonStyle,
            opacity: !input.trim() ? 0.5 : 1,
            cursor: !input.trim() ? "not-allowed" : "pointer",
          }}
          onClick={handleCheck}
          disabled={!input.trim()}
        >
          Check lookups
        </button>
      </section>

      {hasRun && breakdown !== null && tier !== null && (
        <div
          className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
          style={{ animation: "spfResultFade 0.35s ease-out forwards" }}
        >
          <style>{`
            @keyframes spfResultFade {
              from { opacity: 0; transform: translateY(6px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>

          {tier === "safe" && (
            <p className="text-2xl font-bold leading-snug text-green-600">
              SPF looks healthy
            </p>
          )}
          {tier === "warn" && (
            <p className="text-2xl font-bold leading-snug text-yellow-600">
              SPF is close to limit
            </p>
          )}
          {tier === "risk" && (
            <p className="text-2xl font-bold leading-snug text-red-600">
              SPF likely failing (permerror risk)
            </p>
          )}
          {tier === "empty" && (
            <p className="text-2xl font-bold leading-snug text-gray-600">
              No SPF mechanisms counted
            </p>
          )}

          <p className="mt-3 text-sm text-gray-600">
            You are using {breakdown.total} DNS lookups. SPF allows a maximum of
            10.
          </p>

          {tier === "warn" && (
            <p className="mt-3 text-sm font-medium text-amber-900">
              Consider reducing includes or consolidating services.
            </p>
          )}
          {tier === "risk" && (
            <p className="mt-3 text-sm font-medium text-red-900">
              Reduce includes, flatten SPF, or remove unnecessary mechanisms.
            </p>
          )}

          <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-gray-800">
            <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
              Includes: {breakdown.include}
            </div>
            <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
              MX: {breakdown.mx}
            </div>
            <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
              A: {breakdown.a}
            </div>
            <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
              Redirect: {breakdown.redirect}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
