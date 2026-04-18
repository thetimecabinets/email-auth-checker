import Link from "next/link";
import CodeBlock from "../../components/CodeBlock";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "No SPF Record Found (Fix SPF Error Fast)",
  description:
    "Step-by-step guide to fix No SPF Record Found. Includes DNS examples, common mistakes, and how to improve email deliverability fast.",
  alternates: {
    canonical: "https://emaildnscheck.com/spf/no-spf-record-found",
  },
};

export default function NoSpfRecordFoundPage() {
  return (
    <main style={styles.wrapper}>
      <section style={styles.card}>
        <h1 style={styles.title}>No SPF Record Found</h1>

        <p style={styles.subtitle}>
          Your domain has no SPF record, so receiving mail servers cannot verify
          which servers are allowed to send email on your behalf. Without that
          sender policy, legitimate traffic and spoofed traffic can look too
          similar to filters. A common real-world case is a new domain launch,
          incomplete email setup, or a DNS migration where SPF was never added
          back. This page explains what “no SPF record found” means in practice,
          how it impacts inbox placement, and how to safely add a correct record
          without breaking existing mail flows.
        </p>

        <div style={styles.fixBox}>
          <h2 style={styles.sectionTitle}>One-Minute Fix</h2>

          <p style={styles.text}>
            Publish ONE SPF TXT record in your domain’s DNS that authorizes all
            legitimate senders. Start by listing the providers that actually
            send mail for your domain, such as Google Workspace, Microsoft 365,
            and any marketing platform, then merge them into a single v=spf1
            policy instead of adding separate SPF records.
          </p>

          <CodeBlock
            title="One-Minute SPF Fix"
            language="DNS TXT"
            code={`v=spf1 include:spf.protection.outlook.com -all`}
          />

          <p style={styles.note}>
            This example allows Microsoft 365 to send email for your domain and
            blocks all other sources. If you use a different provider, replace
            <code> include:spf.protection.outlook.com</code> with the include
            mechanism recommended in that provider’s documentation and keep the
            <code> -all</code> ending so that unauthorized senders fail SPF.
          </p>

          <Link href="/" style={styles.button}>
            Re-check SPF
          </Link>
        </div>

        <div style={styles.infoBox}>
          <h2 style={styles.sectionTitle}>Why missing SPF is a problem</h2>

          <ul style={styles.list}>
            <li>Emails may fail SPF checks entirely or fall back to heuristics</li>
            <li>Messages are more likely to land in spam or “Promotions” tabs</li>
            <li>DMARC cannot use SPF to protect your brand from spoofing</li>
            <li>Attackers can send mail that looks indistinguishable from you</li>
          </ul>

          <p style={styles.text}>
            While SPF is not strictly required, most modern mail systems expect
            it to be present. Large providers such as Gmail, Microsoft 365, and
            Yahoo use SPF as one of several inputs to decide whether to accept a
            message, put it in the spam folder, or reject it outright.
          </p>
          <p style={styles.text}>
            Without SPF, your domain has no sender authorization policy at all.
            Receivers can no longer confirm whether the sending server is
            approved for your domain, so they must rely on weaker trust signals
            and heuristics.
          </p>

          <h3 style={styles.h3Spacing}>How SPF affects deliverability</h3>

          <p style={styles.text}>
            From a deliverability perspective, SPF is your domain’s public list
            of allowed senders. When a message arrives claiming to be from your
            domain, the receiving server checks the connecting IP and compares
            it against the mechanisms in your SPF record. If there is no record
            at all, the server has less confidence that the message is genuine,
            so aggressive spam filters will often downgrade or quarantine it,
            especially for bulk or marketing campaigns.
          </p>

          <p style={styles.text}>
            SPF also feeds into DMARC alignment. When DMARC is configured to
            require SPF alignment, passing SPF on your legitimate traffic makes
            it easier for providers to distinguish between real mail and
            phishing that spoofs your domain. That means fewer false positives
            for marketing campaigns and a clearer reputation signal for the IPs
            and services that you actually use.
          </p>
          <p style={styles.text}>
            If SPF is missing, DMARC may lose one of its expected alignment
            paths, which can increase DMARC failures for legitimate traffic.
            Combined with stricter filtering, this raises spam-folder risk and
            can make inbox placement unstable.
          </p>
        </div>

        <div style={styles.infoBox}>
          <h2 style={styles.sectionTitle}>Common causes of “No SPF record found”</h2>
          <ul style={styles.list}>
            <li>
              The domain was never fully configured for email authentication, so
              no SPF record was published.
            </li>
            <li>
              A DNS migration or DNS provider change removed the SPF record and
              it was not restored.
            </li>
            <li>
              A new domain was set up quickly, but SPF was skipped during the
              initial setup checklist.
            </li>
            <li>
              Provider onboarding (Google Workspace, Microsoft 365, or a sending
              platform) was completed without publishing SPF in DNS.
            </li>
            <li>
              DNS changes are still propagating and the new record is not yet
              visible to external resolvers.
            </li>
          </ul>
        </div>

        <div style={styles.infoBox}>
          <h2 style={styles.sectionTitle}>What we checked</h2>

          <p style={styles.text}>
            We queried your domain’s DNS for TXT records and searched for an SPF
            record starting with <strong>v=spf1</strong>.
          </p>

          <p style={styles.text}>
            If your DNS provider splits long TXT values into multiple segments,
            we combine them to reconstruct the full SPF string before checking
            it. We only look at live DNS, so if you recently added a record but
            your authoritative name servers have not been updated yet, this page
            will continue to show “no SPF record found” until propagation
            completes.
          </p>

          <p style={styles.trust}>
            Live DNS lookup. No assumptions. No cached results.
          </p>
        </div>

        <div style={styles.escapeBox}>
          <h3 style={styles.escapeTitle}>Next steps</h3>

          <ul style={styles.list}>
            <li>
              Confirm that the SPF record is created as a TXT record on the root
              of your sending domain, for example <code>example.com</code>, not
              just <code>www.example.com</code>.
            </li>
            <li>
              Check that there is exactly <strong>one</strong> SPF record and
              that it begins with <code>v=spf1</code>.
            </li>
            <li>
              Allow up to 24 hours for DNS propagation, then re-run an external
              SPF check to confirm the record is visible.
            </li>
          </ul>
        </div>

        <div style={styles.infoBox}>
          <h2 style={styles.sectionTitle}>Related SPF fixes</h2>

          <ul style={styles.list}>
            <li>
              <Link href="/spf/multiple-spf-records-found">
                Fix “multiple SPF records found” for your domain
              </Link>{" "}
              – when more than one SPF TXT record exists, receivers treat the
              policy as invalid, which can look similar to having no usable SPF
              at all.
            </li>
            <li>
              <Link href="/spf/spf-permerror-too-many-dns-lookups">
                Fix SPF permerror caused by too many DNS lookups
              </Link>{" "}
              – keep your mechanisms under the 10-lookup limit so SPF can be
              evaluated reliably.
            </li>
            <li>
              <Link href="/spf/spf-include-flattening">
                Safely flatten SPF includes to stay within DNS limits
              </Link>{" "}
              – if you later add multiple providers, this helps prevent lookups
              from growing until they cause SPF permerrors.
            </li>
          </ul>

          <p style={styles.text}>
            Need a broader overview of SPF checks and how they fit with DKIM and
            DMARC? <Link href="/spf">Return to the SPF Hub</Link> for
            protocol-level guidance and additional troubleshooting paths.
          </p>
        </div>
      </section>
    </main>
  );
}

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
  h3Spacing: {
    fontSize: 18,
    fontWeight: 600,
    marginTop: 24,
    marginBottom: 8,
    color: "#111827",
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