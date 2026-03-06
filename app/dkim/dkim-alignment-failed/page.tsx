import Link from "next/link";
import CodeBlock from "@/app/components/CodeBlock";

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
          DKIM alignment failed means the receiving server can verify the
          cryptographic DKIM signature, but the domain that signed the message
          (the <code>d=</code> value in the DKIM-Signature header) does not
          match the domain your user sees in the From line. DMARC cares about
          who is claiming responsibility for the message, not just that
          “someone” signed it. When your ESP signs with its own domain or a
          mismatched subdomain while the visible From address uses a different
          organizational domain, DMARC treats the message as misaligned and can
          send it to spam or reject it entirely—even if the basic DKIM check
          passes. This page focuses specifically on fixing that alignment gap,
          not generic “DKIM fail” errors.
        </p>

        {/* One-Minute Fix */}
        <div style={styles.fixBox}>
          <h2 style={styles.sectionTitle}>One-Minute Fix</h2>

          <p style={styles.text}>
            Configure DKIM so that the signing domain is within the same
            organizational domain as the From address (for example,
            <code>d=example.com</code> or <code>d=mailer.example.com</code> for{" "}
            <code>From: user@example.com</code>).
          </p>

          <CodeBlock
            language="TXT"
            code={`From: invoices@example.com
DKIM-Signature: v=1; a=rsa-sha256; d=mailer.example.com; s=dkim1; ...`}
          />

          <p style={styles.note}>
            <strong>Problem:</strong> the DKIM <code>d=</code> domain must be
            within the same organizational domain as the visible From address.
          </p>
          <ul style={styles.list}>
            <li>
              In your ESP, enable custom DKIM for <code>example.com</code> so
              messages are signed with your domain instead of the provider’s
              default domain.
            </li>
            <li>
              Configure a dedicated sending domain such as{" "}
              <code>mailer.example.com</code> and publish the TXT record for{" "}
              <code>dkim1._domainkey.mailer.example.com</code>.
            </li>
            <li>
              Re-send a message and confirm the DKIM-Signature now uses{" "}
              <code>d=mailer.example.com</code>, which aligns with{" "}
              <code>From: invoices@example.com</code>.
            </li>
          </ul>

          <Link href="/" style={styles.button}>
            Re-check DKIM
          </Link>
        </div>

        {/* Why DKIM alignment fails */}
        <div style={styles.infoBox}>
          <h2 style={styles.sectionTitle}>Why DKIM alignment fails</h2>
          <p style={styles.text}>
            DKIM alignment fails when the domain in the <code>d=</code> tag of
            the DKIM-Signature header is not considered the same organizational
            domain as the From address. With relaxed alignment (the DMARC
            default), subdomains of the From domain are allowed. With strict
            alignment, only an exact match passes. A message can have a
            perfectly valid DKIM signature from <code>d=esp-mail.com</code> but
            still fail alignment if the From domain is <code>example.com</code>{" "}
            and DMARC expects the signer to be within <code>example.com</code>.
          </p>
          <p style={styles.text}>
            This is different from a basic DKIM failure. In a basic failure, the
            signature cannot be validated at all (key missing, body modified,
            or syntax error). In an alignment failure, the signature is
            cryptographically valid—but the domain that signed the message is
            not allowed to represent the visible From domain for DMARC
            purposes.
          </p>
        </div>

        {/* How DKIM alignment affects DMARC */}
        <div style={styles.infoBox}>
          <h2 style={styles.sectionTitle}>How DKIM alignment affects DMARC</h2>
          <p style={styles.text}>
            DMARC evaluates SPF and DKIM together and then checks whether at
            least one of them both passes and aligns with the From domain. If
            DKIM passes but the <code>d=</code> domain does not align, DKIM
            does not contribute to a DMARC pass. DMARC will then fall back to
            SPF; if SPF also fails alignment, the message fails DMARC and your
            configured policy (<code>p=none</code>, <code>quarantine</code>, or{" "}
            <code>reject</code>) is applied.
          </p>
          <ul style={styles.list}>
            <li>
              <strong>Pass, no alignment:</strong> DKIM alone is not enough—DMARC
              still fails unless SPF both passes and aligns.
            </li>
            <li>
              <strong>Pass + alignment:</strong> DKIM can satisfy DMARC on its
              own, even if SPF is neutral or fails.
            </li>
            <li>
              <strong>Fail or missing DKIM:</strong> DMARC relies entirely on
              SPF alignment.
            </li>
          </ul>
        </div>

        {/* Common causes */}
        <div style={styles.infoBox}>
          <h2 style={styles.sectionTitle}>Common causes of DKIM alignment failure</h2>
          <ul style={styles.list}>
            <li>
              ESP or marketing platform signs with its own domain (for example,
              <code>d=esp-mail.com</code>) while From uses{" "}
              <code>example.com</code>.
            </li>
            <li>
              From uses a subdomain (such as{" "}
              <code>billing.example.com</code>) but DKIM signs with a different
              subdomain that does not share the same organizational domain.
            </li>
            <li>
              Misconfigured custom sending domain—DKIM is enabled, but the ESP
              is still signing with the wrong brand or environment.
            </li>
            <li>
              Forwarders or gateways rewriting the From address without
              updating DKIM signing configuration.
            </li>
            <li>
              Strict DMARC alignment (<code>adkim=s</code>) enabled while
              senders rely on relaxed, subdomain-based setups.
            </li>
          </ul>
        </div>

        {/* What we checked */}
        <div style={styles.infoBox}>
          <h2 style={styles.sectionTitle}>What we checked</h2>
          <p style={styles.text}>
            We verified that DKIM is present and valid, then compared the DKIM
            signing domain from the <code>d=</code> tag with the domain used in
            the From header. We also evaluated whether your DMARC policy is
            using relaxed or strict alignment and whether SPF could satisfy
            alignment if DKIM does not.
          </p>
          <p style={styles.trust}>
            Live DNS lookup. No login. No saved domains. No tracking.
          </p>
        </div>

        {/* Next steps */}
        <div style={styles.escapeBox}>
          <h3 style={styles.escapeTitle}>Next steps</h3>
          <ul style={styles.list}>
            <li>
              Review your ESP&apos;s DKIM settings and enable custom domain
              signing so messages are signed with your own domain instead of the
              provider&apos;s default domain.
            </li>
            <li>
              Confirm that the From domain and DKIM <code>d=</code> domain share
              the same organizational domain (for example,{" "}
              <code>example.com</code>).
            </li>
            <li>
              Visit the{" "}
              <Link href="/dkim">DKIM hub for a full overview of DKIM status</Link>{" "}
              across your domain.
            </li>
          </ul>
        </div>

        {/* Related fixes */}
        <div style={styles.infoBox}>
          <h2 style={styles.sectionTitle}>Related fixes</h2>
          <ul style={styles.list}>
            <li>
              <Link href="/dkim/dkim-selector-not-found">
                DKIM selector not found – publish the correct selector record
              </Link>
            </li>
            <li>
              <Link href="/dkim/dkim-selector-mismatch">
                DKIM selector mismatch – align the selector used to sign with
                DNS
              </Link>
            </li>
            <li>
              <Link href="/dkim/invalid-dkim-key">
                Invalid DKIM key – fix malformed or truncated public keys
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
