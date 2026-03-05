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
      {/* HERO / TOOL */}
      <section className="checker-hero">
        <div className="checker-card">
          <h1 className="checker-title">Email Authentication Checker</h1>
          <p className="checker-subtitle">
            Instantly check SPF, DKIM, and DMARC records for any domain. Built
            for fast triage by founders and IT teams.
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
        </div>
      </section>

      {/* RESULTS */}
      {result && (
        <section className="results-grid" aria-label="Results">
          <ResultCard
            title="SPF"
            status={result.spf ? "pass" : "fail"}
            value={result.spf || "No SPF record found"}
            hint="Controls which servers may send mail for your domain."
          />

          <ResultCard
            title="DKIM"
            status={result.dkimDetected ? "pass" : "warn"}
            value={result.dkimDetected ? "DKIM detected" : "No DKIM detected"}
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
        </section>
      )}

      {/* EXPLANATION (CENTERED under tool + same width as checker) */}
      <section
        className="container"
        style={{
          paddingTop: 34,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div className="prose" style={{ width: "100%" }}>
          <h2>How SPF, DKIM and DMARC work together</h2>
          <p>
            SPF tells receiving servers which IPs and services are allowed to
            send email for your domain. DKIM signs each message so receivers can
            verify that the content was not altered in transit. DMARC sits on
            top and defines what should happen when SPF or DKIM fail – monitor,
            send to spam, or reject entirely.
          </p>
          <p>
            Use the checker above to see at a glance whether these three
            protocols are present and healthy for any domain before you start
            debugging deliverability issues.
          </p>
        </div>
      </section>

      {/* PROTOCOL CARDS */}
      <section className="container" style={{ paddingTop: 26 }}>
        <div
          style={{
            display: "grid",
            gap: 14,
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          }}
        >
          <ProtocolCard
            title="SPF"
            description="Check and repair common SPF issues."
            links={[
              { href: "/spf/no-spf-record-found", label: "No SPF record" },
              {
                href: "/spf/spf-permerror-too-many-dns-lookups",
                label: "SPF permerror",
              },
              {
                href: "/spf/multiple-spf-records-found",
                label: "Multiple SPF records",
              },
            ]}
          />
          <ProtocolCard
            title="DKIM"
            description="Stabilise DKIM keys and selectors."
            links={[
              { href: "/dkim/no-dkim-record-found", label: "No DKIM record" },
              {
                href: "/dkim/dkim-selector-not-found",
                label: "DKIM selector not found",
              },
              { href: "/dkim/invalid-dkim-key", label: "Invalid DKIM key" },
            ]}
          />
          <ProtocolCard
            title="DMARC"
            description="Control how receivers handle failures."
            links={[
              { href: "/dmarc/no-dmarc-record-found", label: "No DMARC record" },
              {
                href: "/dmarc/dmarc-alignment-failed",
                label: "DMARC alignment failed",
              },
              {
                href: "/dmarc/multiple-dmarc-records-found",
                label: "Multiple DMARC records",
              },
            ]}
          />
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
  const pillClass =
    status === "pass"
      ? "status-pill status-pass"
      : status === "warn"
      ? "status-pill status-warn"
      : "status-pill status-fail";

  const pillLabel =
    status === "pass" ? "Pass" : status === "warn" ? "Warning" : "Issue";

  return (
    <article className="result-card">
      <div className="result-left">
        <div className="result-title">{title}</div>
        <div className="result-value">{value}</div>
        <div className="result-desc">{hint}</div>
      </div>

      <div className={pillClass}>{pillLabel}</div>
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