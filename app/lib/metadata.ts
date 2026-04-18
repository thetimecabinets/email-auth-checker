export const BASE_URL = "https://emaildnscheck.com";

export const LAST_UPDATED = new Date("2026-03-12");

/**
 * Trim intro safely for meta descriptions
 */
export function truncateIntro(intro: string, maxLen: number = 155): string {
  if (intro.length <= maxLen) return intro;

  const trimmed = intro.slice(0, maxLen);
  const lastSpace = trimmed.lastIndexOf(" ");

  return lastSpace > 100 ? trimmed.slice(0, lastSpace) : trimmed;
}

/**
 * Build clean meta description (short, natural, non-spammy)
 */
export function buildMetaDescription(title: string, intro: string) {
  const issue = title
    .replace(/\s*\([^)]*\)\s*$/, "")
    .replace(/\?$/, "")
    .trim();
  return `Step-by-step guide to fix ${issue}. Includes DNS examples, common mistakes, and how to improve email deliverability fast.`;
}

const TITLE_OVERRIDES: Record<string, string> = {
  "/spf/no-spf-record-found": "No SPF Record Found (Fix SPF Error Fast)",
  "/spf/multiple-spf-records-found":
    "Multiple SPF Records Found (Fix This Issue Fast)",
  "/spf/spf-permerror-too-many-dns-lookups":
    "SPF Permerror: Too Many DNS Lookups (Fix Guide)",
  "/dkim/no-dkim-record-found":
    "No DKIM Record Found (Fix Email Authentication)",
  "/dkim/invalid-dkim-key": "Invalid DKIM Key (How to Fix DKIM Errors)",
  "/dkim/dkim-selector-not-found":
    "DKIM Selector Not Found (Fix DKIM Setup Fast)",
  "/dmarc/no-dmarc-record-found":
    "No DMARC Record Found (Fix DMARC Setup Fast)",
  "/dmarc/dmarc-alignment-failed":
    "DMARC Alignment Failed (Fix Email Authentication)",
  "/dmarc/multiple-dmarc-records-found":
    "Multiple DMARC Records Found (Fix This Issue Fast)",
  "/spf/amazon-ses-spf-not-working":
    "Amazon SES SPF Not Working? Fix Include Setup Fast",
};

function formatIssueFromSlug(slug: string) {
  const tokenMap: Record<string, string> = {
    spf: "SPF",
    dkim: "DKIM",
    dmarc: "DMARC",
    dns: "DNS",
    ip: "IP",
    ipv6: "IPv6",
    ses: "SES",
    amazon: "Amazon",
    microsoft: "Microsoft",
    google: "Google",
    workspace: "Workspace",
    sendgrid: "SendGrid",
    mailchimp: "Mailchimp",
    rua: "RUA",
    ruf: "RUF",
    aspf: "aspf",
    adkim: "adkim",
    fo: "fo",
    pct: "pct",
  };

  return slug
    .split("-")
    .map((part) => tokenMap[part] ?? `${part[0].toUpperCase()}${part.slice(1)}`)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

function protocolSuffix(path: string) {
  if (path.startsWith("/spf/")) return "(Fix SPF Error Fast)";
  if (path.startsWith("/dkim/")) return "(Fix DKIM Errors Fast)";
  return "(Fix DMARC Errors Fast)";
}

function normalizeTitle(title: string, path: string) {
  if (TITLE_OVERRIDES[path]) return TITLE_OVERRIDES[path];

  const slug = path.split("/").filter(Boolean).pop() ?? "";
  const issue = formatIssueFromSlug(slug);
  return `${issue} ${protocolSuffix(path)}`;
}

/**
 * Build FULL metadata object (use everywhere)
 */
export function buildMetadata({
  title,
  intro,
  path,
}: {
  title: string;
  intro: string;
  path: string;
}) {
  const cleanTitle = normalizeTitle(title, path);
  const description = buildMetaDescription(cleanTitle, intro);
  const url = `${BASE_URL}${path}`;

  return {
    title: cleanTitle,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: cleanTitle,
      description,
      url,
      siteName: "Email DNS Check",
      type: "article",
    },
    twitter: {
      card: "summary",
      title: cleanTitle,
      description,
    },
  };
}