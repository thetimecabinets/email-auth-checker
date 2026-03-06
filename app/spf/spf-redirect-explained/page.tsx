import ErrorPageTemplate from "@/app/components/ErrorPageTemplate";
import { errorPages } from "@/app/data/errorPages";

export const metadata = {
  title: "SPF Redirect Explained – SPF Redirect vs Include",
  description:
    "Learn what SPF redirect does, how it differs from include, and when redirect should or should not be used.",
};

export default function Page() {
  const data = errorPages["spf/spf-redirect-explained"];

  if (!data) {
    return <div>Missing error page data</div>;
  }

  return <ErrorPageTemplate {...data} />;
}