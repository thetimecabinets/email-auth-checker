import ErrorPageTemplate from "@/app/components/ErrorPageTemplate";
import { errorPages } from "@/app/data/errorPages";

export const metadata = {
  title: "SPF IPv6 Misconfiguration – Fix SPF for IPv6 Senders",
  description:
    "Learn why SPF can fail for IPv6 senders and how to authorize the correct IPv6 ranges in your SPF record.",
};

export default function Page() {
  const data = errorPages["spf/spf-ipv6-misconfiguration"];

  if (!data) {
    return <div>Missing error page data</div>;
  }

  return <ErrorPageTemplate {...data} />;
}