export type InternalLink = {
  href: string;
  label: string;
  description?: string;
  protocol: "spf" | "dkim" | "dmarc";
  intent: "fix" | "learn" | "tool" | "compare";
  crossLinks?: string[];
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
    intent: "learn",
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
    intent: "fix",
    category: "provider",
    priority: 1,
    featured: true,
    relatedSlugs: [
      "spf-record-syntax-explained",
      "multiple-spf-records-found",
      "spf-permerror-too-many-dns-lookups",
    ],
    crossLinks: ["/dmarc/dmarc-alignment-failed", "/dmarc/sendgrid-dmarc-fail"],
  },
  {
    href: "/spf/google-workspace-spf-not-working",
    label: "Google Workspace SPF not working",
    description:
      "Fix Google Workspace SPF failures when include:_spf.google.com is missing or misconfigured.",
    protocol: "spf",
    intent: "fix",
    category: "provider",
    priority: 1,
    featured: true,
    relatedSlugs: [
      "multiple-spf-records-found",
      "spf-record-syntax-explained",
      "spf-permerror-too-many-dns-lookups",
    ],
    crossLinks: [
      "/dmarc/dmarc-alignment-failed",
      "/dmarc/google-workspace-dmarc-not-working",
    ],
  },
  {
    href: "/spf/spf-fail-gmail",
    label: "SPF fail in Gmail",
    description: "Why Gmail shows SPF fail and how to troubleshoot the real cause.",
    protocol: "spf",
    intent: "fix",
    category: "provider",
    priority: 3,
    featured: true,
    relatedSlugs: [
      "spf-ip-not-authorized",
      "multiple-spf-records-found",
      "spf-permerror-too-many-dns-lookups"
    ],
  },
  {
    href: "/spf/spf-fail-outlook",
    label: "SPF fail in Outlook",
    description: "Why Outlook shows SPF fail and how to fix envelope-domain SPF issues.",
    protocol: "spf",
    intent: "fix",
    category: "provider",
    priority: 3,
    featured: true,
    relatedSlugs: [
      "spf-ip-not-authorized",
      "multiple-spf-records-found",
      "spf-permerror-too-many-dns-lookups"
    ],
  },
  {
    href: "/spf/spf-fail-yahoo",
    label: "SPF fail in Yahoo",
    description: "Troubleshoot Yahoo SPF failures caused by sender-path and SPF policy mismatches.",
    protocol: "spf",
    intent: "fix",
    category: "provider",
    priority: 3,
    featured: true,
    relatedSlugs: [
      "spf-ip-not-authorized",
      "multiple-spf-records-found",
      "spf-permerror-too-many-dns-lookups"
    ],
  },
  {
    href: "/spf/spf-pass-but-still-spam",
    label: "SPF pass but still spam",
    description: "Why SPF pass alone does not guarantee inboxing and what to fix next.",
    protocol: "spf",
    intent: "fix",
    category: "deliverability",
    priority: 3,
    featured: true,
    relatedSlugs: [
      "spf-softfail-vs-fail",
      "dmarc-alignment-failed",
      "dkim-alignment-failed"
    ],
  },
  {
    href: "/spf/microsoft-365-spf-not-working",
    label: "Microsoft 365 SPF not working",
    description:
      "Fix Microsoft 365 SPF failures when include:spf.protection.outlook.com is missing or duplicated.",
    protocol: "spf",
    intent: "fix",
    category: "provider",
    priority: 1,
    featured: true,
    relatedSlugs: [
      "google-workspace-spf-not-working",
      "multiple-spf-records-found",
      "spf-record-syntax-explained",
    ],
    crossLinks: [
      "/dmarc/dmarc-alignment-failed",
      "/dmarc/microsoft-365-dmarc-not-working",
    ],
  },
  {
    href: "/spf/amazon-ses-spf-not-working",
    label: "Amazon SES SPF not working",
    description:
      "Fix SES SPF failures by publishing the correct include on the right MAIL FROM domain.",
    protocol: "spf",
    intent: "fix",
    category: "provider",
    priority: 1,
    featured: true,
    relatedSlugs: [
      "spf-ip-not-authorized",
      "spf-record-syntax-explained",
      "multiple-spf-records-found",
    ],
    crossLinks: ["/dmarc/dmarc-alignment-failed"],
  },
  {
    href: "/spf/sendgrid-spf-permerror",
    label: "SendGrid SPF permerror",
    description:
      "Fix SendGrid SPF permerror caused by duplicate records or excessive lookup depth.",
    protocol: "spf",
    intent: "fix",
    category: "provider",
    priority: 2,
    featured: true,
    relatedSlugs: [
      "sendgrid-spf-not-working",
      "spf-permerror-too-many-dns-lookups",
      "spf-include-flattening",
    ],
    crossLinks: ["/dmarc/dmarc-alignment-failed", "/dmarc/sendgrid-dmarc-fail"],
  },
  {
    href: "/spf/mailchimp-spf-not-working",
    label: "Mailchimp SPF not working",
    description:
      "Fix Mailchimp SPF failures when include:servers.mcsv.net is missing or not merged correctly.",
    protocol: "spf",
    intent: "fix",
    category: "provider",
    priority: 2,
    featured: true,
    relatedSlugs: [
      "multiple-spf-records-found",
      "spf-record-syntax-explained",
      "spf-permerror-too-many-dns-lookups",
    ],
    crossLinks: [
      "/dmarc/dmarc-alignment-failed",
      "/dmarc/mailchimp-dmarc-alignment-failed",
    ],
  },
  {
    href: "/spf/spf-lookup-checker",
    label: "SPF lookup checker",
    description: "Check how many DNS lookups your SPF record uses.",
    protocol: "spf",
    intent: "tool",
    category: "tool",
    priority: 2,
    featured: true,
  },
  {
    href: "/spf/spf-record-syntax-explained",
    label: "SPF record syntax explained",
    description: "Mechanisms, qualifiers, and record structure.",
    protocol: "spf",
    intent: "learn",
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
    intent: "tool",
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
    intent: "fix",
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
    intent: "fix",
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
    intent: "fix",
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
    intent: "fix",
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
    intent: "learn",
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
    intent: "learn",
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
    intent: "fix",
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
    intent: "fix",
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
    intent: "fix",
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
    intent: "fix",
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
    intent: "compare",
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
    intent: "learn",
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
    intent: "fix",
    category: "authorization",
    priority: 13,
    featured: false,
    relatedSlugs: ["spf-ip-not-authorized", "spf-include-flattening"],
  },
  {
    href: "/spf/spf-record-not-found-sometimes",
    label: "SPF record not found sometimes",
    description:
      "Stabilize intermittent SPF lookups across resolvers, NS drift, and TXT fragmentation.",
    protocol: "spf",
    intent: "fix",
    category: "technical",
    priority: 2,
    featured: false,
    relatedSlugs: ["multiple-spf-records-found", "no-spf-record-found", "spf-record-syntax-error"],
  },
  {
    href: "/spf/spf-include-not-working",
    label: "SPF include not working",
    description: "Trace broken include chains, stale hostnames, and lookup limits before mail fails.",
    protocol: "spf",
    intent: "fix",
    category: "technical",
    priority: 2,
    featured: false,
    relatedSlugs: ["spf-include-flattening", "spf-permerror-too-many-dns-lookups", "spf-redirect-explained"],
  },
  {
    href: "/spf/spf-macro-misconfiguration",
    label: "SPF macro misconfiguration",
    description:
      "Debug advanced SPF macros, expansion bounds, and envelope-aware failures.",
    protocol: "spf",
    intent: "fix",
    category: "technical",
    priority: 2,
    featured: false,
    relatedSlugs: [
      "spf-record-syntax-explained",
      "spf-permerror-too-many-dns-lookups",
      "spf-record-syntax-error",
    ],
  },
  {
    href: "/spf/spf-helo-fail",
    label: "SPF HELO fail",
    description:
      "Align EHLO hostnames with SPF so SMTP identity checks stop tripping independently of MAIL FROM.",
    protocol: "spf",
    intent: "fix",
    category: "deliverability",
    priority: 2,
    featured: false,
    relatedSlugs: ["spf-neutral-result-explained", "spf-ip-not-authorized", "spf-softfail-vs-fail"],
  },
];

