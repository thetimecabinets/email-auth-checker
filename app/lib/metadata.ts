export const BASE_URL = "https://emaildnscheck.com";
export const LAST_UPDATED = new Date("2026-03-12");

export function truncateIntro(intro: string, maxLen: number = 160): string {
  if (intro.length <= maxLen) return intro;
  const trimmed = intro.slice(0, maxLen);
  const lastSpace = trimmed.lastIndexOf(" ");
  return lastSpace > 120 ? trimmed.slice(0, lastSpace) : trimmed;
}
