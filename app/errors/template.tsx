"use client";

import { useState } from "react";
import Link from "next/link";

type CheckResult = "fail" | "pass" | "unknown";

export default function ErrorPageTemplate() {
  const [status, setStatus] = useState<CheckResult>("fail");

  return (
    <main style={styles.page}>
      {/* 1️⃣ VERDICT */}
      <section style={styles.verdictBox}>
        <h1 style={styles.title}>DKIM record not found</h1>
        <p style={styles.verdictFail}>
          ❌ DKIM is not detected for this domain.
        </p>
        <p style={styles.subtitle}>
          This means receiving mail servers cannot verify that your emails are
          authentic.
        </p>
      </section>

      {/* 2️⃣ ONE-MINUTE FIX */}
      <section style={styles.fixBox}>
        <h2 style={styles.sectionTitle}>One-Minute Fix</h2>
        <p>Add the following DNS record:</p>

        <pre style={styles.codeBlock}>
{`Type: TXT
Name: selector1._domainkey
Value: v=DKIM1; k=rsa; p=MIIBIjANBgkq...
TTL: Auto`}
        </pre>

        <p style={styles.note}>
          This record enables DKIM signing for your domain.
        </p>
      </section>

      {/* 3️⃣ REGISTRAR STEPS */}
      <section style={styles.stepsBox}>
        <h2 style={styles.sectionTitle}>Where to paste this</h2>
        <ul>
          <li>Log in to your DNS provider</li>
          <li>Open DNS / Zone settings</li>
          <li>Add a new TXT record</li>
          <li>Paste the values exactly as shown</li>
          <li>Save changes</li>
        </ul>
      </section>

      {/* 4️⃣ RE-CHECK LOOP */}
      <section style={styles.recheckBox}>
        <h2 style={styles.sectionTitle}>Re-check</h2>
        <p>
          DNS changes usually take a few minutes. When ready, re-check your
          domain.
        </p>

        <button
          style={styles.recheckButton}
          onClick={() => setStatus("pass")}
        >
          Re-check now
        </button>

        {status === "pass" && (
          <p style={styles.success}>
            ✅ DKIM detected. Authentication is now working.
          </p>
        )}
      </section>

      {/* 5️⃣ TRUST ANCHOR */}
      <section style={styles.trustBox}>
        <p>
          We check live DNS records using public resolvers.
          <br />
          No logins. No saved domains. No tracking.
        </p>
      </section>

      {/* 6️⃣ ESCAPE HATCH */}
      <section style={styles.escapeBox}>
        <h3>Still failing?</h3>
        <ul>
          <li>DNS propagation may not be complete yet</li>
          <li>You may have multiple sending services</li>
          <li>DKIM may be disabled at your email provider</li>
        </ul>

        <p>
          You can wait a few minutes and re-check, or{" "}
          <Link href="/">verify another domain</Link>.
        </p>
      </section>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    paddingTop: 64,
    paddingBottom: 64,
    maxWidth: 760,
    margin: "0 auto",
    paddingLeft: 24,
    paddingRight: 24,
    lineHeight: 1.7,
  },
  verdictBox: {
    marginBottom: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: 700,
    marginBottom: 8,
  },
  verdictFail: {
    fontSize: 18,
    color: "#b91c1c",
    fontWeight: 600,
  },
  subtitle: {
    color: "#4b5563",
  },
  fixBox: {
    background: "#fffbea",
    borderLeft: "6px solid #E0B100",
    padding: 24,
    borderRadius: 8,
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 700,
    marginBottom: 12,
  },
  codeBlock: {
    background: "#f6f6f6",
    padding: 16,
    borderRadius: 6,
    marginTop: 12,
    marginBottom: 12,
  },
  note: {
    fontSize: 14,
    color: "#374151",
  },
  stepsBox: {
    marginBottom: 40,
  },
  recheckBox: {
    marginBottom: 40,
  },
  recheckButton: {
    padding: "12px 20px",
    background: "#E0B100",
    border: "none",
    borderRadius: 6,
    fontWeight: 600,
    cursor: "pointer",
  },
  success: {
    marginTop: 12,
    color: "#15803d",
    fontWeight: 600,
  },
  trustBox: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 40,
  },
  escapeBox: {
    borderTop: "1px solid #e5e7eb",
    paddingTop: 24,
  },
};