export const dkimCluster: InternalLink[] = [
  {
    href: "/dkim/dkim-record-example",
    label: "DKIM record examples",
    description: "Real DNS TXT examples and how to read them.",
    protocol: "dkim",
    intent: "learn",
    category: "examples",
    priority: 0,
    featured: true,
    relatedSlugs: ["dkim-signature-explained", "dkim-selector-explained"],
    crossLinks: ["/dmarc/dmarc-alignment-failed"],
  },
  {
    href: "/dkim/google-workspace-dkim-not-working",
    label: "Google Workspace DKIM not working",
    description:
      "Fix Gmail DKIM failures when the Google Workspace selector or DNS record is misconfigured.",
    protocol: "dkim",
    intent: "fix",
    category: "provider",
    priority: 1,
    featured: true,
    relatedSlugs: [
      "dkim-selector-not-found",
      "invalid-dkim-key",
      "dkim-alignment-failed",
    ],
    crossLinks: [
      "/dmarc/dmarc-alignment-failed",
      "/dmarc/google-workspace-dmarc-not-working",
    ],
  },
  {
    href: "/dkim/microsoft-365-dkim-not-working",
    label: "Microsoft 365 DKIM not working",
    description:
      "Fix Office 365 DKIM failures caused by missing or incorrect selector CNAME records.",
    protocol: "dkim",
    intent: "fix",
    category: "provider",
    priority: 1,
    featured: true,
    relatedSlugs: [
      "dkim-selector-not-found",
      "invalid-dkim-key",
      "dkim-alignment-failed",
      "google-workspace-dkim-not-working",
    ],
    crossLinks: [
      "/dmarc/dmarc-alignment-failed",
      "/dmarc/microsoft-365-dmarc-not-working",
    ],
  },
  {
    href: "/dkim/dkim-fail-gmail",
    label: "DKIM fail in Gmail",
    description: "Why Gmail shows DKIM fail and how to troubleshoot selectors, keys, and signing flow.",
    protocol: "dkim",
    intent: "fix",
    category: "provider",
    priority: 3,
    featured: true,
    relatedSlugs: [
      "dkim-selector-not-found",
      "invalid-dkim-key",
      "dkim-body-hash-mismatch"
    ],
  },
  {
    href: "/dkim/dkim-fail-outlook",
    label: "DKIM fail in Outlook",
    description: "Fix Outlook DKIM validation issues caused by selector drift and signing inconsistencies.",
    protocol: "dkim",
    intent: "fix",
    category: "provider",
    priority: 3,
    featured: true,
    relatedSlugs: [
      "dkim-selector-mismatch",
      "dkim-selector-not-found",
      "dkim-body-hash-mismatch"
    ],
  },
  {
    href: "/dkim/amazon-ses-dkim-not-working",
    label: "Amazon SES DKIM not working",
    description:
      "Fix DKIM failures when Easy DKIM CNAME records are missing or misconfigured in Amazon SES.",
    protocol: "dkim",
    intent: "fix",
    category: "provider",
    priority: 1,
    featured: true,
    relatedSlugs: [
      "dkim-selector-not-found",
      "invalid-dkim-key",
      "dkim-alignment-failed",
      "microsoft-365-dkim-not-working",
    ],
    crossLinks: ["/dmarc/dmarc-alignment-failed"],
  },
  {
    href: "/dkim/dkim-signature-explained",
    label: "DKIM signature explained",
    description: "Header fields, verification, and body hash.",
    protocol: "dkim",
    intent: "learn",
    category: "signature",
    priority: 0,
    featured: true,
    relatedSlugs: ["dkim-record-example", "dkim-body-hash-mismatch"],
    crossLinks: ["/dmarc/dmarc-alignment-failed"],
  },
  {
    href: "/dkim/no-dkim-record-found",
    label: "No DKIM record found",
    description: "Start here when your domain publishes no DKIM key at all.",
    protocol: "dkim",
    intent: "fix",
    category: "missing-record",
    priority: 1,
    featured: true,
    relatedSlugs: ["dkim-selector-not-found", "invalid-dkim-key"],
    crossLinks: ["/dmarc/no-dmarc-record-found", "/dmarc/dmarc-alignment-failed"],
  },
  {
    href: "/dkim/invalid-dkim-key",
    label: "Invalid DKIM key",
    description: "Repair malformed, truncated, or badly formatted public keys.",
    protocol: "dkim",
    intent: "fix",
    category: "key-issues",
    priority: 2,
    featured: true,
    relatedSlugs: ["no-dkim-record-found", "dkim-key-length-too-short"],
    crossLinks: ["/dmarc/dmarc-alignment-failed"],
  },
  {
    href: "/dkim/dkim-selector-not-found",
    label: "DKIM selector not found",
    description: "Fix missing selector records so receivers can verify your signature.",
    protocol: "dkim",
    intent: "fix",
    category: "selector",
    priority: 3,
    featured: true,
    relatedSlugs: ["dkim-selector-mismatch", "dkim-selector-explained"],
    crossLinks: ["/dmarc/dmarc-alignment-failed"],
  },
  {
    href: "/dkim/dkim-selector-mismatch",
    label: "DKIM selector mismatch",
    description: "Fix cases where the sender uses a different selector than DNS.",
    protocol: "dkim",
    intent: "fix",
    category: "selector",
    priority: 4,
    featured: false,
    relatedSlugs: ["dkim-selector-not-found", "dkim-alignment-failed"],
    crossLinks: ["/dmarc/dmarc-alignment-failed"],
  },
  {
    href: "/dkim/dkim-key-length-too-short",
    label: "DKIM key length too short",
    description: "Upgrade legacy keys to modern recommended sizes.",
    protocol: "dkim",
    intent: "fix",
    category: "key-issues",
    priority: 5,
    featured: false,
    relatedSlugs: ["invalid-dkim-key", "dkim-selector-explained"],
    crossLinks: ["/dmarc/dmarc-alignment-failed"],
  },
  {
    href: "/dkim/dkim-body-hash-mismatch",
    label: "DKIM body hash mismatch",
    description: "See why gateways, footers, or forwarding can break signatures.",
    protocol: "dkim",
    intent: "fix",
    category: "signature",
    priority: 6,
    featured: false,
    relatedSlugs: ["dkim-alignment-failed", "invalid-dkim-key"],
    crossLinks: ["/dmarc/dmarc-alignment-failed"],
  },
  {
    href: "/dkim/dkim-alignment-failed",
    label: "DKIM alignment failed",
    description: "Understand why the signing domain does not align with From.",
    protocol: "dkim",
    intent: "fix",
    category: "alignment",
    priority: 7,
    featured: false,
    relatedSlugs: ["dkim-selector-mismatch", "dkim-body-hash-mismatch"],
    crossLinks: ["/dmarc/dmarc-alignment-failed"],
  },
  {
    href: "/dkim/dkim-selector-explained",
    label: "DKIM selector explained",
    description: "Learn how selectors work and why rotation depends on them.",
    protocol: "dkim",
    intent: "learn",
    category: "selector",
    priority: 8,
    featured: false,
    relatedSlugs: ["dkim-selector-not-found", "dkim-selector-mismatch"],
    crossLinks: ["/dmarc/dmarc-alignment-failed"],
  },
  {
    href: "/dkim/dkim-invalid-key-format",
    label: "DKIM invalid key format",
    description:
      "Repair malformed DKIM TXT strings, PEM pastes, and broken tag grammar before verification runs.",
    protocol: "dkim",
    intent: "fix",
    category: "technical",
    priority: 2,
    featured: false,
    relatedSlugs: ["invalid-dkim-key", "dkim-selector-not-found", "dkim-record-example"],
  },
  {
    href: "/dkim/dkim-key-too-short",
    label: "DKIM key truncated in DNS",
    description:
      "Fix ‘key too short’ errors caused by TXT chunking and partial uploads, not only bit strength.",
    protocol: "dkim",
    intent: "fix",
    category: "technical",
    priority: 2,
    featured: false,
    relatedSlugs: ["dkim-key-length-too-short", "invalid-dkim-key", "dkim-record-example"],
  },
  {
    href: "/dkim/dkim-multiple-signatures-conflict",
    label: "Multiple DKIM signatures conflict",
    description:
      "Untangle double-signing pipelines so the aligned DKIM pass is the one DMARC can use.",
    protocol: "dkim",
    intent: "fix",
    category: "technical",
    priority: 2,
    featured: false,
    relatedSlugs: [
      "dkim-signature-explained",
      "dkim-body-hash-mismatch",
      "dkim-alignment-failed",
    ],
  },
  {
    href: "/dkim/dkim-signature-expired",
    label: "DKIM signature expired",
    description: "Resolve clock skew, tight x= windows, and moderation delays that outlive signatures.",
    protocol: "dkim",
    intent: "fix",
    category: "technical",
    priority: 2,
    featured: false,
    relatedSlugs: ["dkim-signature-explained", "dkim-body-hash-mismatch", "dkim-fail-gmail"],
  },
];

