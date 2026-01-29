import Link from "next/link";

export const metadata = {
  title: "DKIM Selector Mismatch – Why DKIM Exists but Still Fails",
  description:
    "DKIM selector exists but DKIM still fails? Learn what a selector mismatch is, why it happens, and how to fix it correctly.",
};

export default function DkimSelectorMismatchPage() {
  return (
    <main style={styles.wrapper}>
      <section style={styles.card}>
        <h1 style={styles.title}>DKIM Selector Mismatch</h1>

        <p style={styles.subtitle}>
          A DKIM selector mismatch occurs when the selector used to sign outgoing
          email does not match the DKIM public key published in DNS. As a result,
          DKIM verification fails even though DKIM appears to be configured.
        </p>

        {/* One-minute fix */}
        <div style={styles.fixBox}>
          <h2 style={styles.sectionTitle}>One-Minute Fix</h2>

          <p style={styles.text}>
            Ensure the DKIM selector used in the email header matches the selector
            published in DNS.
          </p>

          <pre style={styles.code}>
{`Email header:
DKIM-Signature: d=example.com; s=selector2;

DNS record:
selector1._domainkey.example.com TXT "v=DKIM1; k=rsa; p=..."

Result: DKIM fail (selector mismatch)

Fix:
Publish selector2 OR update sender to use selector1`}
          </pre>

          <Link href="/" style={styles.button}>
            Re-check DKIM
          </Link>
        </div>

        {/* Why this happens */}
        <div style={styles.infoBox}>
          <h2 style={styles.sectionTitle}>Why selector mismatches happen</h2>

          <ul style={styles.list}>
            <li>DKIM key rotation without DNS update</li>
            <li>Multiple email providers using different selectors</li>
            <li>Stale DKIM records left in DNS</li>
            <li>Misconfigured email relays</li>
          </ul>
        </div>

        {/* How to detect */}
        <div style={styles.infoBox}>
          <h2 style={styles.sectionTitle}>How to detect a mismatch</h2>

          <ul style={styles.list}>
            <li>Check the <code>s=</code> value in email headers</li>
            <li>Query DNS for the corresponding selector</li>
            <li>Confirm which selector your provider actively uses</li>
          </ul>

          <p style={styles.text}>
            DKIM validation always uses the selector specified in the message,
            not what exists in DNS.
          </p>
        </div>

        {/* What we checked */}
        <div style={styles.infoBox}>
          <h2 style={styles.sectionTitle}>What we checked</h2>
          <p style={styles.text}>
            We attempted to validate DKIM using detected selectors and verified
            whether a matching DNS record exists.
          </p>
          <p style={styles.trust}>
            Live DNS lookup. No assumptions.
          </p>
        </div>

        {/* Escape hatch */}
        <div style={styles.escapeBox}>
          <h3 style={styles.escapeTitle}>Next steps</h3>

          <ul style={styles.list}>
            <li>
              <Link href="/dkim/dkim-selector-explained">
                Learn how DKIM selectors work
              </Link>
            </li>
            <li>
              <Link href="/dkim/invalid-dkim-key">
                Fix invalid DKIM keys
              </Link>
            </li>
            <li>
              <Link href="/dkim/dkim-key-length-too-short">
                Upgrade DKIM key length
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
