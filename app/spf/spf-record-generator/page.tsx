import ErrorPageTemplate from "@/app/components/ErrorPageTemplate";
import { errorPages } from "@/app/data/errorPages";
import { BASE_URL, truncateIntro } from "@/app/lib/metadata";
import type { Metadata } from "next";

const PAGE_PATH = "/spf/spf-record-generator";
const ERROR_PAGE_KEY = "spf/spf-record-generator";

export async function generateMetadata(): Promise<Metadata> {
  const data = errorPages[ERROR_PAGE_KEY as keyof typeof errorPages];
  if (!data) {
    return { title: "Unknown" };
  }
  return {
    title: data.title,
    description: truncateIntro(data.intro),
    alternates: {
      canonical: `${BASE_URL}${PAGE_PATH}`,
    },
  };
}

export default function Page() {
  const data = errorPages[ERROR_PAGE_KEY as keyof typeof errorPages];

  if (!data) {
    return <div>Missing error page data</div>;
  }

  return <ErrorPageTemplate {...data} />;
}
