import ErrorPageTemplate from "@/app/components/ErrorPageTemplate";
import { errorPages } from "@/app/data/errorPages";

export const metadata = {
  title: "DMARC pct Tag Explained – Partial DMARC Enforcement",
  description:
    "Learn what the DMARC pct tag does, when to use staged enforcement, and why pct should not stay low forever.",
};

export default function Page() {
  const data = errorPages["dmarc/dmarc-pct-tag-explained"];

  if (!data) {
    return <div>Missing error page data</div>;
  }

  return <ErrorPageTemplate {...data} />;
}