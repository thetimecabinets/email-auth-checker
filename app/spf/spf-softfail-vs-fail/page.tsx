import ErrorPageTemplate from "@/app/components/ErrorPageTemplate";
import { errorPages } from "@/app/data/errorPages";

export const metadata = {
  title: "SPF Softfail vs Fail – Understanding ~all and -all",
  description:
    "Learn the difference between SPF softfail and SPF fail, and how to choose the right SPF qualifier.",
};

export default function Page() {
  const data = errorPages["spf/spf-softfail-vs-fail"];

  if (!data) {
    return <div>Missing error page data</div>;
  }

  return <ErrorPageTemplate {...data} />;
}