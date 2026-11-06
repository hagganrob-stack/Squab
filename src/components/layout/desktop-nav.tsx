"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { isActive, primaryNav } from "./nav-items";

export function DesktopNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Main" className="hidden lg:block">
      <ul className="flex items-center gap-1">
        {primaryNav.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative rounded-full px-3.5 py-2 text-[0.9375rem] font-medium transition-colors",
                  active ? "text-ink" : "text-stone-muted hover:text-ink",
                )}
              >
                {item.label}
                {active && (
                  <span aria-hidden className="absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-squab-500" />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
