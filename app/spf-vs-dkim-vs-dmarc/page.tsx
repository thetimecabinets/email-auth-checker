// app/spf-vs-dkim-vs-dmarc/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

import { BASE_URL } from "@/app/lib/metadata";

const PAGE_PATH = "/spf-vs-dkim-vs-dmarc";

export const metadata: Metadata = {
  title: "SPF vs DKIM vs DMARC: What Each One Does (2026)",
  description:
    "Compare SPF, DKIM, and DMARC in one place. See what each protocol checks, how they differ, and how to combine them into a practical email authentication strategy.",
  alternates: {
    canonical: `${BASE_URL}${PAGE_PATH}`,
  },
};

export default function SPFvsDKIMvsDMARCPage() {
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
            <h1 style={{ marginTop: 0 }}>SPF vs DKIM vs DMARC (2026)</h1>

            <p>
              SPF, DKIM, and DMARC are often mentioned together, but they solve
              different parts of the email trust problem. Understanding where
              they overlap—and where they do not—helps you design a setup that
              is both effective and easier to maintain.
            </p>

            <p>
              This page gives you a side‑by‑side view: what each protocol checks,
              how it behaves with forwarding, and how they combine into a
              workable authentication strategy rather than three separate
              checkboxes.
            </p>

            <section style={{ margin: "32px 0" }}>
              <h2>Test your domain setup</h2>
              <p>
                See which authentication method is working and what needs fixing.
              </p>
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
            <h2>SPF in two sentences</h2>
            <p>
              SPF authorizes sending infrastructure and is often where{" "}
              <Link href="/spf/spf-record-syntax-error">SPF errors</Link> first
              show up when a record is misconfigured. It tells receivers which
              IPs or providers are allowed to send on behalf of a domain and
              fails when a message comes from somewhere else or your policy
              triggers{" "}
              <Link href="/spf/spf-permerror-too-many-dns-lookups">
                too many DNS lookups
              </Link>
              .
            </p>

            <h2>DKIM in two sentences</h2>
            <p>
              DKIM signs messages with a private key so receivers can verify
              that the{" "}
              <Link href="/dkim/dkim-signature-explained">DKIM signature</Link>{" "}
              matches a domain that published the matching public key. When the
              key is broken or rotated incorrectly, you may see an{" "}
              <Link href="/dkim/invalid-dkim-key">invalid DKIM key</Link> even
              though mail is still sending. It focuses on message integrity and
              the identity of the signer, not on the IP alone.
            </p>

            <h2>DMARC in two sentences</h2>
            <p>
              DMARC tells receivers how to handle mail when SPF and/or DKIM do
              not align with the visible From domain. It adds policy and
              reporting on top of the raw authentication results, using the{" "}
              <Link href="/dmarc/no-dmarc-record-found">DMARC record</Link> you
              publish to decide where{" "}
              <Link href="/dmarc/dmarc-aggregate-reports-explained">
                DMARC reports
              </Link>{" "}
              should be sent and how strictly to treat failures.
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
            <h2>Key differences</h2>
            <ul>
              <li>
                SPF cares about the sending server&apos;s IP; DKIM cares about the
                signer&apos;s domain and message integrity; DMARC cares about
                alignment and policy.
              </li>
              <li>
                SPF can break when mail is forwarded through systems you do not
                control; DKIM is more resilient to forwarding but sensitive to
                body changes; DMARC interprets both results through an alignment
                lens.
              </li>
              <li>
                SPF and DKIM are low‑level checks; DMARC is the higher‑level rule
                set that connects those checks to your brand and requested
                handling.
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
            overflowX: "auto",
            boxShadow: "0 1px 0 rgba(0,0,0,0.02)",
          }}
        >
          <div className="prose" style={{ maxWidth: "100%" }}>
            <h2>Comparison table</h2>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: 14,
              }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      borderBottom: "1px solid #e5e7eb",
                      textAlign: "left",
                      padding: "8px 6px",
                    }}
                  >
                    Feature
                  </th>
                  <th
                    style={{
                      borderBottom: "1px solid #e5e7eb",
                      textAlign: "left",
                      padding: "8px 6px",
                    }}
                  >
                    SPF
                  </th>
                  <th
                    style={{
                      borderBottom: "1px solid #e5e7eb",
                      textAlign: "left",
                      padding: "8px 6px",
                    }}
                  >
                    DKIM
                  </th>
                  <th
                    style={{
                      borderBottom: "1px solid #e5e7eb",
                      textAlign: "left",
                      padding: "8px 6px",
                    }}
                  >
                    DMARC
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td
                    style={{
                      borderBottom: "1px solid #f3f4f6",
                      padding: "8px 6px",
                    }}
                  >
                    What it checks
                  </td>
                  <td
                    style={{
                      borderBottom: "1px solid #f3f4f6",
                      padding: "8px 6px",
                    }}
                  >
                    Sending IP and authorized hosts
                  </td>
                  <td
                    style={{
                      borderBottom: "1px solid #f3f4f6",
                      padding: "8px 6px",
                    }}
                  >
                    Message integrity and signing domain
                  </td>
                  <td
                    style={{
                      borderBottom: "1px solid #f3f4f6",
                      padding: "8px 6px",
                    }}
                  >
                    Policy, alignment, and how to treat failures
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      borderBottom: "1px solid #f3f4f6",
                      padding: "8px 6px",
                    }}
                  >
                    Breaks on forwarding
                  </td>
                  <td
                    style={{
                      borderBottom: "1px solid #f3f4f6",
                      padding: "8px 6px",
                    }}
                  >
                    Often, because the forwarding server&apos;s IP is not listed
                  </td>
                  <td
                    style={{
                      borderBottom: "1px solid #f3f4f6",
                      padding: "8px 6px",
                    }}
                  >
                    Usually no, unless the body or signed headers are modified
                  </td>
                  <td
                    style={{
                      borderBottom: "1px solid #f3f4f6",
                      padding: "8px 6px",
                    }}
                  >
                    Depends on whether SPF or DKIM still pass in alignment
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      borderBottom: "1px solid #f3f4f6",
                      padding: "8px 6px",
                    }}
                  >
                    Visible to end user
                  </td>
                  <td
                    style={{
                      borderBottom: "1px solid #f3f4f6",
                      padding: "8px 6px",
                    }}
                  >
                    No, lives in DNS and server logs
                  </td>
                  <td
                    style={{
                      borderBottom: "1px solid #f3f4f6",
                      padding: "8px 6px",
                    }}
                  >
                    No, signature is in headers
                  </td>
                  <td
                    style={{
                      borderBottom: "1px solid #f3f4f6",
                      padding: "8px 6px",
                    }}
                  >
                    Indirectly, via how providers label and route mail
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      borderBottom: "1px solid #f3f4f6",
                      padding: "8px 6px",
                    }}
                  >
                    Configuration surface
                  </td>
                  <td
                    style={{
                      borderBottom: "1px solid #f3f4f6",
                      padding: "8px 6px",
                    }}
                  >
                    DNS TXT record listing includes and IPs
                  </td>
                  <td
                    style={{
                      borderBottom: "1px solid #f3f4f6",
                      padding: "8px 6px",
                    }}
                  >
                    DNS selector record with public key
                  </td>
                  <td
                    style={{
                      borderBottom: "1px solid #f3f4f6",
                      padding: "8px 6px",
                    }}
                  >
                    DNS TXT record with policy and reporting settings
                  </td>
                </tr>
              </tbody>
            </table>
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
            <h2>How SPF, DKIM, and DMARC work together</h2>
            <p>
              In a healthy setup, SPF and DKIM do the low‑level work and DMARC
              interprets their results. SPF and DKIM answer the &quot;how was
              this message sent and signed?&quot; questions; DMARC answers
              &quot;does this align with the brand the user sees, and what do we
              want providers to do when it does not?&quot;
            </p>
            <p>
              Practically, this means you want SPF and DKIM passing and aligned
              for your real senders before you ask DMARC to quarantine or reject
              anything. Otherwise, DMARC will enforce on top of a shaky
              foundation.
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
            <h2>Which one is most important?</h2>
            <p>
              On paper, you could run only SPF or only DKIM, but modern
              deliverability expectations assume all three. SPF alone does not
              survive forwarding well. DKIM alone does not tell providers what
              to do when something looks wrong. DMARC alone cannot function if
              SPF and DKIM are absent or misconfigured.
            </p>
            <p>
              The more realistic answer is: SPF, DKIM, and DMARC are each
              important in different ways, and skipping one usually shows up as
              friction later. If you have to prioritize, start with a clean SPF
              record and working DKIM for your core senders, then add DMARC
              monitoring and gradually move toward enforcement.
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
            <h2>Real‑world setup example</h2>
            <p>
              Imagine a company that uses a primary mailbox provider, a product
              notification system, and a marketing platform. SPF should include
              all three senders in a single record. Each system should sign
              outbound mail with DKIM using a selector you control. DMARC should
              be set to <code>p=none</code> with reporting enabled while you
              confirm that reports look clean.
            </p>
            <p>
              Over time, as you gain confidence that only abuse is failing, you
              move DMARC to quarantine and eventually reject. Throughout that
              journey, the{" "}
              <Link href="/spf">SPF</Link>,{" "}
              <Link href="/dkim">DKIM</Link>, and{" "}
              <Link href="/dmarc">DMARC</Link> hubs in this project provide
              focused guidance on specific issues that show up in reports.
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
            <h2>Common misconceptions</h2>
            <ul>
              <li>
                <strong>&quot;SPF is enough.&quot;</strong> SPF helps, but
                forwarding, mailing lists, and shared infrastructure limit how
                far it can go on its own.
              </li>
              <li>
                <strong>&quot;DKIM guarantees inbox placement.&quot;</strong>{" "}
                DKIM is a strong signal, not a magic pass. Content, reputation,
                and sending behavior still matter.
              </li>
              <li>
                <strong>&quot;DMARC reject will instantly fix spoofing.&quot;</strong>{" "}
                It reduces some forms of spoofing but does not stop look‑alike
                domains or abuse through unrelated infrastructure.
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
            <h2>SPF problems to check first</h2>
            <p>
              If the sending server is not properly authorised, SPF is usually
              the first place to investigate:
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
            <h2>DKIM problems to check first</h2>
            <p>
              If messages are signed incorrectly or the DNS key cannot be found,
              DKIM verification will fail:
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
            <h2>DMARC problems to check first</h2>
            <p>
              If SPF and DKIM are not producing aligned results, DMARC is where
              policy and enforcement issues show up:
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