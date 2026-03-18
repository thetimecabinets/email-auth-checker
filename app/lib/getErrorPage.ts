import { spfErrors } from "@/app/data/spfErrors";
import { dkimErrors } from "@/app/data/dkimErrors";
import { dmarcErrors } from "@/app/data/dmarcErrors";

export function getErrorPage(key: string) {
  return (
    spfErrors[key as keyof typeof spfErrors] ||
    dkimErrors[key as keyof typeof dkimErrors] ||
    dmarcErrors[key as keyof typeof dmarcErrors]
  );
}

