import Link from "next/link";
import CodeBlock from "../../components/CodeBlock";

export const metadata = {
  title:
    "Complete DMARC Guide – Policy, Alignment and Reporting Explained (2026)",
  description:
    "Learn how DMARC works with SPF and DKIM, how to deploy monitoring safely, interpret aggregate reports, and move to enforcement without breaking legitimate email.",
};

const relatedLinks = [
  { href: "/dmarc/dmarc-record-example", label: "DMARC record examples" },
  {
    href: "/dmarc/dmarc-aggregate-reports-explained",
    label: "DMARC aggregate reports explained",
  },
  { href: "/dmarc/no-dmarc-record-found", label: "No DMARC record found" },
  {
    href: "/dmarc/multiple-dmarc-records-found",
    label: "Multiple DMARC records found",
  },
  { href: "/dmarc/dmarc-alignment-failed", label: "DMARC alignment failed" },
  {
    href: "/dmarc/dmarc-policy-none-vs-quarantine-vs-reject",
    label: "DMARC policy: none vs quarantine vs reject",
  },
  {
    href: "/dmarc/dmarc-pct-tag-explained",
    label: "DMARC pct tag explained",
  },
  {
    href: "/dmarc/dmarc-fo-tag-explained",
    label: "DMARC fo tag explained",
  },
  {
    href: "/dmarc/dmarc-sp-subdomain-policy-explained",
    label: "DMARC sp subdomain policy explained",
  },
  {
    href: "/dmarc/dmarc-rua-ruf-not-working",
    label: "DMARC reports not working",
  },
  {
    href: "/dmarc/dmarc-aspf-adkim-explained",
    label: "DMARC aspf and adkim explained",
  },
];

