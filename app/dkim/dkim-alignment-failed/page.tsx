import Link from "next/link";

export const metadata = {
  title: "DKIM Alignment Failed – Fix DKIM DMARC Alignment",
  description:
    "DKIM is configured but not aligned with your From domain. Learn why DKIM alignment fails and how to fix DMARC DKIM alignment in one minute.",
};

export default function DkimAlignmentFailedPage() {
  return (
    <main style={styles.wrapper}>
      <section style={styles.card}>
        <h1 style={styles.title}>DKIM Alignment Failed</h1>

        <p style={styles.subtitle}>
          Your DKIM signature is valid, but it is not aligned with the domain in
          the From address. Because of this, DMARC treats the message as
          unauthenticated.
        </p>

        {/* One-Minute Fix */}
        <div style={styles.fixBox}>
          <h2 style={styles.sectionTitle}>One-Minute Fix</h2>

          <p style={styles.text}>
            Configure DKIM so that the signing domain matches the domain used in
            the From address.
          </p>

          <pre style={styles.code}>
{`From address:   user@example.com
DKIM d= domain:  mail.example.net

Fix: Use DKIM signing with d=example.com`}
          </pre>

          <p style={styles.note}>
            The <strong>d=</strong> value in the DKIM signature must match (or be
            a subdomain of) the From domain for DMARC alignment to pass.
          </p>

          <Link href="/" style={styles.button}>
            Re-check DKIM
          </Link>
        </div>

        {/* What we checked */}
        <div style={styles.infoBox}>
          <h2 style={styles.sectionTitle}>What we checked</h2>
          <p style={styles.text}>
            We verified that DKIM is present and valid, then compared the DKIM
            signing domain with the domain used in the From header.
          </p>
          <p style={styles.trust}>
            Live DNS lookup. No login. No saved domains. No tracking.
          </p>
        </div>

        {/* Escape hatch */}
        <div style={styles.escapeBox}>
          <h3 style={styles.escapeTitle}>Still failing?</h3>
          <ul style={styles.list}>
            <li>You are sending mail through a third-party service</li>
            <li>The provider signs with its own domain by default</li>
            <li>Multiple From domains are used</li>
          </ul>
          <p style={styles.text}>
            Enable custom DKIM signing in your email provider so messages are
            signed with your own domain.
          </p>

          <p style={styles.text}>
            Next step:{" "}
            <Link href="/dmarc">check your DMARC configuration</Link>.
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
