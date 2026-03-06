import ErrorPageTemplate from "@/app/components/ErrorPageTemplate";
import { errorPages } from "@/app/data/errorPages";

export const metadata = {
  title: "DMARC fo Tag Explained – DMARC Failure Reporting",
  description:
    "Learn what the DMARC fo tag means, how forensic reporting works, and when to use fo values.",
};

export default function Page() {
  const data = errorPages["dmarc/dmarc-fo-tag-explained"];

  if (!data) {
    return <div>Missing error page data</div>;
  }

  return <ErrorPageTemplate {...data} />;
}