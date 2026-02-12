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
        {/* HEADER - Restored exactly to your original version */}
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
        <div className="container" style={{ minHeight: '60vh' }}>{children}</div>

        {/* FOOTER - Your original structure + the 3 "Hub" columns for SEO */}
        <footer className="site-footer">
          <div className="container footer-inner" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
            
            {/* SEO Hallway Section: Clean & Organized */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '40px', width: '100%', marginBottom: '40px', textAlign: 'left' }}>
              <div>
                <strong style={{ display: 'block', marginBottom: '12px' }}>SPF Hub</strong>
                <Link href="/spf" style={hubLinkStyle}>SPF Checker</Link>
                <Link href="/spf/spf-softfail-vs-fail" style={hubLinkStyle}>Softfail vs Fail</Link>
              </div>
              <div>
                <strong style={{ display: 'block', marginBottom: '12px' }}>DKIM Hub</strong>
                <Link href="/dkim" style={hubLinkStyle}>DKIM Checker</Link>
                <Link href="/dkim/no-dkim-record-found" style={hubLinkStyle}>Missing DKIM Fix</Link>
              </div>
              <div>
                <strong style={{ display: 'block', marginBottom: '12px' }}>DMARC Hub</strong>
                <Link href="/dmarc" style={hubLinkStyle}>DMARC Checker</Link>
                <Link href="/dmarc/no-dmarc-record-found" style={hubLinkStyle}>DMARC Setup</Link>
              </div>
            </div>

            {/* Your Original Footer Bottom Bar */}
            <div style={{ width: '100%', borderTop: '1px solid rgba(0,0,0,0.1)', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
              <p style={{ margin: 0 }}>© {new Date().getFullYear()} Email DNS Check</p>
              <div className="footer-links">
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

// Simple style object that won't break the server-side build
const hubLinkStyle = {
  display: 'block',
  fontSize: '14px',
  marginBottom: '8px',
  textDecoration: 'none',
  opacity: 0.8
};