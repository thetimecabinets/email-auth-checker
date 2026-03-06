import ErrorPageTemplate from "@/app/components/ErrorPageTemplate";
import { errorPages } from "@/app/data/errorPages";

export const metadata = {
  title: "SPF Include Flattening – Reduce SPF Lookup Complexity",
  description:
    "Learn what SPF include flattening is, when to use it, and how to keep SPF under the DNS lookup limit.",
};

export default function Page() {
  const data = errorPages["spf/spf-include-flattening"];

  if (!data) {
    return <div>Missing error page data</div>;
  }

  return <ErrorPageTemplate {...data} />;
}