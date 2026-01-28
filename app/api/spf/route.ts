import { NextResponse } from "next/server";
import dns from "dns/promises";

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
    // First: check if domain exists at all
    await dns.resolveAny(domain);

    // Then: fetch SPF (TXT records)
    const records = await dns.resolveTxt(domain);

    const spfRecord = records
      .flat()
      .find((r) => r.toLowerCase().startsWith("v=spf1"));

    return NextResponse.json({
      domain,
      spf: spfRecord || null,
    });
  } catch (err: any) {
    // Domain does not exist
    if (err.code === "ENOTFOUND" || err.code === "NXDOMAIN") {
      return NextResponse.json(
        { error: "Domain does not exist" },
        { status: 404 }
      );
    }

    // Other DNS / server error
    return NextResponse.json(
      { error: "Unable to retrieve SPF record" },
      { status: 500 }
    );
  }
}
