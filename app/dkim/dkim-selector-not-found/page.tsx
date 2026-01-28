import Link from "next/link";

export const metadata = {
  title: "DKIM Selector Not Found – Fix DKIM Selector Mismatch",
  description:
    "DKIM selector not found for your domain. Learn why DKIM selectors fail, how to identify the correct selector, and fix the issue with a copy-paste DNS record.",
};

export default function DkimSelectorNotFoundPage() {
  return (
    <main style={styles.wrapper}>
      <section style={styles.card}>
        <h1 style={styles.title}>DKIM Selector Not Found</h1>

        <p style={styles.subtitle}>
          Your domain has DKIM enabled, but the selector used to sign emails does
          not exist in DNS. This causes DKIM checks to fail.
        </p>

        {/* One-Minute Fix */}
        <div style={styles.fixBox}>
          <h2 style={styles.sectionTitle}>One-Minute Fix</h2>
          <p style={styles.text}>
            Make sure the DKIM selector used by your email provider exists as a
            DNS record.
          </p>

          <pre style={styles.code}>
{`Type:  TXT
Host:  selector2._domainkey
Value: v=DKIM1; k=rsa; p=PROVIDER_PUBLIC_KEY
TTL:   Auto`}
          </pre>

          <p style={styles.note}>
            The selector name (for example <strong>selector2</strong>) must
            exactly match the selector used in your email headers.
          </p>

          <Link href="/" style={styles.button}>
            Re-check DKIM
          </Link>
        </div>

        {/* What we checked */}
        <div style={styles.infoBox}>
          <h2 style={styles.sectionTitle}>What we checked</h2>
          <p style={styles.text}>
            We checked common DKIM selector names and compared them with the
            selector used to sign outgoing emails.
          </p>
          <p style={styles.trust}>
            Live DNS lookup. No login. No saved domains. No tracking.
          </p>
        </div>

        {/* Still failing */}
        <div style={styles.escapeBox}>
          <h3 style={styles.escapeTitle}>Still failing?</h3>
          <ul style={styles.list}>
            <li>Your provider rotated DKIM keys recently</li>
            <li>The selector was created in the provider but not added to DNS</li>
            <li>Multiple DKIM selectors exist but the wrong one is active</li>
          </ul>
          <p style={styles.text}>
            Check your email provider’s DKIM settings to confirm the active
            selector, then re-check after DNS propagation.
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
