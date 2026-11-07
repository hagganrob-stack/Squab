-- Squab Connect — initial schema
-- Postgres 15+ / Supabase. Every table has RLS enabled; public (anon) access is
-- limited to published content. Service-role access bypasses RLS and must only
-- be used server-side.

create extension if not exists pgcrypto;
create extension if not exists citext;

-- ---------------------------------------------------------------------------
-- Enums
-- ---------------------------------------------------------------------------
create type public.user_role as enum ('customer', 'business', 'admin', 'super_admin');
create type public.category_tone as enum ('sage', 'sky', 'plum', 'sand', 'rose', 'teal', 'orange');
create type public.business_status as enum ('pending', 'active', 'suspended', 'declined');
create type public.member_permission as enum ('owner', 'editor');
create type public.offer_status as enum (
  'draft', 'submitted', 'under_review', 'changes_requested', 'approved',
  'published', 'rejected', 'paused', 'withdrawn', 'expired', 'archived'
);
create type public.reward_type as enum ('percentage', 'fixed', 'complimentary', 'introductory', 'exclusive_rate', 'code');
create type public.redemption_method as enum ('show', 'link', 'code', 'contact');
create type public.story_status as enum ('draft', 'scheduled', 'published', 'archived');
create type public.story_format as enum ('standard', 'spotlight');
create type public.event_status as enum ('draft', 'published', 'archived');
create type public.saved_item_type as enum ('offer', 'business', 'story');
create type public.offer_event_type as enum ('view', 'redeem_click', 'code_reveal', 'redemption_recorded');
create type public.business_event_type as enum ('profile_view', 'website_click', 'contact_click');
create type public.consent_status as enum ('pending', 'confirmed', 'unsubscribed');
create type public.newsletter_status as enum ('draft', 'scheduled', 'sending', 'sent', 'failed');
create type public.newsletter_content_type as enum ('story', 'event', 'offer', 'announcement');
create type public.revision_status as enum ('pending', 'approved', 'rejected');

-- ---------------------------------------------------------------------------
-- Helpers
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at() returns trigger
language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

-- ---------------------------------------------------------------------------
-- Profiles (1:1 with auth.users)
-- ---------------------------------------------------------------------------
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  email citext not null unique,
  avatar_url text,
  role public.user_role not null default 'customer',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger profiles_updated_at before update on public.profiles
  for each row execute function public.set_updated_at();

-- Create a profile automatically on sign-up. Role always starts as customer;
-- only admins can elevate it.
create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data ->> 'full_name');
  return new;
end $$;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

-- Role checks used by RLS. SECURITY DEFINER avoids recursive RLS on profiles.
create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select coalesce((select role in ('admin', 'super_admin') from public.profiles where id = auth.uid()), false)
$$;

create or replace function public.is_super_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select coalesce((select role = 'super_admin' from public.profiles where id = auth.uid()), false)
$$;

-- True for admins, and for trusted server contexts (service role, migrations,
-- seeding) — i.e. anything not running as the anon/authenticated API roles.
-- SECURITY INVOKER on purpose so current_user is the real caller.
create or replace function public.is_privileged() returns boolean
language sql stable as $$
  select current_user not in ('anon', 'authenticated') or public.is_admin()
$$;

