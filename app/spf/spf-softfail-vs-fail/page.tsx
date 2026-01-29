import Link from "next/link";

export const metadata = {
  title: "SPF Softfail vs Fail – What’s the Difference?",
  description:
    "Learn the difference between SPF softfail (~all) and fail (-all). Understand when to use each and how they affect DMARC and email delivery.",
};

export default function SpfSoftfailVsFailPage() {
  return (
    <main style={styles.wrapper}>
      <section style={styles.card}>
        <h1 style={styles.title}>SPF Softfail vs Fail</h1>

        <p style={styles.subtitle}>
          SPF softfail and fail both indicate that an email is not authorized by
          SPF, but they signal different levels of enforcement to receiving mail
          servers.
        </p>

        {/* Quick answer */}
        <div style={styles.fixBox}>
          <h2 style={styles.sectionTitle}>Quick answer</h2>

          <pre style={styles.code}>
{`~all  → Softfail (not authorized, but not strictly rejected)
-all  → Fail (not authorized, explicit rejection)`}
          </pre>

          <p style={styles.note}>
            Softfail is typically used during testing. Fail should be used once
            your SPF record is correct.
          </p>

          <Link href="/" style={styles.button}>
            Re-check SPF
          </Link>
        </div>

        {/* Detailed explanation */}
        <div style={styles.infoBox}>
          <h2 style={styles.sectionTitle}>How they differ</h2>

          <h3 style={styles.subTitle}>SPF Softfail (~all)</h3>
          <p style={styles.text}>
            Softfail tells the receiving server that the sender is probably not
            authorized, but the result should be treated cautiously. Many
            providers still accept the message but may apply spam filtering.
          </p>

          <pre style={styles.code}>
{`v=spf1 include:spf.protection.outlook.com ~all`}
          </pre>

          <h3 style={styles.subTitle}>SPF Fail (-all)</h3>
          <p style={styles.text}>
            Fail is a clear statement that mail not matching the SPF rules is
            unauthorized. This is required for strict DMARC enforcement.
          </p>

          <pre style={styles.code}>
{`v=spf1 include:spf.protection.outlook.com -all`}
          </pre>
        </div>

        {/* Impact on DMARC */}
        <div style={styles.infoBox}>
          <h2 style={styles.sectionTitle}>Impact on DMARC</h2>

          <ul style={styles.list}>
            <li>Softfail may still allow messages to pass DMARC</li>
            <li>Fail strengthens DMARC enforcement</li>
            <li>DMARC p=reject works best with SPF -all or aligned DKIM</li>
          </ul>

          <p style={styles.text}>
            DMARC evaluates SPF and DKIM results together. A strict SPF policy
            reduces ambiguity.
          </p>
        </div>

        {/* What we checked */}
        <div style={styles.infoBox}>
          <h2 style={styles.sectionTitle}>What we checked</h2>
          <p style={styles.text}>
            We analyzed your SPF record and identified whether it ends with
            <strong> ~all</strong> or <strong> -all</strong>.
          </p>
          <p style={styles.trust}>
            Live DNS evaluation. No assumptions.
          </p>
        </div>

        {/* Guidance */}
        <div style={styles.escapeBox}>
          <h3 style={styles.escapeTitle}>Which one should you use?</h3>

          <ul style={styles.list}>
            <li>Use <strong>~all</strong> when testing or auditing senders</li>
            <li>Move to <strong>-all</strong> once SPF is stable</li>
            <li>Never publish multiple SPF records</li>
          </ul>

          <p style={styles.text}>Next steps:</p>
          <ul style={styles.list}>
            <li>
              <Link href="/spf/spf-permerror-too-many-dns-lookups">
                Fix SPF permerror (too many DNS lookups)
              </Link>
            </li>
            <li>
              <Link href="/dmarc/dmarc-policy-none-vs-quarantine-vs-reject">
                Choose the right DMARC policy
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
  subTitle: {
    fontSize: 16,
    fontWeight: 600,
    marginTop: 20,
    marginBottom: 8,
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
