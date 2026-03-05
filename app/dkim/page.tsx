import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";

export const metadata: Metadata = {
  title:
    "DKIM Hub – Fix Broken Signatures, Selectors and Alignment for 2026 Inbox Placement",
  description:
    "Expert DKIM hub for technical teams. Learn how selectors, key lengths, canonicalization and alignment affect deliverability, with focused one-minute fixes for common DKIM errors.",
};

export default function DKIMHubPage() {
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
          <span style={{ color: "#111827", fontWeight: 700 }}>DKIM</span>
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
                Stabilise DKIM so every email is cryptographically trusted
              </h1>

              <p>
                From our 2026 DKIM audits, one thing is clear: deliverability
                dies quietly when signatures fail at random. A marketing blast,
                an invoice from the ERP, or a support notification can all be
                signed differently — and mailbox providers watch those signals
                over weeks, not hours.
              </p>

              <p>
                DomainKeys Identified Mail (DKIM) attaches a tamper-evident
                signature to every message. Receivers fetch the public key from
                your DNS and confirm that the content and headers have not
                changed. When keys are missing, rotated incorrectly, or tied to
                the wrong domain, DMARC enforcement becomes fragile.
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                <Link href="/" style={primaryBtn}>
                  Run DKIM, SPF &amp; DMARC check
                </Link>
                <span style={{ fontSize: 12, color: "#6b7280" }}>
                  No login. Selector-aware DNS lookups only.
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
                One-Minute DKIM template (example)
              </h2>

              <p style={{ fontSize: 14, color: "#374151" }}>
                Use this shape as a mental model. Always copy the exact values
                from your provider console (Google Workspace, Microsoft 365,
                SendGrid, etc.). Don’t “edit” the public key string by hand.
              </p>

              <pre style={codeBox}>
{`Type:  TXT
Host:  selector1._domainkey.example.com
Value: v=DKIM1; k=rsa; p=YOUR_PUBLIC_KEY
TTL:   1h`}
              </pre>

              <p style={{ fontSize: 14, color: "#374151" }}>
                In practice, providers propose different selector names and
                often 2048-bit keys. Publish exactly one TXT record per selector
                and re-check after propagation.
              </p>
            </div>
          </aside>
        </section>

        {/* FOUNDERS + IT */}
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
                For panicked founders: why “no DKIM” is a red flag
              </h2>

              <p>
                When inbox providers see important messages without DKIM
                signatures, they assume something is off. Invoices, password
                resets, and security alerts should be verifiable. Without DKIM,
                those emails blend in with phishing traffic using your brand,
                and the receiver may send them to spam or quarantine.
              </p>

              <p>
                Enabling DKIM is usually a copy-paste operation in your provider
                console. The real value comes from checking that every sending
                system — marketing, product, and support — signs consistently so
                DMARC can enforce policy later.
              </p>

              <p>
                If you feel lost, start with the provider that sends the highest
                volume of email and make sure DKIM is “present” in this checker
                before touching anything else.
              </p>
            </div>
          </div>

          <div style={card}>
            <div className="prose">
              <h2 style={{ marginTop: 0, fontSize: 18 }}>
                For IT admins: selectors, rotation and alignment
              </h2>

              <p>
                Modern receivers treat weak keys and misaligned identities as
                risk signals. Keys under 1024 bits are increasingly rejected or
                treated as suspicious. Your DKIM <code>d=</code> domain should
                align with the visible From: domain (or your organisational
                domain) so DMARC can pass.
              </p>

              <p>
                Common DKIM failure modes include missing selector records,
                truncated public keys, body hash mismatches, and gateways adding
                footers that invalidate signatures. A rotation strategy should
                replace old keys without breaking live traffic.
              </p>

              <p>
                Treat DKIM changes as controlled deployments with rollback plans,
                not last-minute DNS edits during an incident.
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
                DKIM troubleshooting playbook
              </h2>
              <span style={{ fontSize: 12, color: "#6b7280" }}>
                Deep dives for specific DKIM errors
              </span>
            </div>

            <div
              style={{
                display: "grid",
                gap: 12,
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              }}
            >
              <HubLink
                href="/dkim/no-dkim-record-found"
                label="No DKIM record found"
                description="Confirm selectors, publish the right TXT record, and re-check."
              />
              <HubLink
                href="/dkim/dkim-selector-not-found"
                label="DKIM selector not found"
                description="Align the selector in headers with the DNS hostname."
              />
              <HubLink
                href="/dkim/invalid-dkim-key"
                label="Invalid DKIM key"
                description="Fix malformed public keys and truncated DNS values."
              />
              <HubLink
                href="/dkim/dkim-alignment-failed"
                label="DKIM alignment failed"
                description="Resolve mismatched signing domains under DMARC."
              />
              <HubLink
                href="/dkim/dkim-key-length-too-short"
                label="DKIM key length too short"
                description="Upgrade to 2048-bit keys accepted by modern receivers."
              />
              <HubLink
                href="/dkim/dkim-selector-explained"
                label="DKIM selector explained"
                description="Design a selector strategy that survives key rotation."
              />
              <HubLink
                href="/dkim/dkim-selector-mismatch"
                label="DKIM selector mismatch"
                description="Eliminate confusion between legacy and new selectors."
              />
              <HubLink
                href="/dkim/dkim-body-hash-mismatch"
                label="DKIM body hash mismatch"
                description="Understand which footers and gateways break signatures."
              />
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
                How DKIM interacts with SPF and DMARC
              </h2>

              <p>
                DKIM is the integrity layer in your email security story. SPF
                says “these servers can send,” DKIM says “this exact message
                hasn’t been altered,” and DMARC decides what to do when either
                claim fails.
              </p>

              <p>
                Deploy SPF and DKIM everywhere first, monitor with a relaxed
                DMARC policy, then move gradually to quarantine/reject once
                legitimate streams are signing correctly.
              </p>

              <p>
                Use this hub alongside the SPF and DMARC hubs to design a
                coherent, auditable policy rather than a one-off fix.
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
              Strengthen the other layers of your authentication stack.
            </div>

            <div style={{ display: "grid", gap: 10 }}>
              <Link href="/spf" style={darkCardLink}>
                <span>SPF Hub – sending sources</span>
                <span style={{ fontSize: 11, opacity: 0.75 }}>Origins</span>
              </Link>

              <Link href="/dmarc" style={darkCardLink}>
                <span>DMARC Hub – policy &amp; reports</span>
                <span style={{ fontSize: 11, opacity: 0.75 }}>Enforcement</span>
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
  description: string;
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
      <span style={{ fontSize: 13, color: "#6b7280" }}>{description}</span>
    </Link>
  );
}

/** shared styles (locked) */
const card: CSSProperties = {
  border: "1px solid #e5e7eb",
  background: "#ffffff",
  borderRadius: 14,
  padding: 18,
  boxShadow: "0 1px 0 rgba(0,0,0,0.02)",
};

const primaryBtn: CSSProperties = {
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

const codeBox: CSSProperties = {
  margin: "10px 0",
  padding: 12,
  borderRadius: 12,
  background: "#111827",
  color: "#f9fafb",
  fontSize: 12,
  lineHeight: 1.5,
  overflowX: "auto",
};

const darkCardLink: CSSProperties = {
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