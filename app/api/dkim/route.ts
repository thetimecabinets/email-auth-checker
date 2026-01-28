import { NextResponse } from "next/server";
import dns from "dns/promises";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const domain = searchParams.get("domain");

  if (!domain) {
    return NextResponse.json(
      { error: "Domain is required" },
      { status: 400 }
    );
  }

  // Heuristic selectors (best effort only)
  const selectors = [
    "default",
    "selector1",
    "selector2",
    "google",
    "dkim",
    "mail",
  ];

  const results: { selector: string; record: string }[] = [];
  const errors: string[] = [];

  for (const selector of selectors) {
    const dkimDomain = `${selector}._domainkey.${domain}`;

    try {
      const records = await dns.resolveTxt(dkimDomain);
      const value = records.flat().join("");
      if (value.toLowerCase().includes("v=dkim1")) {
        results.push({ selector, record: value });
      }
    } catch (e: any) {
      if (e.code !== "ENOTFOUND" && e.code !== "ENODATA") {
        errors.push(`${selector}: ${e.code}`);
      }
    }
  }

  // ✅ DKIM FOUND
  if (results.length > 0) {
    return NextResponse.json({
      domain,
      status: "found",
      dkim: results,
    });
  }

  // ⚠️ DNS ERROR
  if (errors.length > 0) {
    return NextResponse.json({
      domain,
      status: "error",
      message: "Unable to verify DKIM due to DNS errors",
      errors,
    });
  }

  // ⚠️ NOT CHECKED (correct wording)
  return NextResponse.json({
    domain,
    status: "not_checked",
    message:
      "DKIM selector not provided. DKIM cannot be verified without a selector.",
  });
}
