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
  const foundationalLinks = [
    {
      href: "/spf/spf-record-guide",
      label: "Complete SPF Record Guide",
      description:
        "Full guide to SPF syntax, examples, DNS limits, and troubleshooting.",
    },
    {
      href: "/spf/spf-record-example",
      label: "SPF record examples",
      description:
        "Copy-paste SPF examples for Google Workspace, Microsoft 365, SendGrid, and hybrid setups.",
    },
    {
      href: "/spf/spf-record-syntax-explained",
      label: "SPF record syntax explained",
      description:
        "Understand mechanisms, qualifiers, and the structure of a valid SPF record.",
    },
    {
      href: "/spf/spf-record-generator",
      label: "How to build an SPF record",
      description:
        "Step-by-step SPF construction guide with practical examples and cautions.",
    },
  ];

  const troubleshootingLinks = spfCluster
    .filter(
      (item) =>
        ![
          "/spf/spf-record-example",
          "/spf/spf-record-syntax-explained",
          "/spf/spf-record-generator",
        ].includes(item.href)
    )
    .slice(0, MAX_HUB_CARDS);

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
                SPF is the first layer of sender authorization. It tells mailbox
                providers which servers and services are allowed to send email
                for your domain. When it is clean and intentional, it helps
                legitimate mail pass authentication consistently. When it is
                messy, duplicated, or overloaded with old providers, delivery
                becomes unpredictable.
              </p>

              <p>
                This hub is the starting point for understanding SPF as a whole.
                It brings together the core educational pages, the most common
                troubleshooting paths, and the protocol context you need before
                tightening DMARC enforcement. Use it if you are auditing a
                broken setup, planning a cleaner sender inventory, or trying to
                understand why product, billing, or marketing mail is failing.
              </p>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 12,
                  alignItems: "center",
                }}
              >
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
                <code>include:</code> mechanisms to match your actual providers.
              </p>

              <pre style={codeBox}>
{`v=spf1 include:spf.protection.outlook.com -all

# Allows Microsoft 365 to send for your domain
# and hard-fails everything else.`}
              </pre>

              <p style={{ fontSize: 14, color: "#374151" }}>
                For Google Workspace, replace the include with{" "}
                <code>include:_spf.google.com</code>. For hybrid setups, add one
                verified sender at a time and re-run the checker after each
                change so you do not create duplicate records or exceed the DNS
                lookup limit.
              </p>
            </div>
          </aside>
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
                Foundational SPF pages
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

        {/* FOUNDER + IT */}
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
                For founders: what SPF failure usually means
              </h2>
              <p>
                Most SPF problems are not caused by one dramatic mistake. They
                come from slow accumulation. A company adds Google Workspace,
                then a CRM, then a support desk, then a marketing platform, and
                each vendor gives a new DNS instruction. Months later the domain
                is publishing multiple SPF records or a single bloated record
                that no one fully understands.
              </p>
              <p>
                The practical fix is to treat sender authorization as an
                inventory problem. List every system that can send as your
                domain, remove the ones that no longer matter, and publish one
                clear SPF record that reflects reality. Clean SPF is not only a
                DNS task. It is an operational hygiene task.
              </p>
            </div>
          </div>

          <div style={card}>
            <div className="prose">
              <h2 style={{ marginTop: 0, fontSize: 18 }}>
                For IT admins: alignment, limits, and real mail flow
              </h2>
              <p>
                SPF is evaluated against the connecting IP, not the visible
                From: address. That matters when mail leaves through relays,
                gateways, forwarding chains, or third-party senders. A record
                can look valid in DNS and still fail operationally if the
                authenticated path does not match the actual infrastructure in
                use.
              </p>
              <p>
                The other common trap is lookup expansion. Visible includes are
                only the surface. Nested vendor records, redirects, and
                unnecessary <code>mx</code> or <code>a</code> mechanisms can
                push the effective evaluation beyond ten DNS lookups and turn a
                syntactically valid SPF record into permerror.
              </p>
            </div>
          </div>
        </section>

        {/* HOW SPF WORKS */}
        <section style={{ marginTop: 18 }}>
          <div style={card}>
            <div className="prose">
              <h2 style={{ marginTop: 0, fontSize: 18 }}>
                How SPF authentication works in practice
              </h2>
              <p>
                When a remote server receives a message claiming to be from your
                domain, it checks the sending IP against the SPF policy
                published in DNS. That policy is a TXT record beginning with{" "}
                <code>v=spf1</code>. The receiver follows the mechanisms in that
                record — such as <code>include</code>, <code>ip4</code>,{" "}
                <code>ip6</code>, <code>mx</code>, or <code>a</code> — until it
                can decide whether the sender is authorized.
              </p>
              <p>
                If the IP matches an allowed mechanism, SPF passes. If it does
                not, the receiver reaches the final qualifier such as{" "}
                <code>~all</code> or <code>-all</code> and assigns softfail or
                fail. If the record is broken, duplicated, or too lookup-heavy,
                SPF can return permerror instead. That result is especially
                dangerous because it often weakens DMARC as well. For a full
                walkthrough, read the{" "}
                <Link href="/spf/spf-record-guide">
                  Complete SPF Record Guide
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        {/* TROUBLESHOOTING LINKS */}
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
                When SPF alone is not enough
              </h2>
              <p>
                SPF is only one part of modern email authentication. It
                authorizes sending infrastructure, but it does not sign the
                message body and it does not, by itself, tell receivers how to
                enforce failures against your visible brand identity.
              </p>
              <p>
                That is where DKIM and DMARC matter. DKIM adds a cryptographic
                signature that proves the message has not been modified in
                transit. DMARC then evaluates whether SPF or DKIM aligns with
                the visible From: domain and tells mailbox providers whether to
                monitor, quarantine, or reject failing mail.
              </p>
              <p>
                In other words: SPF helps answer “was this server allowed to
                send?” while DKIM helps answer “was this message changed?” and
                DMARC helps answer “what should we do when authentication does
                not line up with the sender identity?” If you want a stable
                rollout, clean SPF first, then make sure DKIM is enabled across
                all real senders, and only after that tighten DMARC policy.
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
            <div
              style={{
                fontSize: 13,
                color: "rgba(255,255,255,0.8)",
                marginBottom: 12,
              }}
            >
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