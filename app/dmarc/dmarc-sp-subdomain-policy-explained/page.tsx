import Link from "next/link";

export const metadata = {
  title: "DMARC sp= Explained – Subdomain Policy & Common Mistakes",
  description:
    "Learn what the DMARC sp= tag does, how subdomain policies work, and how to secure subdomains without breaking mail.",
};

export default function DmarcSpSubdomainPolicyExplainedPage() {
  return (
    <main style={styles.wrapper}>
      <section style={styles.card}>
        <h1 style={styles.title}>DMARC sp= Explained (Subdomain Policy)</h1>

        <p style={styles.subtitle}>
          The <strong>sp=</strong> tag defines a DMARC policy for subdomains.
          Without it, subdomains inherit the main domain’s DMARC policy.
        </p>

        {/* One-minute explanation */}
        <div style={styles.fixBox}>
          <h2 style={styles.sectionTitle}>What sp= does</h2>

          <pre style={styles.code}>
{`DMARC example with subdomain policy:

v=DMARC1; p=reject; sp=none; rua=mailto:dmarc@yourdomain.com;

Result:
- Main domain: enforced (reject)
- Subdomains: monitoring only`} 
          </pre>

          <p style={styles.note}>
            The <strong>sp=</strong> tag overrides the main policy for subdomains
            only.
          </p>

          <Link href="/" style={styles.button}>
            Re-check DMARC
          </Link>
        </div>

        {/* When to use */}
        <div style={styles.infoBox}>
          <h2 style={styles.sectionTitle}>When sp= is useful</h2>

          <ul style={styles.list}>
            <li>You send mail from the main domain only</li>
            <li>Subdomains are used by third parties</li>
            <li>You want stricter control over the root domain</li>
          </ul>

          <p style={styles.text}>
            Many organizations enforce DMARC on the main domain while monitoring
            subdomains separately.
          </p>
        </div>

        {/* Common mistakes */}
        <div style={styles.infoBox}>
          <h2 style={styles.sectionTitle}>Common mistakes</h2>

          <ul style={styles.list}>
            <li>Assuming subdomains are protected automatically</li>
            <li>Using <code>sp=reject</code> without auditing subdomain traffic</li>
            <li>Forgetting that sp= applies only to subdomains</li>
          </ul>

          <pre style={styles.code}>
{`Risky DMARC:

v=DMARC1; p=none; sp=reject;`} 
          </pre>
        </div>

        {/* What we checked */}
        <div style={styles.infoBox}>
          <h2 style={styles.sectionTitle}>What we checked</h2>
          <p style={styles.text}>
            We evaluated your DMARC record, detected use of the <code>sp=</code>{" "}
            tag, and determined how subdomains are treated.
          </p>
          <p style={styles.trust}>
            Live DMARC evaluation. No assumptions.
          </p>
        </div>

        {/* Escape hatch */}
        <div style={styles.escapeBox}>
          <h3 style={styles.escapeTitle}>Next steps</h3>

          <ul style={styles.list}>
            <li>
              <Link href="/dmarc/dmarc-policy-none-vs-quarantine-vs-reject">
                Review DMARC policy
              </Link>
            </li>
            <li>
              <Link href="/dmarc/dmarc-pct-tag-explained">
                Use partial enforcement safely
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
