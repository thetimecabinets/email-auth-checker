import ErrorPageTemplate from "@/app/components/ErrorPageTemplate";
import { errorPages } from "@/app/data/errorPages";

export const metadata = {
  title: "DKIM Record Examples – Real DNS TXT Examples and How to Read Them",
  description:
    "Realistic DKIM TXT record examples for Google, Microsoft 365, and custom selectors. Learn how to read and validate DKIM DNS records.",
};

export default function Page() {
  const data = errorPages["dkim/dkim-record-example"];

  if (!data) {
    return <div>Missing error page data</div>;
  }

  return <ErrorPageTemplate {...data} />;
}
