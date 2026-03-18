// app/email-authentication-explained/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

import { BASE_URL } from "@/app/lib/metadata";

const PAGE_PATH = "/email-authentication-explained";

export const metadata: Metadata = {
  title: "Email Authentication Explained: SPF, DKIM, DMARC (2026)",
  description:
    "Understand SPF, DKIM, and DMARC in plain language. Learn why email authentication exists, how it prevents spoofing, and what a healthy setup looks like in 2026.",
  alternates: {
    canonical: `${BASE_URL}${PAGE_PATH}`,
  },
};

export default function EmailAuthenticationExplainedPage() {
  return (
    <main style={{ padding: "36px 0 64px" }}>
      <div className="container">
        <section
          style={{
            border: "1px solid #e5e7eb",
            background: "#ffffff",
            borderRadius: 14,
            padding: 24,
            boxShadow: "0 1px 0 rgba(0,0,0,0.02)",
          }}
        >
          <div className="prose">
            <h1 style={{ marginTop: 0 }}>Email Authentication Explained (2026)</h1>

            <p>
              Email authentication is a set of technical checks that help mailbox
              providers decide whether a message really comes from the domain it
              claims to use. Instead of trusting the visible From address alone,
              receivers look at DNS records and cryptographic signatures to
              verify who sent the message and whether it was changed in transit.
            </p>

            <p>
              Three protocols do most of the heavy lifting:{" "}
              <Link href="/spf">SPF</Link>,{" "}
              <Link href="/dkim">DKIM</Link>, and{" "}
              <Link href="/dmarc">DMARC</Link>. Each solves a different problem,
              and a healthy setup combines all three into one story that mail
              providers can trust.
            </p>

            <section style={{ margin: "32px 0" }}>
              <h2>Check your email authentication</h2>
              <p>Run a quick check for SPF, DKIM, and DMARC on your domain.</p>
              <Link
                href="/"
                style={{
                  display: "inline-block",
                  background: "#eab308",
                  color: "#111827",
                  fontWeight: 700,
                  padding: "14px 22px",
                  borderRadius: 12,
                  textDecoration: "none",
                  marginTop: 12,
                }}
              >
                Run email authentication check
              </Link>
              <span style={{ marginLeft: 12, color: "#6b7280" }}>
                SPF, DKIM and DMARC analysis
              </span>
            </section>
          </div>
        </section>

        <section
          style={{
            border: "1px solid #e5e7eb",
            background: "#ffffff",
            borderRadius: 14,
            padding: 24,
            marginTop: 24,
            boxShadow: "0 1px 0 rgba(0,0,0,0.02)",
          }}
        >
          <div className="prose">
            <h2>Why spoofing is possible without authentication</h2>
            <p>
              The email protocol was designed decades ago, when most traffic
              flowed between trusted systems. The From address you see in the
              client is simply a header field; nothing in the original design
              stops someone from writing{" "}
              <code>From: billing@yourbrand.com</code> even if they do not own
              the domain.
            </p>
            <p>
              Without authentication, receivers have to guess which mail is
              legitimate based on content, IP reputation, and user behavior. That
              guess is error‑prone. Attackers use look‑alike domains, free
              infrastructure, and copied branding to send mail that looks close
              enough to the real thing. Authentication gives mailbox providers a
              stronger way to distinguish real mail from convincing fakes.
            </p>
          </div>
        </section>

        <section
          style={{
            border: "1px solid #e5e7eb",
            background: "#ffffff",
            borderRadius: 14,
            padding: 24,
            marginTop: 24,
            boxShadow: "0 1px 0 rgba(0,0,0,0.02)",
          }}
        >
          <div className="prose">
            <h2>How SPF works (the short version)</h2>
            <p>
              Sender Policy Framework (SPF) answers a simple question: &quot;Is
              this server allowed to send mail for this domain?&quot; You publish
              an{" "}
              <Link href="/spf/no-spf-record-found">SPF record</Link> in DNS
              listing the IPs and providers that are allowed to send on your
              behalf, and avoid publishing{" "}
              <Link href="/spf/multiple-spf-records-found">
                multiple SPF records
              </Link>{" "}
              for the same domain. When a message arrives, the receiver checks
              the connecting IP against that list.
            </p>
            <p>
              If the IP is listed, SPF passes. If it is not, SPF fails or
              soft‑fails, depending on how the record is written. SPF does not
              look at the message body or attachments; it focuses on the
              relationship between the connecting server and the domain.
            </p>
            <p>
              The{" "}
              <Link href="/spf">
                SPF hub
              </Link>{" "}
              in this project goes deeper into DNS syntax and the lookup limits
              that can cause permerrors, but for a mental model, think of SPF as
              your &quot;approved sending infrastructure&quot; list.
            </p>
          </div>
        </section>

        <section
          style={{
            border: "1px solid #e5e7eb",
            background: "#ffffff",
            borderRadius: 14,
            padding: 24,
            marginTop: 24,
            boxShadow: "0 1px 0 rgba(0,0,0,0.02)",
          }}
        >
          <div className="prose">
            <h2>How DKIM works (signing messages)</h2>
            <p>
              DomainKeys Identified Mail (DKIM) attaches a cryptographic
              signature to each message. Your sending platform signs selected
              headers and the body with a private key. The corresponding public
              key is published in DNS under a{" "}
              <Link href="/dkim/dkim-selector-not-found">DKIM selector</Link>{" "}
              record, and if the{" "}
              <Link href="/dkim/no-dkim-record-found">DKIM record</Link> is
              missing or mismatched, receivers cannot validate those
              signatures.
            </p>
            <p>
              When a receiver gets the message, it looks up the selector, pulls
              the public key from DNS, and verifies the signature. If the body
              or signed headers were changed in transit, the signature check
              fails. DKIM therefore tells receivers two things: which domain
              signed the message, and whether the signed content was modified.
            </p>
            <p>
              The{" "}
              <Link href="/dkim">
                DKIM hub
              </Link>{" "}
              in this app covers selectors, key length, and how to diagnose
              common problems like missing keys or body hash mismatches.
            </p>
          </div>
        </section>

        <section
          style={{
            border: "1px solid #e5e7eb",
            background: "#ffffff",
            borderRadius: 14,
            padding: 24,
            marginTop: 24,
            boxShadow: "0 1px 0 rgba(0,0,0,0.02)",
          }}
        >
          <div className="prose">
            <h2>How DMARC ties everything together</h2>
            <p>
              DMARC is the policy layer that sits on top of SPF and DKIM. It
              lets a domain owner publish a{" "}
              <Link href="/dmarc/dmarc-policy-none-vs-quarantine-vs-reject">
                DMARC policy
              </Link>{" "}
              in DNS that says, in effect: &quot;If neither SPF nor DKIM passes
              in{" "}
              <Link href="/dmarc/dmarc-alignment-failed">alignment</Link> with
              my domain, here is how I want you to treat the message.&quot;
            </p>
            <p>
              The DMARC record can request monitoring only (<code>p=none</code>),
              quarantine (send to spam), or reject (block outright). It also
              tells receivers where to send XML reports summarizing how mail
              using your domain is authenticated across the internet.
            </p>
            <p>
              The{" "}
              <Link href="/dmarc">
                DMARC hub
              </Link>{" "}
              explains how to read those reports and how to move from monitoring
              to enforcement without accidentally blocking legitimate traffic.
            </p>
          </div>
        </section>

        <section
          style={{
            border: "1px solid #e5e7eb",
            background: "#ffffff",
            borderRadius: 14,
            padding: 24,
            marginTop: 24,
            boxShadow: "0 1px 0 rgba(0,0,0,0.02)",
          }}
        >
          <div className="prose">
            <h2>What “alignment” means</h2>
            <p>
              Alignment is DMARC&apos;s way of making sure authentication results
              apply to the domain users actually see. A message might pass SPF
              for <code>mail.example.net</code> while the From address shows{" "}
              <code>example.com</code>. Without alignment, an attacker could sign
              with a different but related domain and still benefit from your
              reputation.
            </p>
            <p>
              In relaxed alignment, subdomains of the organizational domain are
              considered a match. In strict alignment, the domains must match
              exactly. DMARC considers alignment separately for SPF and DKIM and
              passes if at least one aligned method passes.
            </p>
          </div>
        </section>

        <section
          style={{
            border: "1px solid #e5e7eb",
            background: "#ffffff",
            borderRadius: 14,
            padding: 24,
            marginTop: 24,
            boxShadow: "0 1px 0 rgba(0,0,0,0.02)",
          }}
        >
          <div className="prose">
            <h2>What a healthy setup looks like</h2>
            <p>
              In a healthy deployment, every legitimate sender for your domain
              is covered by SPF and DKIM, and DMARC is set to at least monitor
              with aggregate reports going to an address you review. Over time
              you move to quarantine and then reject once you are confident
              everything that should pass does pass.
            </p>
            <p>
              A simple mental checklist:
            </p>
            <ul>
              <li>
                Every system that sends as your domain is known and documented.
              </li>
              <li>
                Each sender has a valid SPF entry and a working DKIM selector.
              </li>
              <li>
                DMARC is configured with a policy and a reporting address.
              </li>
              <li>
                Aggregate reports show that failures are mostly abuse, not your
                own traffic.
              </li>
            </ul>
          </div>
        </section>

        <section
          style={{
            border: "1px solid #e5e7eb",
            background: "#ffffff",
            borderRadius: 14,
            padding: 24,
            marginTop: 24,
            boxShadow: "0 1px 0 rgba(0,0,0,0.02)",
          }}
        >
          <div className="prose">
            <h2>Common mistakes</h2>
            <ul>
              <li>Publishing multiple SPF records instead of one merged policy.</li>
              <li>
                Never enabling DKIM in the sending platform or forgetting to
                publish the key in DNS.
              </li>
              <li>
                Turning DMARC straight to reject without a monitoring phase.
              </li>
              <li>
                Ignoring aggregate reports and assuming &quot;no news is good
                news.&quot;
              </li>
              <li>
                Letting old marketing or transactional systems keep sending after
                they have been replaced, making the setup confusing to reason
                about.
              </li>
            </ul>
          </div>
        </section>

        <section
          style={{
            border: "1px solid #e5e7eb",
            background: "#ffffff",
            borderRadius: 14,
            padding: 24,
            marginTop: 24,
            boxShadow: "0 1px 0 rgba(0,0,0,0.02)",
          }}
        >
          <div className="prose">
            <h2>Why this matters for deliverability and trust</h2>
            <p>
              Mailbox providers reward domains that behave predictably. A clean,
              well‑monitored authentication setup makes it easier for them to let
              your legitimate traffic through while blocking abuse. Conversely,
              gaps in SPF, DKIM, or DMARC make it harder to distinguish your
              product mail from someone else&apos;s phishing campaign.
            </p>
            <p>
              Getting the foundations right is not about chasing every tiny
              optimization. It is about having a simple, documented model of who
              is allowed to send and how that permission is expressed in DNS and
              signatures. Once that is in place, troubleshooting individual
              errors becomes much more manageable.
            </p>
          </div>
        </section>

        <section
          style={{
            border: "1px solid #e5e7eb",
            background: "#ffffff",
            borderRadius: 14,
            padding: 24,
            marginTop: 24,
            boxShadow: "0 1px 0 rgba(0,0,0,0.02)",
          }}
        >
          <div className="prose">
            <h2>Common SPF issues</h2>
            <p>
              If SPF is misconfigured, mail can fail authentication even when
              the sender is legitimate. Start with these common checks:
            </p>
            <ul>
              <li>
                <Link href="/spf/no-spf-record-found">No SPF record found</Link>
              </li>
              <li>
                <Link href="/spf/multiple-spf-records-found">
                  Multiple SPF records found
                </Link>
              </li>
              <li>
                <Link href="/spf/spf-permerror-too-many-dns-lookups">
                  SPF permerror: too many DNS lookups
                </Link>
              </li>
            </ul>
          </div>
        </section>

        <section
          style={{
            border: "1px solid #e5e7eb",
            background: "#ffffff",
            borderRadius: 14,
            padding: 24,
            marginTop: 24,
            boxShadow: "0 1px 0 rgba(0,0,0,0.02)",
          }}
        >
          <div className="prose">
            <h2>Common DKIM issues</h2>
            <p>
              DKIM problems usually come from missing selectors, broken keys, or
              alignment mistakes. These are good starting points:
            </p>
            <ul>
              <li>
                <Link href="/dkim/no-dkim-record-found">
                  No DKIM record found
                </Link>
              </li>
              <li>
                <Link href="/dkim/dkim-selector-not-found">
                  DKIM selector not found
                </Link>
              </li>
              <li>
                <Link href="/dkim/dkim-alignment-failed">
                  DKIM alignment failed
                </Link>
              </li>
            </ul>
          </div>
        </section>

        <section
          style={{
            border: "1px solid #e5e7eb",
            background: "#ffffff",
            borderRadius: 14,
            padding: 24,
            marginTop: 24,
            boxShadow: "0 1px 0 rgba(0,0,0,0.02)",
          }}
        >
          <div className="prose">
            <h2>Common DMARC issues</h2>
            <p>
              DMARC often fails because no policy exists yet or because SPF and
              DKIM are not aligned with the visible From domain:
            </p>
            <ul>
              <li>
                <Link href="/dmarc/no-dmarc-record-found">
                  No DMARC record found
                </Link>
              </li>
              <li>
                <Link href="/dmarc/dmarc-alignment-failed">
                  DMARC alignment failed
                </Link>
              </li>
              <li>
                <Link href="/dmarc/dmarc-policy-none-vs-quarantine-vs-reject">
                  DMARC policy: none vs quarantine vs reject
                </Link>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}