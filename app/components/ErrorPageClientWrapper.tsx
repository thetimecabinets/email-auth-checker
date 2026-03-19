"use client";

import { usePathname } from "next/navigation";

import ErrorPageTemplate from "./ErrorPageTemplate";
import type { ErrorPageData } from "@/app/types/errorPage";

export default function ErrorPageClientWrapper(props: ErrorPageData) {
  const pathname = usePathname();
  return <ErrorPageTemplate {...props} pathname={pathname} />;
}

