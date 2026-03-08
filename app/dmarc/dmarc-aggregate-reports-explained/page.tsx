import ErrorPageTemplate from "@/app/components/ErrorPageTemplate";
import { errorPages } from "@/app/data/errorPages";

export const metadata = {
  title: "DMARC Aggregate Reports Explained – What RUA Reports Contain and How to Use Them",
  description:
    "Understand DMARC aggregate reports: XML structure, authentication results, and how to use RUA data for policy decisions.",
};

export default function Page() {
  const data = errorPages["dmarc/dmarc-aggregate-reports-explained"];

  if (!data) {
    return <div>Missing error page data</div>;
  }

  return <ErrorPageTemplate {...data} />;
}
