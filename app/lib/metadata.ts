export const BASE_URL = "https://emaildnscheck.com";
export const LAST_UPDATED = new Date("2026-03-12");

export function truncateIntro(intro: string, maxLen: number = 160): string {
  if (intro.length <= maxLen) return intro;
  const trimmed = intro.slice(0, maxLen);
  const lastSpace = trimmed.lastIndexOf(" ");
  return lastSpace > 120 ? trimmed.slice(0, lastSpace) : trimmed;
}

export function buildMetaDescription(title: string, intro: string) {
  const cleanIntro = truncateIntro(intro, 110);
  const t = title.toLowerCase();

  if (t.includes("spf")) {
    return `${title}. ${cleanIntro} Learn what causes this SPF issue, how to fix it correctly, and how it can affect email delivery.`;
  }

  if (t.includes("dkim")) {
    return `${title}. ${cleanIntro} Learn why this DKIM issue happens, how to fix it step by step, and how it affects authentication and deliverability.`;
  }

  if (t.includes("dmarc")) {
    return `${title}. ${cleanIntro} Learn what this DMARC result means, how to troubleshoot it, and how it impacts domain protection and inbox placement.`;
  }

  return `${title}. ${cleanIntro} Learn the cause, see examples, and follow the steps to fix the issue.`;
}