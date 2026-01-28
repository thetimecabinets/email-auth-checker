import "./globals.css";
import Link from "next/link";
import Logo from "./components/Logo";

export const metadata = {
  title: "Email DNS Check",
  description:
    "Check SPF, DKIM, and DMARC records for any domain. Free email authentication checker.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* HEADER */}
        <header className="site-header">
          <div className="container header-inner">
            <Logo />

            <nav className="nav">
              <Link href="/spf">SPF</Link>
              <Link href="/dkim">DKIM</Link>
              <Link href="/dmarc">DMARC</Link>
            </nav>
          </div>
        </header>

        {/* MAIN */}
        <div className="container">{children}</div>

        {/* FOOTER */}
        <footer className="site-footer">
          <div className="container footer-inner">
            <p>© {new Date().getFullYear()} Email DNS Check</p>
            <div className="footer-links">
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/terms">Terms of Use</Link>
              <Link href="/contact">Contact</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
