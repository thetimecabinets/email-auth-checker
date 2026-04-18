"use client";

import { useState } from "react";

type Props = {
  onSubmit?: (domain: string) => void;
};

export default function DomainCheckForm({ onSubmit }: Props) {
  const [domain, setDomain] = useState("");

  return (
    <div
      style={{
        background: "#fffbeb",
        border: "1px solid #facc15",
        borderRadius: 12,
        padding: 24,
        marginTop: 24,
      }}
    >
      <div style={{ fontWeight: 700, fontSize: 16 }}>
        SPF, DKIM & DMARC checker
      </div>

      <div style={{ fontSize: 13, color: "#6b7280", marginTop: 6 }}>
        Enter your domain to check email authentication setup.
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const d = domain.trim();
          if (!d) return;
          onSubmit?.(d);
        }}
        style={{ marginTop: 16, display: "flex", gap: 8 }}
      >
        <input
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          placeholder="example.com"
          style={{
            flex: 1,
            padding: 10,
            borderRadius: 8,
            border: "1px solid #e5e7eb",
          }}
        />

        <button
          type="submit"
          style={{
            background: "#eab308",
            border: "none",
            padding: "10px 16px",
            borderRadius: 8,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Check
        </button>
      </form>
    </div>
  );
}