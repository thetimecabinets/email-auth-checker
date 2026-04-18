import { dmarcErrors } from "@/app/data/dmarcErrors";
import { truncateIntro } from "@/app/lib/metadata";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const error = dmarcErrors[`dmarc/${params.slug}` as keyof typeof dmarcErrors];

  if (!error) {
    return {
      title: "DMARC Error Not Found",
      description: "This DMARC error page does not exist.",
    };
  }

  const description =
    "description" in error && typeof error.description === "string"
      ? error.description
      : truncateIntro(error.intro);

  return {
    title: error.title,
    description,
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  const error = dmarcErrors[`dmarc/${params.slug}` as keyof typeof dmarcErrors];

  if (!error) return notFound();

  function getFaq(slug: string) {
    // SPF
    if (slug.includes("spf")) {
      return [
        {
          question: "What causes SPF errors?",
          answer:
            "SPF errors are usually caused by missing records, too many DNS lookups, or incorrect includes in your SPF configuration.",
        },
        {
          question: "Can multiple SPF records break email?",
          answer:
            "Yes. Having more than one SPF record will cause a permerror and email authentication will fail.",
        },
        {
          question: "How long do SPF changes take?",
          answer:
            "SPF updates typically propagate within a few minutes to several hours depending on DNS caching.",
        },
      ];
    }

    // DKIM
    if (slug.includes("dkim")) {
      return [
        {
          question: "Why is my DKIM signature failing?",
          answer:
            "DKIM fails when the key is missing, invalid, or does not match the sending server configuration.",
        },
        {
          question: "Can DKIM work without SPF?",
          answer:
            "Yes, but for best deliverability, both SPF and DKIM should be configured together.",
        },
        {
          question: "How do I fix a DKIM selector issue?",
          answer:
            "Ensure the selector matches your DNS record and that the public key is correctly published.",
        },
      ];
    }

    // DMARC
    if (slug.includes("dmarc")) {
      return [
        {
          question: "What does DMARC do?",
          answer:
            "DMARC tells receiving servers how to handle emails that fail SPF or DKIM checks.",
        },
        {
          question: "Is p=none safe?",
          answer:
            "p=none does not enforce protection and is mainly used for monitoring, not security.",
        },
        {
          question: "Why is DMARC failing?",
          answer:
            "DMARC fails when SPF and DKIM are not aligned with the domain used in the email.",
        },
      ];
    }

    return [];
  }

  const faqData = getFaq(params.slug);

  return (
    <main style={{ padding: 40 }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqData.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            })),
          }),
        }}
      />
      <h1>{error.title}</h1>
      <p>
        {"description" in error && typeof error.description === "string"
          ? error.description
          : error.intro}
      </p>

      <section style={{ marginTop: 30 }}>
        <h2>What this error means</h2>
        <p>
          This error indicates a problem with your email authentication setup.
          When SPF, DKIM or DMARC are misconfigured, email providers may reject
          or send your messages to spam.
        </p>
      </section>

      <section style={{ marginTop: 30 }}>
        <h2>Why this happens</h2>
        <ul>
          <li>Incorrect DNS records</li>
          <li>Multiple or conflicting configurations</li>
          <li>Missing authentication policies</li>
        </ul>
      </section>

      <section style={{ marginTop: 30 }}>
        <h2>How to fix it</h2>
        <p>
          Fixing this issue usually involves updating your DNS records correctly.
          Make sure only one valid record exists and that it follows best practices.
        </p>
      </section>

      <section style={{ marginTop: 30 }}>
        <h2>Pro tip</h2>
        <p>
          Always test your changes using an email authentication checker to ensure
          your records are valid and working correctly.
        </p>
      </section>

      <section style={{ marginTop: 30 }}>
        <h2>FAQ</h2>
        {faqData.map((item, i) => (
          <div key={i} style={{ marginBottom: 20 }}>
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </div>
        ))}
      </section>

      <section style={{ marginTop: 40 }}>
        <h3>Related fixes</h3>
        <ul>
          <li><a href="/spf">SPF Guide</a></li>
          <li><a href="/dkim">DKIM Guide</a></li>
          <li><a href="/dmarc">DMARC Guide</a></li>
        </ul>
      </section>
    </main>
  );
}
