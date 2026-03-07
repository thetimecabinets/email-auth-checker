"use client";

import Link from "next/link";
import { useState } from "react";

type Result = {
  spf: string | null;
  dkimDetected: boolean;
  dmarc: string | null;
};

export default function Home() {
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);

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

      setResult({
        spf: spfRes.spf ?? null,
        dkimDetected: Array.isArray(dkimRes.dkim) && dkimRes.dkim.length > 0,
        dmarc: dmarcRes.dmarc ?? null,
      });
    } catch {
      setError("Unable to run checks. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* HERO */}
      <section className="checker-hero" id="checker">
        <div className="checker-card">
          <h1 className="checker-title">Email Authentication Checker</h1>

          <p className="checker-subtitle">
            Instantly check SPF, DKIM and DMARC records for any domain. This
            tool runs a live DNS lookup and shows whether your email
            authentication is configured correctly.
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
            />

            <button type="submit" disabled={loading} className="domain-button">
              {loading ? "Checking…" : "Check domain"}
            </button>
          </form>

          {error && (
            <div
              style={{ marginTop: 12, color: "#b91c1c", fontSize: 14 }}
              role="alert"
            >
              {error}
            </div>
          )}

          {/* RESULTS */}
          {result && (
            <div className="results-grid" style={{ marginTop: 22 }}>
              <ResultCard
                title="SPF"
                status={result.spf ? "pass" : "fail"}
                value={result.spf || "No SPF record found"}
                hint="Controls which servers may send mail for your domain."
              />

              <ResultCard
                title="DKIM"
                status={result.dkimDetected ? "pass" : "warn"}
                value={
                  result.dkimDetected ? "DKIM detected" : "No DKIM detected"
                }
                hint="Cryptographic signing of outgoing mail."
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
                value={result.dmarc || "No DMARC record found"}
                hint="Policy for handling mail that fails SPF or DKIM."
              />
            </div>
          )}
        </div>
      </section>

      {/* COMMON ISSUES */}
      <section className="container" style={{ paddingTop: 34 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>
          Common email authentication issues
        </h2>

        <p
          style={{
            color: "#374151",
            lineHeight: 1.6,
            marginBottom: 16,
            maxWidth: "56ch",
          }}
        >
          These are the most common SPF, DKIM and DMARC problems we see when
          diagnosing email deliverability issues.
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
            description="Sender Policy Framework fixes."
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
            description="DomainKeys Identified Mail fixes."
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
            description="Domain-based authentication policy."
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

      {/* SEO SECTION */}
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
            Learn more in the protocol hubs:
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
}: {
  title: string;
  status: "pass" | "warn" | "fail";
  value: string;
  hint: string;
}) {
  const pillLabel =
    status === "pass" ? "Pass" : status === "warn" ? "Warning" : "Issue";

  return (
    <article className="result-card">
      <div>
        <div className="result-title">{title}</div>
        <div className="result-value">{value}</div>
        <div className="result-desc">{hint}</div>
      </div>

      <div className={`status-pill status-${status}`}>{pillLabel}</div>
    </article>
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