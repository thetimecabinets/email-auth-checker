import Link from "next/link";

export const metadata = {
  title: "DMARC Policy: none vs quarantine vs reject – Which One to Use?",
  description:
    "Compare DMARC policies (none, quarantine, reject). Learn what each policy does, when to use it, and how to move safely to DMARC enforcement.",
};

export default function DmarcPolicyComparisonPage() {
  return (
    <main style={styles.wrapper}>
      <section style={styles.card}>
        <h1 style={styles.title}>
          DMARC Policy: none vs quarantine vs reject
        </h1>

        <p style={styles.subtitle}>
          DMARC policies define what receiving mail servers should do when SPF or
          DKIM fails. Choosing the right policy determines whether messages are
          monitored, filtered, or blocked.
        </p>

        {/* Quick comparison */}
        <div style={styles.fixBox}>
          <h2 style={styles.sectionTitle}>Quick comparison</h2>

          <pre style={styles.code}>
{`p=none        → Monitor only (no enforcement)
p=quarantine  → Suspicious mail goes to spam
p=reject      → Unauthenticated mail is blocked`}
          </pre>

          <p style={styles.note}>
            Most domains should start with <strong>p=none</strong> and move to
            enforcement gradually.
          </p>

          <Link href="/" style={styles.button}>
            Re-check DMARC
          </Link>
        </div>

        {/* Policy details */}
        <div style={styles.infoBox}>
          <h2 style={styles.sectionTitle}>Policy details</h2>

          <h3 style={styles.subTitle}>p=none (monitoring)</h3>
          <p style={styles.text}>
            Collects DMARC reports without affecting delivery. Best for new
            setups and auditing all sending sources.
          </p>

          <pre style={styles.code}>
{`v=DMARC1; p=none; rua=mailto:dmarc@yourdomain.com;`}
          </pre>

          <h3 style={styles.subTitle}>p=quarantine (partial enforcement)</h3>
          <p style={styles.text}>
            Messages that fail DMARC are typically sent to spam. Use when you
            are confident most legitimate mail passes authentication.
          </p>

          <pre style={styles.code}>
{`v=DMARC1; p=quarantine; pct=50; rua=mailto:dmarc@yourdomain.com;`}
          </pre>

          <h3 style={styles.subTitle}>p=reject (full enforcement)</h3>
          <p style={styles.text}>
            Messages that fail DMARC are rejected outright. This offers the
            strongest protection against spoofing.
          </p>

          <pre style={styles.code}>
{`v=DMARC1; p=reject; rua=mailto:dmarc@yourdomain.com;`}
          </pre>
        </div>

        {/* What we checked */}
        <div style={styles.infoBox}>
          <h2 style={styles.sectionTitle}>What we checked</h2>
          <p style={styles.text}>
            We evaluated your DMARC record, identified the active policy, and
            verified SPF/DKIM alignment requirements.
          </p>
          <p style={styles.trust}>
            Live DNS lookup. No cached data. No assumptions.
          </p>
        </div>

        {/* Guidance */}
        <div style={styles.escapeBox}>
          <h3 style={styles.escapeTitle}>Recommended progression</h3>

          <ol style={styles.list}>
            <li>Start with <strong>p=none</strong> and review reports</li>
            <li>Fix SPF, DKIM, and alignment issues</li>
            <li>Move to <strong>p=quarantine</strong> with pct&lt;100</li>
            <li>End with <strong>p=reject</strong></li>
          </ol>

          <p style={styles.text}>Next steps:</p>
          <ul style={styles.list}>
            <li>
              <Link href="/dmarc/no-dmarc-record-found">
                Fix missing DMARC records
              </Link>
            </li>
            <li>
              <Link href="/dkim/dkim-alignment-failed">
                Fix DKIM alignment issues
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
  subTitle: {
    fontSize: 16,
    fontWeight: 600,
    marginTop: 20,
    marginBottom: 8,
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
