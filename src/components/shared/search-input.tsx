"use client";

import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function SearchInput({
  value,
  onChange,
  placeholder,
  label,
  className,
  autoFocus,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  label: string;
  className?: string;
  autoFocus?: boolean;
}) {
  return (
    <div className={cn("relative", className)}>
      <label className="sr-only" htmlFor="search-input">
        {label}
      </label>
      <Search aria-hidden className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-stone-muted" />
      <input
        id="search-input"
        type="search"
        inputMode="search"
        autoComplete="off"
        autoFocus={autoFocus}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-13 w-full rounded-full bg-white pl-12 pr-12 text-base text-ink shadow-card ring-1 ring-line placeholder:text-stone-muted/80 focus:outline-none focus:ring-2 focus:ring-squab-600 [&::-webkit-search-cancel-button]:hidden"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute right-2 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-full text-stone-muted hover:bg-mist hover:text-ink"
          aria-label="Clear search"
        >
          <X aria-hidden className="size-4" />
        </button>
      )}
    </div>
  );
}

export function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "inline-flex h-10 shrink-0 items-center rounded-full px-4 text-sm font-semibold transition-colors",
        active ? "bg-ink text-white" : "bg-white text-ink-soft ring-1 ring-line hover:ring-ink/30",
      )}
    >
      {children}
    </button>
  );
}

/** Keep filter state in the URL without a server round trip. */
export function replaceQuery(params: Record<string, string | null>) {
  const url = new URL(window.location.href);
  for (const [k, v] of Object.entries(params)) {
    if (v) url.searchParams.set(k, v);
    else url.searchParams.delete(k);
  }
  window.history.replaceState(null, "", url);
}
