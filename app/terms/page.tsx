export const metadata = {
  title: "Terms of Use | Email DNS Check",
  description:
    "Terms and conditions for using the Email DNS Check website and tools.",
};

export default function TermsPage() {
  return (
    <main style={styles.page}>
      <section style={styles.container}>
        <h1 style={styles.title}>Terms of Use</h1>
        <p style={styles.updated}>Last updated: January 2026</p>

        <p>
          By accessing and using Email DNS Check (“this website”, “we”, “our”),
          you agree to these Terms of Use. If you do not agree with these terms,
          please do not use the website.
        </p>

        <h2>Purpose of the service</h2>
        <p>
          Email DNS Check provides tools and educational content to inspect SPF,
          DKIM, and DMARC DNS records. The information is provided for general
          informational purposes only.
        </p>

        <h2>No warranties</h2>
        <p>
          The service is provided on an “as is” and “as available” basis. We make
          no guarantees regarding accuracy, completeness, availability, or
          suitability for any particular purpose.
        </p>

        <h2>Limitation of liability</h2>
        <p>
          We are not liable for any direct, indirect, incidental, or
          consequential damages resulting from the use or inability to use this
          website or its tools, including but not limited to email delivery
          issues or configuration errors.
        </p>

        <h2>Use at your own risk</h2>
        <p>
          You are responsible for any actions taken based on the information
          provided by this website. Always verify changes to DNS or email
          configuration in a controlled manner.
        </p>

        <h2>Acceptable use</h2>
        <p>
          You agree not to misuse the website, attempt to disrupt its operation,
          or use it for unlawful purposes.
        </p>

        <h2>Intellectual property</h2>
        <p>
          All content, design, and functionality on this website are the
          property of Email DNS Check unless otherwise stated and may not be
          copied or reused without permission.
        </p>

        <h2>Changes to these terms</h2>
        <p>
          We may update these Terms of Use as the website evolves. Continued use
          of the website after changes constitutes acceptance of the updated
          terms.
        </p>

        <h2>Contact</h2>
        <p>
          If you have questions about these Terms of Use, please contact us
          through the website.
        </p>
      </section>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    paddingTop: 64,
    paddingBottom: 64,
  },
  container: {
    maxWidth: 760,
    margin: "0 auto",
    padding: "0 24px",
    lineHeight: 1.7,
  },
  title: {
    fontSize: 36,
    fontWeight: 700,
    marginBottom: 8,
  },
  updated: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 32,
  },
};
