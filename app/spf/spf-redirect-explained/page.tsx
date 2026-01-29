import Link from "next/link";

export const metadata = {
  title: "SPF redirect= Explained – How It Works & Common Mistakes",
  description:
    "Learn what SPF redirect= does, how it differs from include, and common mistakes that cause SPF failures.",
};

export default function SpfRedirectExplainedPage() {
  return (
    <main style={styles.wrapper}>
      <section style={styles.card}>
        <h1 style={styles.title}>SPF redirect= Explained</h1>

        <p style={styles.subtitle}>
          The <strong>redirect=</strong> mechanism tells receiving mail servers
          to ignore the current SPF record and evaluate another domain’s SPF
          policy instead. Used incorrectly, it can completely break SPF.
        </p>

        {/* One-minute explanation */}
        <div style={styles.fixBox}>
          <h2 style={styles.sectionTitle}>What redirect= does</h2>

          <pre style={styles.code}>
{`SPF with redirect:

v=spf1 redirect=_spf.example.net

Result:
The SPF record of example.net is evaluated
instead of this domain’s SPF`}
          </pre>

          <p style={styles.note}>
            Once <strong>redirect=</strong> is reached, no further mechanisms are
            processed.
          </p>

          <Link href="/" style={styles.button}>
            Re-check SPF
          </Link>
        </div>

        {/* redirect vs include */}
        <div style={styles.infoBox}>
          <h2 style={styles.sectionTitle}>
            redirect= vs include (important difference)
          </h2>

          <pre style={styles.code}>
{`include:example.net  → adds example.net rules
redirect=example.net  → replaces all rules`}
          </pre>

          <ul style={styles.list}>
            <li><strong>include</strong> extends your SPF</li>
            <li><strong>redirect</strong> hands control away</li>
            <li>Only one redirect is allowed</li>
          </ul>
        </div>

        {/* Common mistakes */}
        <div style={styles.infoBox}>
          <h2 style={styles.sectionTitle}>Common redirect mistakes</h2>

          <ul style={styles.list}>
            <li>Using redirect together with <code>-all</code></li>
            <li>Multiple redirect mechanisms</li>
            <li>Redirecting to a domain without SPF</li>
            <li>Redirect chains causing lookup limits</li>
          </ul>

          <pre style={styles.code}>
{`Invalid SPF:

v=spf1 ip4:1.2.3.4 redirect=_spf.example.net -all`}
          </pre>
        </div>

        {/* What we checked */}
        <div style={styles.infoBox}>
          <h2 style={styles.sectionTitle}>What we checked</h2>
          <p style={styles.text}>
            We evaluated your SPF record, detected use of <strong>redirect=</strong>,
            and verified whether the redirected domain publishes a valid SPF
            policy.
          </p>
          <p style={styles.trust}>
            Live SPF expansion. No assumptions.
          </p>
        </div>

        {/* Escape hatch */}
        <div style={styles.escapeBox}>
          <h3 style={styles.escapeTitle}>When should you use redirect?</h3>

          <ul style={styles.list}>
            <li>You fully delegate email sending to one provider</li>
            <li>You want a single authoritative SPF policy</li>
            <li>You control both domains</li>
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
