import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="inline-flex items-center gap-1 text-sm font-semibold text-stone-muted hover:text-ink">
      <ChevronLeft aria-hidden className="size-4" /> {label}
    </Link>
  );
}
