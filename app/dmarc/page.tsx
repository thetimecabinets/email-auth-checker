import Link from "next/link";

export const metadata = {
  title: "DMARC Checker & DMARC Policy Explained (Examples, Fixes)",
  description:
    "Learn what DMARC is, how DMARC policies work, common DMARC mistakes, examples, and how to fix them. Use the DMARC checker to secure your domain.",
};

export default function DMARCPage() {
  return (
    <main style={styles.page}>
      {/* HERO */}
      <section style={styles.hero}>
        <h1 style={styles.title}>DMARC Checker</h1>
        <p style={styles.subtitle}>
          Domain-based Message Authentication, Reporting & Conformance (DMARC)
          tells mail servers what to do when SPF or DKIM checks fail.
        </p>

        <Link href="/" style={styles.cta}>
          Check your domain
        </Link>
      </section>

      {/* WHAT IS DMARC */}
      <section style={styles.highlightBox}>
        <h2 style={styles.boxTitle}>What is DMARC?</h2>
        <p style={styles.boxText}>
          <strong>DMARC</strong> is an email authentication protocol that builds
          on SPF and DKIM. It allows domain owners to publish a policy that tells
          receiving mail servers how to handle emails that fail authentication,
          and it provides reporting for visibility and monitoring.
        </p>
      </section>

      {/* CONTENT */}
      <section style={styles.content}>
        <h2>Why DMARC matters</h2>
        <ul>
          <li>Prevents domain spoofing and phishing attacks</li>
          <li>Protects your brand reputation</li>
          <li>Improves email trust and deliverability</li>
        </ul>

        <h2>How DMARC works</h2>
        <ol>
          <li>An email is checked against SPF and DKIM</li>
          <li>DMARC evaluates alignment and authentication results</li>
          <li>The published DMARC policy is applied</li>
          <li>Receivers take action and send reports</li>
        </ol>

        <h2>DMARC policy options</h2>
        <ul>
          <li>
            <strong>p=none</strong> — monitor email traffic without blocking
          </li>
          <li>
            <strong>p=quarantine</strong> — send failing messages to spam
          </li>
          <li>
            <strong>p=reject</strong> — block unauthenticated messages entirely
          </li>
        </ul>

        <h2>Example DMARC record</h2>
        <pre style={styles.code}>
v=DMARC1; p=quarantine; rua=mailto:dmarc@example.com
        </pre>
        <p>
          This DMARC record instructs receiving servers to quarantine failing
          messages and send aggregate reports to the specified email address.
        </p>

        {/* COMMON MISTAKES */}
        <section style={styles.warningBox}>
          <h3 style={styles.boxTitle}>Common DMARC mistakes</h3>
          <ul>
            <li>No DMARC record published</li>
            <li>Staying on <code>p=none</code> indefinitely</li>
            <li>Misaligned SPF or DKIM configuration</li>
            <li>Ignoring DMARC reports</li>
          </ul>
        </section>

        <h2>DMARC, SPF, and DKIM</h2>
        <p>
          DMARC relies on SPF and DKIM for authentication. Without properly
          configured SPF and DKIM, DMARC cannot enforce policy decisions.
        </p>
        <p>
          Learn more about{" "}
          <Link href="/spf">SPF</Link> and{" "}
          <Link href="/dkim">DKIM</Link>.
        </p>
      </section>

      {/* FINAL CTA */}
      <section style={styles.finalCta}>
        <h2>Ready to secure your domain with DMARC?</h2>
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
