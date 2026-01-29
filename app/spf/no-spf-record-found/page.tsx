import Link from "next/link";

export const metadata = {
  title: "No SPF Record Found – How to Fix SPF (Step-by-Step)",
  description:
    "Your domain has no SPF record. Learn what this means, why it breaks email delivery, and how to add a correct SPF record safely.",
};

export default function NoSpfRecordFoundPage() {
  return (
    <main style={styles.wrapper}>
      <section style={styles.card}>
        <h1 style={styles.title}>No SPF Record Found</h1>

        <p style={styles.subtitle}>
          Your domain does not publish an SPF record. As a result, receiving mail
          servers cannot verify which servers are allowed to send email on your
          behalf.
        </p>

        {/* One-Minute Fix */}
        <div style={styles.fixBox}>
          <h2 style={styles.sectionTitle}>One-Minute Fix</h2>

          <p style={styles.text}>
            Publish a single SPF record in your domain’s DNS that authorizes your
            email sending services.
          </p>

          <pre style={styles.code}>
{`Basic SPF example (safe starting point):

v=spf1 include:spf.protection.outlook.com -all`}
          </pre>

          <p style={styles.note}>
            This example allows Microsoft 365 to send email for your domain and
            blocks all other sources.
          </p>

          <Link href="/" style={styles.button}>
            Re-check SPF
          </Link>
        </div>

        {/* Why this matters */}
        <div style={styles.infoBox}>
          <h2 style={styles.sectionTitle}>Why missing SPF is a problem</h2>

          <ul style={styles.list}>
            <li>Emails may fail SPF checks</li>
            <li>Messages are more likely to land in spam</li>
            <li>DMARC cannot fully protect your domain</li>
            <li>Attackers can spoof your domain more easily</li>
          </ul>

          <p style={styles.text}>
            While SPF is not strictly required, most modern mail systems expect
            it to be present.
          </p>
        </div>

        {/* What we checked */}
        <div style={styles.infoBox}>
          <h2 style={styles.sectionTitle}>What we checked</h2>
          <p style={styles.text}>
            We queried your domain’s DNS for TXT records and searched for an SPF
            record starting with <strong>v=spf1</strong>.
          </p>
          <p style={styles.trust}>
            Live DNS lookup. No assumptions. No cached results.
          </p>
        </div>

        {/* Escape hatch */}
        <div style={styles.escapeBox}>
          <h3 style={styles.escapeTitle}>Still seeing “No SPF record found”?</h3>

          <ul style={styles.list}>
            <li>The SPF record was added to the wrong DNS zone</li>
            <li>Multiple SPF records exist (invalid configuration)</li>
            <li>DNS changes haven’t propagated yet</li>
          </ul>

          <p style={styles.text}>
            Ensure there is exactly <strong>one</strong> SPF record and allow up
            to 24 hours for DNS propagation.
          </p>

          <p style={styles.text}>Next steps:</p>
          <ul style={styles.list}>
            <li>
              <Link href="/spf/spf-permerror-too-many-dns-lookups">
                Fix SPF permerror (too many DNS lookups)
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
