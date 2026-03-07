import { spfErrors } from "./spfErrors";
import { dkimErrors } from "./dkimErrors";
import { dmarcErrors } from "./dmarcErrors";

export const errorPages = {
  ...spfErrors,
  ...dkimErrors,
  ...dmarcErrors
};