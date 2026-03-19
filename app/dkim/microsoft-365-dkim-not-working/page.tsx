import ErrorPageTemplate from "@/app/components/ErrorPageClientWrapper";
import { getErrorPage, type ErrorPageKey } from "@/app/lib/getErrorPage";
import { BASE_URL, buildMetaDescription } from "@/app/lib/metadata";
import type { Metadata } from "next";

const PAGE_PATH = "/dkim/microsoft-365-dkim-not-working";
const ERROR_PAGE_KEY: ErrorPageKey = "dkim/microsoft-365-dkim-not-working";

export async function generateMetadata(): Promise<Metadata> {
  const data = getErrorPage(ERROR_PAGE_KEY);
  if (!data) {
    return { title: "Unknown" };
  }
  return {
    title: "Microsoft 365 DKIM Not Working? Fix CNAME Setup (2026)",
    description: buildMetaDescription(data.title, data.intro),
    alternates: {
      canonical: `${BASE_URL}${PAGE_PATH}`,
    },
  };
}

export default function Page() {
  const data = getErrorPage(ERROR_PAGE_KEY);

  if (!data) {
    return <div>Missing error page data</div>;
  }

  return <ErrorPageTemplate {...data} />;
}

