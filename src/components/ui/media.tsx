import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { cn, initials } from "@/lib/utils";
import type { CategoryTone } from "@/types/content";

const ratios = {
  "1/1": "aspect-square",
  "4/3": "aspect-[4/3]",
  "3/2": "aspect-[3/2]",
  "16/9": "aspect-video",
  "21/9": "aspect-[21/9]",
  "4/5": "aspect-[4/5]",
} as const;

export type MediaRatio = keyof typeof ratios;

const placeholderTones: Record<CategoryTone, string> = {
  sage: "from-sage-50 to-[#dde9de] text-sage-700",
  sky: "from-sky-50 to-[#d9e7f1] text-sky-700",
  plum: "from-plum-50 to-[#e7dcec] text-plum-700",
  sand: "from-sand-50 to-[#efe3cc] text-sand-700",
  rose: "from-rose-50 to-[#f1dcdc] text-rose-700",
  teal: "from-teal-50 to-[#d6ebe7] text-teal-700",
  orange: "from-squab-50 to-squab-100 text-squab-800",
};

/**
 * Renders an image at a fixed ratio, or — until real Squab photography is
 * supplied — a clearly-labelled placeholder of the same size.
 */
export function Media({
  src,
  alt,
  ratio = "4/3",
  tone = "orange",
  label,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  priority,
  className,
  rounded = true,
}: {
  src?: string;
  alt: string;
  ratio?: MediaRatio;
  tone?: CategoryTone;
  label?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  rounded?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden bg-mist",
        ratios[ratio],
        rounded && "rounded-[var(--radius-card)]",
        className,
      )}
    >
      {src ? (
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      ) : (
        <div
          role="img"
          aria-label={alt || "Image placeholder"}
          className={cn(
            "absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br",
            placeholderTones[tone],
          )}
        >
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.16]"
            style={{
              backgroundImage:
                "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
          <ImageIcon aria-hidden className="relative size-6 opacity-60" strokeWidth={1.5} />
          <span className="relative px-4 text-center text-[0.7rem] font-semibold uppercase tracking-[0.14em] opacity-70">
            {label ?? "Photo placeholder"}
          </span>
        </div>
      )}
    </div>
  );
}

/** Business logo, or an initials monogram when no logo has been uploaded. */
export function Logo({
  src,
  name,
  size = 48,
  className,
}: {
  src?: string;
  name: string;
  size?: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex shrink-0 items-center justify-center overflow-hidden rounded-[0.9rem] bg-ink text-white ring-1 ring-black/5",
        className,
      )}
      style={{ width: size, height: size }}
    >
      {src ? (
        <Image src={src} alt={`${name} logo`} fill sizes={`${size}px`} className="object-contain bg-white p-1" />
      ) : (
        <span aria-hidden className="font-display font-extrabold" style={{ fontSize: size * 0.36 }}>
          {initials(name)}
        </span>
      )}
      {!src && <span className="sr-only">{name}</span>}
    </div>
  );
}