export const dmarcCluster: InternalLink[] = [
  {
    href: "/dmarc/dmarc-generator",
    label: "DMARC generator",
    description: "Generate a valid DMARC record in seconds.",
    protocol: "dmarc",
    intent: "tool",
    category: "tool",
    priority: 1,
    featured: true,
  },
  {
    href: "/dmarc/dmarc-record-example",
    label: "DMARC record examples",
    description: "Monitoring and enforcement policy examples.",
    protocol: "dmarc",
    intent: "learn",
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
    intent: "learn",
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
    intent: "fix",
    category: "missing-record",
    priority: 1,
    featured: true,
    relatedSlugs: ["dmarc-policy-none-vs-quarantine-vs-reject", "dmarc-alignment-failed"],
    crossLinks: ["/spf/no-spf-record-found", "/dkim/no-dkim-record-found"],
  },
  {
    href: "/dmarc/google-workspace-dmarc-not-working",
    label: "Google Workspace DMARC not working",
    description:
      "Fix Google Workspace DMARC failures caused by alignment gaps and policy misconfiguration.",
    protocol: "dmarc",
    intent: "fix",
    category: "provider",
    priority: 1,
    featured: true,
    relatedSlugs: [
      "dmarc-alignment-failed",
      "dmarc-policy-none-vs-quarantine-vs-reject",
      "dmarc-aggregate-reports-explained",
    ],
    crossLinks: [
      "/dkim/google-workspace-dkim-not-working",
      "/spf/google-workspace-spf-not-working",
    ],
  },
  {
    href: "/dmarc/microsoft-365-dmarc-not-working",
    label: "Microsoft 365 DMARC not working",
    description:
      "Fix Microsoft 365 DMARC failures by correcting alignment and policy rollout.",
    protocol: "dmarc",
    intent: "fix",
    category: "provider",
    priority: 1,
    featured: true,
    relatedSlugs: [
      "dmarc-alignment-failed",
      "dmarc-policy-none-vs-quarantine-vs-reject",
      "dmarc-aspf-adkim-explained",
    ],
    crossLinks: [
      "/dkim/microsoft-365-dkim-not-working",
      "/spf/microsoft-365-spf-not-working",
    ],
  },
  {
    href: "/dmarc/dmarc-fail-gmail",
    label: "DMARC fail in Gmail",
    description: "Why Gmail DMARC fails and how to fix SPF/DKIM alignment for your From domain.",
    protocol: "dmarc",
    intent: "fix",
    category: "provider",
    priority: 3,
    featured: true,
    relatedSlugs: [
      "dmarc-alignment-failed",
      "dmarc-policy-none-vs-quarantine-vs-reject",
      "no-dmarc-record-found"
    ],
  },
  {
    href: "/dmarc/dmarc-fail-outlook",
    label: "DMARC fail in Outlook",
    description: "Troubleshoot Outlook DMARC failures caused by sender alignment and policy rollout issues.",
    protocol: "dmarc",
    intent: "fix",
    category: "provider",
    priority: 3,
    featured: true,
    relatedSlugs: [
      "dmarc-alignment-failed",
      "microsoft-365-dmarc-not-working",
      "dmarc-policy-none-vs-quarantine-vs-reject"
    ],
  },
  {
    href: "/dmarc/dmarc-policy-reject-causing-fail",
    label: "DMARC reject causing fail",
    description: "Recover safely when strict reject policy blocks legitimate email.",
    protocol: "dmarc",
    intent: "fix",
    category: "technical",
    priority: 3,
    featured: true,
    relatedSlugs: [
      "dmarc-policy-none-vs-quarantine-vs-reject",
      "dmarc-alignment-failed",
      "dmarc-pct-tag-explained"
    ],
  },
  {
    href: "/dmarc/dmarc-quarantine-sending-to-spam",
    label: "DMARC quarantine sending to spam",
    description: "Understand why quarantine routes mail to spam and how to reduce false positives.",
    protocol: "dmarc",
    intent: "fix",
    category: "deliverability",
    priority: 3,
    featured: true,
    relatedSlugs: [
      "dmarc-policy-none-vs-quarantine-vs-reject",
      "dmarc-alignment-failed",
      "dmarc-aggregate-reports-explained"
    ],
  },
  {
    href: "/dmarc/sendgrid-dmarc-fail",
    label: "SendGrid DMARC fail",
    description:
      "Resolve SendGrid DMARC failures by fixing sender alignment and staged enforcement.",
    protocol: "dmarc",
    intent: "fix",
    category: "provider",
    priority: 2,
    featured: true,
    relatedSlugs: [
      "dmarc-alignment-failed",
      "dmarc-aggregate-reports-explained",
      "dmarc-policy-none-vs-quarantine-vs-reject",
    ],
    crossLinks: ["/spf/sendgrid-spf-permerror", "/spf/sendgrid-spf-not-working"],
  },
  {
    href: "/dmarc/mailchimp-dmarc-alignment-failed",
    label: "Mailchimp DMARC alignment failed",
    description:
      "Fix Mailchimp campaign alignment issues that trigger DMARC failures.",
    protocol: "dmarc",
    intent: "fix",
    category: "alignment",
    priority: 2,
    featured: true,
    relatedSlugs: [
      "dmarc-alignment-failed",
      "dmarc-aspf-adkim-explained",
      "dmarc-policy-none-vs-quarantine-vs-reject",
    ],
    crossLinks: ["/spf/mailchimp-spf-not-working", "/dkim/dkim-alignment-failed"],
  },
  {
    href: "/dmarc/multiple-dmarc-records-found",
    label: "Multiple DMARC records found",
    description: "Merge conflicting records into one policy.",
    protocol: "dmarc",
    intent: "fix",
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
    intent: "fix",
    category: "alignment",
    priority: 3,
    featured: true,
    relatedSlugs: ["dmarc-aspf-adkim-explained", "dmarc-policy-none-vs-quarantine-vs-reject"],
    crossLinks: ["/dkim/dkim-alignment-failed", "/spf/spf-neutral-result-explained"],
  },
  {
    href: "/dmarc/dmarc-policy-none-vs-quarantine-vs-reject",
    label: "DMARC policy: none vs quarantine vs reject",
    description: "None vs quarantine vs reject explained.",
    protocol: "dmarc",
    intent: "compare",
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
    intent: "learn",
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
    intent: "learn",
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
    intent: "learn",
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
    intent: "fix",
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
    intent: "learn",
    category: "alignment",
    priority: 9,
    featured: false,
    relatedSlugs: ["dmarc-alignment-failed", "dmarc-sp-subdomain-policy-explained"],
  },
  {
    href: "/dmarc/dmarc-record-invalid",
    label: "DMARC record invalid",
    description:
      "Fix broken DMARC tag grammar—semicolons, duplicates, and illegal values—before enforcement applies.",
    protocol: "dmarc",
    intent: "fix",
    category: "technical",
    priority: 2,
    featured: false,
    relatedSlugs: ["multiple-dmarc-records-found", "dmarc-record-example", "no-dmarc-record-found"],
  },
  {
    href: "/dmarc/dmarc-missing-rua",
    label: "DMARC missing rua",
    description:
      "Add aggregate reporting so DMARC changes stay evidence-driven instead of guesswork.",
    protocol: "dmarc",
    intent: "fix",
    category: "technical",
    priority: 2,
    featured: false,
    relatedSlugs: [
      "dmarc-rua-ruf-not-working",
      "dmarc-aggregate-reports-explained",
      "dmarc-record-example",
    ],
  },
  {
    href: "/dmarc/dmarc-subdomain-policy-not-working",
    label: "DMARC subdomain policy not working",
    description:
      "Clarify when sp= applies, how child _dmarc rows override, and what alignment still demands.",
    protocol: "dmarc",
    intent: "fix",
    category: "technical",
    priority: 2,
    featured: false,
    relatedSlugs: [
      "dmarc-sp-subdomain-policy-explained",
      "dmarc-alignment-failed",
      "dmarc-policy-none-vs-quarantine-vs-reject",
    ],
  },
  {
    href: "/dmarc/dmarc-spf-dkim-both-fail",
    label: "DMARC when SPF and DKIM both fail",
    description:
      "Recover when neither protocol passes alignment so DMARC has no positive authentication path.",
    protocol: "dmarc",
    intent: "fix",
    category: "deliverability",
    priority: 2,
    featured: false,
    relatedSlugs: [
      "dmarc-alignment-failed",
      "dmarc-aspf-adkim-explained",
      "dmarc-policy-none-vs-quarantine-vs-reject",
    ],
  },
];

