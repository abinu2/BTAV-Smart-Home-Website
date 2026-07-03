# BTAV Smart Home

Marketing and lead-generation website for **BTAV** — a Control4 Authorized
Platinum Dealer and smart-home / AV systems integrator serving Maricopa County,
Arizona.

Built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**,
**Tailwind CSS**, and **Framer Motion**.

## Features

- Interactive **system-architecture showcase** (custom install visualized as a
  live schematic)
- Full site: home, services (+ per-service pages), partners (+ 20 brand pages),
  work, about, contact, privacy, terms
- Secure **contact API** (`/api/contact`): Zod validation, honeypot, Upstash
  rate limiting, sanitisation, SHA‑256 hashed IPs, Supabase persistence, and
  Resend email notifications
- SEO: per-route metadata, `sitemap.xml`, `robots.txt`, JSON‑LD, dynamic OG image
- Accessible (WCAG AA contrast, keyboard nav, reduced-motion support) and
  hardened HTTP security headers

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in real values
npm run dev                  # http://localhost:3000
```

## Scripts

| Script | Purpose |
|---|---|
| `npm run dev` | Local dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run typecheck` | TypeScript check |
| `npm run lint` | ESLint |
| `npm run audit` | Dependency audit (high+) |

## Environment variables

See [`.env.example`](.env.example). Validated at build time in
[`lib/env.ts`](lib/env.ts) — a missing or invalid variable fails the build.

| Variable | Notes |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase (public) |
| `SUPABASE_SERVICE_ROLE_KEY` | **Server-only** — never expose |
| `RESEND_API_KEY` / `FROM_EMAIL` / `OWNER_EMAIL` | Transactional email |
| `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` | Rate limiting |
| `NEXT_PUBLIC_SITE_URL` | `https://btav.tech` |
| `CSRF_SECRET` | 32+ random chars |

## Database

Run [`supabase/schema.sql`](supabase/schema.sql) once in the Supabase SQL editor
to create the `leads`, `lead_activities`, and `page_views` tables with
row-level security.

## Deployment

Deploys on **Vercel** (framework auto-detected). Set all environment variables
in the Vercel dashboard, then connect the custom domain `btav.tech`.

---

© BTAV Smart Home. All rights reserved.
