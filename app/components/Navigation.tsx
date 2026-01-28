import Link from "next/link";

export default function Navigation() {
  return (
    <nav style={styles.nav}>
      <div style={styles.inner}>
        <Link href="/" style={styles.brand}>
          Email Auth Checker
        </Link>

        <div style={styles.links}>
          <Link href="/spf">SPF</Link>
          <Link href="/dkim">DKIM</Link>
          <Link href="/dmarc">DMARC</Link>
        </div>
      </div>
    </nav>
  );
}

const styles: Record<string, React.CSSProperties> = {
  nav: {
    borderBottom: "1px solid #e5e5e5",
    backgroundColor: "#ffffff",
  },
  inner: {
    maxWidth: 860,
    margin: "0 auto",
    padding: "16px 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont",
  },
  brand: {
    fontSize: 16,
    fontWeight: 600,
    textDecoration: "none",
    color: "#000",
  },
  links: {
    display: "flex",
    gap: 24,
    fontSize: 14,
  },
};
