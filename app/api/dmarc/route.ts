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

  const dmarcDomain = `_dmarc.${domain}`;

  try {
    const records = await dns.resolveTxt(dmarcDomain);

    const dmarcRecords = records
      .flat()
      .filter(v => v.toLowerCase().startsWith("v=dmarc"));

    if (dmarcRecords.length > 0) {
      return NextResponse.json({
        domain,
        status: "found",
        dmarc: dmarcRecords,
      });
    }

    return NextResponse.json({
      domain,
      status: "not_found",
      dmarc: null,
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        domain,
        status: "error",
        error: err.code || err.message,
      },
      { status: 500 }
    );
  }
}
