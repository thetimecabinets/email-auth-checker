import dns from "dns/promises";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

export async function GET() {
  try {
    const spf = await dns.resolveTxt("deblauwetand.nl");
    const dmarc = await dns.resolveTxt("_dmarc.deblauwetand.nl");

    return Response.json({ spf, dmarc });
  } catch (e: any) {
    return Response.json(
      { error: e.code, message: e.message },
      { status: 500 }
    );
  }
}
