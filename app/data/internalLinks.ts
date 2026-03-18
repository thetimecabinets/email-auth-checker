export type InternalLink = {
  href: string;
  label: string;
  description?: string;
  protocol: "spf" | "dkim" | "dmarc";
  category?: string;
  priority?: number;
  featured?: boolean;
  relatedSlugs?: string[];
};

export const spfCluster: InternalLink[] = [
  {
    href: "/spf/spf-record-example",
    label: "SPF record examples",
    description: "Copy-paste SPF examples for Google, Microsoft 365, SendGrid.",
    protocol: "spf",
    category: "examples",
    priority: 0,
    featured: true,
    relatedSlugs: ["spf-record-syntax-explained", "spf-record-generator"],
  },
  {
    href: "/spf/sendgrid-spf-not-working",
    label: "SendGrid SPF not working",
    description:
      "Fix SPF failures when SendGrid is not correctly included in your SPF policy.",
    protocol: "spf",
    category: "provider",
    priority: 1,
    featured: true,
    relatedSlugs: [
      "spf-record-syntax-explained",
      "multiple-spf-records-found",
      "spf-permerror-too-many-dns-lookups",
    ],
  },
  {
    href: "/spf/spf-record-syntax-explained",
    label: "SPF record syntax explained",
    description: "Mechanisms, qualifiers, and record structure.",
    protocol: "spf",
    category: "syntax",
    priority: 0,
    featured: true,
    relatedSlugs: ["spf-record-syntax-error", "spf-record-example"],
  },
  {
    href: "/spf/spf-record-generator",
    label: "How to build an SPF record",
    description: "Step-by-step guide to building SPF correctly.",
    protocol: "spf",
    category: "examples",
    priority: 0,
    featured: true,
    relatedSlugs: ["spf-record-example", "spf-permerror-too-many-dns-lookups"],
  },
  {
    href: "/spf/no-spf-record-found",
    label: "No SPF record found",
    description: "Start here when your domain publishes no SPF at all.",
    protocol: "spf",
    category: "missing-record",
    priority: 1,
    featured: true,
    relatedSlugs: ["multiple-spf-records-found", "spf-record-syntax-error"],
  },
  {
    href: "/spf/multiple-spf-records-found",
    label: "Multiple SPF records found",
    description: "Why duplicate SPF breaks evaluation and how to merge safely.",
    protocol: "spf",
    category: "duplicate-records",
    priority: 2,
    featured: true,
    relatedSlugs: ["spf-permerror-too-many-dns-lookups", "spf-include-flattening"],
  },
  {
    href: "/spf/spf-permerror-too-many-dns-lookups",
    label: "SPF permerror: too many DNS lookups",
    description: "Identify every include/redirect that contributes to lookup bloat.",
    protocol: "spf",
    category: "lookups",
    priority: 3,
    featured: true,
    relatedSlugs: ["spf-include-flattening", "multiple-spf-records-found"],
  },
  {
    href: "/spf/spf-include-flattening",
    label: "SPF include flattening",
    description: "When to flatten, when to avoid it, and safer alternatives.",
    protocol: "spf",
    category: "lookups",
    priority: 4,
    featured: false,
    relatedSlugs: ["spf-permerror-too-many-dns-lookups", "spf-record-too-long"],
  },
  {
    href: "/spf/spf-softfail-explained",
    label: "SPF softfail explained",
    description: "What ~all means and when to use it during rollout.",
    protocol: "spf",
    category: "mechanisms",
    priority: 5,
    featured: false,
    relatedSlugs: ["spf-softfail-vs-fail", "spf-neutral-result-explained"],
  },
  {
    href: "/spf/spf-neutral-result-explained",
    label: "SPF neutral result explained",
    description: "Understand why neutral is not the same as pass.",
    protocol: "spf",
    category: "mechanisms",
    priority: 6,
    featured: false,
    relatedSlugs: ["spf-softfail-explained", "spf-softfail-vs-fail"],
  },
  {
    href: "/spf/spf-record-syntax-error",
    label: "SPF record syntax error",
    description: "Fix typos, missing colons, and malformed mechanisms.",
    protocol: "spf",
    category: "syntax",
    priority: 7,
    featured: false,
    relatedSlugs: ["spf-missing-all-mechanism", "no-spf-record-found"],
  },
  {
    href: "/spf/spf-missing-all-mechanism",
    label: "SPF missing all mechanism",
    description: "Why your record needs ~all or -all and how to add it.",
    protocol: "spf",
    category: "mechanisms",
    priority: 8,
    featured: false,
    relatedSlugs: ["spf-softfail-vs-fail", "spf-record-syntax-error"],
  },
  {
    href: "/spf/spf-ip-not-authorized",
    label: "SPF IP not authorized",
    description: "Add the correct sending IP or provider include.",
    protocol: "spf",
    category: "authorization",
    priority: 9,
    featured: false,
    relatedSlugs: ["spf-ipv6-misconfiguration", "spf-include-flattening"],
  },
  {
    href: "/spf/spf-record-too-long",
    label: "SPF record too long",
    description: "Shorten your policy to stay within DNS limits.",
    protocol: "spf",
    category: "limits",
    priority: 10,
    featured: false,
    relatedSlugs: ["spf-permerror-too-many-dns-lookups", "spf-include-flattening"],
  },
  {
    href: "/spf/spf-softfail-vs-fail",
    label: "SPF softfail vs fail",
    description: "Choose the right qualifier for your enforcement stage.",
    protocol: "spf",
    category: "mechanisms",
    priority: 11,
    featured: false,
    relatedSlugs: ["spf-softfail-explained", "spf-missing-all-mechanism"],
  },
  {
    href: "/spf/spf-redirect-explained",
    label: "SPF redirect explained",
    description: "Delegate SPF logic cleanly across subdomains or providers.",
    protocol: "spf",
    category: "mechanisms",
    priority: 12,
    featured: false,
    relatedSlugs: ["spf-include-flattening", "multiple-spf-records-found"],
  },
  {
    href: "/spf/spf-ipv6-misconfiguration",
    label: "SPF IPv6 misconfiguration",
    description: "Make sure modern IPv6 ranges are correctly represented.",
    protocol: "spf",
    category: "authorization",
    priority: 13,
    featured: false,
    relatedSlugs: ["spf-ip-not-authorized", "spf-include-flattening"],
  },
];

