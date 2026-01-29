import Link from "next/link";

export const metadata = {
  title: "DMARC RUA / RUF Not Working – Fix DMARC Reporting",
  description:
    "DMARC reports not arriving? Learn why RUA/RUF emails fail and how to fix DMARC reporting step-by-step.",
};

export default function DmarcRuaRufNotWorkingPage() {
  return (
    <main style={styles.wrapper}>
      <section style={styles.card}>
        <h1 style={styles.title}>DMARC RUA / RUF Not Working</h1>

        <p style={styles.subtitle}>
          Your DMARC record is present, but aggregate (RUA) or forensic (RUF)
          reports are not arriving. This usually means the reporting address is
          invalid, unauthorized, or blocked.
        </p>

        {/* One-Minute Fix */}
        <div style={styles.fixBox}>
          <h2 style={styles.sectionTitle}>One-Minute Fix</h2>

          <p style={styles.text}>
            Ensure the reporting mailbox exists and is authorized to receive
            DMARC reports.
          </p>

          <pre style={styles.code}>
{`Working DMARC example:

v=DMARC1; p=none;
rua=mailto:dmarc@yourdomain.com;
ruf=mailto:dmarc@yourdomain.com; fo=1;`}
          </pre>

          <p style={styles.note}>
            The mailbox must exist and accept large attachments (XML files).
          </p>

          <Link href="/" style={styles.button}>
            Re-check DMARC
          </Link>
        </div>

        {/* Common causes */}
        <div style={styles.infoBox}>
          <h2 style={styles.sectionTitle}>Why DMARC reports fail</h2>

          <ul style={styles.list}>
            <li>Mailbox does not exist</li>
            <li>Receiving domain blocks external reports</li>
            <li>No external reporting authorization</li>
            <li>Attachment size limits</li>
            <li>RUF disabled by many providers</li>
          </ul>

          <p style={styles.text}>
            Most providers only send RUA reports. RUF is often ignored or
            deprecated.
          </p>
        </div>

        {/* External reporting */}
        <div style={styles.infoBox}>
          <h2 style={styles.sectionTitle}>
            Using a third-party DMARC report service
          </h2>

          <p style={styles.text}>
            When sending reports to another domain, you must authorize it using
            a DNS record.
          </p>

          <pre style={styles.code}>
{`Authorization example:

_dmarc.yourdomain.com._report._dmarc.vendor.com TXT "v=DMARC1"`} 
          </pre>

          <p style={styles.note}>
            Without this record, reports will be silently dropped.
          </p>
        </div>

        {/* What we checked */}
        <div style={styles.infoBox}>
          <h2 style={styles.sectionTitle}>What we checked</h2>
          <p style={styles.text}>
            We validated your DMARC record, checked for RUA/RUF tags, and
            verified reporting destinations.
          </p>
          <p style={styles.trust}>
            Live DNS lookup. No assumptions.
          </p>
        </div>

        {/* Escape hatch */}
        <div style={styles.escapeBox}>
          <h3 style={styles.escapeTitle}>Still no reports?</h3>

          <ul style={styles.list}>
            <li>Wait 24–48 hours (reports are sent daily)</li>
            <li>Check spam/quarantine folders</li>
            <li>Use a dedicated DMARC reporting service</li>
          </ul>

          <p style={styles.text}>Next steps:</p>
          <ul style={styles.list}>
            <li>
              <Link href="/dmarc/dmarc-policy-none-vs-quarantine-vs-reject">
                Review DMARC policy
              </Link>
            </li>
            <li>
              <Link href="/dmarc/dmarc-alignment-failed">
                Fix DMARC alignment
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
