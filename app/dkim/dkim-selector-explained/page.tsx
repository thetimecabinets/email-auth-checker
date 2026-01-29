import Link from "next/link";

export const metadata = {
  title: "DKIM Selector Explained – What It Is & How to Find It",
  description:
    "What is a DKIM selector? Learn how DKIM selectors work, where to find them, and how to test DKIM with the correct selector.",
};

export default function DkimSelectorExplainedPage() {
  return (
    <main style={styles.wrapper}>
      <section style={styles.card}>
        <h1 style={styles.title}>DKIM Selector Explained</h1>

        <p style={styles.subtitle}>
          A DKIM selector identifies which DKIM public key a receiving mail
          server should use to verify a message. Without the selector, DKIM
          cannot be validated.
        </p>

        {/* One-minute explanation */}
        <div style={styles.fixBox}>
          <h2 style={styles.sectionTitle}>What a DKIM selector is</h2>

          <pre style={styles.code}>
{`Selector example:

selector1._domainkey.example.com

DKIM signature header:
DKIM-Signature: v=1; d=example.com; s=selector1;`}
          </pre>

          <p style={styles.note}>
            The <strong>s=</strong> value in the DKIM-Signature header is the
            selector.
          </p>

          <Link href="/" style={styles.button}>
            Re-check DKIM
          </Link>
        </div>

        {/* How to find it */}
        <div style={styles.infoBox}>
          <h2 style={styles.sectionTitle}>How to find your DKIM selector</h2>

          <ul style={styles.list}>
            <li>Check your email provider’s DKIM settings</li>
            <li>Inspect message headers (look for <code>s=</code>)</li>
            <li>Ask your provider which selector is active</li>
          </ul>

          <p style={styles.text}>
            Common selectors include <strong>selector1</strong>,{" "}
            <strong>selector2</strong>, <strong>google</strong>,{" "}
            <strong>mail</strong>, but they are not standardized.
          </p>
        </div>

        {/* Why it matters */}
        <div style={styles.infoBox}>
          <h2 style={styles.sectionTitle}>Why selectors matter</h2>

          <ul style={styles.list}>
            <li>Multiple DKIM keys can exist at the same time</li>
            <li>Key rotation requires new selectors</li>
            <li>Incorrect selectors cause DKIM failures</li>
          </ul>
        </div>

        {/* What we checked */}
        <div style={styles.infoBox}>
          <h2 style={styles.sectionTitle}>What we checked</h2>
          <p style={styles.text}>
            We attempted to detect DKIM records using common selectors. Without
            an explicit selector, full DKIM validation is not possible.
          </p>
          <p style={styles.trust}>
            Live DNS lookup. No guessing.
          </p>
        </div>

        {/* Escape hatch */}
        <div style={styles.escapeBox}>
          <h3 style={styles.escapeTitle}>Still can’t find the selector?</h3>

          <ul style={styles.list}>
            <li>Your provider uses a custom selector</li>
            <li>DKIM is enabled but not active</li>
            <li>Messages are sent through a relay service</li>
          </ul>

          <p style={styles.text}>Next steps:</p>
          <ul style={styles.list}>
            <li>
              <Link href="/dkim/dkim-selector-not-found">
                Fix “DKIM selector not found”
              </Link>
            </li>
            <li>
              <Link href="/dkim/dkim-alignment-failed">
                Fix DKIM alignment
              </Link>
            </li>
            <li>
              <Link href="/">
                Run a full SPF, DKIM & DMARC check
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}

/* ---------- STYLES ---------- */

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
    marginBottom: 12,
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
