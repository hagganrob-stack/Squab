import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container-page max-w-xl py-24 text-center">
      <p className="font-display text-7xl font-extrabold text-squab-500">404</p>
      <h1 className="mt-4 text-3xl font-extrabold">We couldn&rsquo;t find that page</h1>
      <p className="mt-3 text-lg text-stone-muted">It may have moved, or an offer may have ended.</p>
      <div className="mt-8 flex justify-center gap-3">
        <ButtonLink href="/">Back to home</ButtonLink>
        <ButtonLink href="/perks" variant="secondary">Browse perks</ButtonLink>
      </div>
    </div>
  );
}
