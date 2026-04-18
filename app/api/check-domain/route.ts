import { NextResponse } from "next/server";
import dns from "dns/promises";

export async function POST(req: Request) {
  const { domain } = await req.json();

  if (!domain) {
    return NextResponse.json({ error: "No domain provided" }, { status: 400 });
  }

  try {
    // SPF
    let spfRecord = null;
    try {
      const txt = await dns.resolveTxt(domain);
      const flat = txt.flat().join(" ");
      spfRecord = flat.includes("v=spf1") ? flat : null;
    } catch {}

    // DMARC
    let dmarcRecord = null;
    try {
      const dmarc = await dns.resolveTxt(`_dmarc.${domain}`);
      dmarcRecord = dmarc.flat().join(" ");
    } catch {}

    // DKIM (check common selectors)
    const selectors = ["default", "selector1", "selector2", "google"];
    let dkimFound = false;

    for (const sel of selectors) {
      try {
        const res = await dns.resolveTxt(`${sel}._domainkey.${domain}`);
        if (res) {
          dkimFound = true;
          break;
        }
      } catch {}
    }

    return NextResponse.json({
      domain,
      spf: spfRecord,
      dmarc: dmarcRecord,
      dkim: dkimFound,
    });
  } catch (e) {
    return NextResponse.json({ error: "DNS lookup failed" }, { status: 500 });
  }
}