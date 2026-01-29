import Link from "next/link";

export const metadata = {
  title: "DMARC pct= Explained – Partial Enforcement Without Breaking Mail",
  description:
    "Learn what the DMARC pct= tag does, when to use partial enforcement, and common mistakes that cause delivery issues.",
};

export default function DmarcPctTagExplainedPage() {
  return (
    <main style={styles.wrapper}>
      <section style={styles.card}>
        <h1 style={styles.title}>DMARC pct= Explained</h1>

        <p style={styles.subtitle}>
          The <strong>pct=</strong> tag controls what percentage of messages a
          DMARC policy applies to. It lets you enforce DMARC gradually without
          risking legitimate mail.
        </p>

        {/* One-minute explanation */}
        <div style={styles.fixBox}>
          <h2 style={styles.sectionTitle}>What pct= does</h2>

          <pre style={styles.code}>
{`DMARC example with partial enforcement:

v=DMARC1; p=quarantine; pct=25; rua=mailto:dmarc@yourdomain.com;

Result:
Only 25% of failing messages are quarantined`} 
          </pre>

          <p style={styles.note}>
            The remaining messages are treated as if <code>p=none</code> were
            set.
          </p>

          <Link href="/" style={styles.button}>
            Re-check DMARC
          </Link>
        </div>

        {/* When to use */}
        <div style={styles.infoBox}>
          <h2 style={styles.sectionTitle}>When pct= is useful</h2>

          <ul style={styles.list}>
            <li>Transitioning from <code>p=none</code> to enforcement</li>
            <li>Testing DMARC impact safely</li>
            <li>Large or complex sending environments</li>
          </ul>

          <p style={styles.text}>
            Most organizations increase pct gradually (e.g. 10 → 25 → 50 → 100).
          </p>
        </div>

        {/* Important rules */}
        <div style={styles.infoBox}>
          <h2 style={styles.sectionTitle}>Important rules</h2>

          <ul style={styles.list}>
            <li><code>pct=</code> only applies to <code>quarantine</code> and <code>reject</code></li>
            <li><code>pct=100</code> is equivalent to full enforcement</li>
            <li>Some providers ignore very low percentages</li>
          </ul>
        </div>

        {/* Common mistakes */}
        <div style={styles.infoBox}>
          <h2 style={styles.sectionTitle}>Common mistakes</h2>

          <ul style={styles.list}>
            <li>Leaving <code>pct&lt;100</code> forever</li>
            <li>Using pct without reviewing DMARC reports</li>
            <li>Assuming pct protects specific senders (it does not)</li>
          </ul>

          <pre style={styles.code}>
{`Ineffective DMARC:

v=DMARC1; p=reject; pct=10;`} 
          </pre>
        </div>

        {/* What we checked */}
        <div style={styles.infoBox}>
          <h2 style={styles.sectionTitle}>What we checked</h2>
          <p style={styles.text}>
            We parsed your DMARC record, detected a <code>pct=</code> tag, and
            evaluated how much of your traffic is actually enforced.
          </p>
          <p style={styles.trust}>
            Live DMARC evaluation. No assumptions.
          </p>
        </div>

        {/* Escape hatch */}
        <div style={styles.escapeBox}>
          <h3 style={styles.escapeTitle}>Next steps</h3>

          <ul style={styles.list}>
            <li>
              <Link href="/dmarc/dmarc-policy-none-vs-quarantine-vs-reject">
                Choose the right DMARC policy
              </Link>
            </li>
            <li>
              <Link href="/dmarc/dmarc-rua-ruf-not-working">
                Fix DMARC reporting
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
