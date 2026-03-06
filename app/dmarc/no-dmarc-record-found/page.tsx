import ErrorPageTemplate from "@/app/components/ErrorPageTemplate";
import { errorPages } from "@/app/data/errorPages";

export const metadata = {
  title: "No DMARC Record Found – Fix Missing DMARC",
  description:
    "Learn what it means when no DMARC record is found and how to publish a valid DMARC policy.",
};

export default function Page() {
  const data = errorPages["dmarc/no-dmarc-record-found"];

  if (!data) {
    return <div>Missing error page data</div>;
  }

  return <ErrorPageTemplate {...data} />;
}