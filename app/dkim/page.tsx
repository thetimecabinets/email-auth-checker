import Link from "next/link";

export const metadata = {
  title: "DKIM Checker & DKIM Record Explained (Examples, Errors, Fixes)",
  description:
    "Learn what DKIM is, how DKIM records work, common DKIM errors, examples, and how to fix them. Use the DKIM checker to test your domain.",
};

export default function DKIMPage() {
  return (
    <main style={styles.page}>
      {/* HERO */}
      <section style={styles.hero}>
        <h1 style={styles.title}>DKIM Checker</h1>
        <p style={styles.subtitle}>
          DomainKeys Identified Mail (DKIM) uses cryptographic signatures to
          verify that emails are authentic and unmodified.
        </p>

        <Link href="/" style={styles.cta}>
          Check your domain
        </Link>
      </section>

      {/* WHAT IS DKIM */}
      <section style={styles.highlightBox}>
        <h2 style={styles.boxTitle}>What is DKIM?</h2>
        <p style={styles.boxText}>
          <strong>DKIM (DomainKeys Identified Mail)</strong> is an email
          authentication method that adds a digital signature to outgoing
          emails. Receiving mail servers validate this signature using a public
          key published in the sender’s DNS records.
        </p>
      </section>

      {/* CONTENT */}
      <section style={styles.content}>
        <h2>Why DKIM matters</h2>
        <ul>
          <li>Protects email content from tampering</li>
          <li>Improves inbox placement and deliverability</li>
          <li>Required for DMARC alignment</li>
        </ul>

        <h2>How DKIM works</h2>
        <ol>
          <li>The sending mail server signs the email with a private key</li>
          <li>The DKIM signature is added to the email headers</li>
          <li>The receiving server retrieves the public key from DNS</li>
          <li>The signature is verified to confirm authenticity</li>
        </ol>

        <h2>Example DKIM record</h2>
        <pre style={styles.code}>
selector1._domainkey.example.com TXT "v=DKIM1; k=rsa; p=MIIBIjANBgkq..."
        </pre>
        <p>
          DKIM records are published on selector-based subdomains. The selector
          name is chosen by the email provider and referenced in the email
          headers.
        </p>

        {/* COMMON MISTAKES */}
        <section style={styles.warningBox}>
          <h3 style={styles.boxTitle}>Common DKIM mistakes</h3>
          <ul>
            <li>No DKIM record published</li>
            <li>Incorrect or missing selector</li>
            <li>DKIM disabled in the email provider settings</li>
            <li>Emails sent by third-party services without DKIM signing</li>
          </ul>
        </section>

        <h2>DKIM, SPF, and DMARC</h2>
        <p>
          DKIM works together with SPF and DMARC to authenticate email. SPF
          verifies the sending server, DKIM verifies message integrity, and
          DMARC defines how failures should be handled.
        </p>
        <p>
          Learn more about{" "}
          <Link href="/spf">SPF</Link> and{" "}
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
    margin: "0 auto 64px",
    textAlign: "center",
    padding: "48px 24px",
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: 12,
  },
  title: {
    fontSize: 36,
    fontWeight: 700,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: "#4b5563",
    marginBottom: 28,
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
    margin: "0 auto 48px",
    padding: "32px 28px",
    background: "#fffbea",
    borderLeft: "6px solid #E0B100",
    borderRadius: 8,
  },
  warningBox: {
    marginTop: 40,
    padding: "28px 24px",
    background: "#fff5f5",
    borderLeft: "6px solid #dc2626",
    borderRadius: 8,
  },
  boxTitle: {
    fontSize: 22,
    fontWeight: 700,
    marginBottom: 12,
  },
  boxText: {
    fontSize: 15,
    lineHeight: 1.7,
  },
  content: {
    maxWidth: 760,
    margin: "0 auto",
    padding: "0 24px",
    lineHeight: 1.7,
  },
  code: {
    background: "#f6f6f6",
    padding: 16,
    borderRadius: 6,
    marginTop: 12,
    marginBottom: 12,
    overflowX: "auto",
  },
  finalCta: {
    maxWidth: 760,
    margin: "64px auto 0",
    textAlign: "center",
    padding: "40px 24px",
    background: "#ffffff",
    borderTop: "1px solid #e5e7eb",
  },
};
