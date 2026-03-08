import ErrorPageTemplate from "@/app/components/ErrorPageTemplate";
import { errorPages } from "@/app/data/errorPages";

export const metadata = {
  title: "SPF Record Syntax Explained – Mechanisms, Qualifiers, and Structure",
  description:
    "Understand SPF syntax: mechanisms, qualifiers, and record structure. Learn how include, ip4, -all, and ~all work together in an SPF policy.",
};

export default function Page() {
  const data = errorPages["spf/spf-record-syntax-explained"];

  if (!data) {
    return <div>Missing error page data</div>;
  }

  return <ErrorPageTemplate {...data} />;
}
