import Link from "next/link";
import React from "react";

export const metadata = {
  title: "DKIM Checker & DKIM Record Explained (Errors, Fixes, Examples)",
  description:
    "Learn what DKIM is, how DKIM works, common DKIM errors, and how to fix DKIM problems. Use the DKIM checker to test your domain.",
};

export default function DKIMPage() {
  return (
    <main style={styles.page}>
      {/* HERO */}
      <section style={styles.hero}>
        <h1 style={styles.title}>DKIM explained and DKIM checker</h1>
        <p style={styles.subtitle}>
          DomainKeys Identified Mail (DKIM) uses cryptographic signatures to prove
          that emails are authentic and have not been modified in transit.
        </p>

        <Link href="/" style={styles.cta}>
          Check your domain
        </Link>
      </section>

      {/* WHAT IS DKIM */}
      <section style={styles.highlightBox}>
        <h2 style={styles.boxTitle}>What is DKIM?</h2>
        <p style={styles.boxText}>
          <strong>DKIM</strong> is an email authentication method that digitally
          signs outgoing messages. Receiving mail servers validate this
          signature using a public key published in the sender’s DNS.
        </p>
      </section>

      {/* CONTENT */}
      <section style={styles.content}>
        <h2 style={styles.sectionTitle}>Why DKIM matters</h2>
        <ul>
          <li>Protects email content from tampering</li>
          <li>Improves inbox placement and deliverability</li>
          <li>Required for DMARC enforcement</li>
        </ul>

        <h2 style={styles.sectionTitle}>How DKIM works</h2>
        <ol>
          <li>The sending server signs the email using a private key</li>
          <li>The DKIM signature is added to the email headers</li>
          <li>The receiving server retrieves the public key from DNS</li>
          <li>The signature is verified to confirm message integrity</li>
        </ol>

        {/* 🔑 HIERARCHY + INTERNAL LINKING */}
        <h2 style={styles.sectionTitle}>
          Common DKIM errors and how to fix them
        </h2>
        <ul>
          <li>
            <Link href="/dkim/no-dkim-record-found">
              No DKIM record found
            </Link>{" "}
            — DKIM is missing from DNS.
          </li>
          <li>
            <Link href="/dkim/dkim-selector-not-found">
              DKIM selector not found
            </Link>{" "}
            — the selector referenced in headers does not exist.
          </li>
          <li>
            <Link href="/dkim/invalid-dkim-key">
              Invalid DKIM key
            </Link>{" "}
            — malformed or incorrect public key.
          </li>
          <li>
            <Link href="/dkim/dkim-alignment-failed">
              DKIM alignment failed
            </Link>{" "}
            — DKIM domain does not align with the From domain.
          </li>
          <li>
            <Link href="/dkim/dkim-key-length-too-short">
              DKIM key length too short
            </Link>{" "}
            — 1024-bit keys rejected by major providers.
          </li>
          <li>
            <Link href="/dkim/dkim-selector-explained">
              DKIM selector explained
            </Link>{" "}
            — how selectors work and why they matter.
          </li>
          <li>
            <Link href="/dkim/dkim-selector-mismatch">
              DKIM selector mismatch
            </Link>{" "}
            — selector in headers does not match DNS.
          </li>
          <li>
            <Link href="/dkim/dkim-body-hash-mismatch">
              DKIM body hash mismatch
            </Link>{" "}
            — message content altered after signing.
          </li>
        </ul>

        <h2 style={styles.sectionTitle}>Example DKIM record</h2>
        <pre style={styles.code}>
selector1._domainkey.example.com TXT "v=DKIM1; k=rsa; p=MIIBIjANBgkq..."
        </pre>
        <p style={styles.paragraph}>
          DKIM records are published on selector-based subdomains. The selector
          name is referenced in the DKIM-Signature header.
        </p>

        {/* COMMON MISTAKES */}
        <section style={styles.warningBox}>
          <h3 style={styles.boxTitle}>Common DKIM mistakes</h3>
          <ul>
            <li>Missing DKIM record</li>
            <li>Incorrect selector configuration</li>
            <li>Using weak (1024-bit) keys</li>
            <li>Third-party senders not signing DKIM</li>
          </ul>
        </section>

        <h2 style={styles.sectionTitle}>DKIM, SPF, and DMARC</h2>
        <p style={styles.paragraph}>
          DKIM works alongside SPF and DMARC. SPF validates sending servers,
          DKIM validates message integrity, and DMARC defines enforcement.
        </p>
        <p style={styles.paragraph}>
          Learn more about <Link href="/spf">SPF</Link> and{" "}
          <Link href="/dmarc">DMARC</Link>.
        </p>
      </section>

      {/* FINAL CTA */}
      <section style={styles.finalCta}>
        <h2>Ready to test your DKIM setup?</h2>
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
