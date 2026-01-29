import Link from "next/link";

export const metadata = {
  title: "Multiple DMARC Records Found – Why It Breaks DMARC & How to Fix",
  description:
    "Your domain has multiple DMARC records. Learn why this is invalid, how it breaks DMARC, and how to fix it correctly.",
};

export default function MultipleDmarcRecordsFoundPage() {
  return (
    <main style={styles.wrapper}>
      <section style={styles.card}>
        <h1 style={styles.title}>Multiple DMARC Records Found</h1>

        <p style={styles.subtitle}>
          Your domain publishes more than one DMARC record. This is invalid.
          Receiving mail servers cannot determine which policy to apply and will
          ignore DMARC entirely.
        </p>

        {/* One-minute fix */}
        <div style={styles.fixBox}>
          <h2 style={styles.sectionTitle}>One-Minute Fix</h2>

          <p style={styles.text}>
            Keep exactly <strong>one</strong> DMARC record at{" "}
            <code>_dmarc.yourdomain</code> and remove all others.
          </p>

          <pre style={styles.code}>
{`Invalid configuration:

_dmarc.example.com TXT "v=DMARC1; p=none;"
_dmarc.example.com TXT "v=DMARC1; p=reject;"`}
          </pre>

          <pre style={styles.code}>
{`Correct configuration:

_dmarc.example.com TXT "v=DMARC1; p=none; rua=mailto:dmarc@example.com;"`}
          </pre>

          <Link href="/" style={styles.button}>
            Re-check DMARC
          </Link>
        </div>

        {/* Why this breaks DMARC */}
        <div style={styles.infoBox}>
          <h2 style={styles.sectionTitle}>
            Why multiple DMARC records break DMARC
          </h2>

          <ul style={styles.list}>
            <li>DMARC allows only one policy per domain</li>
            <li>Mail servers stop evaluation on ambiguity</li>
            <li>No reports are generated</li>
          </ul>

          <p style={styles.text}>
            Unlike SPF, DMARC does not attempt to merge records.
          </p>
        </div>

        {/* What we checked */}
        <div style={styles.infoBox}>
          <h2 style={styles.sectionTitle}>What we checked</h2>
          <p style={styles.text}>
            We queried <code>_dmarc.yourdomain</code> and detected multiple TXT
            records starting with <strong>v=DMARC1</strong>.
          </p>
          <p style={styles.trust}>
            Live DNS lookup. No assumptions.
          </p>
        </div>

        {/* Common causes */}
        <div style={styles.escapeBox}>
          <h3 style={styles.escapeTitle}>Common causes</h3>

          <ul style={styles.list}>
            <li>Old DMARC records left behind</li>
            <li>DNS panels auto-creating DMARC entries</li>
            <li>Manual edits without cleanup</li>
          </ul>

          <p style={styles.text}>Next steps:</p>
          <ul style={styles.list}>
            <li>
              <Link href="/dmarc/no-dmarc-record-found">
                Fix missing DMARC records
              </Link>
            </li>
            <li>
              <Link href="/dmarc/dmarc-policy-none-vs-quarantine-vs-reject">
                Choose the correct DMARC policy
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
