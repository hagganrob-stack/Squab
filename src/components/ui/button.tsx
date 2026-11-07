import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-[background-color,color,box-shadow,transform] duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-[1.1em] [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-squab-500 text-ink hover:bg-squab-400 shadow-card",
        secondary: "bg-white text-ink ring-1 ring-line hover:ring-ink/25 hover:bg-mist/60",
        dark: "bg-ink text-white hover:bg-ink-soft",
        ghost: "text-ink hover:bg-mist",
        link: "text-squab-700 underline-offset-4 hover:underline px-0! h-auto!",
        onDark: "bg-white text-ink hover:bg-squab-50",
      },
      size: {
        sm: "h-9 px-3.5 text-sm rounded-[var(--radius-control)]",
        md: "h-11 px-5 text-[0.9375rem] rounded-[var(--radius-control)]",
        lg: "h-13 px-6 text-base rounded-[var(--radius-control)]",
        icon: "size-11 rounded-full",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type Variants = VariantProps<typeof buttonVariants>;

export function Button({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<"button"> & Variants) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export function ButtonLink({
  className,
  variant,
  size,
  href,
  external,
  ...props
}: Omit<React.ComponentProps<"a">, "href"> & Variants & { href: string; external?: boolean }) {
  const classes = cn(buttonVariants({ variant, size }), className);
  if (external || !href.startsWith("/")) {
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...props}
      />
    );
  }
  return <Link href={href} className={classes} {...props} />;
}