export const dkimCluster: InternalLink[] = [
  {
    href: "/dkim/dkim-record-example",
    label: "DKIM record examples",
    description: "Real DNS TXT examples and how to read them.",
    protocol: "dkim",
    category: "examples",
    priority: 0,
    featured: true,
    relatedSlugs: ["dkim-signature-explained", "dkim-selector-explained"],
  },
  {
    href: "/dkim/google-workspace-dkim-not-working",
    label: "Google Workspace DKIM not working",
    description:
      "Fix Gmail DKIM failures when the Google Workspace selector or DNS record is misconfigured.",
    protocol: "dkim",
    category: "provider",
    priority: 1,
    featured: true,
    relatedSlugs: [
      "dkim-selector-not-found",
      "invalid-dkim-key",
      "dkim-alignment-failed",
    ],
  },
  {
    href: "/dkim/microsoft-365-dkim-not-working",
    label: "Microsoft 365 DKIM not working",
    description:
      "Fix Office 365 DKIM failures caused by missing or incorrect selector CNAME records.",
    protocol: "dkim",
    category: "provider",
    priority: 1,
    featured: true,
    relatedSlugs: [
      "dkim-selector-not-found",
      "invalid-dkim-key",
      "dkim-alignment-failed",
      "google-workspace-dkim-not-working",
    ],
  },
  {
    href: "/dkim/amazon-ses-dkim-not-working",
    label: "Amazon SES DKIM not working",
    description:
      "Fix DKIM failures when Easy DKIM CNAME records are missing or misconfigured in Amazon SES.",
    protocol: "dkim",
    category: "provider",
    priority: 1,
    featured: true,
    relatedSlugs: [
      "dkim-selector-not-found",
      "invalid-dkim-key",
      "dkim-alignment-failed",
      "microsoft-365-dkim-not-working",
    ],
  },
  {
    href: "/dkim/dkim-signature-explained",
    label: "DKIM signature explained",
    description: "Header fields, verification, and body hash.",
    protocol: "dkim",
    category: "signature",
    priority: 0,
    featured: true,
    relatedSlugs: ["dkim-record-example", "dkim-body-hash-mismatch"],
  },
  {
    href: "/dkim/no-dkim-record-found",
    label: "No DKIM record found",
    description: "Start here when your domain publishes no DKIM key at all.",
    protocol: "dkim",
    category: "missing-record",
    priority: 1,
    featured: true,
    relatedSlugs: ["dkim-selector-not-found", "invalid-dkim-key"],
  },
  {
    href: "/dkim/invalid-dkim-key",
    label: "Invalid DKIM key",
    description: "Repair malformed, truncated, or badly formatted public keys.",
    protocol: "dkim",
    category: "key-issues",
    priority: 2,
    featured: true,
    relatedSlugs: ["no-dkim-record-found", "dkim-key-length-too-short"],
  },
  {
    href: "/dkim/dkim-selector-not-found",
    label: "DKIM selector not found",
    description: "Fix missing selector records so receivers can verify your signature.",
    protocol: "dkim",
    category: "selector",
    priority: 3,
    featured: true,
    relatedSlugs: ["dkim-selector-mismatch", "dkim-selector-explained"],
  },
  {
    href: "/dkim/dkim-selector-mismatch",
    label: "DKIM selector mismatch",
    description: "Fix cases where the sender uses a different selector than DNS.",
    protocol: "dkim",
    category: "selector",
    priority: 4,
    featured: false,
    relatedSlugs: ["dkim-selector-not-found", "dkim-alignment-failed"],
  },
  {
    href: "/dkim/dkim-key-length-too-short",
    label: "DKIM key length too short",
    description: "Upgrade legacy keys to modern recommended sizes.",
    protocol: "dkim",
    category: "key-issues",
    priority: 5,
    featured: false,
    relatedSlugs: ["invalid-dkim-key", "dkim-selector-explained"],
  },
  {
    href: "/dkim/dkim-body-hash-mismatch",
    label: "DKIM body hash mismatch",
    description: "See why gateways, footers, or forwarding can break signatures.",
    protocol: "dkim",
    category: "signature",
    priority: 6,
    featured: false,
    relatedSlugs: ["dkim-alignment-failed", "invalid-dkim-key"],
  },
  {
    href: "/dkim/dkim-alignment-failed",
    label: "DKIM alignment failed",
    description: "Understand why the signing domain does not align with From.",
    protocol: "dkim",
    category: "alignment",
    priority: 7,
    featured: false,
    relatedSlugs: ["dkim-selector-mismatch", "dkim-body-hash-mismatch"],
  },
  {
    href: "/dkim/dkim-selector-explained",
    label: "DKIM selector explained",
    description: "Learn how selectors work and why rotation depends on them.",
    protocol: "dkim",
    category: "selector",
    priority: 8,
    featured: false,
    relatedSlugs: ["dkim-selector-not-found", "dkim-selector-mismatch"],
  },
];

