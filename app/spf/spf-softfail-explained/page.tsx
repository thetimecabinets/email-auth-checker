import ErrorPageTemplate from "@/app/components/ErrorPageTemplate";
import { errorPages } from "@/app/data/errorPages";

export const metadata = {
  title: "SPF Softfail Explained – What ~all Means and When to Use It",
  description:
    "SPF softfail (~all) signals that unauthorized senders are probably not allowed. Learn how softfail works, when to use it, and how it differs from hard fail.",
};

export default function Page() {
  const data = errorPages["spf/spf-softfail-explained"];

  if (!data) {
    return <div>Missing error page data</div>;
  }

  return <ErrorPageTemplate {...data} />;
}
