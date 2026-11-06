# Squab Connect

The digital home of the Squab community: **Squab Perks** (offers from tenant
businesses), a **business directory**, **Squab Stories** (digital magazine) and
**events** — one responsive, installable web app.

Architecture, schema, design system, phased plan and open decisions:
**[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)**.

## Stack

Next.js 16 (App Router, Cache Components) · React 19 · TypeScript · Tailwind CSS v4 ·
Supabase (Postgres, Auth, Storage, RLS) · Resend · Vercel.

## Getting started

```bash
npm install
cp .env.example .env.local   # optional — without Supabase the demo dataset is used
npm run dev                  # http://localhost:3000
```

| Script | Purpose |
| --- | --- |
| `npm run dev` / `build` / `start` | Next.js |
| `npm run lint` / `typecheck` | ESLint / TypeScript |
| `npm run seed:generate` | Regenerate `supabase/seed.sql` from `src/lib/demo/data.ts` |
| `npm run test:rls` | Apply the migration + seed to an in-process Postgres (PGlite) and test RLS policies |

## Connecting Supabase

1. Create a Supabase project.
2. Run `supabase/migrations/0001_initial_schema.sql`, then `supabase/seed.sql`
   (SQL editor, or `supabase db push` with the CLI).
3. Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in
   `.env.local` and in the Vercel project settings.

## Demo content

All businesses, offers, stories and events in `src/lib/demo/data.ts` are
**fictional sample content**, flagged `is_demo` and shown with a "Sample"
badge. Images are labelled placeholders until real Squab photography is supplied.
Remove the sample rows before launch (`delete from … where is_demo`).

## Project layout

```
src/app/(public)/      public pages (home, perks, businesses, stories, events, about, search)
src/components/        ui primitives, layout/navigation, feature components
src/lib/data/          cached data access (Supabase, with demo fallback)
src/lib/demo/          sample dataset (source of supabase/seed.sql)
supabase/              migrations + generated seed
scripts/               seed generator, RLS tests
```
