import Link from "next/link";

export const metadata = {
  title: "SPF Checker & SPF Record Explained (Examples, Errors, Fixes)",
  description:
    "Learn what SPF is, how SPF records work, common SPF errors, examples, and how to fix them. Use the SPF checker to test your domain.",
};

export default function SPFPage() {
  return (
    <main style={styles.page}>
      {/* HERO */}
      <section style={styles.hero}>
        <h1 style={styles.title}>SPF Checker</h1>
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
          <strong>SPF (Sender Policy Framework)</strong> is an email
          authentication method that uses a DNS TXT record to specify which mail
          servers are authorized to send email for a domain. Receiving mail
          servers check this record to verify whether an email should be trusted.
        </p>
      </section>

      {/* CONTENT */}
      <section style={styles.content}>
        <h2>Why SPF matters</h2>
        <ul>
          <li>Prevents email spoofing and phishing</li>
          <li>Improves email deliverability</li>
          <li>Required for DMARC enforcement</li>
        </ul>

        <h2>How SPF works</h2>
        <ol>
          <li>An email is sent from a server claiming to be your domain</li>
          <li>The receiving server looks up your domain’s SPF record in DNS</li>
          <li>The sending server is compared against allowed sources</li>
          <li>The email passes or fails SPF based on the result</li>
        </ol>

        <h2>Example SPF record</h2>
        <pre style={styles.code}>
v=spf1 include:spf.protection.outlook.com -all
        </pre>
        <p>
          This SPF record allows Microsoft 365 servers to send email for the
          domain and instructs receiving servers to reject all other sources.
        </p>

        {/* COMMON MISTAKES */}
        <section style={styles.warningBox}>
          <h3 style={styles.boxTitle}>Common SPF mistakes</h3>
          <ul>
            <li>No SPF record published</li>
            <li>Too many DNS lookups (maximum is 10)</li>
            <li>Using <code>+all</code> (allows anyone to send email)</li>
            <li>Forgetting to update SPF when adding email services</li>
          </ul>
        </section>

        <h2>SPF, DKIM, and DMARC</h2>
        <p>
          SPF works best when combined with DKIM and DMARC. SPF verifies the
          sending server, DKIM verifies the message integrity, and DMARC defines
          how failures should be handled.
        </p>
        <p>
          Learn more about{" "}
          <Link href="/dkim">DKIM</Link> and{" "}
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
