import type { MetadataRoute } from "next";

const BASE_URL = "https://emaildnscheck.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",

    // DKIM
    "/dkim/no-dkim-record-found",
    "/dkim/dkim-selector-not-found",
    "/dkim/invalid-dkim-key",
    "/dkim/dkim-alignment-failed",
    "/dkim/dkim-key-length-too-short",
    "/dkim/dkim-selector-explained",
    "/dkim/dkim-selector-mismatch",
    "/dkim/dkim-body-hash-mismatch",

    // SPF
    "/spf/spf-permerror-too-many-dns-lookups",
    "/spf/spf-softfail-vs-fail",
    "/spf/multiple-spf-records-found",
    "/spf/spf-include-flattening",
    "/spf/spf-redirect-explained",
    "/spf/spf-neutral-result-explained",

    // DMARC
    "/dmarc/no-dmarc-record-found",
    "/dmarc/dmarc-policy-none-vs-quarantine-vs-reject",
    "/dmarc/dmarc-alignment-failed",
    "/dmarc/dmarc-rua-ruf-not-working",
    "/dmarc/dmarc-pct-tag-explained",
    "/dmarc/dmarc-sp-subdomain-policy-explained",
    "/dmarc/dmarc-fo-tag-explained",
    "/dmarc/dmarc-aspf-adkim-explained",
    "/dmarc/multiple-dmarc-records-found",
  ];

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
