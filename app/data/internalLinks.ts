export type InternalLink = {
  href: string;
  label: string;
  description?: string;
};

export const spfCluster: InternalLink[] = [
  { href: "/spf/no-spf-record-found", label: "No SPF record found", description: "Start here when your domain publishes no SPF at all." },
  { href: "/spf/multiple-spf-records-found", label: "Multiple SPF records found", description: "Why duplicate SPF breaks evaluation and how to merge safely." },
  { href: "/spf/spf-permerror-too-many-dns-lookups", label: "SPF permerror: too many DNS lookups", description: "Identify every include/redirect that contributes to lookup bloat." },
  { href: "/spf/spf-include-flattening", label: "SPF include flattening", description: "When to flatten, when to avoid it, and safer alternatives." },
  { href: "/spf/spf-softfail-explained", label: "SPF softfail explained", description: "What ~all means and when to use it during rollout." },
  { href: "/spf/spf-neutral-result-explained", label: "SPF neutral result explained", description: "Understand why neutral is not the same as pass." },
  { href: "/spf/spf-record-syntax-error", label: "SPF record syntax error", description: "Fix typos, missing colons, and malformed mechanisms." },
  { href: "/spf/spf-missing-all-mechanism", label: "SPF missing all mechanism", description: "Why your record needs ~all or -all and how to add it." },
  { href: "/spf/spf-ip-not-authorized", label: "SPF IP not authorized", description: "Add the correct sending IP or provider include." },
  { href: "/spf/spf-record-too-long", label: "SPF record too long", description: "Shorten your policy to stay within DNS limits." },
  { href: "/spf/spf-softfail-vs-fail", label: "SPF softfail vs fail", description: "Choose the right qualifier for your enforcement stage." },
  { href: "/spf/spf-redirect-explained", label: "SPF redirect explained", description: "Delegate SPF logic cleanly across subdomains or providers." },
  { href: "/spf/spf-ipv6-misconfiguration", label: "SPF IPv6 misconfiguration", description: "Make sure modern IPv6 ranges are correctly represented." },
];

export const dkimCluster: InternalLink[] = [
  { href: "/dkim/no-dkim-record-found", label: "No DKIM record found", description: "Start here when your domain publishes no DKIM key at all." },
  { href: "/dkim/invalid-dkim-key", label: "Invalid DKIM key", description: "Repair malformed, truncated, or badly formatted public keys." },
  { href: "/dkim/dkim-selector-not-found", label: "DKIM selector not found", description: "Fix missing selector records so receivers can verify your signature." },
  { href: "/dkim/dkim-selector-mismatch", label: "DKIM selector mismatch", description: "Fix cases where the sender uses a different selector than DNS." },
  { href: "/dkim/dkim-key-length-too-short", label: "DKIM key length too short", description: "Upgrade legacy keys to modern recommended sizes." },
  { href: "/dkim/dkim-body-hash-mismatch", label: "DKIM body hash mismatch", description: "See why gateways, footers, or forwarding can break signatures." },
  { href: "/dkim/dkim-alignment-failed", label: "DKIM alignment failed", description: "Understand why the signing domain does not align with From." },
  { href: "/dkim/dkim-selector-explained", label: "DKIM selector explained", description: "Learn how selectors work and why rotation depends on them." },
];

export const dmarcCluster: InternalLink[] = [
  { href: "/dmarc/no-dmarc-record-found", label: "No DMARC record found", description: "Publish your first DMARC policy safely." },
  { href: "/dmarc/multiple-dmarc-records-found", label: "Multiple DMARC records found", description: "Merge conflicting records into one policy." },
  { href: "/dmarc/dmarc-alignment-failed", label: "DMARC alignment failed", description: "Fix SPF/DKIM alignment issues for your domain." },
  { href: "/dmarc/dmarc-policy-none-vs-quarantine-vs-reject", label: "DMARC policy: none vs quarantine vs reject", description: "None vs quarantine vs reject explained." },
  { href: "/dmarc/dmarc-pct-tag-explained", label: "DMARC pct tag explained", description: "Gradual rollout strategy with percentage sampling." },
  { href: "/dmarc/dmarc-fo-tag-explained", label: "DMARC fo tag explained", description: "Control when forensic reports are generated." },
  { href: "/dmarc/dmarc-sp-subdomain-policy-explained", label: "DMARC sp subdomain policy explained", description: "Set policy for subdomains separately from the root." },
  { href: "/dmarc/dmarc-rua-ruf-not-working", label: "DMARC reports not working", description: "Diagnose RUA/RUF delivery problems." },
  { href: "/dmarc/dmarc-aspf-adkim-explained", label: "DMARC aspf and adkim explained", description: "Relaxed vs strict alignment for SPF and DKIM." },
];
