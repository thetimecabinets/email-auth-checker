import ErrorPageTemplate from "@/app/components/ErrorPageTemplate";
import { errorPages } from "@/app/data/errorPages";

export const metadata = {
  title: "DKIM Selector Explained – What a DKIM Selector Does",
  description:
    "Learn what a DKIM selector is, how it maps to DNS, and why selectors matter when troubleshooting DKIM.",
};

export default function Page() {
  const data = errorPages["dkim/dkim-selector-explained"];

  if (!data) {
    return <div>Missing error page data</div>;
  }

  return <ErrorPageTemplate {...data} />;
}