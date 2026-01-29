import Link from "next/link";

export const metadata = {
  title: "DMARC aspf & adkim Explained – Strict vs Relaxed Alignment",
  description:
    "Learn how DMARC aspf and adkim alignment modes work, the difference between strict and relaxed, and how to choose the right setting.",
};

export default function DmarcAspfAdkimExplainedPage() {
  return (
    <main style={styles.wrapper}>
      <section style={styles.card}>
        <h1 style={styles.title}>
          DMARC aspf & adkim Explained (Strict vs Relaxed)
        </h1>

        <p style={styles.subtitle}>
          The <strong>aspf</strong> and <strong>adkim</strong> tags control how
          strictly SPF and DKIM domains must align with the From domain for
          DMARC to pass.
        </p>

        {/* One-minute explanation */}
        <div style={styles.fixBox}>
          <h2 style={styles.sectionTitle}>What aspf and adkim do</h2>

          <pre style={styles.code}>
{`DMARC alignment example:

v=DMARC1; p=reject; aspf=r; adkim=r;

Result:
Relaxed alignment for both SPF and DKIM`} 
          </pre>

          <p style={styles.note}>
            Alignment determines whether subdomains are accepted as a match.
          </p>

          <Link href="/" style={styles.button}>
            Re-check DMARC
          </Link>
        </div>

        {/* Relaxed vs strict */}
        <div style={styles.infoBox}>
          <h2 style={styles.sectionTitle}>Relaxed vs strict alignment</h2>

          <pre style={styles.code}>
{`Relaxed (r):
From: example.com
SPF/DKIM domain: mail.example.com  → PASS

Strict (s):
From: example.com
SPF/DKIM domain: mail.example.com  → FAIL`} 
          </pre>

          <ul style={styles.list}>
            <li><strong>r</strong> (relaxed): subdomains allowed</li>
            <li><strong>s</strong> (strict): exact match required</li>
          </ul>
        </div>

        {/* When to use */}
        <div style={styles.infoBox}>
          <h2 style={styles.sectionTitle}>Which mode should you use?</h2>

          <ul style={styles.list}>
            <li>Use <strong>relaxed</strong> for most domains</li>
            <li>Use <strong>strict</strong> only when fully controlled</li>
            <li>Strict mode increases risk of DMARC failure</li>
          </ul>

          <p style={styles.text}>
            Most production systems use relaxed alignment unless there is a
            specific security requirement.
          </p>
        </div>

        {/* Common mistakes */}
        <div style={styles.infoBox}>
          <h2 style={styles.sectionTitle}>Common mistakes</h2>

          <ul style={styles.list}>
            <li>Switching to strict alignment too early</li>
            <li>Using strict without auditing DKIM/SPF domains</li>
            <li>Assuming strict improves deliverability (it does not)</li>
          </ul>
        </div>

        {/* What we checked */}
        <div style={styles.infoBox}>
          <h2 style={styles.sectionTitle}>What we checked</h2>
          <p style={styles.text}>
            We evaluated your DMARC record, detected <code>aspf</code> and{" "}
            <code>adkim</code> values, and determined alignment behavior.
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
              <Link href="/dmarc/dmarc-alignment-failed">
                Fix DMARC alignment issues
              </Link>
            </li>
            <li>
              <Link href="/dkim/dkim-alignment-failed">
                Fix DKIM alignment
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
