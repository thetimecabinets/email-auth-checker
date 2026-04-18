export function generateTitle(title: string, type: "spf" | "dkim" | "dmarc") {
  const prefix = title.replace(/-/g, " ");

  const base =
    type === "spf"
      ? "SPF"
      : type === "dkim"
      ? "DKIM"
      : "DMARC";

  return `${prefix} (${base} Error Fix Guide)`;
}