export const dmarcCluster: InternalLink[] = [
  {
    href: "/dmarc/dmarc-record-example",
    label: "DMARC record examples",
    description: "Monitoring and enforcement policy examples.",
    protocol: "dmarc",
    category: "examples",
    priority: 0,
    featured: true,
    relatedSlugs: ["dmarc-aggregate-reports-explained", "no-dmarc-record-found"],
  },
  {
    href: "/dmarc/dmarc-aggregate-reports-explained",
    label: "DMARC aggregate reports explained",
    description: "What RUA reports contain and how to use them.",
    protocol: "dmarc",
    category: "reporting",
    priority: 0,
    featured: true,
    relatedSlugs: ["dmarc-record-example", "dmarc-rua-ruf-not-working"],
  },
  {
    href: "/dmarc/no-dmarc-record-found",
    label: "No DMARC record found",
    description: "Publish your first DMARC policy safely.",
    protocol: "dmarc",
    category: "missing-record",
    priority: 1,
    featured: true,
    relatedSlugs: ["dmarc-policy-none-vs-quarantine-vs-reject", "dmarc-alignment-failed"],
  },
  {
    href: "/dmarc/multiple-dmarc-records-found",
    label: "Multiple DMARC records found",
    description: "Merge conflicting records into one policy.",
    protocol: "dmarc",
    category: "duplicate-records",
    priority: 2,
    featured: true,
    relatedSlugs: ["no-dmarc-record-found", "dmarc-policy-none-vs-quarantine-vs-reject"],
  },
  {
    href: "/dmarc/dmarc-alignment-failed",
    label: "DMARC alignment failed",
    description: "Fix SPF/DKIM alignment issues for your domain.",
    protocol: "dmarc",
    category: "alignment",
    priority: 3,
    featured: true,
    relatedSlugs: ["dmarc-aspf-adkim-explained", "dmarc-policy-none-vs-quarantine-vs-reject"],
  },
  {
    href: "/dmarc/dmarc-policy-none-vs-quarantine-vs-reject",
    label: "DMARC policy: none vs quarantine vs reject",
    description: "None vs quarantine vs reject explained.",
    protocol: "dmarc",
    category: "policy",
    priority: 4,
    featured: true,
    relatedSlugs: ["dmarc-pct-tag-explained", "dmarc-alignment-failed"],
  },
  {
    href: "/dmarc/dmarc-pct-tag-explained",
    label: "DMARC pct tag explained",
    description: "Gradual rollout strategy with percentage sampling.",
    protocol: "dmarc",
    category: "tags",
    priority: 5,
    featured: false,
    relatedSlugs: ["dmarc-policy-none-vs-quarantine-vs-reject", "dmarc-fo-tag-explained"],
  },
  {
    href: "/dmarc/dmarc-fo-tag-explained",
    label: "DMARC fo tag explained",
    description: "Control when forensic reports are generated.",
    protocol: "dmarc",
    category: "tags",
    priority: 6,
    featured: false,
    relatedSlugs: ["dmarc-rua-ruf-not-working", "dmarc-pct-tag-explained"],
  },
  {
    href: "/dmarc/dmarc-sp-subdomain-policy-explained",
    label: "DMARC sp subdomain policy explained",
    description: "Set policy for subdomains separately from the root.",
    protocol: "dmarc",
    category: "policy",
    priority: 7,
    featured: false,
    relatedSlugs: ["dmarc-policy-none-vs-quarantine-vs-reject", "dmarc-aspf-adkim-explained"],
  },
  {
    href: "/dmarc/dmarc-rua-ruf-not-working",
    label: "DMARC reports not working",
    description: "Diagnose RUA/RUF delivery problems.",
    protocol: "dmarc",
    category: "reporting",
    priority: 8,
    featured: false,
    relatedSlugs: ["dmarc-fo-tag-explained", "dmarc-pct-tag-explained"],
  },
  {
    href: "/dmarc/dmarc-aspf-adkim-explained",
    label: "DMARC aspf and adkim explained",
    description: "Relaxed vs strict alignment for SPF and DKIM.",
    protocol: "dmarc",
    category: "alignment",
    priority: 9,
    featured: false,
    relatedSlugs: ["dmarc-alignment-failed", "dmarc-sp-subdomain-policy-explained"],
  },
];

