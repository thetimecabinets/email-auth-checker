import ErrorPageTemplate from "@/app/components/ErrorPageTemplate";
import { errorPages } from "@/app/data/errorPages";

export const metadata = {
  title: "DKIM Signature Explained – Header Fields, Verification, and Body Hash",
  description:
    "Understand the DKIM-Signature header: what each field means, how verification works, and why the body hash can fail.",
};

export default function Page() {
  const data = errorPages["dkim/dkim-signature-explained"];

  if (!data) {
    return <div>Missing error page data</div>;
  }

  return <ErrorPageTemplate {...data} />;
}
