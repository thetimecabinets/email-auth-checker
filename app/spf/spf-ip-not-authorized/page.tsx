import ErrorPageTemplate from "@/app/components/ErrorPageTemplate";
import { errorPages } from "@/app/data/errorPages";

export const metadata = {
  title: "SPF IP Not Authorized – Fix Unauthorized Sender Failures",
  description:
    "Your mail is failing SPF because the sending IP is not authorized in your SPF record. Learn how to identify the correct IP and add it to your policy.",
};

export default function Page() {
  const data = errorPages["spf/spf-ip-not-authorized"];

  if (!data) {
    return <div>Missing error page data</div>;
  }

  return <ErrorPageTemplate {...data} />;
}
