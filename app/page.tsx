"use client";

import Link from "next/link";
import { useState } from "react";

type Result = {
  spf: string | null;
  dkimDetected: boolean;
  dmarc: string | null;
  spfStatus?: "ok" | "missing" | "permerror" | "softfail";
  dkimStatus?: "ok" | "missing";
  dmarcStatus?: "ok" | "missing" | "weak";
};

export default function Home() {
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);

  function computeScore(result: Result) {
    let score = 0;
    if (result.spf) score += 30;
    if (result.dkimDetected) score += 30;
    if (result.dmarc) score += 20;
    if (result.dmarc?.includes("p=reject")) score += 20;
    return Math.min(score, 100);
  }

  async function runCheck(e: React.FormEvent) {
    e.preventDefault();

    const cleaned = domain.trim().toLowerCase();
    if (!cleaned) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const q = encodeURIComponent(cleaned);

      const [spfRes, dkimRes, dmarcRes] = await Promise.all([
        fetch(`/api/spf?domain=${q}`).then((r) => r.json()),
        fetch(`/api/dkim?domain=${q}`).then((r) => r.json()),
        fetch(`/api/dmarc?domain=${q}`).then((r) => r.json()),
      ]);

      // SPF detection
      let spfStatus: Result["spfStatus"] = "ok";

      if (!spfRes.spf) {
        spfStatus = "missing";
      } else if (spfRes.spf.includes("~all")) {
        spfStatus = "softfail";
      } else if (spfRes.spf.length > 200) {
        spfStatus = "permerror";
      }

      // DKIM detection
      let dkimStatus: Result["dkimStatus"] =
        Array.isArray(dkimRes.dkim) && dkimRes.dkim.length > 0
          ? "ok"
          : "missing";

      // DMARC detection
      let dmarcStatus: Result["dmarcStatus"] = "ok";

      if (!dmarcRes.dmarc) {
        dmarcStatus = "missing";
      } else if (dmarcRes.dmarc.includes("p=none")) {
        dmarcStatus = "weak";
      }

      setResult({
        spf: spfRes.spf ?? null,
        dkimDetected: Array.isArray(dkimRes.dkim) && dkimRes.dkim.length > 0,
        dmarc: dmarcRes.dmarc ?? null,
        spfStatus,
        dkimStatus,
        dmarcStatus,
      });
    } catch {
      setError("Unable to run checks. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <style>{`
.spinner {
  width: 14px;
  height: 14px;
  border: 2px solid #111827;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
`}</style>
      {/* HERO */}
      <section className="checker-hero" id="checker">
        <div className="checker-card">
          <h1 className="checker-title">
            SPF, DKIM &amp; DMARC Checker for Email Deliverability
          </h1>

          <p className="checker-subtitle">
            Emails landing in spam or failing authentication usually trace back
            to SPF, DKIM, or DMARC misconfigurations.
          </p>

          <p
            style={{
              color: "#4b5563",
              lineHeight: 1.7,
              maxWidth: 760,
              margin: "0 auto 18px",
              textAlign: "center",
            }}
          >
            This free checker performs a live DNS lookup and shows whether your
            domain publishes valid authentication records. In seconds you can
            spot missing records, weak policies, and common configuration
            mistakes that hurt inbox placement.
          </p>

          <form onSubmit={runCheck} className="domain-form">
            <input
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="example.com"
              className="domain-input"
              inputMode="url"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              aria-label="Domain name"
            />

            <button type="submit" disabled={loading} className="domain-button">
              {loading ? (
                <span style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <span className="spinner" />
                  Analyzing DNS…
                </span>
              ) : (
                "Check SPF, DKIM & DMARC"
              )}
            </button>
          </form>

          <p
            style={{
              marginTop: 12,
              fontSize: 13,
              color: "#6b7280",
              textAlign: "center",
            }}
          >
            No login required. Live DNS only. Built for fast email
            authentication triage.
          </p>

          {error && (
            <div
              style={{ marginTop: 12, color: "#b91c1c", fontSize: 14 }}
              role="alert"
            >
              {error}
            </div>
          )}

          {result && (
            <div
              style={{
                marginTop: 20,
                padding: 16,
                borderRadius: 12,
                border: "1px solid #e5e7eb",
                background: "#fff",
              }}
            >
              <div style={{ fontSize: 13, color: "#6b7280" }}>
                Authentication score
              </div>

              <div
                style={{
                  fontSize: 28,
                  fontWeight: 800,
                  marginTop: 4,
                  color:
                    computeScore(result) > 80
                      ? "#16a34a"
                      : computeScore(result) > 50
                      ? "#ca8a04"
                      : "#dc2626",
                }}
              >
                {computeScore(result)}/100
              </div>

              <div style={{ marginTop: 6, fontSize: 13, color: "#6b7280" }}>
                {computeScore(result) > 80
                  ? "Strong authentication setup"
                  : computeScore(result) > 50
                  ? "Some issues detected"
                  : "Critical issues affecting deliverability"}
              </div>
            </div>
          )}

          {/* RESULTS */}
          {result && (
            <div
              className="results-grid"
              style={{ marginTop: 22 }}
              aria-label="Results"
            >
              <ResultCard
                title="SPF"
                status={result.spfStatus === "missing" ? "fail" : "pass"}
                value={
                  result.spfStatus === "missing"
                    ? "No SPF record found"
                    : result.spfStatus === "softfail"
                    ? "SPF softfail (~all)"
                    : result.spfStatus === "permerror"
                    ? "SPF permerror detected"
                    : result.spf || "SPF valid"
                }
                hint="Verifies which servers may send email for your domain."
                link={
                  result.spfStatus === "missing"
                    ? "/spf/no-spf-record-found"
                    : result.spfStatus === "permerror"
                    ? "/spf/spf-permerror-too-many-dns-lookups"
                    : result.spfStatus === "softfail"
                    ? "/spf/spf-softfail-explained"
                    : undefined
                }
              />

              <ResultCard
                title="DKIM"
                status={result.dkimDetected ? "pass" : "warn"}
                value={
                  result.dkimDetected ? "DKIM detected" : "No DKIM detected"
                }
                hint="Checks whether messages are cryptographically signed."
                link={
                  result.dkimStatus === "missing"
                    ? "/dkim/no-dkim-record-found"
                    : undefined
                }
              />

              <ResultCard
                title="DMARC"
                status={
                  result.dmarc?.includes("p=reject")
                    ? "pass"
                    : result.dmarc
                    ? "warn"
                    : "fail"
                }
                value={
                  result.dmarcStatus === "missing"
                    ? "No DMARC record found"
                    : result.dmarcStatus === "weak"
                    ? "DMARC policy p=none (weak)"
                    : result.dmarc || "DMARC valid"
                }
                hint="Defines how receivers handle SPF or DKIM failures."
                link={
                  result.dmarcStatus === "missing"
                    ? "/dmarc/no-dmarc-record-found"
                    : result.dmarcStatus === "weak"
                    ? "/dmarc/dmarc-alignment-failed"
                    : undefined
                }
              />
            </div>
          )}

          <div
            style={{
              marginTop: 18,
              display: "grid",
              gap: 10,
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              textAlign: "left",
            }}
          >
            <MiniInfoCard
              title="SPF"
              text="Verifies which servers may send email for your domain."
            />
            <MiniInfoCard
              title="DKIM"
              text="Cryptographically signs messages to protect integrity."
            />
            <MiniInfoCard
              title="DMARC"
              text="Defines what happens when authentication fails."
            />
          </div>
        </div>
      </section>

      {/* COMMON ISSUES */}
      <section className="container" style={{ paddingTop: 34 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 12 }}>
          Common SPF, DKIM and DMARC problems
        </h2>

        <p
          style={{
            color: "#374151",
            lineHeight: 1.6,
            marginBottom: 16,
            maxWidth: "62ch",
          }}
        >
          These are the most common authentication issues we see when diagnosing
          email deliverability problems. Each guide includes practical fixes,
          DNS examples, and related troubleshooting paths.
        </p>

        <div
          style={{
            display: "grid",
            gap: 14,
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          }}
        >
          <ProtocolCard
            title="SPF"
            description="Sender authorization problems and policy fixes."
            links={[
              { href: "/spf/no-spf-record-found", label: "No SPF record found" },
              {
                href: "/spf/multiple-spf-records-found",
                label: "Multiple SPF records found",
              },
              {
                href: "/spf/spf-permerror-too-many-dns-lookups",
                label: "SPF permerror: too many DNS lookups",
              },
              {
                href: "/spf/spf-softfail-explained",
                label: "SPF softfail explained",
              },
            ]}
          />

          <ProtocolCard
            title="DKIM"
            description="Signing, selector, and key-related issues."
            links={[
              {
                href: "/dkim/no-dkim-record-found",
                label: "No DKIM record found",
              },
              { href: "/dkim/invalid-dkim-key", label: "Invalid DKIM key" },
              {
                href: "/dkim/dkim-selector-not-found",
                label: "DKIM selector not found",
              },
            ]}
          />

          <ProtocolCard
            title="DMARC"
            description="Policy, alignment, and reporting issues."
            links={[
              {
                href: "/dmarc/no-dmarc-record-found",
                label: "No DMARC record found",
              },
              {
                href: "/dmarc/dmarc-alignment-failed",
                label: "DMARC alignment failed",
              },
              {
                href: "/dmarc/multiple-dmarc-records-found",
                label: "Multiple DMARC records found",
              },
            ]}
          />
        </div>
      </section>

      {/* HOW AUTHENTICATION WORKS */}
      <section className="container" style={{ paddingTop: 30 }}>
        <div
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: 14,
            background: "#fff",
            padding: 22,
          }}
        >
          <div className="prose" style={{ maxWidth: "none" }}>
            <h2 style={{ marginTop: 0 }}>How email authentication works</h2>

            <p>
              Modern email authentication relies on three protocols working
              together. <strong>SPF</strong> tells receiving servers which
              infrastructure is allowed to send mail for your domain.
              <strong> DKIM</strong> adds a cryptographic signature so receivers
              can verify that the message was not altered in transit.
              <strong> DMARC</strong> builds on top of SPF and DKIM by defining
              policy and alignment rules for messages that fail checks.
            </p>

            <p>
              When these records are configured correctly, mailbox providers can
              trust your email more easily. When they are missing or broken,
              legitimate messages often lose trust and drift toward spam.
            </p>

            <p>
              <Link href="/spf">SPF Hub</Link>
              {" · "}
              <Link href="/dkim">DKIM Hub</Link>
              {" · "}
              <Link href="/dmarc">DMARC Hub</Link>
            </p>
          </div>
        </div>
      </section>

      {/* TRUST BOX */}
      <section
        className="container"
        style={{ paddingTop: 26, paddingBottom: 26 }}
      >
        <div
          style={{
            background: "#f9fafb",
            border: "1px solid #e5e7eb",
            borderRadius: 14,
            padding: 20,
          }}
        >
          <div
            style={{
              fontSize: 18,
              fontWeight: 800,
              marginBottom: 10,
              color: "#111827",
            }}
          >
            Why teams use this checker
          </div>

          <ul
            style={{
              margin: 0,
              paddingLeft: 20,
              color: "#374151",
              lineHeight: 1.8,
              fontSize: 15,
            }}
          >
            <li>Live DNS lookup</li>
            <li>No login required</li>
            <li>Instant SPF, DKIM, DMARC diagnostics</li>
            <li>Clear troubleshooting guidance</li>
          </ul>
        </div>
      </section>

      {/* SEO / CTA SECTION */}
      <section className="container" style={{ paddingBottom: 60 }}>
        <div
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: 14,
            padding: 22,
            background: "#ffffff",
          }}
        >
          <h2 style={{ marginTop: 0 }}>Check SPF, DKIM and DMARC records</h2>

          <p>
            Email authentication is critical for modern email deliverability.
            Mail providers like Gmail, Microsoft and Yahoo expect domains to
            publish SPF, DKIM and DMARC records so they can verify that email
            messages are legitimate.
          </p>

          <p>
            This tool checks all three protocols using live DNS lookups and
            helps you quickly identify missing records, misconfigurations and
            alignment problems that may cause emails to land in spam.
          </p>

          <p>
            Start with the checker above, then use the protocol hubs for deeper
            troubleshooting and copy-paste record examples.
          </p>

          <p>
            <Link href="/spf">SPF Hub</Link>
            {" · "}
            <Link href="/dkim">DKIM Hub</Link>
            {" · "}
            <Link href="/dmarc">DMARC Hub</Link>
          </p>
        </div>
      </section>
    </>
  );
}

function ResultCard({
  title,
  status,
  value,
  hint,
  link,
}: {
  title: string;
  status: "pass" | "warn" | "fail";
  value: string;
  hint: string;
  link?: string;
}) {
  const pillLabel =
    status === "pass" ? "Pass" : status === "warn" ? "Warning" : "Issue";

  return (
    <article className="result-card">
      <div>
        <div className="result-title">{title}</div>
        <div className="result-value">{value}</div>
        <div className="result-desc">{hint}</div>
        {link && (
          <a
            href={link}
            style={{
              marginTop: 8,
              display: "inline-block",
              fontSize: 13,
              fontWeight: 600,
              color: "#2563eb",
            }}
          >
            Fix this →
          </a>
        )}
      </div>

      <div className={`status-pill status-${status}`}>{pillLabel}</div>
    </article>
  );
}

function MiniInfoCard({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #e5e7eb",
        borderRadius: 12,
        padding: 14,
      }}
    >
      <div
        style={{
          fontWeight: 800,
          fontSize: 14,
          marginBottom: 4,
          color: "#111827",
        }}
      >
        {title}
      </div>
      <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.6 }}>
        {text}
      </div>
    </div>
  );
}

type ProtocolLink = {
  href: string;
  label: string;
};

function ProtocolCard({
  title,
  description,
  links,
}: {
  title: string;
  description: string;
  links: ProtocolLink[];
}) {
  return (
    <article
      style={{
        background: "#fff",
        border: "1px solid #e5e7eb",
        borderRadius: 14,
        padding: 18,
      }}
    >
      <div style={{ fontWeight: 800, marginBottom: 4 }}>{title}</div>

      <div style={{ color: "#6b7280", fontSize: 14, marginBottom: 10 }}>
        {description}
      </div>

      <ul style={{ paddingLeft: 18 }}>
        {links.map((l) => (
          <li key={l.href} style={{ margin: "6px 0" }}>
            <Link href={l.href}>{l.label}</Link>
          </li>
        ))}
      </ul>
    </article>
  );
}
