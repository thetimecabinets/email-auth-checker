import Link from "next/link";

export const metadata = {
  title: "SPF Neutral Result Explained – What It Means & How to Fix It",
  description:
    "SPF returned a neutral result (?all). Learn what SPF neutral means, why it happens, and whether you should change it to softfail or fail.",
};

export default function SpfNeutralResultExplainedPage() {
  return (
    <main style={styles.wrapper}>
      <section style={styles.card}>
        <h1 style={styles.title}>SPF Neutral Result Explained</h1>

        <p style={styles.subtitle}>
          An SPF neutral result means the domain does not explicitly authorize
          or deny the sending server. Receiving mail servers treat this as “no
          opinion”, which weakens email authentication.
        </p>

        {/* One-minute explanation */}
        <div style={styles.fixBox}>
          <h2 style={styles.sectionTitle}>What SPF neutral means</h2>

          <pre style={styles.code}>
{`SPF example:

v=spf1 include:spf.protection.outlook.com ?all

Result:
SPF neutral (no clear authorization)`} 
          </pre>

          <p style={styles.note}>
            The <strong>?all</strong> mechanism tells receivers that the domain
            takes no position on unauthorized senders.
          </p>

          <Link href="/" style={styles.button}>
            Re-check SPF
          </Link>
        </div>

        {/* Why it happens */}
        <div style={styles.infoBox}>
          <h2 style={styles.sectionTitle}>Why SPF returns neutral</h2>

          <ul style={styles.list}>
            <li>The SPF record ends with <code>?all</code></li>
            <li>No matching mechanism authorizes the sender</li>
            <li>The record was created for testing only</li>
          </ul>

          <p style={styles.text}>
            Neutral results are common in unfinished or legacy SPF setups.
          </p>
        </div>

        {/* Impact */}
        <div style={styles.infoBox}>
          <h2 style={styles.sectionTitle}>Why SPF neutral is a problem</h2>

          <ul style={styles.list}>
            <li>Does not protect against spoofing</li>
            <li>Weakens DMARC enforcement</li>
            <li>Often treated like SPF none by receivers</li>
          </ul>

          <p style={styles.text}>
            Most modern email providers expect SPF to express a clear policy.
          </p>
        </div>

        {/* How to fix */}
        <div style={styles.infoBox}>
          <h2 style={styles.sectionTitle}>How to fix SPF neutral</h2>

          <pre style={styles.code}>
{`Recommended fix:

v=spf1 include:spf.protection.outlook.com -all`} 
          </pre>

          <ul style={styles.list}>
            <li>Use <strong>~all</strong> during testing</li>
            <li>Move to <strong>-all</strong> once SPF is correct</li>
            <li>Never leave <strong>?all</strong> in production</li>
          </ul>
        </div>

        {/* What we checked */}
        <div style={styles.infoBox}>
          <h2 style={styles.sectionTitle}>What we checked</h2>
          <p style={styles.text}>
            We analyzed the end mechanism of your SPF record and identified a
            neutral policy.
          </p>
          <p style={styles.trust}>
            Live SPF evaluation. No assumptions.
          </p>
        </div>

        {/* Escape hatch */}
        <div style={styles.escapeBox}>
          <h3 style={styles.escapeTitle}>Next steps</h3>

          <ul style={styles.list}>
            <li>
              <Link href="/spf/spf-softfail-vs-fail">
                Understand SPF softfail vs fail
              </Link>
            </li>
            <li>
              <Link href="/spf/no-spf-record-found">
                Fix missing SPF records
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
