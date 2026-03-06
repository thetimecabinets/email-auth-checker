import ErrorPageTemplate from "@/app/components/ErrorPageTemplate";
import { errorPages } from "@/app/data/errorPages";

export const metadata = {
  title: "DMARC Policy: None vs Quarantine vs Reject",
  description:
    "Learn the difference between DMARC none, quarantine, and reject, and how to choose the right policy.",
};

export default function Page() {
  const data = errorPages["dmarc/dmarc-policy-none-vs-quarantine-vs-reject"];

  if (!data) {
    return <div>Missing error page data</div>;
  }

  return <ErrorPageTemplate {...data} />;
}