-- Users cannot change their own role (or anyone's) unless they are an admin;
-- only super admins can grant admin roles.
create or replace function public.guard_profile_role() returns trigger
language plpgsql set search_path = public as $$
begin
  if new.role is distinct from old.role then
    if not public.is_privileged() then
      raise exception 'Only administrators can change roles';
    end if;
    if new.role in ('admin', 'super_admin') and not public.is_super_admin()
       and current_user in ('anon', 'authenticated') then
      raise exception 'Only super administrators can grant administrator roles';
    end if;
  end if;
  return new;
end $$;
create trigger profiles_guard_role before update on public.profiles
  for each row execute function public.guard_profile_role();

-- ---------------------------------------------------------------------------
-- Categories (editorial only — perks and businesses are few enough to search)
-- ---------------------------------------------------------------------------
create table public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  tone public.category_tone not null default 'orange',
  display_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Businesses
-- ---------------------------------------------------------------------------
create table public.businesses (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  tagline text,
  description text,
  kind text, -- short label, e.g. "Reformer Pilates"
  services text[] not null default '{}',
  differentiator text,
  logo_url text,
  logo_background text not null default 'light' check (logo_background in ('light', 'dark')),
  cover_image_url text,
  email citext,
  phone text,
  show_email boolean not null default false,
  show_phone boolean not null default false,
  website text check (website is null or website ~* '^https?://'),
  social_links jsonb not null default '{}'::jsonb,
  location text,
  squab_connection text,
  status public.business_status not null default 'pending',
  featured boolean not null default false,
  is_demo boolean not null default false,
  created_by uuid references public.profiles (id) on delete set null,
  approved_by uuid references public.profiles (id) on delete set null,
  approved_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index businesses_status_idx on public.businesses (status);
create index businesses_featured_idx on public.businesses (featured) where featured;
create trigger businesses_updated_at before update on public.businesses
  for each row execute function public.set_updated_at();

create table public.business_members (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  permission_level public.member_permission not null default 'editor',
  -- Trusted members' profile edits publish immediately; others create revisions.
  trusted boolean not null default false,
  created_at timestamptz not null default now(),
  unique (business_id, user_id)
);
create index business_members_user_idx on public.business_members (user_id);

create or replace function public.is_business_member(bid uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.business_members where business_id = bid and user_id = auth.uid())
$$;

-- Business access requests (public registration form → admin review)
create table public.business_applications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles (id) on delete set null,
  business_name text not null,
  contact_name text not null,
  contact_email citext not null,
  contact_phone text,
  relationship text not null,
  description text,
  status public.business_status not null default 'pending',
  reviewed_by uuid references public.profiles (id) on delete set null,
  reviewed_at timestamptz,
  review_notes text,
  business_id uuid references public.businesses (id) on delete set null,
  created_at timestamptz not null default now()
);

-- Pending profile edits from non-trusted business members
create table public.content_revisions (
  id uuid primary key default gen_random_uuid(),
  entity_type text not null check (entity_type in ('business')),
  entity_id uuid not null,
  changes jsonb not null,
  status public.revision_status not null default 'pending',
  submitted_by uuid references public.profiles (id) on delete set null,
  reviewed_by uuid references public.profiles (id) on delete set null,
  reviewed_at timestamptz,
  review_notes text,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Offers
-- ---------------------------------------------------------------------------
create table public.offers (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses (id) on delete cascade,
  title text not null,
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  short_description text not null,
  full_description text,
  what_you_get text[] not null default '{}',
  how_to_redeem text,
  image_url text,
  reward_type public.reward_type not null,
  reward_value text not null, -- display label, e.g. "15% off"
  redemption_method public.redemption_method not null,
  redemption_url text check (redemption_url is null or redemption_url ~* '^https?://'),
  redemption_code text,
  contact_email citext,
  contact_phone text,
  terms text,
  start_date date,
  expiry_date date,
  status public.offer_status not null default 'draft',
  featured boolean not null default false,
  is_demo boolean not null default false,
  created_by uuid references public.profiles (id) on delete set null,
  submitted_at timestamptz,
  reviewed_by uuid references public.profiles (id) on delete set null,
  reviewed_at timestamptz,
  review_notes text,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (expiry_date is null or start_date is null or expiry_date >= start_date),
  check (redemption_method <> 'code' or redemption_code is not null),
  check (redemption_method <> 'link' or redemption_url is not null)
);
create index offers_business_idx on public.offers (business_id);
create index offers_live_idx on public.offers (status, start_date, expiry_date);
create trigger offers_updated_at before update on public.offers
  for each row execute function public.set_updated_at();

create or replace function public.offer_is_live(o public.offers) returns boolean
language sql stable as $$
  select o.status = 'published'
     and (o.start_date is null or o.start_date <= current_date)
     and (o.expiry_date is null or o.expiry_date >= current_date)
$$;

-- Business members may only move their offers between non-approved states;
-- approval and publication are admin-only.
create or replace function public.guard_offer_status() returns trigger
language plpgsql set search_path = public as $$
begin
  if public.is_privileged() then return new; end if;
  if tg_op = 'INSERT' and new.status not in ('draft', 'submitted') then
    raise exception 'New offers must be draft or submitted';
  end if;
  if tg_op = 'UPDATE' then
    if new.featured is distinct from old.featured then
      raise exception 'Only administrators can feature offers';
    end if;
    if new.status is distinct from old.status and not (
      (old.status in ('draft', 'changes_requested', 'rejected') and new.status in ('draft', 'submitted'))
      or (old.status = 'published' and new.status in ('paused', 'withdrawn'))
      or (old.status = 'paused' and new.status in ('published', 'withdrawn'))
      or (old.status in ('submitted', 'under_review') and new.status = 'withdrawn')
    ) then
      raise exception 'Offer status change % → % requires an administrator', old.status, new.status;
    end if;
    -- Editing the content of a live offer sends it back for review.
    if old.status = 'published' and new.status = 'published' and (
      new.title, new.short_description, new.full_description, new.reward_value, new.terms,
      new.redemption_method, new.redemption_url, new.redemption_code
    ) is distinct from (
      old.title, old.short_description, old.full_description, old.reward_value, old.terms,
      old.redemption_method, old.redemption_url, old.redemption_code
    ) then
      new.status := 'submitted';
    end if;
  end if;
  if tg_op = 'INSERT' then
    new.featured := false;
  end if;
  return new;
end $$;
create trigger offers_guard_status before insert or update on public.offers
  for each row execute function public.guard_offer_status();

-- ---------------------------------------------------------------------------
-- Stories
-- ---------------------------------------------------------------------------
create table public.stories (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  standfirst text,
  body jsonb not null default '{"type":"doc","content":[]}'::jsonb, -- Tiptap / ProseMirror JSON
  hero_image text,
  hero_image_alt text,
  author_id uuid references public.profiles (id) on delete set null,
  author_name text,
  category_id uuid not null references public.categories (id),
  format public.story_format not null default 'standard',
  related_business_id uuid references public.businesses (id) on delete set null,
  status public.story_status not null default 'draft',
  featured boolean not null default false,
  is_demo boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (status not in ('published', 'scheduled') or published_at is not null)
);
create index stories_live_idx on public.stories (status, published_at desc);
create trigger stories_updated_at before update on public.stories
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Events
-- ---------------------------------------------------------------------------
create table public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  summary text,
  description text,
  what_to_expect text[] not null default '{}',
  who_should_attend text,
  image_url text,
  start_datetime timestamptz not null,
  end_datetime timestamptz not null,
  time_tbc boolean not null default false,
  venue text not null,
  address text,
  registration_url text check (registration_url is null or registration_url ~* '^https?://'),
  contact_email citext,
  capacity int check (capacity is null or capacity > 0),
  fully_booked boolean not null default false,
  status public.event_status not null default 'draft',
  featured boolean not null default false,
  is_demo boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (end_datetime >= start_datetime)
);
create index events_live_idx on public.events (status, start_datetime);
create trigger events_updated_at before update on public.events
  for each row execute function public.set_updated_at();

create table public.event_businesses (
  event_id uuid not null references public.events (id) on delete cascade,
  business_id uuid not null references public.businesses (id) on delete cascade,
  primary key (event_id, business_id)
);

-- ---------------------------------------------------------------------------
-- Saved items, analytics
-- ---------------------------------------------------------------------------
create table public.saved_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  item_type public.saved_item_type not null,
  item_id uuid not null,
  created_at timestamptz not null default now(),
  unique (user_id, item_type, item_id)
);

