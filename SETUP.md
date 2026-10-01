# MSU E-SPORTS: Setup (Phase 1)

1. Create a project at https://supabase.com (free tier is fine).
2. SQL Editor > paste `supabase/migrations/0001_schema.sql` > Run.
3. Project Settings > API: copy URL, anon key, service_role key into `.env.local` (copy from `.env.example`).
4. Authentication > Providers > Google: enable and add OAuth client ID/secret.
   Redirect URL: `http://localhost:3000/auth/callback` (add your production URL too).
5. Create the first admin: sign in once with Google, then run in SQL Editor:
   ```sql
   insert into admins (user_id, email, role)
   select id, email, 'SUPER_ADMIN' from auth.users where email = 'you@msu.ac.th';
   ```
6. `npm install && npm run dev` then open http://localhost:3000

## Logo
Drop the club logo at `public/logo.png` (transparent PNG, roughly 200x56 ratio) and redeploy,
or set it from the database without redeploying:
```sql
insert into settings (key, value) values ('branding', '{"logo_url":"https://.../logo.png"}')
on conflict (key) do update set value = excluded.value;
```
Contact and social links shown in the header, hero and footer come from `settings` rows:
```sql
insert into settings (key, value) values
 ('contact', '{"phone":"043-xxxxxx","email":"esports@msu.ac.th","address":"...","maps_url":"https://maps.app.goo.gl/...","maps_embed_url":"https://www.google.com/maps/embed?pb=..."}'),
 ('social',  '{"facebook":"https://...","instagram":"https://...","youtube":"https://...","discord":"https://..."}')
on conflict (key) do update set value = excluded.value;
```
(Phase 4 adds an Admin > Settings form for these.)
