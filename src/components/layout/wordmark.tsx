import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/** Squab Connect logo. On dark backgrounds it sits on a white tile, as the lettering is black. */
export function Wordmark({ className, inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="Squab Connect home"
      className={cn("inline-flex items-center", inverted && "rounded-xl bg-white px-3 py-2", className)}
    >
      <Image
        src="/images/squab/connect-logo.png"
        alt="Squab Connect"
        width={800}
        height={265}
        priority
        className="h-9 w-auto lg:h-10"
      />
    </Link>
  );
}
