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

        {/* MAIN CONTENT AREA */}
        <div className="container">{children}</div>

        {/* ENHANCED FOOTER WITH INTERNAL LINKING */}
        <footer className="site-footer" style={{ marginTop: '64px', borderTop: '1px solid #e5e7eb', paddingTop: '48px' }}>
          <div className="container footer-inner">
            
            {/* DIRECTORY SECTION: This helps Google index your 28 pages */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '32px', 
              textAlign: 'left',
              marginBottom: '48px' 
            }}>
              <div>
                <strong style={{ display: 'block', marginBottom: '16px', color: '#111827' }}>SPF Solutions</strong>
                <Link href="/spf/spf-softfail-vs-fail" style={footerLinkStyle}>SPF Softfail vs Fail</Link>
                <Link href="/spf/spf-permerror-too-many-dns-lookups" style={footerLinkStyle}>Too Many DNS Lookups</Link>
                <Link href="/spf/multiple-spf-records-found" style={footerLinkStyle}>Multiple Records Found</Link>
              </div>
              
              <div>
                <strong style={{ display: 'block', marginBottom: '16px', color: '#111827' }}>DKIM Solutions</strong>
                <Link href="/dkim/no-dkim-record-found" style={footerLinkStyle}>No DKIM Record Found</Link>
                <Link href="/dkim/dkim-selector-not-found" style={footerLinkStyle}>DKIM Selector Missing</Link>
                <Link href="/dkim/invalid-dkim-key" style={footerLinkStyle}>Invalid DKIM Key Fix</Link>
              </div>
              
              <div>
                <strong style={{ display: 'block', marginBottom: '16px', color: '#111827' }}>DMARC Solutions</strong>
                <Link href="/dmarc/no-dmarc-record-found" style={footerLinkStyle}>No DMARC Record Found</Link>
                <Link href="/dmarc/dmarc-alignment-failed" style={footerLinkStyle}>DMARC Alignment Fix</Link>
                <Link href="/dmarc/dmarc-policy-none-vs-quarantine-vs-reject" style={footerLinkStyle}>DMARC Policy Guide</Link>
              </div>
            </div>

            {/* BOTTOM BAR */}
            <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
              <p style={{ color: '#6b7280', fontSize: '14px' }}>© {new Date().getFullYear()} Email DNS Check</p>
              <div className="footer-links" style={{ display: 'flex', gap: '24px' }}>
                <Link href="/privacy" style={{ color: '#6b7280', fontSize: '14px' }}>Privacy Policy</Link>
                <Link href="/terms" style={{ color: '#6b7280', fontSize: '14px' }}>Terms of Use</Link>
                <Link href="/contact" style={{ color: '#6b7280', fontSize: '14px' }}>Contact</Link>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

// Inline style for footer links to keep things simple for you
const footerLinkStyle = {
  display: 'block',
  fontSize: '14px',
  color: '#4b5563',
  marginBottom: '8px',
  textDecoration: 'none'
};