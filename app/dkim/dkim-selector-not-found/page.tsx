import ErrorPageTemplate from "@/app/components/ErrorPageTemplate";
import { errorPages } from "@/app/data/errorPages";

export const metadata = {
  title: "DKIM Selector Not Found – Fix Missing DKIM Selector",
  description:
    "Learn why a DKIM selector is not found, how it affects DKIM verification, and how to publish the correct DNS record.",
};

export default function Page() {
  const data = errorPages["dkim/dkim-selector-not-found"];

  if (!data) {
    return <div>Missing error page data</div>;
  }

  return <ErrorPageTemplate {...data} />;
}