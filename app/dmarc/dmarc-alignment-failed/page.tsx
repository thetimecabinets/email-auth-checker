import Link from "next/link";

export const metadata = {
  title: "DMARC Alignment Failed – Fix SPF & DKIM Alignment",
  description:
    "DMARC alignment failed because SPF or DKIM is not aligned with your From domain. Learn how alignment works and how to fix it fast.",
};

export default function DmarcAlignmentFailedPage() {
  return (
    <main style={styles.wrapper}>
      <section style={styles.card}>
        <h1 style={styles.title}>DMARC Alignment Failed</h1>

        <p style={styles.subtitle}>
          Your domain publishes DMARC, but SPF or DKIM is not aligned with the
          domain in the From header. When alignment fails, DMARC treats the
          message as unauthenticated.
        </p>

        {/* One-Minute Fix */}
        <div style={styles.fixBox}>
          <h2 style={styles.sectionTitle}>One-Minute Fix</h2>

          <p style={styles.text}>
            Ensure that at least <strong>one</strong> of SPF or DKIM aligns with
            the From domain.
          </p>

          <pre style={styles.code}>
{`Example failure:

From: user@example.com
SPF domain: mail.example.net
DKIM d=: mail.example.net

Result: DMARC fail (no alignment)

Fix:
SPF domain = example.com
or
DKIM d=example.com`}
          </pre>

          <p style={styles.note}>
            Alignment means the authenticated domain matches (or is a
            subdomain of) the From domain.
          </p>

          <Link href="/" style={styles.button}>
            Re-check DMARC
          </Link>
        </div>

        {/* How alignment works */}
        <div style={styles.infoBox}>
          <h2 style={styles.sectionTitle}>How DMARC alignment works</h2>

          <ul style={styles.list}>
            <li>
              <strong>SPF alignment</strong>: the SPF-authenticated domain must
              match the From domain
            </li>
            <li>
              <strong>DKIM alignment</strong>: the DKIM <code>d=</code> domain
              must match the From domain
            </li>
            <li>Only one of the two needs to align</li>
          </ul>

          <p style={styles.text}>
            If both SPF and DKIM authenticate but neither aligns, DMARC still
            fails.
          </p>
        </div>

        {/* What we checked */}
        <div style={styles.infoBox}>
          <h2 style={styles.sectionTitle}>What we checked</h2>
          <p style={styles.text}>
            We evaluated SPF and DKIM authentication results and compared the
            authenticated domains to the domain used in the From header.
          </p>
          <p style={styles.trust}>
            Live evaluation. No guessing. No cached data.
          </p>
        </div>

        {/* Escape hatch */}
        <div style={styles.escapeBox}>
          <h3 style={styles.escapeTitle}>Common causes</h3>

          <ul style={styles.list}>
            <li>Third-party email providers signing with their own domain</li>
            <li>Custom From domains without custom DKIM</li>
            <li>Multiple sending services with mixed configuration</li>
          </ul>

          <p style={styles.text}>
            Enable custom DKIM signing or update SPF so at least one method
            aligns with your From domain.
          </p>

          <p style={styles.text}>Next steps:</p>
          <ul style={styles.list}>
            <li>
              <Link href="/dkim/dkim-alignment-failed">
                Fix DKIM alignment
              </Link>
            </li>
            <li>
              <Link href="/dmarc/dmarc-policy-none-vs-quarantine-vs-reject">
                Review your DMARC policy
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
