# Squab Connect — Architecture & Implementation Plan

This document answers the "before writing significant code" items in §20 of the
brief: architecture, schema, external services, design system, phased plan and
open risks/decisions. It is a living document — update it as phases land.

---

## 1. Application architecture

| Concern | Choice | Notes |
| --- | --- | --- |
| Framework | **Next.js 16 (App Router)**, React 19, TypeScript (strict) | `cacheComponents` + `partialPrefetching` enabled. Public pages prerender to a static shell; data is cached with `'use cache'` + `cacheTag` and invalidated on publish (`revalidateTag`/`updateTag`). |
| Styling | **Tailwind CSS v4**, design tokens in `src/app/globals.css` (`@theme`) | No CSS-in-JS. |
| Components | shadcn/ui *pattern* (copy-in, `cva` + `tailwind-merge`) | Primitives live in `src/components/ui`. Radix primitives will be added only when a component genuinely needs them (dialogs, menus) in Phase 3+. |
| Icons | `lucide-react` | |
| Fonts | Manrope (headings) + Inter (UI/body), self-hosted via `@fontsource-variable` | No runtime call to Google Fonts → better privacy (UK GDPR) and offline builds. |
| Database | **Supabase Postgres** with Row Level Security on every table | Schema: `supabase/migrations/`. |
| Auth | **Supabase Auth** (email + password, email verification, password reset) via `@supabase/ssr` cookies | Roles stored on `profiles.role`; enforced in RLS **and** in server code (`src/lib/permissions`). |
| Storage | Supabase Storage buckets: `business-media`, `offer-media`, `story-media`, `event-media` | Upload via signed upload URLs; MIME/size validated server-side. |
| Email | **Resend** (transactional + newsletter broadcasts) with React Email templates | Phase 3 (transactional) / Phase 5 (newsletter). |
| Analytics | Vercel Analytics + custom first-party events table (`offer_analytics`, `business_analytics`) | GA4 only if Squab requires it — it needs cookie consent. |
| Hosting | **Vercel**, Git integration on GitHub | Preview deployment per branch. |

### Data access layer

All reads go through `src/lib/data/*`. Each function:

1. is a `'use cache'` function with an explicit `cacheLife` and `cacheTag`;
2. reads from Supabase using a cookieless anon client (public, RLS-filtered data only);
3. **falls back to the bundled demo dataset** (`src/lib/demo/`) when Supabase env
   vars are not configured, so preview deployments and local dev always render.

The demo dataset is also the source of `supabase/seed.sql`
(`npm run seed:generate`), so the database and the fallback never drift apart.
Once Supabase is connected, the demo content lives in the database and is
editable/removable from the admin area like any other content (every demo row is
flagged `is_demo = true` for one-click clean-up before launch).

Writes (Phase 3+) use **Server Actions** that: validate with `zod` → check the
user's role/ownership server-side → write through the user-scoped Supabase client
(so RLS applies a second time) → append to `activity_log` → `updateTag(...)`.
The service-role key is used only in a handful of server-only modules
(`import 'server-only'`) for admin jobs such as sending newsletters.

### Route map

```
src/app/
  (public)/            layout: header, footer, mobile bottom nav
    page.tsx           /
    perks/             /perks, /perks/[slug]
    businesses/        /businesses, /businesses/[slug]
    news/           /news, /news/[slug]
    events/            /events, /events/[slug]
    about/  search/
  (auth)/              /login, /register            (Phase 3)
  account/             /account, /account/saved, /account/profile  (Phase 3)
  business/            /business/dashboard, profile, offers, analytics (Phase 3)
  admin/               /admin/** (Phase 3–5)
  api/                 analytics beacons, newsletter webhooks
  sitemap.ts robots.ts manifest.ts
```

