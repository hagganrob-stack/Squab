import { Check } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";

/** Honest placeholder for account features that arrive in Phase 3. */
export function ComingSoon({ title, intro, features }: { title: string; intro: string; features: string[] }) {
  return (
    <div className="container-page max-w-2xl py-16 sm:py-24">
      <div className="rounded-[var(--radius-panel)] bg-white p-7 shadow-card ring-1 ring-line sm:p-10">
        <p className="inline-flex rounded-full bg-squab-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-squab-800">Coming soon</p>
        <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl">{title}</h1>
        <p className="mt-3 text-lg text-stone-muted">{intro}</p>
        <ul className="mt-6 space-y-3">
          {features.map((f) => (
            <li key={f} className="flex items-start gap-3"><Check aria-hidden className="mt-1 size-4 shrink-0 text-squab-700" />{f}</li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-stone-muted">You don&rsquo;t need an account to browse perks, businesses, stories and events.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/perks">Browse perks</ButtonLink>
          <ButtonLink href="/businesses" variant="secondary">Discover businesses</ButtonLink>
        </div>
      </div>
    </div>
  );
}
