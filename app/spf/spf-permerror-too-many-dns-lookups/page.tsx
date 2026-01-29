import Link from "next/link";

export const metadata = {
  title: "SPF Permerror – Too Many DNS Lookups (10) | How to Fix",
  description:
    "Your SPF record exceeds the 10 DNS lookup limit and causes SPF permerror. Learn why this happens and how to fix SPF too many DNS lookups safely.",
};

export default function SpfPermerrorTooManyLookupsPage() {
  return (
    <main style={styles.wrapper}>
      <section style={styles.card}>
        <h1 style={styles.title}>
          SPF Permerror: Too Many DNS Lookups (10)
        </h1>

        <p style={styles.subtitle}>
          Your SPF record exceeds the maximum of 10 DNS lookups. When this limit
          is reached, receiving mail servers stop evaluating SPF and treat the
          message as a permanent error (permerror).
        </p>

        {/* One-Minute Fix */}
        <div style={styles.fixBox}>
          <h2 style={styles.sectionTitle}>One-Minute Fix</h2>

          <p style={styles.text}>
            Reduce the number of <strong>include</strong>, <strong>a</strong>,{" "}
            <strong>mx</strong>, <strong>ptr</strong>, and{" "}
            <strong>redirect</strong> mechanisms in your SPF record to 10 or
            fewer.
          </p>

          <pre style={styles.code}>
{`Problematic SPF example (real-world):

v=spf1
 include:spf.protection.outlook.com
 include:spf.sendgrid.net
 include:mail.zendesk.com
 include:_spf.google.com
 include:servers.mcsv.net
 include:spf.mailplus.nl
 -all

Result: >10 DNS lookups → SPF permerror`}
          </pre>

          <pre style={styles.code}>
{`Fixed SPF example:

v=spf1
 ip4:213.75.39.14
 ip4:54.93.191.204
 include:spf.protection.outlook.com
 include:spf.mailplus.nl
 -all`}
          </pre>

          <p style={styles.note}>
            Each <strong>include</strong> can trigger multiple DNS lookups.
            Flattening or removing unused services is the fastest fix.
          </p>

          <Link href="/" style={styles.button}>
            Re-check SPF
          </Link>
        </div>

        {/* Why this happens */}
        <div style={styles.infoBox}>
          <h2 style={styles.sectionTitle}>
            Why the 10-lookup limit exists
          </h2>

          <p style={styles.text}>
            The SPF specification (RFC 7208) limits SPF evaluation to 10 DNS
            lookups to prevent excessive DNS queries during mail delivery.
            Exceeding this limit causes an immediate SPF permerror.
          </p>

          <p style={styles.text}>
            Common causes include:
          </p>

          <ul style={styles.list}>
            <li>Using many third-party email providers</li>
            <li>Old services left in the SPF record</li>
            <li>Nested includes that expand unexpectedly</li>
          </ul>

          <p style={styles.trust}>
            Live DNS evaluation. No cached records. No assumptions.
          </p>
        </div>

        {/* What we checked */}
        <div style={styles.infoBox}>
          <h2 style={styles.sectionTitle}>What we checked</h2>
          <p style={styles.text}>
            We resolved your SPF record, expanded all include mechanisms, and
            counted the total number of DNS lookups according to RFC 7208 rules.
          </p>
        </div>

        {/* Escape hatch */}
        <div style={styles.escapeBox}>
          <h3 style={styles.escapeTitle}>Still getting SPF permerror?</h3>

          <ul style={styles.list}>
            <li>You recently added a new email provider</li>
            <li>Multiple marketing tools send mail on your behalf</li>
            <li>Your provider publishes deeply nested SPF includes</li>
          </ul>

          <p style={styles.text}>
            Consider SPF flattening or consolidating mail services. Removing one
            unused include can immediately restore SPF pass.
          </p>

          <p style={styles.text}>
            Next steps:
          </p>

          <ul style={styles.list}>
            <li>
              <Link href="/spf/no-spf-record-found">
                Fix missing SPF records
              </Link>
            </li>
            <li>
              <Link href="/dmarc">
                Review your DMARC configuration
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
