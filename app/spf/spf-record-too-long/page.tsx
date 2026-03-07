import ErrorPageTemplate from "@/app/components/ErrorPageTemplate";
import { errorPages } from "@/app/data/errorPages";

export const metadata = {
  title: "SPF Record Too Long – Fix TXT Length and DNS Limits",
  description:
    "Your SPF record exceeds DNS TXT length limits. Learn why SPF records can be truncated or rejected and how to shorten your policy safely.",
};

export default function Page() {
  const data = errorPages["spf/spf-record-too-long"];

  if (!data) {
    return <div>Missing error page data</div>;
  }

  return <ErrorPageTemplate {...data} />;
}
