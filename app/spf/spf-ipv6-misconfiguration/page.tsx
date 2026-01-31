import Link from "next/link";

export const metadata = {
  title: "SPF IPv6 (ip6:) Misconfiguration – Why SPF Fails & How to Fix It",
  description:
    "SPF ip6: misconfiguration explained. Learn common IPv6 SPF mistakes, how they break SPF, and how to fix ip6 entries safely.",
};

export default function SpfIpv6MisconfigurationPage() {
  return (
    <main style={styles.wrapper}>
      <section style={styles.card}>
        <h1 style={styles.title}>SPF IPv6 (ip6:) Misconfiguration</h1>

        <p style={styles.subtitle}>
          SPF supports IPv6 via the <strong>ip6:</strong> mechanism. When IPv6
          ranges are incorrect or unnecessary, SPF can fail or behave
          unpredictably—often without obvious errors.
        </p>

        {/* One-minute fix */}
        <div style={styles.fixBox}>
          <h2 style={styles.sectionTitle}>One-Minute Fix</h2>

          <p style={styles.text}>
            Remove invalid or unused <strong>ip6:</strong> entries, or replace
            them with correct IPv6 ranges provided by your email service.
          </p>

          <pre style={styles.code}>
{`Invalid SPF (bad IPv6):

v=spf1 ip6:2001:db8::12345 include:_spf.google.com -all

Correct SPF:

v=spf1 include:_spf.google.com -all`}
          </pre>

          <p style={styles.note}>
            If you do not send mail over IPv6, you usually do not need
            <code> ip6:</code> at all.
          </p>

          <Link href="/" style={styles.button}>
            Re-check SPF
          </Link>
        </div>

        {/* Why this happens */}
        <div style={styles.infoBox}>
          <h2 style={styles.sectionTitle}>Why IPv6 SPF breaks</h2>

          <ul style={styles.list}>
            <li>Malformed IPv6 address or prefix</li>
            <li>Using IPv4 addresses with <code>ip6:</code></li>
            <li>Copy-pasted examples left in production</li>
            <li>IPv6 enabled in DNS but not used for sending</li>
          </ul>

          <p style={styles.text}>
            SPF does not validate whether you actually send over IPv6—it only
            evaluates the syntax and authorization.
          </p>
        </div>

        {/* How SPF evaluates ip6 */}
        <div style={styles.infoBox}>
          <h2 style={styles.sectionTitle}>How SPF evaluates ip6:</h2>

          <pre style={styles.code}>
{`Example:

ip6:2001:4860::/32  → authorizes Google IPv6 senders
ip6:2a00:1450::/32  → authorizes Google IPv6 senders`} 
          </pre>

          <ul style={styles.list}>
            <li>IPv6 prefixes must be valid CIDR ranges</li>
            <li>Exact matching is required</li>
            <li>Invalid ranges cause SPF to ignore the mechanism</li>
          </ul>
        </div>

        {/* What we checked */}
        <div style={styles.infoBox}>
          <h2 style={styles.sectionTitle}>What we checked</h2>
          <p style={styles.text}>
            We parsed your SPF record, identified <code>ip6:</code> mechanisms,
            and validated their syntax and relevance to your sending setup.
          </p>
          <p style={styles.trust}>
            Live SPF parsing. No assumptions.
          </p>
        </div>

        {/* Escape hatch */}
        <div style={styles.escapeBox}>
          <h3 style={styles.escapeTitle}>Next steps</h3>

          <ul style={styles.list}>
            <li>
              <Link href="/spf/spf-permerror-too-many-dns-lookups">
                Fix SPF permerror (DNS lookup limit)
              </Link>
            </li>
            <li>
              <Link href="/spf/spf-softfail-vs-fail">
                Understand SPF softfail vs fail
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
