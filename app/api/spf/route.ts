import { NextResponse } from "next/server";
import dns from "dns/promises";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const domain = searchParams.get("domain");

  if (!domain) {
    return NextResponse.json(
      { error: "Missing domain parameter" },
      { status: 400 }
    );
  }

  try {
    const records = await dns.resolveTxt(domain);

    const spfRecords = records
      .flat()
      .filter(r => r.toLowerCase().startsWith("v=spf1"));

    if (spfRecords.length > 0) {
      return NextResponse.json({
        domain,
        status: "found",
        spf: spfRecords,
      });
    }

    return NextResponse.json({
      domain,
      status: "not_found",
      spf: null,
    });
  } catch (err: any) {
    return NextResponse.json({
      domain,
      status: "error",
      error: err.code || err.message,
    }, { status: 500 });
  }
}
