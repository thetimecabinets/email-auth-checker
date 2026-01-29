import Link from "next/link";

export const metadata = {
  title: "DKIM Key Length Too Short – 1024 vs 2048 (How to Fix)",
  description:
    "Your DKIM key is too short (1024-bit). Learn why providers require 2048-bit DKIM keys and how to rotate your DKIM key safely.",
};

export default function DkimKeyLengthTooShortPage() {
  return (
    <main style={styles.wrapper}>
      <section style={styles.card}>
        <h1 style={styles.title}>DKIM Key Length Too Short</h1>

        <p style={styles.subtitle}>
          Your domain uses a 1024-bit DKIM key. Many email providers now require
          2048-bit DKIM keys for stronger cryptographic security.
        </p>

        {/* One-Minute Fix */}
        <div style={styles.fixBox}>
          <h2 style={styles.sectionTitle}>One-Minute Fix</h2>

          <p style={styles.text}>
            Generate a new <strong>2048-bit DKIM key</strong> in your email
            provider and publish the new DNS record.
          </p>

          <pre style={styles.code}>
{`Weak DKIM key (1024-bit):

v=DKIM1; k=rsa; p=MIIBIjANBgkq...

Recommended DKIM key (2048-bit):

v=DKIM1; k=rsa; p=MIIBIjANBgkq... (longer key)`} 
          </pre>

          <p style={styles.note}>
            Key rotation does not interrupt mail flow if both old and new keys
            are valid during transition.
          </p>

          <Link href="/" style={styles.button}>
            Re-check DKIM
          </Link>
        </div>

        {/* Why this matters */}
        <div style={styles.infoBox}>
          <h2 style={styles.sectionTitle}>Why 2048-bit DKIM is required</h2>

          <ul style={styles.list}>
            <li>Stronger protection against key compromise</li>
            <li>Required by Google, Yahoo, and Microsoft</li>
            <li>Improves DMARC reliability</li>
          </ul>

          <p style={styles.text}>
            Short DKIM keys are increasingly rejected or downgraded by receiving
            mail servers.
          </p>
        </div>

        {/* What we checked */}
        <div style={styles.infoBox}>
          <h2 style={styles.sectionTitle}>What we checked</h2>
          <p style={styles.text}>
            We analyzed the DKIM public key length published in DNS and compared
            it against current best-practice requirements.
          </p>
          <p style={styles.trust}>
            Live DNS lookup. No cached data.
          </p>
        </div>

        {/* Escape hatch */}
        <div style={styles.escapeBox}>
          <h3 style={styles.escapeTitle}>Common causes</h3>

          <ul style={styles.list}>
            <li>Legacy DKIM setup created years ago</li>
            <li>Email provider defaulting to 1024-bit keys</li>
            <li>Manual DKIM configuration</li>
          </ul>

          <p style={styles.text}>Next steps:</p>
          <ul style={styles.list}>
            <li>
              <Link href="/dkim/invalid-dkim-key">
                Fix invalid DKIM keys
              </Link>
            </li>
            <li>
              <Link href="/dmarc/dmarc-policy-none-vs-quarantine-vs-reject">
                Review DMARC policy
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
