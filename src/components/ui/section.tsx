import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Section({
  className,
  children,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section className={cn("py-14 sm:py-20", className)} {...props}>
      <div className="container-page">{children}</div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  id,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: { label: string; href: string };
  id?: string;
  className?: string;
}) {
  return (
    <div className={cn("mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between", className)}>
      <div className="max-w-2xl">
        {eyebrow && (
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-squab-700">{eyebrow}</p>
        )}
        <h2 id={id} className="text-headline font-extrabold">
          {title}
        </h2>
        {description && <p className="mt-3 text-lg leading-relaxed text-stone-muted">{description}</p>}
      </div>
      {action && (
        <Link
          href={action.href}
          className="group inline-flex shrink-0 items-center gap-1.5 font-semibold text-ink hover:text-squab-700"
        >
          {action.label}
          <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}

export function PageIntro({
  eyebrow,
  title,
  description,
  children,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <header className={cn("border-b border-line bg-white", className)}>
      <div className="container-page py-12 sm:py-16">
        {eyebrow && (
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-squab-700">{eyebrow}</p>
        )}
        <h1 className="max-w-3xl text-display font-extrabold">{title}</h1>
        {description && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-stone-muted sm:text-xl">{description}</p>
        )}
        {children}
      </div>
    </header>
  );
}

export function EmptyState({ title, body, action }: { title: string; body: string; action?: React.ReactNode }) {
  return (
    <div className="rounded-[var(--radius-panel)] border border-dashed border-line bg-white px-6 py-14 text-center">
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-stone-muted">{body}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
