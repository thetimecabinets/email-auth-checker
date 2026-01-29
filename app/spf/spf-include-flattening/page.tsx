import Link from "next/link";

export const metadata = {
  title: "SPF Include Flattening – What It Is & When to Use It",
  description:
    "SPF include flattening explained. Learn what SPF flattening does, when you need it, and the risks of flattening your SPF record.",
};

export default function SpfIncludeFlatteningPage() {
  return (
    <main style={styles.wrapper}>
      <section style={styles.card}>
        <h1 style={styles.title}>SPF Include Flattening</h1>

        <p style={styles.subtitle}>
          SPF include flattening is a technique used to reduce DNS lookups by
          replacing <strong>include</strong> mechanisms with direct IP
          addresses. It is often used to avoid SPF permerror caused by too many
          DNS lookups.
        </p>

        {/* One-Minute Explanation */}
        <div style={styles.fixBox}>
          <h2 style={styles.sectionTitle}>What flattening does</h2>

          <pre style={styles.code}>
{`Before flattening:

v=spf1
 include:spf.protection.outlook.com
 include:_spf.google.com
 include:sendgrid.net
 -all

After flattening:

v=spf1
 ip4:40.92.0.0/15
 ip4:52.96.0.0/14
 ip4:64.233.160.0/19
 ip4:167.89.0.0/17
 -all`}
          </pre>

          <p style={styles.note}>
            Flattening removes DNS lookups but requires ongoing maintenance.
          </p>

          <Link href="/" style={styles.button}>
            Re-check SPF
          </Link>
        </div>

        {/* When to use it */}
        <div style={styles.infoBox}>
          <h2 style={styles.sectionTitle}>When SPF flattening makes sense</h2>

          <ul style={styles.list}>
            <li>Your SPF record exceeds the 10 DNS lookup limit</li>
            <li>You use many third-party email services</li>
            <li>You cannot remove unused providers</li>
          </ul>

          <p style={styles.text}>
            Flattening is a workaround, not a best practice. Whenever possible,
            reduce includes instead.
          </p>
        </div>

        {/* Risks */}
        <div style={styles.infoBox}>
          <h2 style={styles.sectionTitle}>Risks of SPF flattening</h2>

          <ul style={styles.list}>
            <li>IP addresses change without notice</li>
            <li>Manual updates are required</li>
            <li>Outdated records can break email delivery</li>
          </ul>

          <p style={styles.text}>
            Many providers discourage flattening unless automated tools are
            used.
          </p>
        </div>

        {/* What we checked */}
        <div style={styles.infoBox}>
          <h2 style={styles.sectionTitle}>What we checked</h2>
          <p style={styles.text}>
            We expanded your SPF includes, counted DNS lookups, and identified
            whether flattening is required.
          </p>
          <p style={styles.trust}>
            Live SPF expansion. No cached data.
          </p>
        </div>

        {/* Escape hatch */}
        <div style={styles.escapeBox}>
          <h3 style={styles.escapeTitle}>Better alternatives</h3>

          <ul style={styles.list}>
            <li>Remove unused SPF includes</li>
            <li>Consolidate email providers</li>
            <li>Use subdomains for separate services</li>
          </ul>

          <p style={styles.text}>Next steps:</p>
          <ul style={styles.list}>
            <li>
              <Link href="/spf/spf-permerror-too-many-dns-lookups">
                Fix SPF permerror
              </Link>
            </li>
            <li>
              <Link href="/spf/multiple-spf-records-found">
                Fix multiple SPF records
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
