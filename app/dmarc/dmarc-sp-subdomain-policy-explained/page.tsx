import ErrorPageTemplate from "@/app/components/ErrorPageTemplate";
import { errorPages } from "@/app/data/errorPages";

export const metadata = {
  title: "DMARC sp Subdomain Policy Explained",
  description:
    "Learn what the DMARC sp tag does and how to control DMARC policy for subdomains.",
};

export default function Page() {
  const data = errorPages["dmarc/dmarc-sp-subdomain-policy-explained"];

  if (!data) {
    return <div>Missing error page data</div>;
  }

  return <ErrorPageTemplate {...data} />;
}