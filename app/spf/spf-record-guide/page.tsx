import Link from "next/link";
import CodeBlock from "../../components/CodeBlock";

export const metadata = {
  title: "SPF Record Guide: Fix SPF Errors with DNS Examples",
  description:
    "Step-by-step guide to fix SPF record issues. Includes DNS examples, common mistakes, and how to improve email deliverability fast.",
};

export default function SPFRecordGuidePage() {
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
          <Link href="/spf" style={{ color: "#6b7280", textDecoration: "none" }}>
            SPF Hub
          </Link>
          <span style={{ color: "#9ca3af" }}>/</span>
          <span style={{ color: "#111827", fontWeight: 700 }}>
            Complete SPF Guide
          </span>
        </div>

        {/* H1 + INTRO */}
        <section style={card}>
          <div className="prose">
            <h1 style={{ marginTop: 0 }}>Complete SPF Record Guide</h1>

            <p>
              Sender Policy Framework (SPF) is a DNS-based record that tells
              receiving mail servers which hosts are allowed to send email for
              your domain. When a message arrives, the receiver looks up your
              SPF record, checks the connecting IP against the mechanisms you
              defined, and decides whether SPF passes or fails. SPF does not
              sign message content—that&apos;s DKIM—and it does not tell receivers
              what to do when auth fails—that&apos;s DMARC. All three work together:
              SPF authorizes infrastructure, DKIM authenticates the message, and
              DMARC applies policy.
            </p>

            <p>
              This guide covers syntax, mechanisms, qualifiers, the DNS lookup
              limit that causes permerrors, and how to avoid common mistakes. Use
              it as a reference when building or troubleshooting SPF records.
            </p>

            {/* START HERE / QUICK NAV */}
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
                  <a href="#how-spf-works">What SPF is and how it works</a>
                </li>
                <li>
                  <a href="#syntax">SPF record syntax explained</a>
                </li>
                <li>
                  <a href="#mechanisms">SPF mechanisms (include, ip4, all, etc.)</a>
                </li>
                <li>
                  <a href="#qualifiers">SPF qualifiers (~all, -all, ?all)</a>
                </li>
                <li>
                  <a href="#lookup-limit">DNS lookup limit and permerror</a>
                </li>
                <li>
                  <a href="#mistakes">Common SPF mistakes</a>
                </li>
                <li>
                  <a href="#examples">SPF record examples</a>
                </li>
                <li>
                  <a href="#troubleshoot">How to troubleshoot SPF</a>
                </li>
                <li>
                  <a href="#best-practices">SPF best practices</a>
                </li>
                <li>
                  <a href="#related">Related SPF deep dives</a>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* HOW SPF WORKS */}
        <section style={{ ...card, marginTop: 24 }} id="how-spf-works">
          <div className="prose">
            <h2>What SPF is and how SPF works</h2>
            <p>
              When a receiving server gets an email, it checks the Return-Path
              (or MAIL FROM) domain, does a DNS TXT lookup for that domain, and
              looks for a record starting with <code>v=spf1</code>. If it finds
              one, it evaluates the mechanisms in order. The first mechanism that
              matches determines the result: pass, fail, softfail, or neutral.
              If no mechanism matches, the default is neutral unless the final
              mechanism is <code>-all</code>, in which case a non-match means
              fail.
            </p>
            <p>
              SPF checks happen at the edge. The receiver does not inspect the
              body or headers beyond what it needs to perform the lookup and
              compare IPs. That simplicity is both a strength—it&apos;s fast and
              predictable—and a limitation, since SPF says nothing about whether
              the visible From domain aligns with the authenticated domain.
              That&apos;s why DMARC matters.
            </p>
            <p>
              The authenticated domain for SPF is the domain in the envelope
              (Return-Path), not the From header. A message can &quot;pass&quot; SPF
              for a subdomain used in Return-Path while the visible From shows
              your main domain. DMARC checks that alignment and decides whether
              to accept, quarantine, or reject based on your policy. Getting SPF
              right is the foundation; DMARC layers policy on top.
            </p>
          </div>
        </section>

        {/* SYNTAX */}
        <section style={{ ...card, marginTop: 24 }} id="syntax">
          <div className="prose">
            <h2>SPF record syntax explained</h2>
            <p>
              Every valid SPF record starts with <code>v=spf1</code>. The rest
              is a sequence of mechanisms, each optionally prefixed by a
              qualifier (<code>+</code>, <code>-</code>, <code>~</code>, or{" "}
              <code>?</code>). Mechanisms are separated by whitespace. Order
              matters: evaluation stops at the first match.
            </p>
            <p>
              A minimal record is <code>v=spf1 -all</code>: it fails everyone
              except explicitly matched IPs. A typical record adds mechanisms
              before the final <code>all</code> to authorize your providers.
              Mechanisms are evaluated left to right; the first match wins. That
              means order can matter: put the most specific or common cases
              first if you want to optimize for clarity. For detailed syntax
              rules and edge cases, see the{" "}
              <Link href="/spf/spf-record-syntax-explained">
                SPF record syntax explained
              </Link>{" "}
              page.
            </p>
          </div>
        </section>

        {/* MECHANISMS */}
        <section style={{ ...card, marginTop: 24 }} id="mechanisms">
          <div className="prose">
            <h2>SPF mechanisms explained</h2>

            <h3>include</h3>
            <p>
              <code>include:domain</code> pulls in the SPF policy of another
              domain. The receiver performs a separate DNS lookup and evaluates
              that domain&apos;s record as if it were your own. Include is how you
              authorize providers like Google, Microsoft, or SendGrid without
              hardcoding their IP ranges. Each include counts toward the
              10-lookup limit.
            </p>

            <h3>ip4 and ip6</h3>
            <p>
              <code>ip4:1.2.3.4</code> or <code>ip4:1.2.3.0/24</code> matches
              the connecting IPv4 address. <code>ip6</code> does the same for
              IPv6.               These do not trigger extra DNS lookups, so they&apos;re
              efficient for static IPs you control. When you add a new
              outbound server, you must update the record; include mechanisms
              avoid that by delegating to the provider&apos;s maintained list.
            </p>

            <h3>a and mx</h3>
            <p>
              <code>a</code> uses the A records of the current domain (or a
              specified domain) to authorize IPs. <code>mx</code> uses the MX
              hosts. Both cause additional lookups. Many deployments avoid them
              in favor of explicit <code>ip4</code> or <code>include</code> to
              stay under the lookup limit.
            </p>

            <h3>redirect</h3>
            <p>
              <code>redirect=example.com</code> delegates the entire policy to
              another domain. The receiver fetches that domain&apos;s SPF record
              and uses it. Useful when you want a single source of truth. See{" "}
              <Link href="/spf/spf-redirect-explained">SPF redirect explained</Link>{" "}
              for when and how to use it.
            </p>

            <h3>all</h3>
            <p>
              <code>all</code> matches any IP. It must appear last and is always
              prefixed by a qualifier. <code>-all</code> means &quot;fail
              everyone else&quot;; <code>~all</code> means &quot;softfail
              everyone else.&quot; You should have exactly one <code>all</code>{" "}
              mechanism. If it&apos;s missing, your policy is incomplete—see{" "}
              <Link href="/spf/spf-missing-all-mechanism">
                SPF missing all mechanism
              </Link>{" "}
              for why.
            </p>
          </div>
        </section>

        {/* QUALIFIERS */}
        <section style={{ ...card, marginTop: 24 }} id="qualifiers">
          <div className="prose">
            <h2>SPF qualifiers explained</h2>
            <p>
              Each mechanism can be preceded by a qualifier that defines the
              result when that mechanism matches:
            </p>
            <ul>
              <li>
                <code>+</code> (pass) — default if omitted; the message passes
                SPF.
              </li>
              <li>
                <code>-</code> (fail) — hard fail; the receiver should reject.
              </li>
              <li>
                <code>~</code> (softfail) — treat as suspicious but don&apos;t
                hard fail. Often used during rollout.
              </li>
              <li>
                <code>?</code> (neutral) — no strong signal either way.
              </li>
            </ul>
            <p>
              Most records end with <code>~all</code> during testing and{" "}
              <code>-all</code> once enforcement is stable. For the tradeoffs, see{" "}
              <Link href="/spf/spf-softfail-vs-fail">
                SPF softfail vs fail
              </Link>
              .
            </p>
          </div>
        </section>

        {/* LOOKUP LIMIT */}
        <section style={{ ...card, marginTop: 24 }} id="lookup-limit">
          <div className="prose">
            <h2>DNS lookup limit and SPF permerror</h2>
            <p>
              SPF allows at most 10 DNS lookups during evaluation. Each{" "}
              <code>include</code>, <code>redirect</code>, <code>a</code>, and{" "}
              <code>mx</code> (and nested includes) counts. If the limit is
              exceeded, SPF returns a permanent error (permerror), and
              receivers treat your policy as invalid. Legitimate mail can fail
              SPF even when it should pass.
            </p>
            <p>
              To fix this, reduce includes, use <Link href="/spf/spf-include-flattening">SPF include flattening</Link> where appropriate, and avoid chaining too many providers. The{" "}
              <Link href="/spf/spf-permerror-too-many-dns-lookups">
                SPF permerror: too many DNS lookups
              </Link>{" "}
              guide walks through how to identify and fix lookup bloat.
            </p>
          </div>
        </section>

        {/* MISTAKES */}
        <section style={{ ...card, marginTop: 24 }} id="mistakes">
          <div className="prose">
            <h2>Common SPF mistakes</h2>
            <ul>
              <li>
                <strong>Multiple SPF records.</strong> A domain may publish only
                one SPF record. Two or more cause permerror. Merge them into a
                single policy—see{" "}
                <Link href="/spf/multiple-spf-records-found">
                  multiple SPF records found
                </Link>
                .
              </li>
              <li>
                <strong>Syntax errors.</strong> Typos, missing colons, or
                malformed mechanisms break evaluation. Use{" "}
                <Link href="/spf/spf-record-syntax-error">
                  SPF record syntax error
                </Link>{" "}
                for common fixes.
              </li>
              <li>
                <strong>Exceeding the 10-lookup limit.</strong> Too many
                includes or chained policies trigger permerror.
              </li>
              <li>
                <strong>Missing <code>all</code>.</strong> Without a final{" "}
                <code>~all</code> or <code>-all</code>, your policy is
                incomplete and may default to neutral in unclear ways.
              </li>
              <li>
                <strong>Wrong qualifier at the end.</strong> Using <code>?all</code>{" "}
                or omitting <code>all</code> weakens the fail signal for
                unauthorized senders.
              </li>
            </ul>
          </div>
        </section>

        {/* EXAMPLES */}
        <section style={{ ...card, marginTop: 24 }} id="examples">
          <div className="prose">
            <h2>SPF record examples</h2>

            <h3>Google Workspace</h3>
            <CodeBlock
              title="Google Workspace SPF"
              language="DNS TXT"
              code={`v=spf1 include:_spf.google.com ~all`}
            />
            <p>
              This authorizes Google&apos;s sending infrastructure. Use{" "}
              <code>-all</code> if you want hard fail for non-Google senders.
            </p>

            <h3>Microsoft 365</h3>
            <CodeBlock
              title="Microsoft 365 SPF"
              language="DNS TXT"
              code={`v=spf1 include:spf.protection.outlook.com -all`}
            />
            <p>
              If you use Exchange Online Protection or Microsoft 365, this
              include covers their outbound IPs.
            </p>

            <h3>SendGrid</h3>
            <CodeBlock
              title="SendGrid SPF"
              language="DNS TXT"
              code={`v=spf1 include:sendgrid.net ~all`}
            />

            <h3>Hybrid setup (Google + SendGrid)</h3>
            <CodeBlock
              title="Google + SendGrid combined"
              language="DNS TXT"
              code={`v=spf1 include:_spf.google.com include:sendgrid.net ~all`}
            />
            <p>
              Add one include per provider. Keep the list minimal to stay under
              the lookup limit. For more examples and copy-paste templates, see{" "}
              <Link href="/spf/spf-record-example">SPF record examples</Link>{" "}
              and the{" "}
              <Link href="/spf/spf-record-generator">SPF record generator</Link>.
            </p>
          </div>
        </section>

        {/* TROUBLESHOOT */}
        <section style={{ ...card, marginTop: 24 }} id="troubleshoot">
          <div className="prose">
            <h2>How to troubleshoot SPF step by step</h2>
            <ol>
              <li>
                Run a live check. Use our{" "}
                <Link href="/">domain checker</Link> or another SPF validator
                to see what receivers see.
              </li>
              <li>
                Confirm you have exactly one SPF record. Multiple records
                invalidate the policy.
              </li>
              <li>
                Verify syntax. Look for typos, missing colons, and malformed
                mechanisms.
              </li>
              <li>
                Count lookups. If you use many includes, trace each one and
                ensure the total stays under 10.
              </li>
              <li>
                Confirm the sending IP is authorized. Add the correct include or
                ip4 mechanism for the service that actually sends your mail.
              </li>
              <li>
                Allow time for DNS propagation, then re-check. Changes can take
                up to 48 hours in rare cases.
              </li>
            </ol>
          </div>
        </section>

        {/* BEST PRACTICES */}
        <section style={{ ...card, marginTop: 24 }} id="best-practices">
          <div className="prose">
            <h2>SPF best practices for stable email delivery</h2>
            <ul>
              <li>
                Publish one SPF record per domain. Never split policy across
                multiple TXT records.
              </li>
              <li>
                List only providers that actually send mail for your domain.
                Extra includes add lookups and complexity.
              </li>
              <li>
                Prefer <code>include</code> over hardcoded IP ranges when the
                provider supports it. They maintain their own IPs; you stay
                current.
              </li>
              <li>
                End with <code>~all</code> during rollout, then move to{" "}
                <code>-all</code> once you&apos;re confident no legitimate
                senders are excluded.
              </li>
              <li>
                Monitor DMARC reports. They reveal SPF failures and alignment
                issues you might miss from a single check.
              </li>
              <li>
                Stabilize SPF before tightening DMARC. Fix authorization first;
                then enforce policy.
              </li>
              <li>
                Use a single TXT record. DNS allows multiple TXT records for
                the same name, but SPF permits only one that starts with{" "}
                <code>v=spf1</code>. Splitting across records causes
                permerror.
              </li>
            </ul>
          </div>
        </section>

        {/* RELATED GUIDES */}
        <section style={{ ...card, marginTop: 24 }} id="related">
          <div className="prose">
            <h2>Related SPF deep dives</h2>
            <p>
              Go deeper on specific topics with these guides:
            </p>
            <ul>
              <li>
                <Link href="/spf/spf-record-example">SPF record examples</Link>{" "}
                — copy-paste templates for common providers
              </li>
              <li>
                <Link href="/spf/spf-record-syntax-explained">
                  SPF record syntax explained
                </Link>{" "}
                — mechanisms, qualifiers, and structure
              </li>
              <li>
                <Link href="/spf/spf-record-generator">
                  How to build an SPF record
                </Link>{" "}
                — step-by-step builder
              </li>
              <li>
                <Link href="/spf/spf-permerror-too-many-dns-lookups">
                  SPF permerror: too many DNS lookups
                </Link>{" "}
                — fix lookup bloat
              </li>
              <li>
                <Link href="/spf/multiple-spf-records-found">
                  Multiple SPF records found
                </Link>{" "}
                — merge duplicates safely
              </li>
              <li>
                <Link href="/spf/spf-include-flattening">
                  SPF include flattening
                </Link>{" "}
                — when and how to flatten
              </li>
              <li>
                <Link href="/spf/spf-softfail-vs-fail">
                  SPF softfail vs fail
                </Link>{" "}
                — choose the right qualifier
              </li>
              <li>
                <Link href="/spf/spf-record-syntax-error">
                  SPF record syntax error
                </Link>{" "}
                — fix typos and malformed mechanisms
              </li>
              <li>
                <Link href="/spf/spf-missing-all-mechanism">
                  SPF missing all mechanism
                </Link>{" "}
                — why you need ~all or -all
              </li>
            </ul>
            <p>
              <Link href="/spf">Return to the SPF Hub</Link> for the full
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