create table public.offer_analytics (
  id bigint generated always as identity primary key,
  offer_id uuid not null references public.offers (id) on delete cascade,
  event_type public.offer_event_type not null,
  user_id uuid references public.profiles (id) on delete set null,
  session_id text,
  created_at timestamptz not null default now()
);
create index offer_analytics_offer_idx on public.offer_analytics (offer_id, event_type, created_at);

create table public.business_analytics (
  id bigint generated always as identity primary key,
  business_id uuid not null references public.businesses (id) on delete cascade,
  event_type public.business_event_type not null,
  user_id uuid references public.profiles (id) on delete set null,
  session_id text,
  created_at timestamptz not null default now()
);
create index business_analytics_business_idx on public.business_analytics (business_id, event_type, created_at);

-- ---------------------------------------------------------------------------
-- Newsletter
-- ---------------------------------------------------------------------------
create table public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email citext not null unique,
  first_name text,
  consent_status public.consent_status not null default 'pending',
  consent_text text not null, -- exact wording shown at sign-up (audit trail)
  confirm_token uuid not null default gen_random_uuid(),
  unsubscribe_token uuid not null default gen_random_uuid() unique,
  subscribed_at timestamptz not null default now(),
  confirmed_at timestamptz,
  unsubscribed_at timestamptz
);

