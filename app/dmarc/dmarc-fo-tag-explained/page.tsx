import Link from "next/link";

export const metadata = {
  title: "DMARC fo= Explained – Failure Reporting Options",
  description:
    "Learn what the DMARC fo= tag does, how failure reporting works, and which fo= value is right for your domain.",
};

export default function DmarcFoTagExplainedPage() {
  return (
    <main style={styles.wrapper}>
      <section style={styles.card}>
        <h1 style={styles.title}>DMARC fo= Explained</h1>

        <p style={styles.subtitle}>
          The <strong>fo=</strong> tag controls when forensic (failure) reports
          are generated. It defines which authentication failures should trigger
          reporting.
        </p>

        {/* One-minute explanation */}
        <div style={styles.fixBox}>
          <h2 style={styles.sectionTitle}>What fo= does</h2>

          <pre style={styles.code}>
{`DMARC example:

v=DMARC1; p=none; fo=1; ruf=mailto:dmarc@yourdomain.com;

Result:
A report is generated if SPF or DKIM fails`} 
          </pre>

          <p style={styles.note}>
            The <code>fo=</code> tag only affects forensic reports (RUF), not
            aggregate reports (RUA).
          </p>

          <Link href="/" style={styles.button}>
            Re-check DMARC
          </Link>
        </div>

        {/* fo values */}
        <div style={styles.infoBox}>
          <h2 style={styles.sectionTitle}>fo= values explained</h2>

          <pre style={styles.code}>
{`fo=0  → report only if both SPF and DKIM fail
fo=1  → report if either SPF or DKIM fails
fo=d  → report DKIM failures only
fo=s  → report SPF failures only`} 
          </pre>

          <p style={styles.text}>
            Most domains use <strong>fo=1</strong> to maximize visibility.
          </p>
        </div>

        {/* When to use */}
        <div style={styles.infoBox}>
          <h2 style={styles.sectionTitle}>When fo= matters</h2>

          <ul style={styles.list}>
            <li>You want detailed failure diagnostics</li>
            <li>You are investigating spoofing attempts</li>
            <li>You are validating SPF/DKIM alignment</li>
          </ul>

          <p style={styles.text}>
            Note: many providers limit or no longer send forensic reports due to
            privacy concerns.
          </p>
        </div>

        {/* Common mistakes */}
        <div style={styles.infoBox}>
          <h2 style={styles.sectionTitle}>Common mistakes</h2>

          <ul style={styles.list}>
            <li>Expecting fo= to affect aggregate reports</li>
            <li>Using RUF without a working mailbox</li>
            <li>Relying on RUF when providers don’t send it</li>
          </ul>
        </div>

        {/* What we checked */}
        <div style={styles.infoBox}>
          <h2 style={styles.sectionTitle}>What we checked</h2>
          <p style={styles.text}>
            We parsed your DMARC record, detected the <code>fo=</code> value, and
            evaluated which failures would trigger reports.
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
              <Link href="/dmarc/dmarc-rua-ruf-not-working">
                Fix DMARC reporting issues
              </Link>
            </li>
            <li>
              <Link href="/dmarc/dmarc-policy-none-vs-quarantine-vs-reject">
                Review DMARC policy
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
