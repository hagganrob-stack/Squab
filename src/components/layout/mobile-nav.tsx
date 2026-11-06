"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Compass, Home, Tag, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";
import { isActive } from "./nav-items";

const items = [
  { href: "/", label: "Home", icon: Home },
  { href: "/perks", label: "Perks", icon: Tag },
  { href: "/businesses", label: "Discover", icon: Compass },
  { href: "/stories", label: "Stories", icon: BookOpen },
  { href: "/account", label: "Account", icon: UserRound },
] as const;

/** App-style bottom navigation for small screens. */
export function MobileNav() {
  const pathname = usePathname();
  return (
    <nav
      aria-label="Main"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 pb-safe backdrop-blur-md lg:hidden"
    >
      <ul className="mx-auto grid max-w-lg grid-cols-5">
        {items.map(({ href, label, icon: Icon }) => {
          const active = isActive(pathname, href);
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex min-h-16 flex-col items-center justify-center gap-1 text-[0.7rem] font-semibold transition-colors",
                  active ? "text-squab-700" : "text-stone-muted",
                )}
              >
                <span
                  className={cn(
                    "grid h-7 w-12 place-items-center rounded-full transition-colors",
                    active && "bg-squab-50",
                  )}
                >
                  <Icon aria-hidden className="size-5" strokeWidth={active ? 2.4 : 1.9} />
                </span>
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