create table public.newsletters (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  subject text not null,
  preheader text,
  introduction text,
  header_image text,
  content jsonb not null default '{}'::jsonb,
  status public.newsletter_status not null default 'draft',
  scheduled_at timestamptz,
  sent_at timestamptz,
  provider_broadcast_id text,
  stats jsonb not null default '{}'::jsonb,
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger newsletters_updated_at before update on public.newsletters
  for each row execute function public.set_updated_at();

create table public.newsletter_content (
  id uuid primary key default gen_random_uuid(),
  newsletter_id uuid not null references public.newsletters (id) on delete cascade,
  content_type public.newsletter_content_type not null,
  content_id uuid,
  announcement jsonb,
  display_order int not null default 0,
  check ((content_type = 'announcement') = (announcement is not null))
);

-- ---------------------------------------------------------------------------
-- Site settings & audit log
-- ---------------------------------------------------------------------------
create table public.site_settings (
  key text primary key,
  value jsonb not null,
  updated_by uuid references public.profiles (id) on delete set null,
  updated_at timestamptz not null default now()
);

create table public.activity_log (
  id bigint generated always as identity primary key,
  user_id uuid references public.profiles (id) on delete set null,
  action text not null, -- created | updated | submitted | approved | rejected | published | ...
  entity_type text not null,
  entity_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
create index activity_log_entity_idx on public.activity_log (entity_type, entity_id, created_at desc);

-- ===========================================================================
-- Row Level Security
-- ===========================================================================
alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.businesses enable row level security;
alter table public.business_members enable row level security;
alter table public.business_applications enable row level security;
alter table public.content_revisions enable row level security;
alter table public.offers enable row level security;
alter table public.stories enable row level security;
alter table public.events enable row level security;
alter table public.event_businesses enable row level security;
alter table public.saved_items enable row level security;
alter table public.offer_analytics enable row level security;
alter table public.business_analytics enable row level security;
alter table public.newsletter_subscribers enable row level security;
alter table public.newsletters enable row level security;
alter table public.newsletter_content enable row level security;
alter table public.site_settings enable row level security;
alter table public.activity_log enable row level security;

-- Profiles: users see/update themselves; admins see/update everyone.
create policy profiles_self_read on public.profiles for select using (id = auth.uid() or public.is_admin());
create policy profiles_self_update on public.profiles for update using (id = auth.uid() or public.is_admin());

-- Categories: public read, admin write.
create policy categories_read on public.categories for select using (true);
create policy categories_admin on public.categories for all using (public.is_admin()) with check (public.is_admin());

-- Businesses: the base table is readable only by members (their own) and
-- admins. The public reads the business_directory view below, which exposes
-- active businesses only and masks email/phone unless the business opted in.
create policy businesses_member_read on public.businesses for select using (public.is_business_member(id));
create policy businesses_member_update on public.businesses for update
  using (public.is_business_member(id) and exists (
    select 1 from public.business_members m where m.business_id = businesses.id and m.user_id = auth.uid() and m.trusted))
  with check (public.is_business_member(id));
create policy businesses_admin on public.businesses for all using (public.is_admin()) with check (public.is_admin());

-- Prevent business members from changing moderation fields directly.
create or replace function public.guard_business_fields() returns trigger
language plpgsql set search_path = public as $$
begin
  if public.is_privileged() then return new; end if;
  if (new.status, new.featured, new.slug, new.is_demo) is distinct from (old.status, old.featured, old.slug, old.is_demo) then
    raise exception 'Only administrators can change status, featured, slug or demo flags';
  end if;
  return new;
end $$;
create trigger businesses_guard_fields before update on public.businesses
  for each row execute function public.guard_business_fields();

create or replace function public.business_is_active(bid uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.businesses where id = bid and status = 'active')
$$;

-- Public directory view. Runs with the owner's rights (deliberately not
-- security_invoker) so it can mask private contact columns; its WHERE clause
-- is the access rule.
create view public.business_directory with (security_barrier = true) as
  select id, name, slug, tagline, description, kind, services, differentiator, logo_url, logo_background, cover_image_url,
         case when show_email then email end as email,
         case when show_phone then phone end as phone,
         show_email, show_phone, website, social_links, location, squab_connection,
         status, featured, is_demo, created_at, updated_at
  from public.businesses
  where status = 'active';
revoke all on public.business_directory from public;
grant select on public.business_directory to anon, authenticated;

create policy business_members_read on public.business_members for select using (user_id = auth.uid() or public.is_admin());
create policy business_members_admin on public.business_members for all using (public.is_admin()) with check (public.is_admin());

create policy applications_insert on public.business_applications for insert with check (user_id is null or user_id = auth.uid());
create policy applications_read on public.business_applications for select using (user_id = auth.uid() or public.is_admin());
create policy applications_admin on public.business_applications for update using (public.is_admin());

create policy revisions_member_insert on public.content_revisions for insert
  with check (submitted_by = auth.uid() and entity_type = 'business' and public.is_business_member(entity_id));
create policy revisions_read on public.content_revisions for select
  using (submitted_by = auth.uid() or public.is_admin());
create policy revisions_admin on public.content_revisions for update using (public.is_admin());

-- Offers: public sees live offers of active businesses; members manage their own.
create policy offers_public_read on public.offers for select using (
  public.offer_is_live(offers) and public.business_is_active(business_id));
create policy offers_member_read on public.offers for select using (public.is_business_member(business_id));
create policy offers_member_insert on public.offers for insert with check (public.is_business_member(business_id));
create policy offers_member_update on public.offers for update
  using (public.is_business_member(business_id)) with check (public.is_business_member(business_id));
create policy offers_admin on public.offers for all using (public.is_admin()) with check (public.is_admin());

-- Stories & events: public sees published; admins manage.
create policy stories_public_read on public.stories for select using (status = 'published' and published_at <= now());
create policy stories_admin on public.stories for all using (public.is_admin()) with check (public.is_admin());

create policy events_public_read on public.events for select using (status = 'published');
create policy events_admin on public.events for all using (public.is_admin()) with check (public.is_admin());
create policy event_businesses_read on public.event_businesses for select using (true);
create policy event_businesses_admin on public.event_businesses for all using (public.is_admin()) with check (public.is_admin());

-- Saved items: strictly per user.
create policy saved_items_own on public.saved_items for all using (user_id = auth.uid()) with check (user_id = auth.uid());

-- Analytics: anyone may record view/click events (never "redemption_recorded");
-- businesses read their own; admins read all.
create policy offer_analytics_insert on public.offer_analytics for insert
  with check (event_type in ('view', 'redeem_click', 'code_reveal') and (user_id is null or user_id = auth.uid()));
create policy offer_analytics_member_redemption on public.offer_analytics for insert
  with check (event_type = 'redemption_recorded'
    and exists (select 1 from public.offers o where o.id = offer_id and public.is_business_member(o.business_id)));
create policy offer_analytics_read on public.offer_analytics for select using (
  public.is_admin() or exists (select 1 from public.offers o where o.id = offer_id and public.is_business_member(o.business_id)));

create policy business_analytics_insert on public.business_analytics for insert
  with check (user_id is null or user_id = auth.uid());
create policy business_analytics_read on public.business_analytics for select
  using (public.is_admin() or public.is_business_member(business_id));

-- Newsletter: subscriptions are created via a server action using the
-- service role (double opt-in), so no anon policies. Admins manage.
create policy subscribers_admin on public.newsletter_subscribers for all using (public.is_admin()) with check (public.is_admin());
create policy newsletters_admin on public.newsletters for all using (public.is_admin()) with check (public.is_admin());
create policy newsletter_content_admin on public.newsletter_content for all using (public.is_admin()) with check (public.is_admin());

-- Site settings: public read (homepage copy), admin write.
create policy site_settings_read on public.site_settings for select using (true);
create policy site_settings_admin on public.site_settings for all using (public.is_admin()) with check (public.is_admin());

-- Activity log: admins read; inserts happen server-side via security definer
-- function so users cannot forge entries.
create policy activity_log_admin_read on public.activity_log for select using (public.is_admin());

create or replace function public.log_activity(p_action text, p_entity_type text, p_entity_id uuid, p_metadata jsonb default '{}')
returns void language sql security definer set search_path = public as $$
  insert into public.activity_log (user_id, action, entity_type, entity_id, metadata)
  values (auth.uid(), p_action, p_entity_type, p_entity_id, coalesce(p_metadata, '{}'));
$$;
revoke all on function public.log_activity from public, anon;
grant execute on function public.log_activity to authenticated;

-- ---------------------------------------------------------------------------
-- Storage buckets (public read for published media; writes via signed URLs)
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('business-media', 'business-media', true, 5242880, array['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/svg+xml']),
  ('offer-media', 'offer-media', true, 5242880, array['image/jpeg', 'image/png', 'image/webp', 'image/avif']),
  ('story-media', 'story-media', true, 10485760, array['image/jpeg', 'image/png', 'image/webp', 'image/avif']),
  ('event-media', 'event-media', true, 5242880, array['image/jpeg', 'image/png', 'image/webp', 'image/avif'])
on conflict (id) do nothing;

create policy media_admin_write on storage.objects for all
  using (bucket_id in ('business-media', 'offer-media', 'story-media', 'event-media') and public.is_admin())
  with check (bucket_id in ('business-media', 'offer-media', 'story-media', 'event-media') and public.is_admin());

-- Business members upload into a folder named after their business id.
create policy media_member_write on storage.objects for insert
  with check (bucket_id in ('business-media', 'offer-media')
    and public.is_business_member(((storage.foldername(name))[1])::uuid));
