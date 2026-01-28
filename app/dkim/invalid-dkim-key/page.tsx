import Link from "next/link";

export const metadata = {
  title: "Invalid DKIM Key – Fix DKIM Public Key Format Error",
  description:
    "Your DKIM record exists but the public key is invalid or malformed. Learn why DKIM keys break and how to fix the issue with a correct copy-paste DNS record.",
};

export default function InvalidDkimKeyPage() {
  return (
    <main style={styles.wrapper}>
      <section style={styles.card}>
        <h1 style={styles.title}>Invalid DKIM Public Key</h1>

        <p style={styles.subtitle}>
          Your domain has a DKIM record, but the public key is invalid. This
          usually happens when the key is copied incorrectly or modified.
        </p>

        {/* One-Minute Fix */}
        <div style={styles.fixBox}>
          <h2 style={styles.sectionTitle}>One-Minute Fix</h2>
          <p style={styles.text}>
            Replace the DKIM record with a correctly formatted public key from
            your email provider.
          </p>

          <pre style={styles.code}>
{`Type:  TXT
Host:  selector1._domainkey
Value: v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8A...
TTL:   Auto`}
          </pre>

          <p style={styles.note}>
            The DKIM public key must be a <strong>single uninterrupted string</strong>.
            No line breaks, quotes, or extra spaces.
          </p>

          <Link href="/" style={styles.button}>
            Re-check DKIM
          </Link>
        </div>

        {/* What we checked */}
        <div style={styles.infoBox}>
          <h2 style={styles.sectionTitle}>What we checked</h2>
          <p style={styles.text}>
            We verified that a DKIM record exists and validated the format of the
            public key according to DKIM specifications.
          </p>
          <p style={styles.trust}>
            Live DNS lookup. No login. No saved domains. No tracking.
          </p>
        </div>

        {/* Escape hatch */}
        <div style={styles.escapeBox}>
          <h3 style={styles.escapeTitle}>Still failing?</h3>
          <ul style={styles.list}>
            <li>The DKIM key was split into multiple DNS strings</li>
            <li>The key was truncated or partially copied</li>
            <li>The provider rotated keys but DNS was not updated</li>
          </ul>
          <p style={styles.text}>
            Re-copy the DKIM key directly from your email provider’s dashboard
            and update the DNS record exactly as shown.
          </p>
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
