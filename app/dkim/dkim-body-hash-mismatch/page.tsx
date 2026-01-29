import Link from "next/link";

export const metadata = {
  title: "DKIM Body Hash Mismatch (bh=) – Why DKIM Fails & How to Fix",
  description:
    "DKIM bh= (body hash) mismatch explained. Learn why message bodies change after signing and how to fix DKIM body hash failures.",
};

export default function DkimBodyHashMismatchPage() {
  return (
    <main style={styles.wrapper}>
      <section style={styles.card}>
        <h1 style={styles.title}>DKIM Body Hash Mismatch (bh=)</h1>

        <p style={styles.subtitle}>
          A DKIM body hash mismatch occurs when the message body changes after it
          was signed. The DKIM signature is present, but verification fails
          because the calculated body hash no longer matches.
        </p>

        {/* One-minute fix */}
        <div style={styles.fixBox}>
          <h2 style={styles.sectionTitle}>One-Minute Fix</h2>

          <p style={styles.text}>
            Ensure no system modifies the email body after DKIM signing.
          </p>

          <pre style={styles.code}>
{`DKIM header:
bh=Q9c9Rk1lZ0...

Problem:
Body modified after signing

Fix:
Sign DKIM at the final sending stage`} 
          </pre>

          <Link href="/" style={styles.button}>
            Re-check DKIM
          </Link>
        </div>

        {/* Why this happens */}
        <div style={styles.infoBox}>
          <h2 style={styles.sectionTitle}>Why bh= mismatches happen</h2>

          <ul style={styles.list}>
            <li>Mail gateways adding footers or disclaimers</li>
            <li>Marketing platforms rewriting links</li>
            <li>HTML normalization by relays</li>
            <li>Line ending or encoding changes</li>
          </ul>

          <p style={styles.text}>
            DKIM protects the integrity of the message body. Any change breaks
            validation.
          </p>
        </div>

        {/* How to detect */}
        <div style={styles.infoBox}>
          <h2 style={styles.sectionTitle}>How to detect a body hash issue</h2>

          <ul style={styles.list}>
            <li>Check the <code>bh=</code> value in message headers</li>
            <li>Compare pre- and post-relay message bodies</li>
            <li>Disable downstream content modification</li>
          </ul>
        </div>

        {/* What we checked */}
        <div style={styles.infoBox}>
          <h2 style={styles.sectionTitle}>What we checked</h2>
          <p style={styles.text}>
            We verified the DKIM signature, parsed the <code>bh=</code> value,
            and evaluated whether the message body could be altered in transit.
          </p>
          <p style={styles.trust}>
            Live DKIM analysis. No assumptions.
          </p>
        </div>

        {/* Escape hatch */}
        <div style={styles.escapeBox}>
          <h3 style={styles.escapeTitle}>Next steps</h3>

          <ul style={styles.list}>
            <li>
              <Link href="/dkim/dkim-selector-mismatch">
                Fix DKIM selector mismatch
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
