import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/** Squab Storage logo locked up with "Connect". */
export function Wordmark({ className, inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <Link href="/" aria-label="Squab Connect home" className={cn("group inline-flex items-center gap-2.5", className)}>
      <span className={cn("inline-flex items-center", inverted && "rounded-lg bg-white px-2 py-1.5")}>
        <Image src="/images/squab/logo.png" alt="Squab Storage" width={102} height={34} priority className="h-[30px] w-auto" />
      </span>
      <span
        aria-hidden
        className={cn(
          "border-l pl-2.5 font-display text-[0.95rem] font-extrabold tracking-tight",
          inverted ? "border-white/25 text-white" : "border-line text-ink",
        )}
      >
        Connect
      </span>
    </Link>
  );
}
