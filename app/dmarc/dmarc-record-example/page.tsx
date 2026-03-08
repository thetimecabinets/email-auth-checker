import ErrorPageTemplate from "@/app/components/ErrorPageTemplate";
import { errorPages } from "@/app/data/errorPages";

export const metadata = {
  title: "DMARC Record Examples – Monitoring and Enforcement Policies",
  description:
    "Correct DMARC TXT record examples for p=none, p=quarantine, and p=reject. Copy-paste templates with rua, ruf, and pct.",
};

export default function Page() {
  const data = errorPages["dmarc/dmarc-record-example"];

  if (!data) {
    return <div>Missing error page data</div>;
  }

  return <ErrorPageTemplate {...data} />;
}
