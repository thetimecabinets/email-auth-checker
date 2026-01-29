import Link from "next/link";

export const metadata = {
  title: "No DMARC Record Found – How to Fix DMARC (Step-by-Step)",
  description:
    "Your domain has no DMARC record. Learn why this matters, how it affects SPF and DKIM, and how to add a correct DMARC record safely.",
};

export default function NoDmarcRecordFoundPage() {
  return (
    <main style={styles.wrapper}>
      <section style={styles.card}>
        <h1 style={styles.title}>No DMARC Record Found</h1>

        <p style={styles.subtitle}>
          Your domain does not publish a DMARC record. Without DMARC, receiving
          mail servers have no policy for handling messages that fail SPF or
          DKIM, leaving your domain vulnerable to spoofing and phishing.
        </p>

        {/* One-Minute Fix */}
        <div style={styles.fixBox}>
          <h2 style={styles.sectionTitle}>One-Minute Fix</h2>

          <p style={styles.text}>
            Add a DMARC TXT record to your DNS to tell mail servers how to handle
            unauthenticated messages.
          </p>

          <pre style={styles.code}>
{`Safe starter DMARC record:

v=DMARC1; p=none; rua=mailto:dmarc@yourdomain.com; ruf=mailto:dmarc@yourdomain.com; fo=1;`}
          </pre>

          <p style={styles.note}>
            This policy enables monitoring only. No mail is blocked while you
            collect reports.
          </p>

          <Link href="/" style={styles.button}>
            Re-check DMARC
          </Link>
        </div>

        {/* Why this matters */}
        <div style={styles.infoBox}>
          <h2 style={styles.sectionTitle}>Why missing DMARC is a problem</h2>

          <ul style={styles.list}>
            <li>Attackers can spoof your domain</li>
            <li>SPF and DKIM results are not enforced</li>
            <li>Email providers cannot apply a policy</li>
            <li>Phishing protection is incomplete</li>
          </ul>

          <p style={styles.text}>
            DMARC ties SPF and DKIM together and defines what happens when
            authentication fails.
          </p>
        </div>

        {/* What we checked */}
        <div style={styles.infoBox}>
          <h2 style={styles.sectionTitle}>What we checked</h2>
          <p style={styles.text}>
            We queried the DNS record at{" "}
            <strong>_dmarc.yourdomain</strong> and searched for a valid DMARC
            policy starting with <strong>v=DMARC1</strong>.
          </p>
          <p style={styles.trust}>
            Live DNS lookup. No cached results. No assumptions.
          </p>
        </div>

        {/* Escape hatch */}
        <div style={styles.escapeBox}>
          <h3 style={styles.escapeTitle}>Still no DMARC record?</h3>

          <ul style={styles.list}>
            <li>The record was added to the wrong DNS zone</li>
            <li>It was created as a CNAME instead of TXT</li>
            <li>DNS changes have not propagated yet</li>
          </ul>

          <p style={styles.text}>
            DMARC records must be published as a TXT record at{" "}
            <strong>_dmarc.yourdomain</strong>.
          </p>

          <p style={styles.text}>Next steps:</p>
          <ul style={styles.list}>
            <li>
              <Link href="/dmarc/dmarc-policy-none-vs-quarantine-vs-reject">
                Choose the right DMARC policy
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