function getSlugFromHref(href: string): string {
  const segments = href.split("/").filter(Boolean);
  return segments[segments.length - 1] ?? "";
}

export function enforceBidirectionalLinks(cluster: InternalLink[]): void {
  const linkBySlug = new Map<string, InternalLink>();

  for (const link of cluster) {
    const slug = getSlugFromHref(link.href);
    if (slug) {
      linkBySlug.set(slug, link);
    }
  }

  for (const sourceLink of cluster) {
    const sourceSlug = getSlugFromHref(sourceLink.href);
    if (!sourceSlug) continue;

    const relatedSlugs = sourceLink.relatedSlugs ?? [];
    for (const targetSlug of relatedSlugs) {
      const targetLink = linkBySlug.get(targetSlug);
      if (!targetLink || targetLink === sourceLink) continue;

      if (!targetLink.relatedSlugs) {
        targetLink.relatedSlugs = [];
      }
      if (!targetLink.relatedSlugs.includes(sourceSlug)) {
        targetLink.relatedSlugs.push(sourceSlug);
      }
    }
  }
}

enforceBidirectionalLinks(spfCluster);
enforceBidirectionalLinks(dkimCluster);
enforceBidirectionalLinks(dmarcCluster);

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

function normalizePathname(pathname: string): string {
  const base = pathname.split("?")[0]?.split("#")[0] ?? pathname;
  if (base.length > 1 && base.endsWith("/")) {
    return base.slice(0, -1);
  }
  return base;
}

