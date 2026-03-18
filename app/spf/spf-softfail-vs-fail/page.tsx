import ErrorPageTemplate from "@/app/components/ErrorPageTemplate";
import { errorPages } from "@/app/data/errorPages";
import { BASE_URL, buildMetaDescription } from "@/app/lib/metadata";
import type { Metadata } from "next";

const PAGE_PATH = "/spf/spf-softfail-vs-fail";
const ERROR_PAGE_KEY = "spf/spf-softfail-vs-fail";

export async function generateMetadata(): Promise<Metadata> {
  const data = errorPages[ERROR_PAGE_KEY as keyof typeof errorPages];
  if (!data) {
    return { title: "Unknown" };
  }
  return {
    title: `${data.title} | Email DNS Check`,
    description: buildMetaDescription(data.title, data.intro),
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