import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Interim Squab Connect wordmark. Replace the mark with the official Squab
 * logo artwork (SVG) once supplied — keep the "Connect" lock-up beside it.
 */
export function Wordmark({ className, inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="Squab Connect home"
      className={cn("group inline-flex items-center gap-2.5", className)}
    >
      <span
        aria-hidden
        className="grid size-9 place-items-center rounded-[0.7rem] bg-squab-500 font-display text-lg font-extrabold text-white shadow-card transition-transform group-hover:-rotate-6"
      >
        S
      </span>
      <span className="flex flex-col gap-1 leading-none">
        <span className={cn("font-display text-[1.05rem] font-extrabold tracking-tight", inverted ? "text-white" : "text-ink")}>
          squab
        </span>
        <span className={cn("text-[0.62rem] font-bold uppercase tracking-[0.28em]", inverted ? "text-squab-300" : "text-squab-700")}>
          connect
        </span>
      </span>
    </Link>
  );
}
