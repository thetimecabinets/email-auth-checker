import ErrorPageTemplate from "@/app/components/ErrorPageTemplate";
import { errorPages } from "@/app/data/errorPages";

export const metadata = {
  title: "DMARC rua/ruf Not Working – Fix DMARC Reporting",
  description:
    "Learn why DMARC rua or ruf reporting may not work and how to verify reporting addresses and authorization.",
};

export default function Page() {
  const data = errorPages["dmarc/dmarc-rua-ruf-not-working"];

  if (!data) {
    return <div>Missing error page data</div>;
  }

  return <ErrorPageTemplate {...data} />;
}