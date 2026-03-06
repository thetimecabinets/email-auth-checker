import ErrorPageTemplate from "@/app/components/ErrorPageTemplate";
import { errorPages } from "@/app/data/errorPages";

export const metadata = {
  title: "Multiple DMARC Records Found – Fix Duplicate DMARC",
  description:
    "Learn why multiple DMARC records break policy clarity and how to keep one valid DMARC record.",
};

export default function Page() {
  const data = errorPages["dmarc/multiple-dmarc-records-found"];

  if (!data) {
    return <div>Missing error page data</div>;
  }

  return <ErrorPageTemplate {...data} />;
}