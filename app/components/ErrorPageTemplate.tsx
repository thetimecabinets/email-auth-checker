import Link from "next/link";
import CodeBlock from "@/app/components/CodeBlock";
import {
  getClusterByHubHref,
  getRelatedLinks,
  getExploreLinks,
} from "@/app/data/internalLinks";
import type { ErrorPageData } from "@/app/types/errorPage";
import SPFMergeTool from "@/app/components/tools/SPFMergeTool";
import SPFLookupChecker from "@/app/components/tools/SPFLookupChecker";
import DMARCGenerator from "@/app/components/tools/DMARCGenerator";

const MAX_EXPLORE_LINKS = 6;
const MAX_RELATED_LINKS = 5;
const BASE_URL = "https://emaildnscheck.com";

export default function ErrorPageTemplate(
  data: ErrorPageData & { pathname?: string }
) {
  const pathname = data.pathname || "";

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${BASE_URL}/`,
      },
      ...(data.hub
        ? [
            {
              "@type": "ListItem" as const,
              position: 2,
              name: data.hub.label,
              item: `${BASE_URL}${data.hub.href}`,
            },
          ]
        : []),
      {
        "@type": "ListItem" as const,
        position: data.hub ? 3 : 2,
        name: data.title,
        item: `${BASE_URL}${pathname}`,
      },
    ],
  };

  const techArticleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: data.title,
    description: data.intro,
    mainEntityOfPage: `${BASE_URL}${pathname}`,
    publisher: {
      "@type": "Organization",
      name: "Email DNS Check",
      url: BASE_URL,
    },
  };

  const faqSchema =
    data.faq && data.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: data.faq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }
      : null;

  const cluster = getClusterByHubHref(data.hub?.href ?? "");
  const visibleRelatedLinks =
    cluster.length > 0
      ? getRelatedLinks(cluster, pathname, MAX_RELATED_LINKS)
      : data.related?.slice(0, MAX_RELATED_LINKS) ?? [];
  const visibleExploreLinks =
    cluster.length > 0
      ? getExploreLinks(cluster, {
          limit: MAX_EXPLORE_LINKS,
          excludePathname: pathname,
        })
      : [];

  const contextualLink = getContextualLink(data.hub?.href, pathname);

  return (
    <main style={styles.wrapper}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <section style={styles.card}>
        <h1 style={styles.title}>{data.title}</h1>

        <p style={styles.subtitle}>
          {data.intro}
          {renderIntroLinks(data.hub?.href)}
        </p>
        <p style={styles.updated}>
          Updated for 2026 to reflect current Gmail, Outlook, and Yahoo
          behavior.
        </p>

        {contextualLink}

        <div style={styles.infoBox}>
          <p style={styles.text}>
            Learn the bigger picture in our{" "}
            <Link href="/email-authentication-explained">
              Email Authentication Explained guide
            </Link>{" "}
            and compare{" "}
            <Link href="/spf-vs-dkim-vs-dmarc">
              SPF vs DKIM vs DMARC
            </Link>{" "}
            to understand how these protocols work together.
          </p>
        </div>

        {data.quickPoints && data.quickPoints.length > 0 && (
          <div style={styles.quickBox}>
            <h2 style={styles.sectionTitle}>Quick answer</h2>
            <ul style={styles.list}>
              {data.quickPoints.slice(0, 5).map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>
        )}

        <div style={styles.fixBox}>
          <h2 style={styles.sectionTitle}>{data.fixTitle}</h2>

          <p style={styles.text}>{data.fixText}</p>

          {data.code && (
            <CodeBlock
              title={data.codeTitle || "Example record"}
              language={data.codeLanguage || "TXT"}
              code={data.code}
            />
          )}

          {data.afterCodeText && (
            <p style={styles.text}>{data.afterCodeText}</p>
          )}

          <Link href="/" style={styles.button}>
            Run free check
          </Link>
          <p style={styles.trust}>Free live DNS check. No signup required.</p>
        </div>

        {data.verifySteps && data.verifySteps.length > 0 && (
          <div style={styles.infoBox}>
            <h2 style={styles.sectionTitle}>Verify the fix</h2>
            <p style={styles.text}>
              After applying the fix, confirm everything works correctly:
            </p>
            <ol style={styles.list}>
              {data.verifySteps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
        )}

        {pathname === "/spf/multiple-spf-records-found" ||
        pathname === "/spf/spf-permerror-too-many-dns-lookups" ||
        pathname === "/spf/spf-record-generator" ||
        pathname === "/spf/sendgrid-spf-not-working" ? (
          <div style={{ marginTop: 24 }}>
            <h2 style={styles.sectionTitle}>Fix it instantly</h2>
            <p style={styles.text}>
              Paste your SPF records and merge them into one valid SPF policy.
            </p>
            <SPFMergeTool />
          </div>
        ) : null}

        {pathname === "/spf/spf-lookup-checker" && <SPFLookupChecker />}

        {pathname === "/dmarc/dmarc-generator" && (
          <div style={{ marginTop: 24 }}>
            <h2 style={styles.sectionTitle}>Generate a DMARC record</h2>
            <p style={styles.text}>
              Choose your DMARC policy, reporting mailboxes, and alignment
              strategy, then copy the generated TXT value into DNS.
            </p>
            <DMARCGenerator />
          </div>
        )}

        {(data.wrongExampleCode || data.correctExampleCode) && (
          <div style={styles.infoBox}>
            <h2 style={styles.sectionTitle}>Wrong vs correct setup</h2>

            {data.wrongExampleCode && (
              <div style={styles.exampleBlock}>
                <h3 style={styles.exampleTitle}>
                  {data.wrongExampleTitle || "Wrong setup"}
                </h3>

                <CodeBlock
                  title={data.wrongExampleTitle || "Wrong setup"}
                  language={data.wrongExampleLanguage || "DNS TXT"}
                  code={data.wrongExampleCode}
                />

                {data.wrongExampleText && (
                  <p style={styles.text}>{data.wrongExampleText}</p>
                )}
              </div>
            )}

            {data.correctExampleCode && (
              <div style={styles.exampleBlock}>
                <h3 style={styles.exampleTitle}>
                  {data.correctExampleTitle || "Correct setup"}
                </h3>

                <CodeBlock
                  title={data.correctExampleTitle || "Correct setup"}
                  language={data.correctExampleLanguage || "DNS TXT"}
                  code={data.correctExampleCode}
                />

                {data.correctExampleText && (
                  <p style={styles.text}>{data.correctExampleText}</p>
                )}
              </div>
            )}
          </div>
        )}

        {data.whyText && (
          <div style={styles.infoBox}>
            <h2 style={styles.sectionTitle}>
              {data.whyTitle || "Why this happens"}
            </h2>

            <p style={styles.text}>
              {data.whyText}
              {renderWhyLinks(data.hub?.href)}
            </p>
          </div>
        )}

        {(data.problemPoints?.length || data.problemText) && (
          <div style={styles.infoBox}>
            <h2 style={styles.sectionTitle}>
              {data.problemTitle || "Why this is a problem"}
            </h2>

            {data.problemPoints && data.problemPoints.length > 0 && (
              <ul style={styles.list}>
                {data.problemPoints.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            )}

            {data.problemText && (
              <p style={styles.text}>
                {data.problemText}
                {renderProblemLinks(data.hub?.href)}
              </p>
            )}
          </div>
        )}

        {data.deliverabilityText && (
          <div style={styles.infoBox}>
            <h2 style={styles.sectionTitle}>
              {data.deliverabilityTitle || "How this affects deliverability"}
            </h2>

            <p style={styles.text}>
              {data.deliverabilityText}
              {renderDeliverabilityLinks(data.hub?.href)}
            </p>
          </div>
        )}

        {data.causes && data.causes.length > 0 && (
          <div style={styles.infoBox}>
            <h2 style={styles.sectionTitle}>
              {data.causesTitle || "Common causes"}
            </h2>

            <ul style={styles.list}>
              {data.causes.map((cause, index) => (
                <li key={index}>{cause}</li>
              ))}
            </ul>
          </div>
        )}

        {data.checkedText && (
          <div style={styles.infoBox}>
            <h2 style={styles.sectionTitle}>
              {data.checkedTitle || "What we checked"}
            </h2>

            <p style={styles.text}>{data.checkedText}</p>

            <p style={styles.trust}>
              Live DNS lookup. No login. No saved domains. No tracking.
            </p>
          </div>
        )}

        {data.faq && data.faq.length > 0 && (
          <div style={styles.infoBox}>
            <h2 style={styles.sectionTitle}>{data.faqTitle || "FAQ"}</h2>

            <div style={styles.faqWrap}>
              {data.faq.map((item, index) => (
                <div key={index} style={styles.faqItem}>
                  <h3 style={styles.faqQuestion}>{item.question}</h3>
                  <p style={styles.text}>{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {(data.nextSteps?.length || data.hub) && (
          <div style={styles.escapeBox}>
            <h3 style={styles.escapeTitle}>Next steps</h3>

            <ul style={styles.list}>
              {data.nextSteps?.map((step, index) => (
                <li key={index}>{step}</li>
              ))}

              {data.hub && (
                <>
                  <li>
                    Review the full troubleshooting guidance in the{" "}
                    <Link href={data.hub.href}>{data.hub.label}</Link>.
                  </li>
                  {[
                    {
                      href: "/spf",
                      label: "SPF Hub",
                      prefix: "Explore sender authorization issues in the",
                    },
                    {
                      href: "/dkim",
                      label: "DKIM Hub",
                      prefix: "Check signing and selector issues in the",
                    },
                    {
                      href: "/dmarc",
                      label: "DMARC Hub",
                      prefix: "Review alignment and policy issues in the",
                    },
                  ]
                    .filter((h) => h.href !== data.hub!.href)
                    .map((h) => (
                      <li key={h.href}>
                        {h.prefix} <Link href={h.href}>{h.label}</Link>.
                      </li>
                    ))}
                </>
              )}
            </ul>
          </div>
        )}

        {visibleRelatedLinks && visibleRelatedLinks.length > 0 && (
          <div style={styles.infoBox}>
            <h2 style={styles.sectionTitle}>Related fixes</h2>

            <ul style={styles.list}>
              {visibleRelatedLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {visibleExploreLinks.length > 0 && (
          <div style={styles.infoBox}>
            <h2 style={styles.sectionTitle}>Explore more issues</h2>

            <ul style={styles.list}>
              {visibleExploreLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </main>
  );
}

function getContextualLink(hubHref?: string, pathname?: string) {
  if (hubHref === "/spf" && pathname !== "/spf/spf-permerror-too-many-dns-lookups") {
    return (
      <p style={styles.text}>
        If your SPF setup is complex, review the{" "}
        <Link href="/spf/spf-permerror-too-many-dns-lookups">
          SPF lookup limit guide
        </Link>
        .
      </p>
    );
  }

  if (hubHref === "/dkim" && pathname !== "/dkim/dkim-selector-not-found") {
    return (
      <p style={styles.text}>
        If signatures fail, check the{" "}
        <Link href="/dkim/dkim-selector-not-found">
          DKIM selector troubleshooting guide
        </Link>
        .
      </p>
    );
  }

  if (hubHref === "/dmarc" && pathname !== "/dmarc/no-dmarc-record-found") {
    return (
      <p style={styles.text}>
        If policies are not enforced, review the{" "}
        <Link href="/dmarc/no-dmarc-record-found">
          DMARC setup guide
        </Link>
        .
      </p>
    );
  }

  return null;
}

function renderIntroLinks(hubHref?: string) {
  if (hubHref === "/spf") {
    return (
      <>
        {" "}
        Start with{" "}
        <Link href="/spf/no-spf-record-found">your SPF record status</Link> and
        then check for{" "}
        <Link href="/spf/multiple-spf-records-found">multiple SPF records</Link>{" "}
        if things still look off.
      </>
    );
  }

  if (hubHref === "/dkim") {
    return (
      <>
        {" "}
        Many issues come down to a missing{" "}
        <Link href="/dkim/no-dkim-record-found">DKIM record</Link> or a{" "}
        <Link href="/dkim/dkim-selector-not-found">selector mismatch</Link> in
        DNS.
      </>
    );
  }

  if (hubHref === "/dmarc") {
    return (
      <>
        {" "}
        Often the first step is confirming you even have a{" "}
        <Link href="/dmarc/no-dmarc-record-found">DMARC record</Link> and that
        the{" "}
        <Link href="/dmarc/dmarc-policy-none-vs-quarantine-vs-reject">
          policy value
        </Link>{" "}
        matches your enforcement goal.
      </>
    );
  }

  return null;
}

function renderWhyLinks(hubHref?: string) {
  if (hubHref === "/spf") {
    return (
      <>
        {" "}
        This is especially common when{" "}
        <Link href="/spf/multiple-spf-records-found">
          multiple SPF records
        </Link>{" "}
        are published or when{" "}
        <Link href="/spf/spf-permerror-too-many-dns-lookups">
          DNS lookup limits
        </Link>{" "}
        are exceeded.
      </>
    );
  }

  if (hubHref === "/dkim") {
    return (
      <>
        {" "}
        In practice it usually traces back to a{" "}
        <Link href="/dkim/dkim-selector-not-found">missing selector</Link> or an{" "}
        <Link href="/dkim/invalid-dkim-key">invalid DKIM key</Link> in DNS.
      </>
    );
  }

  if (hubHref === "/dmarc") {
    return (
      <>
        {" "}
        Misaligned authentication paths often show up as{" "}
        <Link href="/dmarc/dmarc-alignment-failed">DMARC alignment failures</Link>{" "}
        or a{" "}
        <Link href="/dmarc/dmarc-rua-ruf-not-working">
          reporting address that never receives data
        </Link>
        .
      </>
    );
  }

  return null;
}

function renderProblemLinks(hubHref?: string) {
  if (hubHref === "/spf") {
    return (
      <>
        {" "}
        For many senders the concrete symptom is a{" "}
        <Link href="/spf/spf-record-syntax-error">syntax error</Link> or a{" "}
        <Link href="/spf/spf-record-too-long">record that is too long</Link> for
        DNS to handle cleanly.
      </>
    );
  }

  if (hubHref === "/dkim") {
    return (
      <>
        {" "}
        When this drags on, it often surfaces as{" "}
        <Link href="/dkim/dkim-alignment-failed">DKIM alignment failures</Link>{" "}
        or a{" "}
        <Link href="/dkim/dkim-body-hash-mismatch">body hash mismatch</Link> in
        detailed headers.
      </>
    );
  }

  if (hubHref === "/dmarc") {
    return (
      <>
        {" "}
        Over time that can mean critical mail is treated like generic bulk,
        especially when{" "}
        <Link href="/dmarc/multiple-dmarc-records-found">
          multiple DMARC records
        </Link>{" "}
        or a misconfigured{" "}
        <Link href="/dmarc/dmarc-fo-tag-explained">fo= tag</Link> confuse
        evaluation.
      </>
    );
  }

  return null;
}

function renderDeliverabilityLinks(hubHref?: string) {
  if (hubHref === "/spf") {
    return (
      <>
        {" "}
        You can see this clearly in{" "}
        <Link href="/spf/spf-neutral-result-explained">
          neutral SPF results
        </Link>{" "}
        or when{" "}
        <Link href="/spf/spf-softfail-vs-fail">
          softfail vs fail decisions
        </Link>{" "}
        tip borderline mail into spam.
      </>
    );
  }

  if (hubHref === "/dkim") {
    return (
      <>
        {" "}
        Providers tend to trust domains with a stable{" "}
        <Link href="/dkim/dkim-record-example">DKIM record</Link> and clean{" "}
        <Link href="/dkim/dkim-signature-explained">DKIM signatures</Link> far
        more than those with intermittent failures.
      </>
    );
  }

  if (hubHref === "/dmarc") {
    return (
      <>
        {" "}
        Over time, well-tuned{" "}
        <Link href="/dmarc/dmarc-aggregate-reports-explained">
          DMARC aggregate reports
        </Link>{" "}
        and a clear{" "}
        <Link href="/dmarc/dmarc-policy-none-vs-quarantine-vs-reject">
          policy stance
        </Link>{" "}
        are what help inbox providers separate your legitimate traffic from
        spoofing attempts.
      </>
    );
  }

  return null;
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    maxWidth: 860,
    margin: "80px auto",
    padding: "0 24px",
  },
  card: {
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    padding: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: 700,
    marginBottom: 12,
  },
  subtitle: {
    color: "#374151",
    marginBottom: 32,
    lineHeight: 1.6,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 600,
    marginBottom: 12,
  },
  fixBox: {
    background: "#f9fafb",
    borderRadius: 10,
    padding: 24,
    marginBottom: 40,
  },
  button: {
    display: "inline-block",
    padding: "12px 20px",
    background: "#E0B100",
    color: "#000",
    borderRadius: 6,
    fontWeight: 600,
    textDecoration: "none",
    marginTop: 16,
  },
  infoBox: {
    marginBottom: 40,
  },
  updated: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 20,
  },
  quickBox: {
    background: "#f8fafc",
    border: "1px solid #e5e7eb",
    borderRadius: 10,
    padding: 20,
    marginBottom: 24,
  },
  trust: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 8,
  },
  escapeBox: {
    borderTop: "1px solid #e5e7eb",
    paddingTop: 24,
    marginBottom: 40,
  },
  escapeTitle: {
    fontSize: 18,
    fontWeight: 600,
    marginBottom: 8,
  },
  list: {
    paddingLeft: 18,
    marginBottom: 12,
    lineHeight: 1.6,
  },
  text: {
    color: "#374151",
    lineHeight: 1.6,
  },
  exampleBlock: {
    marginBottom: 24,
  },
  exampleTitle: {
    fontSize: 16,
    fontWeight: 600,
    marginBottom: 12,
  },
  faqWrap: {
    display: "grid",
    gap: 20,
  },
  faqItem: {
    paddingBottom: 16,
    borderBottom: "1px solid #e5e7eb",
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: 600,
    marginBottom: 8,
  },
};