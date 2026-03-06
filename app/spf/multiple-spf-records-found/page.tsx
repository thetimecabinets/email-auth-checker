import ErrorPageTemplate from "@/app/components/ErrorPageTemplate";
import { errorPages } from "@/app/data/errorPages";

export const metadata = {
  title: "Multiple SPF Records Found – How to Fix SPF",
  description:
    "Your domain has multiple SPF records. Learn why this breaks SPF validation and how to merge SPF records correctly.",
};

export default function Page() {
  const data = errorPages["spf/multiple-spf-records-found"];

  if (!data) {
    return <div>Missing error page data</div>;
  }

  return <ErrorPageTemplate {...data} />;
}