// ─── SEO Linking Engine ─────────────────────────────────────────────────────

const HUB_TO_CLUSTER: Record<string, InternalLink[]> = {
  "/spf": spfCluster,
  "/dkim": dkimCluster,
  "/dmarc": dmarcCluster,
} as const;

export type HubHref = keyof typeof HUB_TO_CLUSTER;

/**
 * Returns the cluster for a given hub href.
 */
export function getClusterByHubHref(hubHref: string): InternalLink[] {
  const cluster = HUB_TO_CLUSTER[hubHref as HubHref];
  return cluster ?? [];
}

/**
 * Derives the current slug from a pathname (e.g. /spf/spf-record-example → spf-record-example).
 */
export function getSlugFromPathname(pathname: string): string | null {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length < 2) return null;
  return segments[segments.length - 1] ?? null;
}

/**
 * Gets highly relevant related links using relatedSlugs first, then fills with featured/priority.
 * Excludes the current page. Deduplicates by href.
 */
export function getRelatedLinks(
  cluster: InternalLink[],
  pathname: string,
  limit: number = 4
): InternalLink[] {
  const slug = getSlugFromPathname(pathname);
  const protocol = cluster[0]?.protocol;
  if (!protocol || !slug) return [];

  const hrefBySlug = new Map<string, string>();
  const linkByHref = new Map<string, InternalLink>();
  for (const link of cluster) {
    const s = link.href.split("/").pop() ?? "";
    hrefBySlug.set(s, link.href);
    linkByHref.set(link.href, link);
  }

  const currentHref = `/${protocol}/${slug}`;
  const currentLink = cluster.find((l) => l.href === currentHref);
  const relatedSlugs = currentLink?.relatedSlugs ?? [];

  const seen = new Set<string>();
  const result: InternalLink[] = [];

  for (const s of relatedSlugs) {
    const href = hrefBySlug.get(s);
    if (href && href !== currentHref && !seen.has(href)) {
      const link = linkByHref.get(href);
      if (link) {
        seen.add(href);
        result.push(link);
      }
    }
  }

  if (result.length >= limit) return result.slice(0, limit);

  const sorted = [...cluster]
    .filter((l) => l.href !== currentHref && !seen.has(l.href))
    .sort((a, b) => {
      const aFeatured = a.featured === true ? 1 : 0;
      const bFeatured = b.featured === true ? 1 : 0;
      if (bFeatured !== aFeatured) return bFeatured - aFeatured;
      return (a.priority ?? 999) - (b.priority ?? 999);
    });

  for (const link of sorted) {
    if (result.length >= limit) break;
    seen.add(link.href);
    result.push(link);
  }

  return result;
}

/**
 * Gets explore links sorted by featured (true first) then priority (asc).
 * Excludes the current pathname. Deduplicates by href.
 */
export function getExploreLinks(
  cluster: InternalLink[],
  options: {
    limit?: number;
    excludePathname?: string;
  } = {}
): InternalLink[] {
  const { limit = 10, excludePathname } = options;

  const unique = Array.from(
    new Map(cluster.map((item) => [item.href, item])).values()
  );

  const filtered = excludePathname
    ? unique.filter((l) => l.href !== excludePathname)
    : unique;

  const sorted = [...filtered].sort((a, b) => {
    const aFeatured = a.featured === true ? 1 : 0;
    const bFeatured = b.featured === true ? 1 : 0;
    if (bFeatured !== aFeatured) return bFeatured - aFeatured;
    return (a.priority ?? 999) - (b.priority ?? 999);
  });

  return sorted.slice(0, limit);
}
