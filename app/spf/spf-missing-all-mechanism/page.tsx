import ErrorPageTemplate from "@/app/components/ErrorPageTemplate";
import { errorPages } from "@/app/data/errorPages";

export const metadata = {
  title: "SPF Missing All Mechanism – Why Your Record Needs ~all or -all",
  description:
    "Your SPF record is missing the required all mechanism. Learn why SPF must end with ~all or -all and how to fix incomplete records.",
};

export default function Page() {
  const data = errorPages["spf/spf-missing-all-mechanism"];

  if (!data) {
    return <div>Missing error page data</div>;
  }

  return <ErrorPageTemplate {...data} />;
}
