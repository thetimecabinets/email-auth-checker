import ErrorPageTemplate from "@/app/components/ErrorPageTemplate";
import { errorPages } from "@/app/data/errorPages";

export const metadata = {
  title: "SPF Permerror: Too Many DNS Lookups – Fix SPF Lookup Limit",
  description:
    "Your SPF record exceeds the DNS lookup limit. Learn why SPF permerror happens and how to fix it.",
};

export default function Page() {
  const data = errorPages["spf/spf-permerror-too-many-dns-lookups"];

  if (!data) {
    return <div>Missing error page data</div>;
  }

  return <ErrorPageTemplate {...data} />;
}