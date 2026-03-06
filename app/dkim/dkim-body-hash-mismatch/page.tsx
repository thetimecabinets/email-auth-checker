import ErrorPageTemplate from "@/app/components/ErrorPageTemplate";
import { errorPages } from "@/app/data/errorPages";

export const metadata = {
  title: "DKIM Body Hash Mismatch – Fix DKIM Body Hash Errors",
  description:
    "Learn what a DKIM body hash mismatch means, why email content changes after signing break DKIM, and how to fix it.",
};

export default function Page() {
  const data = errorPages["dkim/dkim-body-hash-mismatch"];

  if (!data) {
    return <div>Missing error page data</div>;
  }

  return <ErrorPageTemplate {...data} />;
}