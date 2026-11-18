-- Time-limited stories (e.g. Christmas opening times): hidden from the public
-- once expires_at has passed.
alter table public.stories add column if not exists expires_at timestamptz;

drop policy if exists stories_public_read on public.stories;
create policy stories_public_read on public.stories for select
  using (status = 'published' and published_at <= now() and (expires_at is null or expires_at > now()));
