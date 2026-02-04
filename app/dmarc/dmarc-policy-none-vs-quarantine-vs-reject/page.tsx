import Link from "next/link";
import React from "react";

export const metadata = {
  title: "DMARC Policy: none vs quarantine vs reject – Which One to Use?",
  description:
    "Compare DMARC policies (none, quarantine, reject). Learn which DMARC policy to use, how to start safely, and when to move to enforcement.",
};

export default function DmarcPolicyComparisonPage() {
  return (
    <main style={styles.wrapper}>
      <section style={styles.card}>

        {/* 1️⃣ VERDICT */}
        <section>
          <h1 style={styles.title}>
            DMARC Policy: none vs quarantine vs reject
          </h1>

          <p style={styles.verdictInfo}>
            ℹ️ A DMARC policy decision is required for this domain.
          </p>

          <p style={styles.subtitle}>
            DMARC policies define what receiving mail servers should do when SPF
            or DKIM fails authentication.
          </p>
        </section>

        {/* 2️⃣ ONE-MINUTE FIX */}
        <section style={styles.fixBox}>
          <h2 style={styles.sectionTitle}>One-Minute Fix (Recommended)</h2>

          <p style={styles.text}>
            Start with monitoring only. This is the safest DMARC configuration
            for most domains:
          </p>

          <pre style={styles.code}>
{`v=DMARC1; p=none; rua=mailto:dmarc@yourdomain.com;`}
          </pre>

          <p style={styles.note}>
            This enables DMARC reporting without affecting mail delivery.
          </p>

          <Link href="/" style={styles.button}>
            Re-check DMARC
          </Link>
        </section>

        {/* 3️⃣ WHERE TO PASTE THIS */}
        <section style={styles.infoBox}>
          <h2 style={styles.sectionTitle}>Where to paste this</h2>
          <ul style={styles.list}>
            <li>Open your domain’s DNS settings</li>
            <li>Add a new <strong>TXT</strong> record</li>
            <li>Host / Name: <strong>_dmarc</strong></li>
            <li>Paste the value exactly as shown</li>
            <li>Save changes</li>
          </ul>
        </section>

        {/* 4️⃣ POLICY COMPARISON */}
        <section style={styles.infoBox}>
          <h2 style={styles.sectionTitle}>Policy comparison</h2>

          <pre style={styles.code}>
{`p=none        → Monitor only (no enforcement)
p=quarantine  → Failing mail goes to spam
p=reject      → Failing mail is blocked`}
          </pre>

          <p style={styles.text}>
            Most domains should only move to enforcement after fixing SPF, DKIM,
            and alignment issues.
          </p>
        </section>

        {/* 5️⃣ WHAT WE CHECKED */}
        <section style={styles.infoBox}>
          <h2 style={styles.sectionTitle}>What we checked</h2>
          <p style={styles.text}>
            We evaluated your DMARC record, identified the active policy, and
            verified whether SPF and DKIM alignment requirements are met.
          </p>
          <p style={styles.trust}>
            Live DNS lookup. No cached data. No assumptions.
          </p>
        </section>

        {/* 6️⃣ STILL FAILING / NEXT STEPS */}
        <section style={styles.escapeBox}>
          <h3 style={styles.escapeTitle}>Recommended progression</h3>

          <ol style={styles.list}>
            <li>Start with <strong>p=none</strong> and review reports</li>
            <li>Fix SPF, DKIM, and alignment issues</li>
            <li>Move to <strong>p=quarantine</strong> with <code>pct&lt;100</code></li>
            <li>End with <strong>p=reject</strong></li>
          </ol>

          <p style={styles.text}>Next steps:</p>
          <ul style={styles.list}>
            <li>
              <Link href="/dmarc/no-dmarc-record-found">
                Fix missing DMARC records
              </Link>
            </li>
            <li>
              <Link href="/dkim/dkim-alignment-failed">
                Fix DKIM alignment issues
              </Link>
            </li>
            <li>
              <Link href="/">
                Run a full SPF, DKIM & DMARC check
              </Link>
            </li>
          </ul>
        </section>

      </section>
    </main>
  );
}

/* ---------- STYLES (DEFINED + SAFE) ---------- */

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    maxWidth: 860,
    margin: "80px auto",
    padding: "0 24px",
  },
  card: {
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    padding: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: 700,
    marginBottom: 8,
  },
  verdictInfo: {
    fontSize: 16,
    fontWeight: 600,
    color: "#1f2937",
    marginBottom: 8,
  },
  subtitle: {
    color: "#374151",
    marginBottom: 32,
    lineHeight: 1.6,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 600,
    marginBottom: 12,
  },
  fixBox: {
    background: "#f9fafb",
    borderRadius: 10,
    padding: 24,
    marginBottom: 40,
  },
  code: {
    background: "#0f172a",
    color: "#e5e7eb",
    padding: 16,
    borderRadius: 8,
    fontSize: 14,
    marginTop: 12,
    marginBottom: 12,
    overflowX: "auto",
  },
  note: {
    fontSize: 14,
    color: "#374151",
    marginBottom: 16,
  },
  button: {
    display: "inline-block",
    padding: "12px 20px",
    background: "#E0B100",
    color: "#000",
    borderRadius: 6,
    fontWeight: 600,
    textDecoration: "none",
  },
  infoBox: {
    marginBottom: 40,
  },
  trust: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 8,
  },
  escapeBox: {
    borderTop: "1px solid #e5e7eb",
    paddingTop: 24,
  },
  escapeTitle: {
    fontSize: 18,
    fontWeight: 600,
    marginBottom: 8,
  },
  list: {
    paddingLeft: 18,
    marginBottom: 12,
    lineHeight: 1.6,
  },
  text: {
    color: "#374151",
    lineHeight: 1.6,
  },
};
