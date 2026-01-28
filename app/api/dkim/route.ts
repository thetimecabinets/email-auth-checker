import { NextResponse } from "next/server";
import dns from "dns/promises";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const domain = searchParams.get("domain");

  if (!domain) {
    return NextResponse.json(
      { error: "Domain is required" },
      { status: 400 }
    );
  }

  try {
    // Common DKIM selectors to try
    const selectors = [
      "default",
      "selector1",
      "selector2",
      "google",
      "dkim",
      "mail",
    ];

    const results: { selector: string; record: string }[] = [];

    for (const selector of selectors) {
      const dkimDomain = `${selector}._domainkey.${domain}`;

      try {
        const records = await dns.resolveTxt(dkimDomain);
        const value = records.flat().join("");
        results.push({ selector, record: value });
      } catch {
        // Selector not found — ignore
      }
    }

    if (results.length === 0) {
      return NextResponse.json({
        domain,
        dkim: null,
        message: "No DKIM record found",
      });
    }

    return NextResponse.json({
      domain,
      dkim: results,
    });
  } catch {
    return NextResponse.json(
      { error: "Unable to retrieve DKIM record" },
      { status: 500 }
    );
  }
}
