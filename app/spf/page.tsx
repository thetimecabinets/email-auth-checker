import type { Metadata } from "next";
import Link from "next/link";
import { spfCluster } from "@/app/data/internalLinks";

const MAX_HUB_CARDS = 12;

export const metadata: Metadata = {
  title:
    "SPF Hub – Fix SPF Errors, Alignment and DNS for Modern Email Delivery (2026)",
  description:
    "Deep-dive SPF hub for founders and IT admins. Understand SPF alignment, DNS limits, Microsoft 365 and Google Workspace patterns, and grab one-minute SPF fixes for common errors.",
};

export default function SPFHubPage() {
  return (
    <main style={{ padding: "36px 0 64px" }}>
      <div className="container">
        {/* TOP STRIP + BREADCRUMB */}
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
          <span style={{ color: "#111827", fontWeight: 700 }}>SPF</span>
        </div>

        {/* HERO + ONE-MINUTE FIX */}
        <section
          style={{
            display: "grid",
            gap: 16,
            gridTemplateColumns: "1.25fr 1fr",
            alignItems: "start",
          }}
        >
          <div style={card}>
            <div className="prose">
              <h1 style={{ marginTop: 0 }}>
                Master SPF records for reliable email delivery
              </h1>

              <p>
                Our 2026 SPF audit data shows the same pattern again and again:
                panicked founders discover a single vague “SPF permerror” line in
                a delivery report, while their IT teams are left untangling years
                of DNS changes. This hub turns that anxiety into a clear,
                repeatable SPF playbook for any stack.
              </p>

              <p>
                Sender Policy Framework (SPF) is the DNS rulebook that tells
                receiving servers which IPs and services are allowed to send
                mail for your domain. When it is misconfigured – too many
                lookups, duplicate records, or outdated senders – even
                legitimate product emails can silently disappear.
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
                <Link href="/" style={primaryBtn}>
                  Run SPF, DKIM &amp; DMARC check
                </Link>
                <span style={{ fontSize: 12, color: "#6b7280" }}>
                  No login. Live DNS only. Built for fast triage.
                </span>
              </div>
            </div>
          </div>

          <aside
            style={{
              ...card,
              borderColor: "rgba(224,177,0,0.35)",
              background: "rgba(224,177,0,0.08)",
            }}
          >
            <div className="prose">
              <h2 style={{ marginTop: 0, fontSize: 18 }}>
                One-Minute SPF baseline (safe starting point)
              </h2>

              <p style={{ fontSize: 14, color: "#374151" }}>
                Use this when you send only via Microsoft 365. Adapt the{" "}
                <code>include:</code> mechanisms to match your providers.
              </p>

              <pre style={codeBox}>
{`v=spf1 include:spf.protection.outlook.com -all

# Allows Microsoft 365 to send for your domain
# and hard-fails everything else.`}
              </pre>

              <p style={{ fontSize: 14, color: "#374151" }}>
                For Google Workspace, replace the include with{" "}
                <code>include:_spf.google.com</code>. For hybrid setups (CRM,
                marketing tools, ticketing systems), add one proven sender at a
                time and re-run the checker after each change.
              </p>
            </div>
          </aside>
        </section>

        {/* FOUNDER + IT */}
        <section style={{ marginTop: 18, display: "grid", gap: 16, gridTemplateColumns: "1fr 1fr" }}>
          <div style={card}>
            <div className="prose">
              <h2 style={{ marginTop: 0, fontSize: 18 }}>
                For panicked founders: what “SPF is broken” really means
              </h2>
              <p>
                When our team audits failing campaigns, the story is rarely
                about a single magic record. It is usually about drift. New
                tools were added over the years, but SPF was never updated
                cleanly. Mailbox providers see conflicting signals and start
                throttling or junking messages.
              </p>
              <p>
                The fastest path to stability is to publish one clear SPF
                policy, remove duplicates, and keep the number of DNS lookups
                under the industry-standard limit of ten. From there you can
                grow more aggressive DMARC enforcement with confidence instead
                of guessing.
              </p>
              <p>
                If you only take one action today: identify every system that
                can send email as your brand and verify that each of them is
                represented in a single, consolidated SPF record.
              </p>
            </div>
          </div>

          <div style={card}>
            <div className="prose">
              <h2 style={{ marginTop: 0, fontSize: 18 }}>
                For IT admins: alignment, DNS limits and edge cases
              </h2>
              <p>
                Major receivers expect SPF to be both syntactically valid and
                aligned with the visible From: domain when DMARC is enabled.
                That means your SPF policy must ultimately resolve to IPs that
                are actually used by your SMTP hosts, without chained includes
                that explode beyond ten lookups.
              </p>
              <p>
                Our checks surface the exact mechanisms and lookups involved so
                you can decide whether to flatten includes, consolidate records,
                or move some sending systems behind a dedicated subdomain such
                as <code>mail.example.com</code>.
              </p>
              <p>
                Treat SPF as code: version it, document which SaaS tools depend
                on it, and roll out changes in small, observable steps rather
                than all at once during a crisis.
              </p>
            </div>
          </div>
        </section>

        {/* CLUSTER LINKS */}
        <section style={{ marginTop: 18 }}>
          <div style={card}>
            <div
              style={{
                display: "flex",
                gap: 12,
                alignItems: "baseline",
                justifyContent: "space-between",
                marginBottom: 12,
              }}
            >
              <h2 style={{ margin: 0, fontSize: 18, color: "#111827" }}>
                SPF troubleshooting playbook
              </h2>
              <span style={{ fontSize: 12, color: "#6b7280" }}>
                Deep dives for specific SPF errors
              </span>
            </div>

            <div
              style={{
                display: "grid",
                gap: 12,
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              }}
            >
              {/* Future: add "View all issues" page when clusters exceed MAX_HUB_CARDS */}
              {spfCluster.slice(0, MAX_HUB_CARDS).map((link) => (
                <HubLink
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  description={link.description}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CROSS-PROTOCOL */}
        <section
          style={{
            marginTop: 18,
            display: "grid",
            gap: 16,
            gridTemplateColumns: "1.4fr 1fr",
            alignItems: "start",
          }}
        >
          <div style={card}>
            <div className="prose">
              <h2 style={{ marginTop: 0, fontSize: 18 }}>
                How SPF fits with DKIM and DMARC
              </h2>
              <p>
                SPF alone cannot fully protect your brand. Receivers treat the
                full trio — SPF, DKIM, and DMARC — as a single story about
                whether you are a trustworthy sender.
              </p>
              <p>
                DKIM signs message content, proving it hasn’t been modified in
                transit. DMARC then decides how to handle messages where SPF
                and DKIM do not align with the visible From: domain. When all
                three are aligned, you can confidently move from monitoring to
                quarantine and finally to reject.
              </p>
              <p>
                If you are planning a full rollout, stabilise SPF first, enable
                DKIM for every sender, and only then tighten your DMARC policy.
              </p>
            </div>
          </div>

          <div
            style={{
              borderRadius: 14,
              padding: 16,
              border: "1px solid #111827",
              background: "#111827",
              color: "#fff",
            }}
          >
            <div style={{ fontWeight: 800, marginBottom: 6 }}>
              Next protocol hubs
            </div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", marginBottom: 12 }}>
              Continue the journey with focused guides for the other protocols.
            </div>

            <div style={{ display: "grid", gap: 10 }}>
              <Link href="/dkim" style={darkCardLink}>
                <span>DKIM Hub – signed messages</span>
                <span style={{ fontSize: 11, opacity: 0.75 }}>Integrity</span>
              </Link>
              <Link href="/dmarc" style={darkCardLink}>
                <span>DMARC Hub – enforcement policy</span>
                <span style={{ fontSize: 11, opacity: 0.75 }}>Control</span>
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* responsive tweaks */}
      <style>{`
        @media (max-width: 980px) {
          section[style*="grid-template-columns: 1.25fr 1fr"] { grid-template-columns: 1fr !important; }
          section[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
          section[style*="grid-template-columns: 1.4fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}

function HubLink({
  href,
  label,
  description,
}: {
  href: string;
  label: string;
  description?: string;
}) {
  return (
    <Link
      href={href}
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
      <span style={{ fontWeight: 700, color: "#111827" }}>{label}</span>
      {description && (
        <span style={{ fontSize: 13, color: "#6b7280" }}>{description}</span>
      )}
    </Link>
  );
}

/** shared styles */
const card: React.CSSProperties = {
  border: "1px solid #e5e7eb",
  background: "#ffffff",
  borderRadius: 14,
  padding: 18,
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
  fontWeight: 800,
  textDecoration: "none",
};

const codeBox: React.CSSProperties = {
  margin: "10px 0",
  padding: 12,
  borderRadius: 12,
  background: "#111827",
  color: "#f9fafb",
  fontSize: 12,
  lineHeight: 1.5,
  overflowX: "auto",
};

const darkCardLink: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 10,
  padding: "10px 12px",
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.18)",
  background: "rgba(255,255,255,0.06)",
  color: "#fff",
  textDecoration: "none",
};