"use client";

import { useState } from "react";

export default function Home() {
  const [domain, setDomain] = useState("");

  return (
    <main style={{ padding: "40px", fontFamily: "system-ui", maxWidth: 720 }}>
      <h1 style={{ fontSize: 32, marginBottom: 8 }}>
        Email Authentication Checker
      </h1>

      <p style={{ marginBottom: 24 }}>
        Check SPF, DKIM, and DMARC records for your domain.
      </p>

      <label style={{ display: "block", marginBottom: 8 }}>
        Domain
      </label>

      <input
        value={domain}
        onChange={(e) => setDomain(e.target.value)}
        placeholder="example.com"
        style={{
          width: "100%",
          padding: "12px 14px",
          border: "1px solid #ccc",
          borderRadius: 8,
          fontSize: 16,
          marginBottom: 12,
        }}
      />

      <button
        type="button"
        onClick={() => alert(`We will check: ${domain || "(empty)"}`)}
        style={{
          padding: "10px 14px",
          borderRadius: 8,
          border: "1px solid #333",
          background: "#fff",
          cursor: "pointer",
          fontSize: 16,
        }}
      >
        Run check
      </button>

      <p style={{ marginTop: 24, fontSize: 14, opacity: 0.8 }}>
        Checks live DNS records. No logins. No data stored.
      </p>
    </main>
  );
}
