import type { Metadata } from "next";
import Link from "next/link";
import { dmarcCluster } from "@/app/data/internalLinks";

const MAX_HUB_CARDS = 12;

export const metadata: Metadata = {
  title:
    "DMARC Hub – Turn SPF and DKIM Signals into Enforced Policy (2026 Playbook)",
  description:
    "Authoritative DMARC hub for policy design. Learn how to move from p=none to quarantine and reject, read DMARC reports, and fix common DMARC errors with one-minute examples.",
};

export default function DMARCHubPage() {
  return (
    <main style={{ padding: "36px 0 64px" }}>
      <div className="container">
        {/* TOP STRIP */}
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
          <span style={{ color: "#111827", fontWeight: 700 }}>DMARC</span>
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
                Design a DMARC policy that stops spoofing without breaking your
                product emails
              </h1>

              <p>
                Our 2026 audits show the same pattern in nearly every compromised
                brand: SPF and DKIM exist, but DMARC is stuck on{" "}
                <code>p=none</code>. That “monitor only” setting gives mailbox
                providers visibility into abuse – but it never tells them to
                block anything.
              </p>

              <p>
                DMARC is the policy brain that sits on top of SPF and DKIM. It
                decides whether a suspicious message pretending to be you should
                be delivered, junked, or rejected. Done well, DMARC dramatically
                reduces spoofing and impersonation.
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                <Link href="/" style={primaryBtn}>
                  Run DMARC, SPF & DKIM check
                </Link>

                <span style={{ fontSize: 12, color: "#6b7280" }}>
                  Live DNS results – ideal for policy rollouts.
                </span>
              </div>
            </div>
          </div>

          {/* ONE MINUTE FIX */}
          <aside
            style={{
              ...card,
              borderColor: "rgba(224,177,0,0.35)",
              background: "rgba(224,177,0,0.08)",
            }}
          >
            <div className="prose">
              <h2 style={{ marginTop: 0, fontSize: 18 }}>
                One-Minute DMARC starter policy
              </h2>

              <p style={{ fontSize: 14 }}>
                Use this when you are just starting your DMARC journey. It
                collects data without blocking mail.
              </p>

              <pre style={codeBox}>
{`v=DMARC1; p=none; rua=mailto:dmarc@yourdomain.com;
ruf=mailto:dmarc@yourdomain.com; fo=1; pct=100`}
              </pre>

              <p style={{ fontSize: 14 }}>
                Once SPF and DKIM are aligned for all senders, you can move to
                <code> p=quarantine </code> and eventually <code>p=reject</code>.
              </p>
            </div>
          </aside>
        </section>

        {/* STRATEGY VIEW */}
        <section
          style={{
            marginTop: 18,
            display: "grid",
            gap: 16,
            gridTemplateColumns: "1fr 1fr",
          }}
        >
          <div style={card}>
            <div className="prose">
              <h2 style={{ marginTop: 0, fontSize: 18 }}>
                For panicked founders
              </h2>

              <p>
                When customers forward phishing emails that appear to come from
                your domain, it usually means DMARC has never been allowed to
                enforce policy.
              </p>

              <p>
                Receivers can see messages failing SPF or DKIM but without a
                policy they may still accept them. DMARC enforcement fixes that.
              </p>

              <p>
                The key is gradual rollout: monitor → quarantine → reject.
              </p>
            </div>
          </div>

          <div style={card}>
            <div className="prose">
              <h2 style={{ marginTop: 0, fontSize: 18 }}>
                For IT admins
              </h2>

              <p>
                Modern mailbox providers require alignment between SPF,
                DKIM, and the visible From domain.
              </p>

              <p>
                DMARC tags such as <code>aspf</code>, <code>adkim</code>,
                <code>pct</code>, and reporting addresses control enforcement
                and rollout strategy.
              </p>

              <p>
                Use aggregate reports to monitor real traffic before increasing
                enforcement.
              </p>
            </div>
          </div>
        </section>

        {/* CLUSTER LINKS */}
        <section style={{ marginTop: 18 }}>
          <div style={card}>
            <div style={{ marginBottom: 12 }}>
              <h2 style={{ margin: 0, fontSize: 18 }}>
                DMARC troubleshooting playbook
              </h2>
            </div>

            <div
              style={{
                display: "grid",
                gap: 12,
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              }}
            >
              {/* Future: add "View all issues" page when clusters exceed MAX_HUB_CARDS */}
              {dmarcCluster.slice(0, MAX_HUB_CARDS).map((link) => (
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

        {/* CROSS PROTOCOL */}
        <section
          style={{
            marginTop: 18,
            display: "grid",
            gap: 16,
            gridTemplateColumns: "1.4fr 1fr",
          }}
        >
          <div style={card}>
            <div className="prose">
              <h2 style={{ marginTop: 0, fontSize: 18 }}>
                DMARC works only with SPF and DKIM
              </h2>

              <p>
                DMARC is the final enforcement layer. It interprets SPF and
                DKIM signals and tells receivers what to do when authentication
                fails.
              </p>

              <p>
                A healthy email authentication stack always includes all three
                protocols working together.
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
            <div style={{ fontWeight: 800, marginBottom: 8 }}>
              Next protocol hubs
            </div>

            <div style={{ display: "grid", gap: 10 }}>
              <Link href="/spf" style={darkCardLink}>
                <span>SPF Hub</span>
                <span style={{ fontSize: 11, opacity: 0.7 }}>Sources</span>
              </Link>

              <Link href="/dkim" style={darkCardLink}>
                <span>DKIM Hub</span>
                <span style={{ fontSize: 11, opacity: 0.7 }}>Integrity</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
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
        background: "#f9fafb",
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

const card: React.CSSProperties = {
  border: "1px solid #e5e7eb",
  background: "#ffffff",
  borderRadius: 14,
  padding: 18,
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

const codeBox: React.CSSProperties = {
  margin: "10px 0",
  padding: 12,
  borderRadius: 12,
  background: "#111827",
  color: "#f9fafb",
  fontSize: 12,
  overflowX: "auto",
};

const darkCardLink: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "10px 12px",
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.18)",
  background: "rgba(255,255,255,0.06)",
  color: "#fff",
  textDecoration: "none",
};