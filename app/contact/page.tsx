export const metadata = {
  title: "Contact | Email DNS Check",
  description:
    "Contact Email DNS Check for questions, feedback, or support.",
};

export default function ContactPage() {
  return (
    <main style={styles.page}>
      <section style={styles.container}>
        <h1 style={styles.title}>Contact</h1>

        <p>
          If you have questions, feedback, or suggestions about Email DNS Check,
          you can reach us through this page.
        </p>

        <p>
          Contact details will be added soon.
        </p>

        <p>
          This project is focused on providing fast, free, and reliable email
          authentication checks. We appreciate thoughtful feedback that helps
          improve the tool.
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
    marginBottom: 24,
  },
};