/**
 * Returns cross-protocol links configured for the current page.
 * Safely handles missing mappings, deduplicates by href, and limits output.
 */
export function getCrossProtocolLinks(
  currentPathname: string,
  limit: number = 3
): InternalLink[] {
  const pathname = normalizePathname(currentPathname);
  const allLinks = [...spfCluster, ...dkimCluster, ...dmarcCluster];
  const linkByHref = new Map(allLinks.map((link) => [link.href, link]));
  const currentLink = linkByHref.get(pathname);

  if (!currentLink?.crossLinks?.length) {
    return [];
  }

  const seen = new Set<string>();
  const crossProtocolLinks: InternalLink[] = [];

  for (const href of currentLink.crossLinks) {
    const target = linkByHref.get(href);
    if (!target) continue;
    if (target.href === pathname) continue;
    if (target.protocol === currentLink.protocol) continue;
    if (seen.has(target.href)) continue;
    seen.add(target.href);
    crossProtocolLinks.push(target);
    if (crossProtocolLinks.length >= limit) break;
  }

  return crossProtocolLinks;
}

export function scoreLink(link: InternalLink, current: InternalLink): number {
  let score = 0;
  const currentRelated = current.relatedSlugs ?? [];
  const linkSlug = getSlugFromPathname(link.href);
  const sameIntent = link.intent === current.intent;
  const sameCategory =
    Boolean(link.category) &&
    Boolean(current.category) &&
    link.category === current.category;
  const relatedMatch = linkSlug ? currentRelated.includes(linkSlug) : false;
  const crossMatch =
    (current.crossLinks ?? []).includes(link.href) ||
    (link.crossLinks ?? []).includes(current.href);

  if (sameIntent) score += 10;
  if (relatedMatch) score += 6;
  if (sameCategory) score += 5;
  if (crossMatch) score += 4;
  if (link.featured === true) score += 3;

  // Lower numeric priority should rank higher.
  const priorityValue = link.priority ?? 10;
  score += Math.max(0, 10 - priorityValue);

  return score;
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

  const currentHref = `/${protocol}/${slug}`;
  const currentLink = cluster.find((l) => l.href === currentHref);
  if (!currentLink) return [];

  const uniqueCandidates = Array.from(
    new Map(cluster.map((item) => [item.href, item])).values()
  ).filter((link) => link.href !== currentHref);

  const scored = uniqueCandidates
    .map((link) => {
      let score = scoreLink(link, currentLink);
      const linkSlug = getSlugFromPathname(link.href);
      if (linkSlug && (currentLink.relatedSlugs ?? []).includes(linkSlug)) {
        score += 20;
      }
      return { link, score };
    })
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((item) => item.link);
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

  const current = excludePathname
    ? unique.find((item) => item.href === excludePathname)
    : undefined;

  const filtered = excludePathname
    ? unique.filter((l) => l.href !== excludePathname)
    : unique;

  const scored = filtered
    .map((link) => {
      const score = current
        ? scoreLink(link, current) - (link.intent === current.intent ? 2 : 0)
        : (link.featured ? 3 : 0) + Math.max(0, 10 - (link.priority ?? 10));
      return { link, score };
    })
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((item) => item.link);
}
