import type { MetadataRoute } from "next";
import { spfCluster, dkimCluster, dmarcCluster } from "./data/internalLinks";
import { BASE_URL } from "./lib/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { path: "", priority: 1.0 as const },
    { path: "/spf", priority: 0.9 as const },
    { path: "/dkim", priority: 0.9 as const },
    { path: "/dmarc", priority: 0.9 as const },
    { path: "/spf/spf-record-guide", priority: 0.8 as const },
    { path: "/dkim/dkim-guide", priority: 0.8 as const },
    { path: "/dmarc/dmarc-guide", priority: 0.8 as const },
    { path: "/email-authentication-explained", priority: 0.8 as const },
    { path: "/spf-vs-dkim-vs-dmarc", priority: 0.8 as const },
  ];

  const clusterHrefs = [
    ...spfCluster.map((item) => item.href),
    ...dkimCluster.map((item) => item.href),
    ...dmarcCluster.map((item) => item.href),
  ];

  const uniquePaths = Array.from(
    new Set([...staticRoutes.map((r) => r.path), ...clusterHrefs])
  );

  return uniquePaths.map((path) => {
    const staticEntry = staticRoutes.find((r) => r.path === path);
    return {
      url: `${BASE_URL}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: staticEntry?.priority ?? 0.7,
    };
  });
}
