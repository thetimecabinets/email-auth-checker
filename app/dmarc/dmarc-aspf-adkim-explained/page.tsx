import ErrorPageTemplate from "@/app/components/ErrorPageTemplate";
import { errorPages } from "@/app/data/errorPages";

export const metadata = {
  title: "DMARC aspf and adkim Explained – Alignment Settings Guide",
  description:
    "Learn what the DMARC aspf and adkim tags do and how relaxed vs strict alignment changes DMARC behavior.",
};

export default function Page() {
  const data = errorPages["dmarc/dmarc-aspf-adkim-explained"];

  if (!data) {
    return <div>Missing error page data</div>;
  }

  return <ErrorPageTemplate {...data} />;
}