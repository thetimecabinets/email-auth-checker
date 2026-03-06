import ErrorPageTemplate from "@/app/components/ErrorPageTemplate";
import { errorPages } from "@/app/data/errorPages";

export const metadata = {
  title: "DMARC Alignment Failed – Fix DMARC Alignment Issues",
  description:
    "Learn why DMARC alignment fails, how SPF and DKIM alignment work, and how to fix DMARC failures.",
};

export default function Page() {
  const data = errorPages["dmarc/dmarc-alignment-failed"];

  if (!data) {
    return <div>Missing error page data</div>;
  }

  return <ErrorPageTemplate {...data} />;
}