import { internalLinks, seoPriority } from "@/app/data/internalLinks";
import { BASE_URL } from "@/app/lib/metadata";

const XML_HEADERS = {
  "Content-Type": "application/xml; charset=utf-8",
  "Cache-Control": "public, max-age=0, s-maxage=3600",
} as const;

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export async function GET(): Promise<Response> {
  const staticPages = [
    "",
    "/spf",
    "/dkim",
    "/dmarc",
    "/email-authentication-explained",
    "/spf-vs-dkim-vs-dmarc",
  ];

  const nowIso = new Date().toISOString();
  const staticUrls = staticPages.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: nowIso,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.9,
  }));

  const dynamicUrls = [...internalLinks]
    .sort((a, b) => seoPriority(b) - seoPriority(a))
    .map((link) => ({
      url: `${BASE_URL}${link.href}`,
      lastModified: nowIso,
      changeFrequency: (link.featured ? "weekly" : "monthly") as "weekly" | "monthly",
      priority: seoPriority(link),
    }));

  const sitemapEntries = Array.from(
    new Map(
      [...staticUrls, ...dynamicUrls].map((entry) => [entry.url, entry] as const)
    ).values()
  ).sort((a, b) => b.priority - a.priority || a.url.localeCompare(b.url));

  const xmlEntries = sitemapEntries
    .map((entry) => {
      const priority = entry.priority.toFixed(1);

      return [
        "  <url>",
        `    <loc>${escapeXml(entry.url)}</loc>`,
        `    <lastmod>${entry.lastModified}</lastmod>`,
        `    <changefreq>${entry.changeFrequency}</changefreq>`,
        `    <priority>${priority}</priority>`,
        "  </url>",
      ].join("\n");
    })
    .join("\n");

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    xmlEntries,
    "</urlset>",
  ].join("\n");

  return new Response(xml, { headers: XML_HEADERS });
}
