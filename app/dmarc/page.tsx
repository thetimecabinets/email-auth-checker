import type { Metadata } from "next";
import Link from "next/link";
import { dmarcCluster } from "@/app/data/internalLinks";

const MAX_HUB_CARDS = 12;

export const metadata: Metadata = {
  title: "DMARC Hub: Fix DMARC Errors Fast with Guide & Tools",
  description:
    "Step-by-step guide to fix DMARC Hub errors. Includes DNS examples, common mistakes, and how to improve email deliverability fast.",
};

export default function DMARCHubPage() {
  const foundationalLinks = [
    {
      href: "/dmarc/dmarc-guide",
      label: "Complete DMARC Guide",
      description:
        "Full guide to DMARC policy, alignment, reporting, and safe enforcement.",
    },
    {
      href: "/dmarc/dmarc-record-example",
      label: "DMARC record examples",
      description:
        "Copy-paste DMARC TXT examples for monitoring, quarantine, and reject policies.",
    },
    {
      href: "/dmarc/dmarc-aggregate-reports-explained",
      label: "DMARC aggregate reports explained",
      description:
        "Learn how DMARC XML reports work and how to use them during rollout.",
    },
  ];

  const troubleshootingLinks = Array.from(
    new Map(dmarcCluster.map((item) => [item.href, item])).values()
  )
    .filter(
      (item) =>
        ![
          "/dmarc/dmarc-guide",
          "/dmarc/dmarc-record-example",
          "/dmarc/dmarc-aggregate-reports-explained",
        ].includes(item.href)
    )
    .slice(0, MAX_HUB_CARDS);

  return (
    <main style={{ padding: "36px 0 64px" }}>
      <div className="container">

        {/* Breadcrumb */}
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

        {/* HERO */}
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
                Control how receivers handle your domain&apos;s email
              </h1>

              <p>
                DMARC (Domain-based Message Authentication, Reporting and
                Conformance) is the policy layer that sits on top of SPF and
                DKIM. While SPF authorizes sending infrastructure and DKIM signs
                message content, DMARC tells receiving servers what to do when
                those checks fail or do not align with the visible sender.
              </p>

              <p>
                For many organizations, DMARC starts as a monitoring tool.
                Publishing a record with <code>p=none</code> allows mailbox
                providers to send aggregate reports describing how email using
                your domain is authenticated across the internet. These reports
                reveal unknown senders, forwarding behavior, and configuration
                mistakes before you enforce stricter policies.
              </p>

              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <Link href="/" style={primaryBtn}>
                  Run email authentication check
                </Link>
                <span style={{ fontSize: 12, color: "#6b7280" }}>
                  SPF, DKIM and DMARC analysis
                </span>
              </div>
            </div>
          </div>

          {/* One minute baseline */}
          <aside
            style={{
              ...card,
              borderColor: "rgba(224,177,0,0.35)",
              background: "rgba(224,177,0,0.08)",
            }}
          >
            <div className="prose">
              <h2 style={{ marginTop: 0, fontSize: 18 }}>
                One-minute DMARC starting policy
              </h2>

              <pre style={codeBox}>
{`v=DMARC1; p=none; rua=mailto:dmarc@example.com`}
              </pre>

              <p style={{ fontSize: 14, color: "#374151" }}>
                This record enables DMARC monitoring without blocking mail.
                Start with <code>p=none</code>, review the incoming reports,
                identify legitimate senders, and only then move toward stronger
                enforcement policies.
              </p>
            </div>
          </aside>
        </section>

        {/* PROTOCOL TOOLS */}
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
                Tools for this protocol
              </h2>
              <span style={{ fontSize: 12, color: "#6b7280" }}>
                Interactive utilities
              </span>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              <Link
                href="/dmarc/dmarc-generator"
                className="group block rounded-xl border border-blue-100 bg-blue-50 p-5 shadow-sm outline-none transition hover:shadow-md focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 no-underline"
              >
                <h3 className="text-lg font-semibold text-gray-900">
                  DMARC generator
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  Build a DMARC TXT line with policy and reporting tags.
                </p>
                <span className="mt-4 inline-flex items-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition group-hover:bg-gray-800">
                  Generate →
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* START HERE */}
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
                Start here
              </h2>
              <span style={{ fontSize: 12, color: "#6b7280" }}>
                Foundational DMARC pages
              </span>
            </div>

            <div
              style={{
                display: "grid",
                gap: 12,
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              }}
            >
              {foundationalLinks.map((link) => (
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

        {/* HOW DMARC WORKS */}
        <section style={{ marginTop: 18 }}>
          <div style={card}>
            <div className="prose">
              <h2 style={{ marginTop: 0, fontSize: 18 }}>
                How DMARC evaluation actually works
              </h2>

              <p>
                When a message arrives claiming to be from your domain, the
                receiving server first checks SPF and DKIM authentication.
                DMARC then verifies whether either result aligns with the
                visible From: domain.
              </p>

              <p>
                If at least one aligned authentication method passes, DMARC
                passes. If neither SPF nor DKIM aligns, the receiver consults
                your DMARC policy and decides whether to monitor, quarantine, or
                reject the message.
              </p>

              <p>
                Because of this alignment requirement, DMARC often exposes
                problems that SPF or DKIM alone would not reveal — especially
                with forwarding systems, mailing lists, and multi-service email
                infrastructures.
              </p>
            </div>
          </div>
        </section>

        {/* TROUBLESHOOTING */}
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
                DMARC troubleshooting playbook
              </h2>
              <span style={{ fontSize: 12, color: "#6b7280" }}>
                Deep dives for specific DMARC errors
              </span>
            </div>

            <div
              style={{
                display: "grid",
                gap: 12,
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              }}
            >
              {troubleshootingLinks.map((link) => (
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
                Why DMARC depends on SPF and DKIM
              </h2>

              <p>
                DMARC does not replace SPF or DKIM. Instead, it coordinates
                them. SPF validates the sending infrastructure. DKIM validates
                the message content. DMARC evaluates both and ensures that at
                least one authentication method aligns with the visible domain
                identity.
              </p>

              <p>
                Without SPF and DKIM configured correctly, DMARC cannot enforce
                policy reliably. This is why DMARC deployments usually follow a
                three-step path: stabilize SPF, enable DKIM across all senders,
                then gradually enforce DMARC policies.
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
              Related authentication hubs
            </div>

            <div style={{ display: "grid", gap: 10 }}>
              <Link href="/spf" style={darkCardLink}>
                SPF Hub
              </Link>
              <Link href="/dkim" style={darkCardLink}>
                DKIM Hub
              </Link>
            </div>
          </div>
        </section>

      </div>

      <style>{`
        @media (max-width: 980px) {
          section[style*="grid-template-columns: 1.25fr 1fr"] { grid-template-columns: 1fr !important; }
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
  overflowX: "auto",
};

const darkCardLink: React.CSSProperties = {
  display: "block",
  padding: "10px 12px",
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.18)",
  color: "#fff",
  textDecoration: "none",
};
