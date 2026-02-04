import Link from "next/link";
import React from "react";

export const metadata = {
  title: "SPF Checker & SPF Record Explained (Errors, Fixes, Examples)",
  description:
    "Learn what SPF is, how SPF works, common SPF errors, and how to fix SPF problems. Use the SPF checker to test your domain.",
};

export default function SPFPage() {
  return (
    <main style={styles.page}>
      {/* HERO */}
      <section style={styles.hero}>
        <h1 style={styles.title}>SPF explained and SPF checker</h1>
        <p style={styles.subtitle}>
          Sender Policy Framework (SPF) defines which mail servers are allowed to
          send email on behalf of your domain.
        </p>

        <Link href="/" style={styles.cta}>
          Check your domain
        </Link>
      </section>

      {/* WHAT IS SPF */}
      <section style={styles.highlightBox}>
        <h2 style={styles.boxTitle}>What is SPF?</h2>
        <p style={styles.boxText}>
          <strong>SPF</strong> is an email authentication method that uses a DNS
          TXT record to specify which mail servers are authorized to send email
          for a domain. Receiving servers validate the sending IP against this
          record.
        </p>
      </section>

      {/* CONTENT */}
      <section style={styles.content}>
        <h2 style={styles.sectionTitle}>Why SPF matters</h2>
        <ul>
          <li>Prevents email spoofing and phishing</li>
          <li>Improves email deliverability</li>
          <li>Forms the foundation for DMARC enforcement</li>
        </ul>

        <h2 style={styles.sectionTitle}>How SPF works</h2>
        <ol>
          <li>An email is sent claiming to be from your domain</li>
          <li>The receiving server queries the SPF record in DNS</li>
          <li>Authorized sending sources are evaluated</li>
          <li>The email passes or fails SPF</li>
        </ol>

        {/* 🔑 HIERARCHY + INTERNAL LINKING */}
        <h2 style={styles.sectionTitle}>
          Common SPF errors and how to fix them
        </h2>
        <ul>
          <li>
            <Link href="/spf/spf-permerror-too-many-dns-lookups">
              SPF permerror – too many DNS lookups
            </Link>{" "}
            — exceeding the 10-lookup limit.
          </li>
          <li>
            <Link href="/spf/spf-softfail-vs-fail">
              SPF softfail vs fail
            </Link>{" "}
            — understanding enforcement results.
          </li>
          <li>
            <Link href="/spf/multiple-spf-records-found">
              Multiple SPF records found
            </Link>{" "}
            — why only one SPF record is allowed.
          </li>
          <li>
            <Link href="/spf/spf-include-flattening">
              SPF include flattening
            </Link>{" "}
            — reducing DNS lookups safely.
          </li>
          <li>
            <Link href="/spf/spf-redirect-explained">
              SPF redirect explained
            </Link>{" "}
            — delegating SPF evaluation.
          </li>
          <li>
            <Link href="/spf/spf-neutral-result-explained">
              SPF neutral result explained
            </Link>{" "}
            — what neutral really means.
          </li>
        </ul>

        <h2 style={styles.sectionTitle}>Example SPF record</h2>
        <pre style={styles.code}>
v=spf1 include:spf.protection.outlook.com -all
        </pre>
        <p style={styles.paragraph}>
          This SPF record authorizes Microsoft 365 servers and rejects all other
          sending sources.
        </p>

        {/* COMMON MISTAKES */}
        <section style={styles.warningBox}>
          <h3 style={styles.boxTitle}>Common SPF mistakes</h3>
          <ul>
            <li>Publishing multiple SPF records</li>
            <li>Exceeding the DNS lookup limit</li>
            <li>Using <code>+all</code></li>
            <li>Forgetting to update SPF after adding services</li>
          </ul>
        </section>

        <h2 style={styles.sectionTitle}>SPF, DKIM, and DMARC</h2>
        <p style={styles.paragraph}>
          SPF works together with DKIM and DMARC. SPF validates sending servers,
          DKIM validates message integrity, and DMARC defines enforcement.
        </p>
        <p style={styles.paragraph}>
          Learn more about <Link href="/dkim">DKIM</Link> and{" "}
          <Link href="/dmarc">DMARC</Link>.
        </p>
      </section>

      {/* FINAL CTA */}
      <section style={styles.finalCta}>
        <h2>Ready to test your SPF record?</h2>
        <Link href="/" style={styles.cta}>
          Run the email authentication check
        </Link>
      </section>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    paddingTop: 64,
    paddingBottom: 64,
  },
  hero: {
    maxWidth: 760,
    margin: "0 auto 72px",
    textAlign: "center",
    padding: "52px 24px",
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: 12,
  },
  title: {
    fontSize: 36,
    fontWeight: 700,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: "#4b5563",
    marginBottom: 32,
  },
  cta: {
    display: "inline-block",
    padding: "14px 28px",
    background: "#E0B100",
    color: "#111827",
    fontWeight: 600,
    borderRadius: 6,
    textDecoration: "none",
  },
  highlightBox: {
    maxWidth: 760,
    margin: "0 auto 64px",
    padding: "36px 30px",
    background: "#fffbea",
    borderLeft: "6px solid #E0B100",
    borderRadius: 8,
  },
  content: {
    maxWidth: 760,
    margin: "0 auto",
    padding: "0 24px",
    lineHeight: 1.7,
  },
  sectionTitle: {
    marginTop: 56,
    marginBottom: 20,
  },
  paragraph: {
    marginTop: 16,
    marginBottom: 24,
  },
  warningBox: {
    marginTop: 56,
    padding: "32px 26px",
    background: "#fff5f5",
    borderLeft: "6px solid #dc2626",
    borderRadius: 8,
  },
  boxTitle: {
    fontSize: 22,
    fontWeight: 700,
    marginBottom: 16,
  },
  boxText: {
    fontSize: 15,
    lineHeight: 1.7,
  },
  code: {
    background: "#f6f6f6",
    padding: 18,
    borderRadius: 6,
    marginTop: 16,
    marginBottom: 20,
    overflowX: "auto",
  },
  finalCta: {
    maxWidth: 760,
    margin: "80px auto 0",
    textAlign: "center",
    padding: "44px 24px",
    background: "#ffffff",
    borderTop: "1px solid #e5e7eb",
  },
};
