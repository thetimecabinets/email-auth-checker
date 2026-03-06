import ErrorPageTemplate from "@/app/components/ErrorPageTemplate";
import { errorPages } from "@/app/data/errorPages";

export const metadata = {
  title: "DKIM Key Length Too Short – Upgrade Weak DKIM Keys",
  description:
    "Learn why short DKIM keys are risky, how they affect trust, and how to rotate to a stronger DKIM key.",
};

export default function Page() {
  const data = errorPages["dkim/dkim-key-length-too-short"];

  if (!data) {
    return <div>Missing error page data</div>;
  }

  return <ErrorPageTemplate {...data} />;
}