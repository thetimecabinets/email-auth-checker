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
  const cleanIntro = truncateIntro(intro, 150)
    .replace(/\s+/g, " ")
    .trim();

  return cleanIntro.endsWith(".") ? cleanIntro : `${cleanIntro}.`;
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
  const cleanTitle = title.replace(/\s*\(2026\)/, "");
  const description = buildMetaDescription(title, intro);
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