import ErrorPageTemplate from "@/app/components/ErrorPageTemplate";
import { errorPages } from "@/app/data/errorPages";

export const metadata = {
  title: "How to Build an SPF Record – Step-by-Step Guide with Examples",
  description:
    "Build an SPF record correctly from scratch. Follow a step-by-step process to add includes, avoid lookup limits, and end with the right qualifier.",
};

export default function Page() {
  const data = errorPages["spf/spf-record-generator"];

  if (!data) {
    return <div>Missing error page data</div>;
  }

  return <ErrorPageTemplate {...data} />;
}
