import Link from "next/link";
import CodeBlock from "../../components/CodeBlock";

export const metadata = {
  title:
    "Complete DKIM Guide – Signatures, Selectors and Alignment Explained (2026)",
  description:
    "Learn how DKIM signatures work, how selectors and keys are published in DNS, how verification happens, and how to troubleshoot DKIM failures in real email systems.",
};

const relatedLinks = [
  { href: "/dkim/dkim-record-example", label: "DKIM record examples" },
  {
    href: "/dkim/dkim-signature-explained",
    label: "DKIM signature explained",
  },
  { href: "/dkim/no-dkim-record-found", label: "No DKIM record found" },
  { href: "/dkim/invalid-dkim-key", label: "Invalid DKIM key" },
  { href: "/dkim/dkim-selector-not-found", label: "DKIM selector not found" },
  { href: "/dkim/dkim-selector-mismatch", label: "DKIM selector mismatch" },
  {
    href: "/dkim/dkim-key-length-too-short",
    label: "DKIM key length too short",
  },
  {
    href: "/dkim/dkim-body-hash-mismatch",
    label: "DKIM body hash mismatch",
  },
  { href: "/dkim/dkim-alignment-failed", label: "DKIM alignment failed" },
  {
    href: "/dkim/dkim-selector-explained",
    label: "DKIM selector explained",
  },
];

