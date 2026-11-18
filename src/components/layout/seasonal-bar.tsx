"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";
import { CHRISTMAS_ENDS } from "@/lib/season-dates";

/** Last moment the Christmas notice is shown (normal hours resume 2 Jan 2027). */
const ENDS = Date.parse(CHRISTMAS_ENDS);
const subscribe = () => () => {};

/** Slim site-wide link to the Christmas opening times page, hidden once the season is over. */
export function SeasonalBar() {
  const pathname = usePathname();
  const active = useSyncExternalStore(subscribe, () => Date.now() < ENDS, () => true);
  if (!active || pathname === "/christmas" || pathname === "/") return null;
  return (
    <div className="bg-ink text-white">
      <Link
        href="/christmas"
        className="container-page flex h-9 items-center justify-center gap-2 text-sm font-semibold hover:text-squab-300"
      >
        <span aria-hidden>❄</span> Christmas opening times<span className="hidden sm:inline">: see when the Squab office is open</span>
        <span aria-hidden>→</span>
      </Link>
    </div>
  );
}
