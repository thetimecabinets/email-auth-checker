import "./globals.css";
import Link from "next/link";
import type { Metadata } from "next";
import Logo from "./components/Logo";

export const metadata: Metadata = {
  title: "SPF, DKIM & DMARC Checker Tool (Free DNS Lookup)",
  description:
    "Check SPF, DKIM and DMARC records instantly. Detect email authentication issues and improve email deliverability with live DNS lookup.",
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

            <nav className="nav" aria-label="Primary">
              <Link href="/spf">SPF</Link>
              <Link href="/dkim">DKIM</Link>
              <Link href="/dmarc">DMARC</Link>
            </nav>
          </div>
        </header>

        {/* MAIN */}
        <main className="container site-main">{children}</main>

        {/* FOOTER */}
        <footer className="site-footer">
          <div className="container footer-wrap">
            {/* Hub columns */}
            <div className="footer-hubs">
              <div className="footer-hub">
                <strong>SPF Hub</strong>
                <Link href="/spf" className="footer-hub-link">
                  SPF Checker
                </Link>
                <Link href="/spf/spf-softfail-vs-fail" className="footer-hub-link">
                  Softfail vs Fail
                </Link>
              </div>

              <div className="footer-hub">
                <strong>DKIM Hub</strong>
                <Link href="/dkim" className="footer-hub-link">
                  DKIM Checker
                </Link>
                <Link href="/dkim/no-dkim-record-found" className="footer-hub-link">
                  Missing DKIM Fix
                </Link>
              </div>

              <div className="footer-hub">
                <strong>DMARC Hub</strong>
                <Link href="/dmarc" className="footer-hub-link">
                  DMARC Checker
                </Link>
                <Link href="/dmarc/no-dmarc-record-found" className="footer-hub-link">
                  DMARC Setup
                </Link>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="footer-bottom">
              <p className="footer-copy">
                © {new Date().getFullYear()} Email DNS Check
              </p>

              <div className="footer-links" aria-label="Footer">
                <Link href="/privacy">Privacy Policy</Link>
                <Link href="/terms">Terms of Use</Link>
                <Link href="/contact">Contact</Link>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}