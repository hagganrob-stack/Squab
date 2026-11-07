import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Media } from "@/components/ui/media";
import type { HomepageSettings } from "@/types/content";

export function Hero({ hero }: { hero: HomepageSettings["hero"] }) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-white">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 size-[34rem] rounded-full bg-squab-100/80 blur-3xl"
      />
      <div className="container-page relative grid items-center gap-12 py-12 sm:py-16 lg:grid-cols-[1.05fr_1fr] lg:py-24">
        <div>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-squab-50 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-squab-800">
            <span aria-hidden className="size-1.5 rounded-full bg-squab-500" />
            {hero.eyebrow}
          </p>
          <h1 className="text-display font-extrabold">{hero.headline}</h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-stone-muted sm:text-xl">{hero.subheading}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={hero.primaryCta.href} size="lg">
              {hero.primaryCta.label} <ArrowRight aria-hidden />
            </ButtonLink>
            <ButtonLink href={hero.secondaryCta.href} size="lg" variant="secondary">
              {hero.secondaryCta.label}
            </ButtonLink>
          </div>
        </div>
        {/* Collage: Squab facility (from homepage settings) plus partner photography */}
        <div className="grid grid-cols-6 grid-rows-6 gap-3 sm:gap-4" style={{ aspectRatio: "1 / 0.92" }}>
          <div className="col-span-4 row-span-4">
            <Media src={hero.imageUrl} alt="The welcome area at a Squab Storage facility" ratio="1/1" priority className="size-full aspect-auto! rounded-[var(--radius-panel)]" label="Hero photo" sizes="(min-width: 1024px) 30vw, 66vw" />
          </div>
          <div className="col-span-2 row-span-3">
            <Media src="/images/partners/rise-and-reform-cover.webp" alt="Reformer Pilates at Rise and Reform" ratio="1/1" className="size-full aspect-auto!" sizes="(min-width: 1024px) 15vw, 33vw" />
          </div>
          <div className="col-span-2 row-span-3 col-start-5 row-start-4">
            <Media src="/images/squab/networking-room.webp" alt="A Squab networking morning" ratio="1/1" className="size-full aspect-auto!" sizes="(min-width: 1024px) 15vw, 33vw" />
          </div>
          <div className="col-span-4 row-span-2 row-start-5 flex items-center gap-4 rounded-[var(--radius-card)] bg-ink p-5 text-white">
            <span className="font-display text-4xl font-extrabold text-squab-400">Perks</span>
            <span className="text-sm leading-snug text-white/75">Exclusive offers from local businesses for Squab customers.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
