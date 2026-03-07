import ErrorPageTemplate from "@/app/components/ErrorPageTemplate";
import { errorPages } from "@/app/data/errorPages";

export const metadata = {
  title: "SPF Record Syntax Error – Fix Invalid SPF TXT Format",
  description:
    "Your SPF record has a syntax error that prevents receivers from parsing it. Learn how to fix common SPF syntax mistakes and validate your DNS TXT record.",
};

export default function Page() {
  const data = errorPages["spf/spf-record-syntax-error"];

  if (!data) {
    return <div>Missing error page data</div>;
  }

  return <ErrorPageTemplate {...data} />;
}
