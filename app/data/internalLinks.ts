export type InternalLink = {
  href: string;
  label: string;
};

export const spfCluster: InternalLink[] = [
  { href: "/spf/no-spf-record-found", label: "No SPF record found" },
  { href: "/spf/multiple-spf-records-found", label: "Multiple SPF records found" },
  { href: "/spf/spf-permerror-too-many-dns-lookups", label: "SPF permerror: too many DNS lookups" },
  { href: "/spf/spf-include-flattening", label: "SPF include flattening" },
  { href: "/spf/spf-softfail-explained", label: "SPF softfail explained" },
  { href: "/spf/spf-neutral-result-explained", label: "SPF neutral result explained" },
  { href: "/spf/spf-record-syntax-error", label: "SPF record syntax error" },
  { href: "/spf/spf-missing-all-mechanism", label: "SPF missing all mechanism" },
  { href: "/spf/spf-ip-not-authorized", label: "SPF IP not authorized" },
  { href: "/spf/spf-record-too-long", label: "SPF record too long" }
];

export const dkimCluster: InternalLink[] = [
  { href: "/dkim/no-dkim-record-found", label: "No DKIM record found" },
  { href: "/dkim/invalid-dkim-key", label: "Invalid DKIM key" },
  { href: "/dkim/dkim-selector-not-found", label: "DKIM selector not found" },
  { href: "/dkim/dkim-selector-mismatch", label: "DKIM selector mismatch" },
  { href: "/dkim/dkim-key-length-too-short", label: "DKIM key length too short" },
  { href: "/dkim/dkim-body-hash-mismatch", label: "DKIM body hash mismatch" },
  { href: "/dkim/dkim-alignment-failed", label: "DKIM alignment failed" }
];

export const dmarcCluster: InternalLink[] = [
  { href: "/dmarc/no-dmarc-record-found", label: "No DMARC record found" },
  { href: "/dmarc/multiple-dmarc-records-found", label: "Multiple DMARC records found" },
  { href: "/dmarc/dmarc-alignment-failed", label: "DMARC alignment failed" },
  { href: "/dmarc/dmarc-policy-none-vs-quarantine-vs-reject", label: "DMARC policy: none vs quarantine vs reject" },
  { href: "/dmarc/dmarc-pct-tag-explained", label: "DMARC pct tag explained" },
  { href: "/dmarc/dmarc-fo-tag-explained", label: "DMARC fo tag explained" },
  { href: "/dmarc/dmarc-sp-subdomain-policy-explained", label: "DMARC sp subdomain policy explained" }
];