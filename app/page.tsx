"use client";

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
    if (!domain) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const [spfRes, dkimRes, dmarcRes] = await Promise.all([
        fetch(`/api/spf?domain=${domain}`).then((r) => r.json()),
        fetch(`/api/dkim?domain=${domain}`).then((r) => r.json()),
        fetch(`/api/dmarc?domain=${domain}`).then((r) => r.json()),
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
    <main style={styles.page}>
      {/* HERO */}
      <section style={styles.hero}>
        <h1 style={styles.title}>Email Authentication Checker</h1>
        <p style={styles.subtitle}>
          Instantly check SPF, DKIM, and DMARC records for any domain.
        </p>

        <form onSubmit={runCheck} style={styles.form}>
          <input
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="example.com"
            style={styles.input}
          />
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Checking…" : "Check domain"}
          </button>
        </form>

        {error && <div style={styles.error}>{error}</div>}
      </section>

      {/* RESULTS */}
      {result && (
        <section style={styles.results}>
          <Card
            title="SPF"
            status={result.spf ? "ok" : "error"}
            value={result.spf || "No SPF record found"}
            hint="Controls which servers may send mail for your domain."
          />
          <Card
            title="DKIM"
            status={result.dkimDetected ? "ok" : "warning"}
            value={result.dkimDetected ? "DKIM detected" : "No DKIM detected"}
            hint="Cryptographic signing of outgoing mail."
          />
          <Card
            title="DMARC"
            status={
              result.dmarc?.includes("p=reject")
                ? "ok"
                : result.dmarc
                ? "warning"
                : "error"
            }
            value={result.dmarc || "No DMARC record found"}
            hint="Policy for handling mail that fails SPF or DKIM."
          />
        </section>
      )}
    </main>
  );
}

function Card({
  title,
  status,
  value,
  hint,
}: {
  title: string;
  status: "ok" | "warning" | "error";
  value: string;
  hint: string;
}) {
  const badge = status === "ok" ? "✅" : status === "warning" ? "⚠️" : "❌";

  return (
    <div style={styles.card}>
      <div style={styles.cardHeader}>
        <strong>{title}</strong> <span>{badge}</span>
      </div>
      <div style={styles.value}>{value}</div>
      <div style={styles.hint}>{hint}</div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "calc(100vh - 160px)", // pushes footer down
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    paddingTop: 64,
    paddingBottom: 64,
  },
  hero: {
    maxWidth: 720,
    margin: "0 auto",
    textAlign: "center",
    padding: "48px 24px",
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: 12,
  },
  title: {
    fontSize: 36,
    fontWeight: 700,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: "#4b5563",
    marginBottom: 32,
  },
  form: {
    display: "flex",
    gap: 12,
    justifyContent: "center",
    flexWrap: "wrap",
  },
  input: {
    flex: "1 1 320px",
    padding: 14,
    fontSize: 16,
    borderRadius: 6,
    border: "1px solid #d1d5db",
  },
  button: {
    padding: "14px 20px",
    fontSize: 16,
    background: "#E0B100", // MUSTARD
    color: "#111827",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontWeight: 600,
  },
  error: {
    marginTop: 16,
    color: "#b91c1c",
    fontSize: 14,
  },
  results: {
    maxWidth: 720,
    margin: "48px auto 0",
    display: "grid",
    gap: 16,
    padding: "0 24px",
  },
  card: {
    border: "1px solid #e5e7eb",
    borderRadius: 8,
    padding: 16,
    background: "#ffffff",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  value: {
    fontSize: 14,
    color: "#111827",
  },
  hint: {
    marginTop: 6,
    fontSize: 13,
    color: "#6b7280",
  },
};
