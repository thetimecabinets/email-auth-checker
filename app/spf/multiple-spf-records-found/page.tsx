import Link from "next/link";

export const metadata = {
  title: "Multiple SPF Records Found – How to Fix SPF",
  description:
    "Your domain has multiple SPF records. Learn why this breaks SPF validation and how to merge SPF records correctly.",
};

export default function MultipleSpfRecordsFoundPage() {
  return (
    <main style={styles.wrapper}>
      <section style={styles.card}>
        <h1 style={styles.title}>Multiple SPF Records Found</h1>

        <p style={styles.subtitle}>
          Your domain publishes more than one SPF record. This is invalid and
          causes SPF checks to fail completely.
        </p>

        {/* One-Minute Fix */}
        <div style={styles.fixBox}>
          <h2 style={styles.sectionTitle}>One-Minute Fix</h2>

          <p style={styles.text}>
            Merge all SPF mechanisms into a <strong>single</strong> SPF record
            and remove the others.
          </p>

          <pre style={styles.code}>
{`Invalid configuration:

TXT "v=spf1 include:spf.protection.outlook.com -all"
TXT "v=spf1 include:_spf.google.com -all"`}
          </pre>

          <pre style={styles.code}>
{`Correct configuration:

TXT "v=spf1 include:spf.protection.outlook.com include:_spf.google.com -all"`}
          </pre>

          <Link href="/" style={styles.button}>
            Re-check SPF
          </Link>
        </div>

        {/* Why this breaks SPF */}
        <div style={styles.infoBox}>
          <h2 style={styles.sectionTitle}>Why multiple SPF records break SPF</h2>

          <p style={styles.text}>
            The SPF specification allows exactly one SPF record per domain.
            When multiple records exist, receiving mail servers cannot determine
            which policy to apply and return a permanent error.
          </p>
        </div>

        {/* What we checked */}
        <div style={styles.infoBox}>
          <h2 style={styles.sectionTitle}>What we checked</h2>
          <p style={styles.text}>
            We queried all TXT records for your domain and detected more than one
            record starting with <strong>v=spf1</strong>.
          </p>
          <p style={styles.trust}>
            Live DNS lookup. No cached results.
          </p>
        </div>

        {/* Escape hatch */}
        <div style={styles.escapeBox}>
          <h3 style={styles.escapeTitle}>Common causes</h3>

          <ul style={styles.list}>
            <li>Adding a new email provider without merging SPF</li>
            <li>DNS panels auto-creating SPF records</li>
            <li>Old SPF records left behind</li>
          </ul>

          <p style={styles.text}>Next steps:</p>
          <ul style={styles.list}>
            <li>
              <Link href="/spf/spf-permerror-too-many-dns-lookups">
                Fix SPF permerror (too many DNS lookups)
              </Link>
            </li>
            <li>
              <Link href="/spf/spf-softfail-vs-fail">
                Understand SPF softfail vs fail
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
