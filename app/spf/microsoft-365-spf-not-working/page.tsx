import ErrorPageTemplate from "@/app/components/ErrorPageClientWrapper";
import { getErrorPage, type ErrorPageKey } from "@/app/lib/getErrorPage";
import { buildMetadata } from "@/app/lib/metadata";
import type { Metadata } from "next";

const PAGE_PATH = "/spf/microsoft-365-spf-not-working";
const ERROR_PAGE_KEY: ErrorPageKey = "spf/microsoft-365-spf-not-working";

export async function generateMetadata(): Promise<Metadata> {
  const data = getErrorPage(ERROR_PAGE_KEY);

  if (!data) {
    return { title: "Unknown" };
  }

  return buildMetadata({
    title: data.title,
    intro: data.intro,
    path: PAGE_PATH,
  });
}

export default function Page() {
  const data = getErrorPage(ERROR_PAGE_KEY);

  if (!data) {
    return <div>Missing error page data</div>;
  }

  return <ErrorPageTemplate {...data} />;
}
