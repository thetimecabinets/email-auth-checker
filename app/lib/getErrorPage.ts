import { spfErrors } from "@/app/data/spfErrors";
import { dkimErrors } from "@/app/data/dkimErrors";
import { dmarcErrors } from "@/app/data/dmarcErrors";

const allErrorPages = {
  ...spfErrors,
  ...dkimErrors,
  ...dmarcErrors,
};

export type ErrorPageKey = keyof typeof allErrorPages;
export type ErrorPageData = (typeof allErrorPages)[ErrorPageKey];

export function getErrorPage(key: ErrorPageKey): ErrorPageData | undefined {
  return allErrorPages[key];
}