export default function DKIMGuidePage() {
  return (
    <main style={{ padding: "36px 0 64px" }}>
      <div className="container">
        {/* BREADCRUMB */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: 12,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "#6b7280",
            marginBottom: 14,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: 999,
              background: "#E0B100",
              display: "inline-block",
            }}
          />
          <span>Email Authentication Hub</span>
          <span style={{ color: "#9ca3af" }}>/</span>
          <Link
            href="/dkim"
            style={{ color: "#6b7280", textDecoration: "none" }}
          >
            DKIM
          </Link>
          <span style={{ color: "#9ca3af" }}>/</span>
          <span style={{ color: "#111827", fontWeight: 700 }}>
            Complete DKIM Guide
          </span>
        </div>

        {/* H1 + INTRO */}
        <section style={card}>
          <div className="prose">
            <h1 style={{ marginTop: 0 }}>Complete DKIM Guide</h1>

            <p>
              DomainKeys Identified Mail (DKIM) lets sending domains
              cryptographically sign email so receivers can verify that the
              message has not been modified in transit and that it came from an
              authorized sender. Unlike SPF, which checks the connecting IP,
              DKIM signs the message body and selected headers. Receivers fetch
              your public key from DNS, verify the signature, and treat
              verified mail as more trustworthy.
            </p>

            <p>
              For founders: DKIM is one of the main signals mailbox providers use
              to decide inbox placement. Messages that pass DKIM are less likely
              to land in spam. For IT admins: DKIM requires publishing a public
              key under a selector in DNS. The sending system holds the private
              key and signs each message. When selectors are missing, keys are
              malformed, or the message changes after signing, verification
              fails. This guide covers record structure, selectors, alignment,
              and how to troubleshoot real-world DKIM failures. DKIM works with
              SPF and DMARC: SPF authorizes infrastructure, DKIM authenticates
              the message, and DMARC decides what to do when either fails or
              does not align with the visible sender.
            </p>

            {/* JUMP NAV */}
            <div
              style={{
                marginTop: 24,
                padding: 18,
                borderRadius: 12,
                background: "#f9fafb",
                border: "1px solid #e5e7eb",
              }}
            >
              <h2 style={{ marginTop: 0, fontSize: 18 }}>Jump to section</h2>
              <ul style={{ margin: "8px 0 0 0", paddingLeft: 20, lineHeight: 2 }}>
                <li>
                  <a href="#what-dkim">What DKIM is</a>
                </li>
                <li>
                  <a href="#how-signatures-work">How DKIM signatures work</a>
                </li>
                <li>
                  <a href="#record-structure">DKIM record structure</a>
                </li>
                <li>
                  <a href="#selectors">DKIM selectors</a>
                </li>
                <li>
                  <a href="#key-length">DKIM key length and security</a>
                </li>
                <li>
                  <a href="#alignment">DKIM alignment</a>
                </li>
                <li>
                  <a href="#verification">DKIM verification process</a>
                </li>
                <li>
                  <a href="#examples">DKIM record examples</a>
                </li>
                <li>
                  <a href="#mistakes">Common DKIM mistakes</a>
                </li>
                <li>
                  <a href="#troubleshoot">Troubleshooting DKIM failures</a>
                </li>
                <li>
                  <a href="#best-practices">Best practices</a>
                </li>
                <li>
                  <a href="#related">Related DKIM deep dives</a>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* WHAT DKIM IS */}
        <section style={{ ...card, marginTop: 24 }} id="what-dkim">
          <div className="prose">
            <h2>What DKIM is</h2>
            <p>
              DKIM provides two things: integrity and domain authentication.
              Integrity means the signed content has not been altered. The
              receiver recomputes a hash of the message body and selected
              headers and compares it to the hash embedded in the signature. If
              they match, the message was not tampered with in transit.
            </p>
            <p>
              Domain authentication means the signer used a private key that
              corresponds to a public key published in DNS for the signing
              domain. Only the holder of the private key could produce a valid
              signature. That proves the message originated from a system
              authorized by the domain owner. DKIM does not, by itself, say
              whether the message is spam or legitimate. It says the content
              was not modified and was signed by someone who controls the
              domain&apos;s DKIM keys. Receivers combine that with SPF, DMARC,
              reputation, and content analysis to make delivery decisions.
            </p>
          </div>
        </section>

        {/* HOW SIGNATURES WORK */}
        <section style={{ ...card, marginTop: 24 }} id="how-signatures-work">
          <div className="prose">
            <h2>How DKIM signatures work</h2>
            <p>
              The flow: Sender composes the message → Signing system selects
              headers and body to sign → Computes a hash and signs it with the
              private key → Adds a DKIM-Signature header to the message →
              Message is sent. On receive: Receiver extracts the domain and
              selector from the DKIM-Signature header → Queries DNS for{" "}
              <code>selector._domainkey.domain</code> → Retrieves the public
              key → Verifies the signature with the public key and recomputes
              the hash from the received message. If both match, DKIM passes.
            </p>
            <p>
              The DKIM-Signature header contains fields such as <code>v=1</code>{" "}
              (version), <code>a=</code> (algorithm, e.g. rsa-sha256),{" "}
              <code>d=</code> (signing domain), <code>s=</code> (selector),{" "}
              <code>h=</code> (signed header list), <code>bh=</code> (body hash),
              and <code>b=</code> (signature value). The receiver uses{" "}
              <code>d</code> and <code>s</code> to locate the public key in DNS.
              See{" "}
              <Link href="/dkim/dkim-signature-explained">
                DKIM signature explained
              </Link>{" "}
              for header fields and verification in detail.
            </p>
          </div>
        </section>

        {/* RECORD STRUCTURE */}
        <section style={{ ...card, marginTop: 24 }} id="record-structure">
          <div className="prose">
            <h2>DKIM record structure</h2>
            <p>
              DKIM public keys are stored as DNS TXT records. The hostname is{" "}
              <code>selector._domainkey.example.com</code>. The value is a
              semicolon-separated list of tag-value pairs.
            </p>
            <ul>
              <li>
                <code>v=</code> — version; must be DKIM1
              </li>
              <li>
                <code>k=</code> — key type; typically rsa
              </li>
              <li>
                <code>p=</code> — the public key (base64-encoded)
              </li>
            </ul>

            <CodeBlock
              title="Minimal DKIM record"
              language="DNS TXT"
              code={`v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA...`}
            />
            <p>
              The <code>p=</code> value is the actual public key. Providers like
              Google, Microsoft, or SendGrid generate the key pair and give you
              the record to publish. Do not manually edit the key string;
              truncation or extra whitespace breaks verification. See{" "}
              <Link href="/dkim/dkim-record-example">
                DKIM record examples
              </Link>{" "}
              for provider-specific formats.
            </p>
          </div>
        </section>

        {/* SELECTORS */}
        <section style={{ ...card, marginTop: 24 }} id="selectors">
          <div className="prose">
            <h2>DKIM selectors</h2>
            <p>
              The selector is the first label in the DNS query. For{" "}
              <code>selector1._domainkey.example.com</code>, the selector is{" "}
              <code>selector1</code>. Selectors exist so a domain can publish
              multiple keys. Different senders—product mail, marketing, support—can
              use different selectors. Key rotation also depends on selectors:
              you publish a new key under a new selector, switch the signing
              system to use it, then retire the old selector once traffic has
              moved.
            </p>
            <p>
              Providers assign selectors when they generate keys. Google
              Workspace might use <code>google</code> or <code>default</code>.
              Microsoft 365 uses values like <code>selector1</code>. The sender
              must use the same selector that appears in DNS. If the signing
              system uses <code>marketing</code> but DNS only has{" "}
              <code>selector1</code>, verification fails. See{" "}
              <Link href="/dkim/dkim-selector-not-found">
                DKIM selector not found
              </Link>{" "}
              and{" "}
              <Link href="/dkim/dkim-selector-explained">
                DKIM selector explained
              </Link>{" "}
              for troubleshooting and rotation.
            </p>
          </div>
        </section>

        {/* KEY LENGTH */}
        <section style={{ ...card, marginTop: 24 }} id="key-length">
          <div className="prose">
            <h2>DKIM key length and security</h2>
            <p>
              RSA keys for DKIM are typically 1024 or 2048 bits. 1024-bit keys
              still work but are considered weak by modern standards. Most
              providers now recommend 2048-bit. Some receivers may treat
              1024-bit keys with less trust or deprecate them over time.
            </p>
            <p>
              Shorter keys are easier to brute-force. 2048-bit keys add a bit
              more CPU cost for signing and verification but are the safe
              default. If your provider offers a choice, use 2048. If you have
              legacy 1024-bit keys, plan a rotation to 2048. See{" "}
              <Link href="/dkim/dkim-key-length-too-short">
                DKIM key length too short
              </Link>{" "}
              for how to upgrade.
            </p>
          </div>
        </section>

        {/* ALIGNMENT */}
        <section style={{ ...card, marginTop: 24 }} id="alignment">
          <div className="prose">
            <h2>DKIM alignment</h2>
            <p>
              The <code>d=</code> domain in the DKIM-Signature header is the
              signing domain. The From header shows the visible sender. For
              DMARC, alignment means these domains match (relaxed or strict).
              Relaxed alignment allows organizational subdomains:{" "}
              <code>mail.example.com</code> aligns with <code>example.com</code>.
              Strict requires an exact match.
            </p>
            <p>
              If your provider signs with a subdomain (e.g.{" "}
              <code>dkim.mail.example.com</code>) and the From shows{" "}
              <code>example.com</code>, relaxed alignment passes. Strict would
              fail. DMARC uses alignment to decide whether SPF or DKIM
              &quot;count&quot;—both must align with the From domain for DMARC
              pass. See{" "}
              <Link href="/dkim/dkim-alignment-failed">
                DKIM alignment failed
              </Link>{" "}
              when the signing domain does not align.
            </p>
          </div>
        </section>

        {/* VERIFICATION */}
        <section style={{ ...card, marginTop: 24 }} id="verification">
          <div className="prose">
            <h2>DKIM verification process</h2>
            <p>
              Receivers verify DKIM by: 1) Finding the DKIM-Signature header, 2)
              Extracting <code>d=</code> and <code>s=</code>, 3) Querying DNS for
              the public key, 4) Recomputing the body hash from the received
              message, 5) Verifying the signature with the public key. If the
              key is missing, malformed, or the recomputed hash does not match
              the signed hash, verification fails.
            </p>
            <p>
              Common failure causes: <strong>Body hash mismatch</strong>—the
              message changed after signing. Gateways that add footers, mailing
              lists that modify content, or forwarding that rewrites the body
              break the hash. See{" "}
              <Link href="/dkim/dkim-body-hash-mismatch">
                DKIM body hash mismatch
              </Link>
              . <strong>Missing selector</strong>—no DNS record exists for{" "}
              <code>selector._domainkey.domain</code>. <strong>Malformed
              key</strong>—truncation, extra characters, or wrong encoding. See{" "}
              <Link href="/dkim/invalid-dkim-key">Invalid DKIM key</Link>.{" "}
              <strong>Selector mismatch</strong>—the sender uses a different
              selector than the one published. See{" "}
              <Link href="/dkim/dkim-selector-mismatch">
                DKIM selector mismatch
              </Link>
              .
            </p>
          </div>
        </section>

        {/* EXAMPLES */}
        <section style={{ ...card, marginTop: 24 }} id="examples">
          <div className="prose">
            <h2>DKIM record examples</h2>

            <h3>Google Workspace</h3>
            <CodeBlock
              title="Google DKIM (conceptual)"
              language="DNS TXT"
              code={`Host: google._domainkey.example.com
Type: TXT
Value: v=DKIM1; k=rsa; p=YOUR_GOOGLE_PUBLIC_KEY`}
            />
            <p>
              Google provides the exact record in the Admin Console. Use the
              selector and key they give you.
            </p>

            <h3>Microsoft 365</h3>
            <CodeBlock
              title="Microsoft 365 DKIM (conceptual)"
              language="DNS TXT"
              code={`Host: selector1._domainkey.example.com
Type: TXT
Value: v=DKIM1; k=rsa; p=YOUR_MICROSOFT_PUBLIC_KEY`}
            />
            <p>
              Microsoft uses CNAME records for DKIM in many configurations.
              Follow the exact instructions in the Exchange admin center.
            </p>

            <h3>SendGrid</h3>
            <CodeBlock
              title="SendGrid DKIM (conceptual)"
              language="DNS TXT"
              code={`Host: s1._domainkey.example.com
Type: TXT
Value: v=DKIM1; k=rsa; p=YOUR_SENDGRID_PUBLIC_KEY`}
            />
            <p>
              SendGrid, Mailgun, and similar ESPs generate keys in the dashboard.
              Create the authentication setup, copy the CNAME or TXT records they
              provide, and publish them. Wait for DNS propagation, then enable
              signing.
            </p>
          </div>
        </section>

        {/* MISTAKES */}
        <section style={{ ...card, marginTop: 24 }} id="mistakes">
          <div className="prose">
            <h2>Common DKIM mistakes</h2>
            <ul>
              <li>
                <strong>Missing selector.</strong> The sender is configured to
                use a selector, but no DNS record exists. Add the record at the
                hostname the provider specifies.
              </li>
              <li>
                <strong>Wrong DNS host.</strong> The record is at{" "}
                <code>selector._domainkey.www.example.com</code> instead of{" "}
                <code>selector._domainkey.example.com</code>. Use the root
                domain or the exact hostname the provider gives.
              </li>
              <li>
                <strong>Weak key length.</strong> 1024-bit keys are legacy.
                Rotate to 2048-bit when the provider supports it.
              </li>
              <li>
                <strong>Body hash mismatch.</strong> A gateway, footer tool, or
                forwarder modifies the message after signing. Route mail so
                signing happens after all modifications, or send from a system
                that does not alter the body.
              </li>
              <li>
                <strong>Signature added by wrong system.</strong> Multiple
                systems can add DKIM. If a relay signs with a different domain
                or selector than your primary sender, alignment can fail. Ensure
                the correct system signs for the From domain.
              </li>
            </ul>
          </div>
        </section>

        {/* TROUBLESHOOT */}
        <section style={{ ...card, marginTop: 24 }} id="troubleshoot">
          <div className="prose">
            <h2>Troubleshooting DKIM failures</h2>
            <ol>
              <li>
                Run a live check. Use our{" "}
                <Link href="/">domain checker</Link> to confirm your DKIM
                record is published and valid.
              </li>
              <li>
                Verify the selector. Check that the sending system uses the same
                selector as the one in DNS. Inspect a received message&apos;s
                DKIM-Signature header for <code>s=</code> and <code>d=</code>.
              </li>
              <li>
                Confirm DNS propagation. New or changed records can take up to
                48 hours. Use dig or nslookup to query{" "}
                <code>selector._domainkey.yourdomain.com</code> from multiple
                locations.
              </li>
              <li>
                Inspect the public key. Ensure it is not truncated, has no
                extra spaces, and matches exactly what the provider gave you.
              </li>
              <li>
                Check for body modifications. If body hash fails, trace the path
                of the message. Identify any system that adds footers, disclaimers,
                or rewrites content after the signing MTA.
              </li>
              <li>
                Review authentication results in received headers. Look for{" "}
                <code>dkim=pass</code> or <code>dkim=fail</code> in
                Authentication-Results. Some providers include a reason for
                failure.
              </li>
            </ol>
          </div>
        </section>

        {/* BEST PRACTICES */}
        <section style={{ ...card, marginTop: 24 }} id="best-practices">
          <div className="prose">
            <h2>Best practices</h2>
            <ul>
              <li>
                Rotate keys periodically. Use a new selector for the new key,
                switch traffic, then retire the old selector after propagation.
              </li>
              <li>
                Document selectors. Keep a list of which selector each sending
                system uses. Avoid reusing selectors across different platforms.
              </li>
              <li>
                Monitor alignment. DMARC reports show DKIM pass/fail and
                alignment. Use them to catch configuration drift.
              </li>
              <li>
                Test after DNS changes. Publish the record, wait for
                propagation, send a test message, and verify dkim=pass in the
                received headers before assuming the setup is correct.
              </li>
              <li>
                Use 2048-bit keys. Prefer them over 1024-bit when your provider
                supports them.
              </li>
              <li>
                Ensure signing happens last. If a gateway adds content, either
                sign after the gateway or send through a path that does not
                modify the body.
              </li>
            </ul>
          </div>
        </section>

        {/* RELATED LINKS */}
        <section style={{ ...card, marginTop: 24 }} id="related">
          <div className="prose">
            <h2>Related DKIM deep dives</h2>
            <p>Go deeper on specific topics:</p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                gap: 12,
                marginTop: 16,
              }}
            >
              {relatedLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                    padding: 12,
                    borderRadius: 12,
                    border: "1px solid #e5e7eb",
                    background: "rgba(249,250,251,0.8)",
                    textDecoration: "none",
                  }}
                >
                  <span style={{ fontWeight: 700, color: "#111827" }}>
                    {link.label}
                  </span>
                </Link>
              ))}
            </div>
            <p style={{ marginTop: 20 }}>
              <Link href="/dkim">Return to the DKIM Hub</Link> for the full
              troubleshooting index.
            </p>
          </div>
        </section>

        {/* CTA */}
        <div
          style={{
            marginTop: 32,
            padding: 24,
            borderRadius: 14,
            background: "rgba(224,177,0,0.08)",
            border: "1px solid rgba(224,177,0,0.35)",
          }}
        >
          <div className="prose">
            <h2 style={{ marginTop: 0, fontSize: 18 }}>Check your domain</h2>
            <p style={{ marginBottom: 16 }}>
              Run a live SPF, DKIM, and DMARC check. No login, no saved data.
            </p>
            <Link href="/" style={primaryBtn}>
              Run SPF, DKIM &amp; DMARC check
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 980px) {
          section[style*="grid-template-columns"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}

const card: React.CSSProperties = {
  border: "1px solid #e5e7eb",
  background: "#ffffff",
  borderRadius: 14,
  padding: 24,
  boxShadow: "0 1px 0 rgba(0,0,0,0.02)",
};

const primaryBtn: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  height: 40,
  padding: "0 14px",
  borderRadius: 10,
  border: "1px solid #c79c00",
  background: "#E0B100",
  color: "#111827",
  fontWeight: 700,
  textDecoration: "none",
};