Route protection: `src/proxy.ts` (Next 16's replacement for middleware) refreshes
the Supabase session and redirects unauthenticated users away from `/account`,
`/business`, `/admin`. Layouts in those segments re-check the role server-side —
the proxy is a convenience, not the security boundary. RLS is the final boundary.

---

## 2. Database schema & relationships

Full DDL + RLS: `supabase/migrations/0001_initial_schema.sql`.

```
auth.users 1─1 profiles (role: customer | business | admin | super_admin)
profiles   *─* businesses           via business_members (permission_level: owner | editor, trusted flag)
offers     *─1 businesses
stories    *─1 categories           (editorial categories only)
stories    *─1 businesses (optional related_business_id — used by spotlights)
events     *─* businesses           via event_businesses (related businesses)
saved_items (user_id, item_type ∈ offer|business|story, item_id)
offer_analytics (offer_id, event_type ∈ view|redeem_click|code_reveal|redemption_recorded)
business_analytics (business_id, event_type ∈ profile_view|website_click|contact_click)
newsletter_subscribers, newsletters, newsletter_content
site_settings (key → jsonb; e.g. 'homepage' hero copy + section order)
activity_log (actor, action, entity_type, entity_id, metadata, created_at)
content_revisions (pending profile changes from non-trusted business users)
```

Additions vs. the brief's suggested tables (all needed by the spec):

- **No perk/business categories.** Squab expects at most ~20 partner
  businesses, so a category taxonomy would sit mostly empty. Perks and the
  directory use search plus a short free-text `kind` label on each business
  (e.g. "Reformer Pilates"). Stories keep three editorial categories.
- `event_businesses` — "related businesses" on event pages (§9.2).
- `business_analytics` — profile views and website clicks for dashboards (§7.2).
- `content_revisions` — "submit profile changes for approval" (§6.3).
- `site_settings` — admin-controlled homepage content (§11).
- Moderation columns on offers: `submitted_at`, `reviewed_by`, `reviewed_at`,
  `review_notes`; statuses `draft → submitted → under_review → approved → published`
  plus `changes_requested`, `rejected`, `paused`, `withdrawn`, `expired`, `archived`.
- `is_demo` on content tables.

Expiry: offers are "active" when `status = 'published'` and
`start_date <= now() <= expiry_date` (nullable bounds). The public RLS policy uses
the same predicate, so expired offers disappear from listings automatically; a
daily Vercel Cron (Phase 3) also flips `status` to `expired` so dashboards show it.

---

## 3. External services & credentials

| Service | Needed for | Env vars | Exposed to browser? |
| --- | --- | --- | --- |
| Supabase | DB, auth, storage | `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes (anon key is public by design; RLS protects data) |
| | admin jobs | `SUPABASE_SERVICE_ROLE_KEY` | **Never** |
| Resend | email | `RESEND_API_KEY`, `EMAIL_FROM` | Never |
| Site | canonical URLs, OG | `NEXT_PUBLIC_SITE_URL` | Yes |
| Vercel | hosting, analytics, cron | `CRON_SECRET` | Never |

See `.env.example`. **Action for Squab:** create the Supabase project and Resend
account (with a verified sending domain, e.g. `connect.squabstorage.co.uk`), and
add the keys to the Vercel project settings.

---

## 4. Design system

Tokens live in `src/app/globals.css`.

- **Brand amber** `squab-500` `#F8A842` and **slate** `ink` `#2D3748`, from the
  Squab Storage logo and the earlier Squab Perks prototype. White on amber fails
  contrast (2:1), so amber surfaces always carry slate text (6.1:1) and
  `squab-700` `#965607` is used for orange text on light backgrounds (5.8:1).
- **Neutrals**: `ink` (slate) for type, `paper` (warm off-white)
  page background, white surfaces, `stone` muted greys, `line` hairlines.
- **Category accents**: muted tints used only for story category chips.
- **Type**: Manrope 700/800 headings with tight tracking; Inter 400–600 body.
  Fluid display sizes via `clamp()`. Article body at 18–19px, 68ch measure.
- **Shape**: radius 12px (controls), 20px (cards), 28px (feature panels); soft
  two-layer shadow on hover only; hairline borders where separation is needed.
- **Imagery**: fixed ratios — offers 16:9, business covers 16:9, stories 3:2/16:9,
  events 16:9, logos 1:1. Until real photography exists, `<MediaPlaceholder>`
  renders a clearly-labelled, on-brand placeholder at the correct ratio.
- **Motion**: 150–250 ms transforms/opacity only; disabled under
  `prefers-reduced-motion`.
- **Navigation**: desktop top bar (Home · Perks · Businesses · Stories · Events ·
  About) with search + account; mobile bottom bar (Home · Perks · Discover ·
  Stories · Account) with safe-area padding and a clear active state.

The Perks area uses a crisp "product" card language (benefit-first, high
contrast reward label). Stories use an editorial language (large imagery, varied
grid, serif-free but heavier headlines, generous whitespace) so the two feel
related but distinct.

---

## 5. Implementation plan

| Phase | Scope | Status |
| --- | --- | --- |
| 1 | Next.js app, design system, global nav, layouts, homepage, all public listing/detail pages rendering demo content, SEO basics (metadata, sitemap, robots, JSON-LD), PWA manifest, Supabase schema + RLS + seed | **This commit** |
| 2 | Perks/directory on live Supabase data; search & filters on server; redemption tracking beacons; favourites (requires auth) | Next |
| 3 | Auth (register/login/verify/reset), profiles & roles, proxy route protection, business registration + approval, business dashboard, profile editing (with revision approval), offer creation wizard + moderation workflow, Resend transactional emails, expiry cron | |
| 4 | Story/event CMS in admin with Tiptap rich-text editor (stores ProseMirror JSON — the format the public renderer already uses), scheduling, previews, spotlight template | |
| 5 | Admin dashboard & homepage controls, users/categories management, newsletter builder (React Email) + Resend broadcasts, subscriber double opt-in & unsubscribe, analytics views | |
| 6 | E2E tests (Playwright) of all journeys, RLS policy tests (pgTAP), accessibility audit (axe), Lighthouse budgets, cookie/privacy pages, production cut-over | |

---

## 6. Risks & decisions needed from Squab

1. **Brand assets** — the logo in use is the PNG from squabstorage.co.uk; an
   SVG master would be sharper. Partner logos and photos were taken from each
   partner's own website — confirm they're happy for them to be used.
2. **Locations** — businesses have a free-text `location`; promote to a
   `facilities` table only if multi-site filtering is ever needed.
3. **Who can see private contact details?** Business emails/phones on public
   profiles are opt-in per field (`show_email`, `show_phone`).
4. **Email domain & sender** for Resend, and who owns the newsletter list
   (lawful basis/consent wording must be signed off — we never auto-import tenants).
5. **Analytics & cookies** — recommendation: Vercel Analytics (cookieless) +
   first-party events, avoiding a consent banner. GA4 would require one.
6. **Trusted business editors** — confirm the default: profile edits require
   approval unless an admin marks the member as trusted.
7. **Offer verification** — v1 records views/clicks/code reveals only; it never
   claims a redemption unless the business records one.
8. **Next.js 16 Cache Components** is new; we follow its conventions (cached data
   functions + Suspense around request-time data) to keep pages fast and static.
