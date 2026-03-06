import ErrorPageTemplate from "@/app/components/ErrorPageTemplate";
import { errorPages } from "@/app/data/errorPages";

export const metadata = {
  title: "Invalid DKIM Key – Fix Malformed DKIM DNS Records",
  description:
    "Learn why a DKIM key is invalid, how malformed DNS records break DKIM, and how to fix the selector record.",
};

export default function Page() {
  const data = errorPages["dkim/invalid-dkim-key"];

  if (!data) {
    return <div>Missing error page data</div>;
  }

  return <ErrorPageTemplate {...data} />;
}