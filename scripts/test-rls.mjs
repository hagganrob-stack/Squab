// RLS + schema smoke tests against an in-process Postgres (PGlite) with minimal
// Supabase stubs (auth.uid, anon/authenticated roles, storage). Run: npm run test:rls
import { PGlite } from "@electric-sql/pglite";
import { citext } from "@electric-sql/pglite/contrib/citext";
import { readFileSync } from "node:fs";

const root = process.argv[2] ?? process.cwd();
process.on("unhandledRejection", (e) => { console.log("ERROR", e.message, e.query); process.exit(1); });
const db = new PGlite({ extensions: { citext } });
const stub = `
create role anon nologin; create role authenticated nologin; create role service_role nologin bypassrls;
create schema auth; create schema storage;
create table auth.users (id uuid primary key, email text, raw_user_meta_data jsonb default '{}');
create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('request.jwt.claim.sub', true), '')::uuid $$;
create table storage.buckets (id text primary key, name text, public boolean, file_size_limit bigint, allowed_mime_types text[]);
create table storage.objects (id uuid primary key default gen_random_uuid(), bucket_id text, name text);
alter table storage.objects enable row level security;
create function storage.foldername(name text) returns text[] language sql as $$ select string_to_array(name, '/') $$;
grant usage on schema public, auth, storage to anon, authenticated, service_role;
grant execute on all functions in schema auth to anon, authenticated;
`;
await db.exec(stub);
const mig = readFileSync(`${root}/supabase/migrations/0001_initial_schema.sql`, "utf8").replace(/create extension[^;]+;/g, "");
await db.exec("create extension citext;");
await db.exec(mig);
// Supabase grants table privileges to API roles by default.
await db.exec(`grant select, insert, update, delete on all tables in schema public to anon, authenticated, service_role;
grant usage on all sequences in schema public to anon, authenticated;
revoke select on public.businesses from anon;`);
await db.exec(readFileSync(`${root}/supabase/seed.sql`, "utf8"));
console.log("migration + seed OK");

const as = async (role, sub, sql) => {
  await db.exec(`set role ${role}; select set_config('request.jwt.claim.sub', '${sub ?? ""}', false);`);
  try { return await db.query(sql); } finally { await db.exec("reset role;"); }
};
const check = (name, cond) => { console.log(`${cond ? "PASS" : "FAIL"}  ${name}`); if (!cond) process.exitCode = 1; };

let r = await as("anon", null, "select count(*)::int n from offers");
check("anon sees all 6 live offers", r.rows[0].n === 6);
r = await as("anon", null, "select email from business_directory where slug='rise-and-reform'");
check("anon reads directory view", r.rows.length === 1);
let err = null;
try { await as("anon", null, "select email from businesses limit 1"); } catch (e) { err = e; }
check("anon cannot read base businesses table", !!err);

// Hide email on one business, check masking
await db.exec("update businesses set show_email=false where slug='proper-golfing'");
r = await as("anon", null, "select email from business_directory where slug='proper-golfing'");
check("hidden email masked in view", r.rows[0].email === null);

// Expire an offer
await db.exec("update offers set expiry_date = current_date - 1, start_date = current_date - 10 where slug='the-hide-cafe-hide20'");
r = await as("anon", null, "select count(*)::int n from offers where slug='the-hide-cafe-hide20'");
check("expired offer hidden from public", r.rows[0].n === 0);

// Users
const u1 = "11111111-1111-4111-8111-111111111111", u2 = "22222222-2222-4222-8222-222222222222";
await db.exec(`insert into auth.users (id, email) values ('${u1}', 'owner@example.com'), ('${u2}', 'other@example.com');`);
r = await db.query("select role from profiles where id = $1", [u1]);
check("profile auto-created as customer", r.rows[0]?.role === "customer");

err = null;
try { await as("authenticated", u1, `update profiles set role='admin' where id='${u1}'`); } catch (e) { err = e; }
check("user cannot self-promote", !!err);

const forge = "00000000-0000-4000-8000-001000000001", golf = "00000000-0000-4000-8000-001000000002";
await db.exec(`insert into business_members (business_id, user_id, permission_level) values ('${forge}', '${u1}', 'owner')`);

err = null;
try {
  await as("authenticated", u1, `insert into offers (business_id, title, slug, short_description, reward_type, reward_value, redemption_method, status) values ('${forge}', 'x', 'test-pub', 'x', 'fixed', '£5', 'show', 'published')`);
} catch (e) { err = e; }
check("member cannot self-publish offer", !!err);

r = await as("authenticated", u1, `insert into offers (business_id, title, slug, short_description, reward_type, reward_value, redemption_method, status) values ('${forge}', 'x', 'test-draft', 'x', 'fixed', '£5', 'show', 'submitted') returning id`);
check("member can submit own offer", r.rows.length === 1);

err = null;
try {
  await as("authenticated", u1, `insert into offers (business_id, title, slug, short_description, reward_type, reward_value, redemption_method) values ('${golf}', 'x', 'test-other', 'x', 'fixed', '£5', 'show')`);
} catch (e) { err = e; }
check("member cannot create offer for another business", !!err);

r = await as("authenticated", u2, `select count(*)::int n from offers where slug='test-draft'`);
check("other user cannot see unpublished offer", r.rows[0].n === 0);

r = await as("authenticated", u2, `update offers set title='hacked' where business_id='${forge}' returning id`);
check("other user cannot update another business's offers", r.rows.length === 0);

r = await as("authenticated", u2, `select count(*)::int n from offer_analytics`);
check("other user cannot read analytics", r.rows[0].n === 0);

err = null;
try { await as("anon", null, `insert into offer_analytics (offer_id, event_type) values ('00000000-0000-4000-8000-002000000001', 'redemption_recorded')`); } catch (e) { err = e; }
check("anon cannot forge redemptions", !!err);
await as("anon", null, `insert into offer_analytics (offer_id, event_type) values ('00000000-0000-4000-8000-002000000001', 'view')`);
r = await db.query("select count(*)::int n from offer_analytics where event_type='view'");
check("anon can record a view", r.rows[0].n === 1);

r = await as("authenticated", u1, `update businesses set tagline='edit' where id='${forge}' returning id`);
check("non-trusted member cannot edit profile directly", r.rows.length === 0);
await db.exec(`update business_members set trusted=true where user_id='${u1}'`);
r = await as("authenticated", u1, `update businesses set tagline='edit' where id='${forge}' returning id`);
check("trusted member can edit own profile", r.rows.length === 1);
err = null;
try { await as("authenticated", u1, `update businesses set featured = not featured where id='${forge}'`); } catch (e) { err = e; }
check("member cannot feature own business", !!err);

r = await as("anon", null, "select count(*)::int n from stories");
check("anon reads published stories", r.rows[0].n === 4);
r = await as("anon", null, "select count(*)::int n from newsletter_subscribers");
check("anon cannot read subscribers", r.rows[0].n === 0);
