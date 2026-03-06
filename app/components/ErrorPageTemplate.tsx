import Link from "next/link";
import CodeBlock from "@/app/components/CodeBlock";

type RelatedLink = {
  href: string;
  label: string;
};

type ErrorPageData = {
  title: string;
  intro: string;

  fixTitle: string;
  fixText: string;
  code?: string;
  codeTitle?: string;
  codeLanguage?: string;
  afterCodeText?: string;

  whyTitle?: string;
  whyText?: string;

  problemTitle?: string;
  problemPoints?: string[];
  problemText?: string;

  deliverabilityTitle?: string;
  deliverabilityText?: string;

  causesTitle?: string;
  causes?: string[];

  checkedTitle?: string;
  checkedText?: string;

  nextSteps?: string[];

  hub?: {
    href: string;
    label: string;
  };

  related?: RelatedLink[];
};

export default function ErrorPageTemplate(data: ErrorPageData) {
  return (
    <main style={styles.wrapper}>
      <section style={styles.card}>
        <h1 style={styles.title}>{data.title}</h1>

        <p style={styles.subtitle}>{data.intro}</p>

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
            Re-check
          </Link>
        </div>

        {data.whyText && (
          <div style={styles.infoBox}>
            <h2 style={styles.sectionTitle}>{data.whyTitle || "Why this happens"}</h2>
            <p style={styles.text}>{data.whyText}</p>
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

            {data.problemText && <p style={styles.text}>{data.problemText}</p>}
          </div>
        )}

        {data.deliverabilityText && (
          <div style={styles.infoBox}>
            <h2 style={styles.sectionTitle}>
              {data.deliverabilityTitle || "How this affects deliverability"}
            </h2>
            <p style={styles.text}>{data.deliverabilityText}</p>
          </div>
        )}

        {data.causes && data.causes.length > 0 && (
          <div style={styles.infoBox}>
            <h2 style={styles.sectionTitle}>{data.causesTitle || "Common causes"}</h2>
            <ul style={styles.list}>
              {data.causes.map((cause, index) => (
                <li key={index}>{cause}</li>
              ))}
            </ul>
          </div>
        )}

        {data.checkedText && (
          <div style={styles.infoBox}>
            <h2 style={styles.sectionTitle}>{data.checkedTitle || "What we checked"}</h2>
            <p style={styles.text}>{data.checkedText}</p>
            <p style={styles.trust}>
              Live DNS lookup. No login. No saved domains. No tracking.
            </p>
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
                <li>
                  Review the full troubleshooting guidance in the{" "}
                  <Link href={data.hub.href}>{data.hub.label}</Link>.
                </li>
              )}
            </ul>
          </div>
        )}

        {data.related && data.related.length > 0 && (
          <div style={styles.infoBox}>
            <h2 style={styles.sectionTitle}>Related fixes</h2>
            <ul style={styles.list}>
              {data.related.map((link, index) => (
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
};