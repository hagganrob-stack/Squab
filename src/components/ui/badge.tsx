import { cn } from "@/lib/utils";
import type { CategoryTone } from "@/types/content";

const tones: Record<CategoryTone, string> = {
  sage: "bg-sage-50 text-sage-700",
  sky: "bg-sky-50 text-sky-700",
  plum: "bg-plum-50 text-plum-700",
  sand: "bg-sand-50 text-sand-700",
  rose: "bg-rose-50 text-rose-700",
  teal: "bg-teal-50 text-teal-700",
  orange: "bg-squab-50 text-squab-800",
};

export function CategoryChip({
  tone = "orange",
  className,
  children,
}: {
  tone?: CategoryTone;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold leading-none",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/** High-contrast reward label: the most prominent element on an offer card. */
export function RewardLabel({ children, className, size = "md" }: { children: React.ReactNode; className?: string; size?: "md" | "lg" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-ink font-display font-extrabold uppercase tracking-wide text-white",
        size === "md" ? "px-3 py-1.5 text-[0.7rem]" : "px-4 py-2 text-sm",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Marks demonstration records so sample content is never mistaken for real. */
export function SampleBadge({ className }: { className?: string }) {
  return (
    <span
      title="Demonstration content — not a real Squab business or offer"
      className={cn(
        "inline-flex items-center rounded-full border border-dashed border-stone-muted/50 bg-white/90 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider text-stone-muted",
        className,
      )}
    >
      Sample
    </span>
  );
}

export const toneClasses = tones;
