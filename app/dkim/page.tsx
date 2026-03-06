import ErrorPageTemplate from "@/app/components/ErrorPageTemplate";
import { errorPages } from "@/app/data/errorPages";

export const metadata = {
  title: "No DKIM Record Found – Fix Missing DKIM",
  description:
    "Learn what it means when no DKIM record is found and how to publish the correct DKIM selector in DNS.",
};

export default function Page() {
  const data = errorPages["dkim/no-dkim-record-found"];

  if (!data) {
    return <div>Missing error page data</div>;
  }

  return <ErrorPageTemplate {...data} />;
}