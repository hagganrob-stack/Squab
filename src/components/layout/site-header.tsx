import Link from "next/link";
import { Search, UserRound } from "lucide-react";
import { Wordmark } from "./wordmark";
import { DesktopNav } from "./desktop-nav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-paper/90 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-4 lg:h-[4.5rem]">
        <Wordmark />
        <DesktopNav />
        <div className="flex items-center gap-1.5">
          <Link
            href="/search"
            className="inline-flex h-10 items-center gap-2 rounded-full px-3 text-sm font-medium text-stone-muted ring-1 ring-line transition-colors hover:text-ink hover:ring-ink/25 lg:bg-white xl:w-44"
          >
            <Search aria-hidden className="size-4" />
            <span className="sr-only xl:not-sr-only">Search</span>
          </Link>
          <Link
            href="/account"
            className="hidden h-10 items-center gap-2 rounded-full bg-ink px-3 text-sm xl:px-4 font-semibold text-white transition-colors hover:bg-ink-soft lg:inline-flex"
          >
            <UserRound aria-hidden className="size-4" />
            <span className="sr-only xl:not-sr-only">Account</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
