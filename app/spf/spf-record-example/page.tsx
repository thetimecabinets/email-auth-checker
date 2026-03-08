import ErrorPageTemplate from "@/app/components/ErrorPageTemplate";
import { errorPages } from "@/app/data/errorPages";

export const metadata = {
  title: "SPF Record Examples – Copy-Paste SPF for Google, Microsoft 365, SendGrid",
  description:
    "Real SPF record examples for common setups. Copy-paste templates for Google Workspace, Microsoft 365, SendGrid, and hybrid configurations with correct syntax.",
};

export default function Page() {
  const data = errorPages["spf/spf-record-example"];

  if (!data) {
    return <div>Missing error page data</div>;
  }

  return <ErrorPageTemplate {...data} />;
}
