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

  const dmarcDomain = `_dmarc.${domain}`;

  try {
    const records = await dns.resolveTxt(dmarcDomain);
    const value = records.flat().join("");

    const dmarcRecord = value.toLowerCase().startsWith("v=dmarc")
      ? value
      : null;

    return NextResponse.json({
      domain,
      dmarc: dmarcRecord,
    });
  } catch (err: any) {
    if (err.code === "ENOTFOUND" || err.code === "NXDOMAIN") {
      return NextResponse.json(
        {
          domain,
          dmarc: null,
          message: "No DMARC record found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: "Unable to retrieve DMARC record" },
      { status: 500 }
    );
  }
}
