import ErrorPageTemplate from "@/app/components/ErrorPageTemplate";
import { dkimErrors } from "@/app/data/dkimErrors";

export const metadata = {
  title: "DKIM Selector Mismatch – Fix DKIM Selector Problems",
  description:
    "Learn what a DKIM selector mismatch means and how to make the sender selector match the DNS record.",
};

export default function Page() {
  const data = dkimErrors["dkim/dkim-selector-mismatch"];

  if (!data) {
    return <div>Missing error page data</div>;
  }

  return <ErrorPageTemplate {...data} />;
}