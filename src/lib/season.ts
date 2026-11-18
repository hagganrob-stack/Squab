import { cacheLife } from "next/cache";

import { CHRISTMAS_ENDS } from "./season-dates";

export { CHRISTMAS_ENDS };

/** True until CHRISTMAS_ENDS. Cached for at most an hour, like the pages using it. */
export async function isChristmasSeason() {
  "use cache";
  cacheLife("hours");
  return Date.now() < Date.parse(CHRISTMAS_ENDS);
}