export default function DMARCGuidePage() {
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
            href="/dmarc"
            style={{ color: "#6b7280", textDecoration: "none" }}
          >
            DMARC
          </Link>
          <span style={{ color: "#9ca3af" }}>/</span>
          <span style={{ color: "#111827", fontWeight: 700 }}>
            Complete DMARC Guide
          </span>
        </div>

        {/* H1 + INTRO */}
        <section style={card}>
          <div className="prose">
            <h1 style={{ marginTop: 0 }}>Complete DMARC Guide</h1>

            <p>
              Domain-based Message Authentication, Reporting and Conformance
              (DMARC) tells receiving mail servers what to do when SPF or DKIM
              fail, and whether the authenticated domain aligns with the visible
              From domain. SPF and DKIM by themselves do not enforce policy:
              they produce pass/fail results, but receivers decide how to act.
              Attackers can still spoof your domain because there is no
              instruction to reject or quarantine messages that fail
              authentication. DMARC closes that gap.
            </p>

            <p>
              For founders: DMARC protects your brand from impersonation. Phishing
              that uses your domain becomes easier for receivers to block. For IT
              admins: DMARC gives you reporting visibility and policy control.
              You see which mail passes or fails and can move from monitoring to
              enforcement at your own pace. This guide covers record structure,
              policy levels, alignment, reporting, and how to deploy without
              breaking legitimate mail.
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
                  <a href="#what-dmarc">What DMARC is and why it exists</a>
                </li>
                <li>
                  <a href="#how-dmarc-works">How DMARC authentication works</a>
                </li>
                <li>
                  <a href="#record-structure">DMARC record structure</a>
                </li>
                <li>
                  <a href="#policy-levels">DMARC policy levels</a>
                </li>
                <li>
                  <a href="#alignment">DMARC alignment</a>
                </li>
                <li>
                  <a href="#reporting">DMARC reporting</a>
                </li>
                <li>
                  <a href="#deployment">DMARC deployment strategy</a>
                </li>
                <li>
                  <a href="#mistakes">Common DMARC mistakes</a>
                </li>
                <li>
                  <a href="#examples">DMARC record examples</a>
                </li>
                <li>
                  <a href="#troubleshoot">Troubleshooting</a>
                </li>
                <li>
                  <a href="#best-practices">Best practices</a>
                </li>
                <li>
                  <a href="#related">Related DMARC deep dives</a>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* WHAT DMARC IS */}
        <section style={{ ...card, marginTop: 24 }} id="what-dmarc">
          <div className="prose">
            <h2>What DMARC is and why it exists</h2>
            <p>
              Email spoofing works because the From header is easy to forge. A
              receiver can see that a message claims to be from your domain, but
              SPF and DKIM alone do not say &quot;reject this if it fails.&quot; Without
              DMARC, receivers fall back to heuristics—reputation, content
              filters—which are inconsistent and can miss phishing. DMARC
              standardizes the instruction: if authentication fails or alignment
              fails, apply this policy (none, quarantine, or reject).
            </p>
            <p>
              Brand protection is the main driver. Phishing that spoofs your
              domain damages trust and can lead to customer loss or compliance
              issues. DMARC reduces that risk by giving receivers a clear,
              cryptographically-backed policy. Authentication alignment ensures
              the domain that passed SPF or DKIM matches the visible From
              domain. If a message passes SPF for a subdomain but From shows
              your root domain, DMARC can treat that as an alignment failure and
              apply your policy.
            </p>
          </div>
        </section>

        {/* HOW DMARC WORKS */}
        <section style={{ ...card, marginTop: 24 }} id="how-dmarc-works">
          <div className="prose">
            <h2>How DMARC works in practice</h2>
            <p>
              When a message arrives, the receiver performs SPF and DKIM checks
              first. DMARC does not replace them; it interprets their results.
            </p>
            <p>
              Flow: Sender → Receiving server → SPF check → DKIM check →
              Alignment check → Policy evaluation. DMARC passes only if at least
              one of SPF or DKIM passes <em>and</em> the aligned domain matches
              the From domain. If both fail, or both pass but neither aligns,
              DMARC fails.
            </p>
            <p>
              For SPF alignment: the Return-Path domain (SPF auth domain) must
              align with the From domain.               For DKIM alignment: the <code>d=</code> domain in the DKIM
              signature must align with the
              From domain. Alignment can be relaxed (allows organizational
              subdomains) or strict (exact match). DMARC pass means at least one
              auth method passed and aligned. DMARC fail means no pass+align, and
              your policy (p=none, p=quarantine, p=reject) determines what the
              receiver does.
            </p>
          </div>
        </section>

        {/* RECORD STRUCTURE */}
        <section style={{ ...card, marginTop: 24 }} id="record-structure">
          <div className="prose">
            <h2>DMARC record structure</h2>
            <p>
              DMARC is a DNS TXT record at <code>_dmarc.yourdomain.com</code>.
              Required tag: <code>v=DMARC1</code>. Policy tag <code>p=</code> is
              also required.
            </p>
            <ul>
              <li>
                <code>v=</code> — version; must be DMARC1
              </li>
              <li>
                <code>p=</code> — policy for failed alignment (none, quarantine,
                reject)
              </li>
              <li>
                <code>rua=</code> — comma-separated URIs for aggregate reports
              </li>
              <li>
                <code>ruf=</code> — URIs for forensic (failure) reports
              </li>
              <li>
                <code>pct=</code> — percentage of failed mail to apply policy to
                (1–100); default 100
              </li>
              <li>
                <code>sp=</code> — policy for subdomains (none, quarantine,
                reject)
              </li>
              <li>
                <code>adkim=</code> — DKIM alignment mode (r=relaxed, s=strict)
              </li>
              <li>
                <code>aspf=</code> — SPF alignment mode (r=relaxed, s=strict)
              </li>
              <li>
                <code>fo=</code> — forensic report options (0, 1, d, s)
              </li>
            </ul>

            <CodeBlock
              title="Minimal DMARC record (monitoring only)"
              language="DNS TXT"
              code={`v=DMARC1; p=none; rua=mailto:dmarc@example.com`}
            />
          </div>
        </section>

        {/* POLICY LEVELS */}
        <section style={{ ...card, marginTop: 24 }} id="policy-levels">
          <div className="prose">
            <h2>DMARC policy levels</h2>

            <h3>p=none</h3>
            <p>
              Monitoring only. Receivers do not change handling based on DMARC
              failure. Use this when you are collecting data and fixing auth
              issues. Reports (if rua is set) show what would fail under
              quarantine or reject.
            </p>

            <h3>p=quarantine</h3>
            <p>
              Failed messages are typically delivered to spam or a quarantine
              folder. Receivers decide the exact handling, but the intent is
              &quot;treat as suspicious.&quot; Use quarantine before reject to catch
              edge cases without dropping legitimate mail.
            </p>

            <h3>p=reject</h3>
            <p>
              Receivers should reject or drop failed messages. Strongest
              protection but highest risk: if legitimate senders are not
              authenticated or aligned, their mail can be rejected. Move to
              reject only after quarantine shows no false positives.
            </p>
            <p>
              For detailed tradeoffs, see{" "}
              <Link href="/dmarc/dmarc-policy-none-vs-quarantine-vs-reject">
                DMARC policy: none vs quarantine vs reject
              </Link>
              .
            </p>
          </div>
        </section>

        {/* ALIGNMENT */}
        <section style={{ ...card, marginTop: 24 }} id="alignment">
          <div className="prose">
            <h2>DMARC alignment</h2>
            <p>
              Alignment means the domain that passed SPF or DKIM matches the
              domain in the From header. Relaxed alignment (default) allows
              organizational equivalence: <code>mail.example.com</code> aligns
              with <code>example.com</code>. Strict alignment requires an exact
              match: <code>mail.example.com</code> does not align with{" "}
              <code>example.com</code>.
            </p>
            <p>
              <code>adkim=r</code> and <code>aspf=r</code> set relaxed alignment
              for DKIM and SPF. Use relaxed unless you have a reason to require
              strict. Many providers sign with a subdomain (e.g.{" "}
              <code>selector._domainkey.mail.example.com</code>) and strict
              alignment would cause unnecessary failures. See{" "}
              <Link href="/dmarc/dmarc-alignment-failed">
                DMARC alignment failed
              </Link>{" "}
              and{" "}
              <Link href="/dmarc/dmarc-aspf-adkim-explained">
                DMARC aspf and adkim explained
              </Link>{" "}
              for more detail.
            </p>
          </div>
        </section>

        {/* REPORTING */}
        <section style={{ ...card, marginTop: 24 }} id="reporting">
          <div className="prose">
            <h2>DMARC reporting</h2>
            <p>
              <strong>Aggregate reports (rua)</strong> — XML summaries of
              authentication results. Reporters send them to the address(es) you
              specify. They include volume, pass/fail counts, source IPs, and
              alignment outcomes. Use them to see which senders pass or fail and
              to tune SPF, DKIM, and DMARC before enforcing.
            </p>
            <p>
              <strong>Forensic reports (ruf)</strong> — Individual failure
              reports. Contain message-level detail; not all reporters support
              them, and they can include PII. Use ruf if you need per-message
              diagnosis; otherwise rua is enough for most deployments.
            </p>
            <p>
              Reports are sent by receiving domains, not by you. Gmail, Microsoft,
              and others send to the mailto: URIs in rua. See{" "}
              <Link href="/dmarc/dmarc-aggregate-reports-explained">
                DMARC aggregate reports explained
              </Link>{" "}
              and{" "}
              <Link href="/dmarc/dmarc-fo-tag-explained">
                DMARC fo tag explained
              </Link>{" "}
              for tag details. If reports are not arriving, see{" "}
              <Link href="/dmarc/dmarc-rua-ruf-not-working">
                DMARC reports not working
              </Link>
              .
            </p>
          </div>
        </section>

        {/* DEPLOYMENT */}
        <section style={{ ...card, marginTop: 24 }} id="deployment">
          <div className="prose">
            <h2>DMARC deployment strategy</h2>
            <p>
              Start with <code>p=none</code> and <code>rua=</code> set. Monitor
              for at least 1–2 weeks. Use reports to find failing sources:
              third-party senders, ticketing systems, marketing platforms. Fix
              SPF and DKIM for those senders so they pass and align.
            </p>
            <p>
              Move to <code>p=quarantine</code> once failures drop to an
              acceptable level. Some use <code>pct=</code> to apply quarantine to
              a percentage first. Stay in quarantine until reports show no
              false positives. Then move to <code>p=reject</code>.
            </p>
            <p>
              Jumping straight to reject without monitoring breaks mail. Legitimate
              senders you forgot—newsletters, support tools, partners—will fail.
              The reports you get in p=none are essential. See{" "}
              <Link href="/dmarc/dmarc-pct-tag-explained">
                DMARC pct tag explained
              </Link>{" "}
              for gradual rollout options.
            </p>
          </div>
        </section>

        {/* MISTAKES */}
        <section style={{ ...card, marginTop: 24 }} id="mistakes">
          <div className="prose">
            <h2>Common DMARC mistakes</h2>
            <ul>
              <li>
                <strong>Enabling reject too early.</strong> Move to p=reject only
                after reports confirm no legitimate traffic will be dropped.
              </li>
              <li>
                <strong>Ignoring aggregate reports.</strong> Reports reveal
                unknown senders and alignment problems. Review them before
                changing policy.
              </li>
              <li>
                <strong>Missing DKIM alignment.</strong> If you rely on SPF
                only, a single misconfigured forward or relay can break
                alignment. Ensure DKIM is set up and that the signing domain
                aligns.
              </li>
              <li>
                <strong>Broken SPF records.</strong> SPF permerrors or multiple
                SPF records invalidate your auth. Fix SPF before tightening
                DMARC.
              </li>
              <li>
                <strong>Not accounting for third-party senders.</strong> Marketing
                platforms, CRM email, support tools—each must be authorized in
                SPF and ideally signed with DKIM. Add them before enforcement.
              </li>
              <li>
                <strong>Subdomain policy mismatch.</strong> Use <code>sp=</code> to
                set subdomain policy. See{" "}
                <Link href="/dmarc/dmarc-sp-subdomain-policy-explained">
                  DMARC sp subdomain policy explained
                </Link>
                .
              </li>
            </ul>
          </div>
        </section>

        {/* EXAMPLES */}
        <section style={{ ...card, marginTop: 24 }} id="examples">
          <div className="prose">
            <h2>DMARC record examples</h2>

            <h3>Monitoring policy</h3>
            <CodeBlock
              title="Monitoring only (p=none)"
              language="DNS TXT"
              code={`v=DMARC1; p=none; rua=mailto:dmarc-reports@example.com`}
            />

            <h3>Enforcement policy</h3>
            <CodeBlock
              title="Reject failed messages"
              language="DNS TXT"
              code={`v=DMARC1; p=reject; rua=mailto:dmarc-reports@example.com; adkim=r; aspf=r`}
            />

            <h3>Subdomain policies</h3>
            <CodeBlock
              title="Quarantine for subdomains, reject for root"
              language="DNS TXT"
              code={`v=DMARC1; p=reject; sp=quarantine; rua=mailto:dmarc@example.com`}
            />
            <p>
              The root domain uses p=reject; subdomains use sp=quarantine. For
              more examples, see{" "}
              <Link href="/dmarc/dmarc-record-example">
                DMARC record examples
              </Link>
              .
            </p>
          </div>
        </section>

        {/* TROUBLESHOOT */}
        <section style={{ ...card, marginTop: 24 }} id="troubleshoot">
          <div className="prose">
            <h2>Troubleshooting DMARC failures</h2>
            <ol>
              <li>
                Run a live check. Use our{" "}
                <Link href="/">domain checker</Link> to confirm your DMARC
                record is published and valid.
              </li>
              <li>
                Ensure exactly one DMARC record. Multiple records cause
                undefined behavior—see{" "}
                <Link href="/dmarc/multiple-dmarc-records-found">
                  multiple DMARC records found
                </Link>
                .
              </li>
              <li>
                Verify SPF and DKIM. DMARC fails when both fail or when neither
                aligns. Fix auth first.
              </li>
              <li>
                Check alignment. The Return-Path domain (SPF) and d= domain
                (DKIM) must align with From. Use relaxed unless you need strict.
              </li>
              <li>
                Review aggregate reports. They show which sources fail and why.
                Fix those senders before changing policy.
              </li>
              <li>
                Confirm third-party senders. Add their includes to SPF and
                ensure they sign with DKIM using an aligned domain.
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
                Always start with p=none and rua. Collect data before
                enforcement.
              </li>
              <li>
                Fix SPF and DKIM before tightening DMARC. Auth must pass and
                align.
              </li>
              <li>
                Use relaxed alignment (adkim=r, aspf=r) unless you have a
                specific need for strict.
              </li>
              <li>
                Maintain an inventory of all services that send mail for your
                domain. Update it when you add or change providers.
              </li>
              <li>
                Move quarantine → reject only after reports show no
                false positives.
              </li>
              <li>
                Use sp= to set subdomain policy explicitly. Subdomains default
                to the root policy if sp= is omitted.
              </li>
            </ul>
          </div>
        </section>

        {/* RELATED LINKS - CARD GRID */}
        <section style={{ ...card, marginTop: 24 }} id="related">
          <div className="prose">
            <h2>Related DMARC deep dives</h2>
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
              <Link href="/dmarc">Return to the DMARC Hub</Link> for the full
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
              Run email authentication check
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
