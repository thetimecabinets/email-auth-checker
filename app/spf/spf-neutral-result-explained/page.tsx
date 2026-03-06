import ErrorPageTemplate from "@/app/components/ErrorPageTemplate";
import { errorPages } from "@/app/data/errorPages";

export const metadata = {
  title: "SPF Neutral Result Explained – What Neutral Means",
  description:
    "Learn what an SPF neutral result means, why it happens, and why most domains should avoid a neutral SPF policy.",
};

export default function Page() {
  const data = errorPages["spf/spf-neutral-result-explained"];

  if (!data) {
    return <div>Missing error page data</div>;
  }

  return <ErrorPageTemplate {...data} />;
}