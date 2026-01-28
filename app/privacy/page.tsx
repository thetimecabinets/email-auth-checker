export const metadata = {
  title: "Privacy Policy | Email DNS Check",
  description:
    "Privacy policy explaining how Email DNS Check handles data, domains, and user privacy.",
};

export default function PrivacyPage() {
  return (
    <main style={styles.page}>
      <section style={styles.container}>
        <h1 style={styles.title}>Privacy Policy</h1>
        <p style={styles.updated}>Last updated: January 2026</p>

        <p>
          Email DNS Check (“we”, “our”, “this website”) respects your privacy.
          This Privacy Policy explains what data we collect, how it is used, and
          your rights when using this website.
        </p>

        <h2>Information we collect</h2>
        <p>
          We do <strong>not</strong> collect personal information such as names,
          email addresses, or accounts.
        </p>
        <p>
          When you use the email authentication checker, you may enter a domain
          name. This domain name is used only to perform a real-time DNS lookup
          and is not stored permanently.
        </p>

        <h2>Technical data</h2>
        <p>
          Like most websites, basic technical data may be processed by our
          hosting provider, such as IP addresses, browser type, and request
          timestamps. This data is used for security, performance, and
          reliability purposes only.
        </p>

        <h2>Cookies</h2>
        <p>
          This website does not use tracking cookies or advertising cookies at
          this time.
        </p>

        <h2>Third-party services</h2>
        <p>
          We do not share data with third parties for marketing purposes. DNS
          lookups are performed using standard DNS resolution and do not involve
          user profiling.
        </p>

        <h2>Data retention</h2>
        <p>
          Entered domain names are processed in real time and are not stored in a
          database. Temporary server logs may exist for operational and security
          reasons and are automatically deleted after a short period.
        </p>

        <h2>Your rights</h2>
        <p>
          Under applicable data protection laws (such as GDPR), you have the
          right to access, correct, or request deletion of personal data. Since
          we do not store personal data, these rights generally do not apply in
          practice, but you may contact us if you have questions.
        </p>

        <h2>Changes to this policy</h2>
        <p>
          This Privacy Policy may be updated as the website evolves. Any changes
          will be reflected on this page with an updated revision date.
        </p>

        <h2>Contact</h2>
        <p>
          If you have questions about this Privacy Policy, please contact us
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
