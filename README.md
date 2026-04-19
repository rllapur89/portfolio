# Rene Llapur — Portfolio

Personal portfolio of **Rene Llapur**, Senior Frontend Engineer. Built with Next.js 16, Tailwind CSS v4, Framer Motion, and next-intl.

**Live:** `renellapur.dev` (pending deploy)

---

## Stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 16.x (App Router) + React 19 + TypeScript 5 |
| Styling | Tailwind CSS v4 (CSS variables, `oklch` color space) |
| Animations | Framer Motion 12 (`prefers-reduced-motion` aware) |
| i18n | next-intl v4 — `/en` / `/es` routing with `localePrefix: 'always'` |
| Theming | next-themes — system auto-detect + toggle, persisted in localStorage |
| Content | Gray Matter + MDX files under `src/content/` |
| Forms | React Hook Form + Zod + Resend (Server Action) |
| SEO | `generateMetadata`, `sitemap.ts`, `robots.ts`, JSON-LD Person schema |
| Fonts | Geist Sans + Geist Mono via `next/font/google` |

---

## Project structure

```text
src/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx          # Per-locale root: html lang, ThemeProvider, NextIntlClientProvider
│   │   ├── page.tsx            # Home — all sections assembled
│   │   ├── blog/
│   │   │   ├── page.tsx        # Blog index
│   │   │   └── [slug]/page.tsx # Blog post detail
│   │   └── actions.ts          # Server Action: sendContactMessage → Resend
│   ├── layout.tsx              # Root passthrough (Next.js requirement)
│   ├── globals.css             # Tailwind v4 @theme, CSS vars light/dark, utilities
│   ├── sitemap.ts
│   ├── robots.ts
│   └── manifest.ts
├── components/
│   ├── layout/                 # Header, Footer, ThemeToggle, LocaleSwitcher, ThemeProvider
│   ├── sections/               # Hero, About, Experience, Projects, Skills, Talks, Testimonials, BlogPreview, Contact
│   ├── animations/             # FadeIn, Stagger, StaggerItem
│   └── ui/                     # Button, Badge, Section
├── content/
│   ├── blog/en/*.mdx           # English blog posts
│   └── blog/es/*.mdx           # Spanish blog posts
├── hooks/
│   └── use-reduced-motion.ts   # Reads prefers-reduced-motion
├── i18n/
│   ├── routing.ts              # defineRouting — locales, defaultLocale
│   ├── navigation.ts           # createNavigation (Link, useRouter, usePathname)
│   └── request.ts              # getRequestConfig — loads messages per locale
├── lib/
│   ├── data.ts                 # Experience, projects, skills — static typed data
│   ├── mdx.ts                  # getBlogPosts / getBlogPost — fs + gray-matter
│   ├── seo.ts                  # buildMetadata helper + personJsonLd
│   ├── site-config.ts          # Name, email, socials, nav sections
│   └── utils.ts                # cn(), absoluteUrl(), formatDate()
├── messages/
│   ├── en.json                 # All EN copy
│   └── es.json                 # All ES copy
└── proxy.ts                    # next-intl middleware (Next.js 16 convention)
```

---

## Getting started

### Prerequisites

- Node.js 20+
- npm 10+

### Install & run

```bash
npm install
npm run dev        # http://localhost:3000 → redirects to /en
```

### Environment variables

Copy and fill in before running in production:

```bash
# Public site URL — used for canonical URLs, OG images, sitemap
NEXT_PUBLIC_SITE_URL=https://renellapur.dev

# Resend API key (https://resend.com — free tier: 3,000 emails/month)
RESEND_API_KEY=re_xxxxxxxxxxxx

# Contact form destination
CONTACT_EMAIL_TO=rene.llapur@gmail.com

# Verified sender on Resend (must match a verified domain)
CONTACT_EMAIL_FROM=contact@renellapur.dev
```

> Without `RESEND_API_KEY` the contact form returns an `unconfigured` error and logs a warning — the rest of the site works fine.

### Build

```bash
npm run build      # SSG — generates /en, /es, /en/blog/*, /es/blog/*
npm run start      # Serve production build locally
npm run lint       # ESLint (flat config)
npm run format     # Prettier
```

---

## i18n

| Locale | URL | Default |
| --- | --- | --- |
| English | `/en`, `/en/blog/*` | ✅ yes |
| Spanish | `/es`, `/es/blog/*` | — |

- Root `/` redirects to `/en` (middleware detects `Accept-Language` header).
- Toggle in header switches locale while preserving the current path.
- `hreflang` alternate links generated automatically in `generateMetadata`.

To add a new locale: add it to `src/i18n/routing.ts` → `locales` array and create `src/messages/{locale}.json`.

---

## Theming

- Default: `system` (respects `prefers-color-scheme`).
- Toggle in header switches and persists to `localStorage`.
- CSS variables defined in `globals.css` using `oklch` color space.
- Accent color: **emerald** (`oklch(0.72 0.17 156)`).

To change accent: update `--color-accent` and `--color-ring` in both `:root` and `.dark` blocks in [src/app/globals.css](src/app/globals.css).

---

## Adding content

### Blog post

1. Create `src/content/blog/{en|es}/your-slug.mdx`
2. Required frontmatter:

```yaml
---
title: "Your Post Title"
description: "One-line summary shown in cards and meta."
date: "2025-06-01"
tags: ["Angular", "Architecture"]
---
```

1. Post appears automatically in `/en/blog` and `/es/blog` and in the home BlogPreview section.

### Experience / Projects / Skills

Managed in `src/lib/data.ts` (typed TypeScript arrays). Copy is in `src/messages/{en,es}.json`.

---

## SEO checklist

- [x] `generateMetadata` on every route (title, description, canonical, alternates, OG, Twitter)
- [x] `hreflang` EN/ES via `alternates.languages`
- [x] `sitemap.xml` — static pages + all blog posts, both locales
- [x] `robots.txt` — allow all, sitemap reference
- [x] `manifest.webmanifest` — PWA metadata
- [x] JSON-LD `Person` schema injected in `<head>`
- [x] Self-hosted Geist fonts with `display: swap`
- [x] `next/image` with AVIF/WebP formats

---

## Performance notes

- Turbopack build (Next.js 16 default).
- `optimizePackageImports` enabled for `lucide-react` and `framer-motion`.
- All animations respect `prefers-reduced-motion: reduce` — motion disabled entirely.
- Hero image should use `priority` + `placeholder="blur"` when a real photo is added.

---

## Deploy (Vercel — pending)

```bash
# 1. Push to GitHub
# 2. Import project on vercel.com
# 3. Set environment variables (see above)
# 4. Deploy — Vercel auto-detects Next.js
```

Recommended settings:

- Framework: Next.js (auto-detected)
- Build command: `npm run build`
- Output directory: `.next`
- Enable Vercel Analytics + Speed Insights in project dashboard

---

## Roadmap / Next steps

- [ ] Add real profile photo to Hero section
- [ ] Add real testimonials (replace placeholders)
- [ ] Add Angular meetup talk details to Talks section
- [ ] Set up Resend domain verification for contact form
- [ ] Add Vitest unit tests (theme toggle, locale switcher, form validation)
- [ ] Add Playwright E2E tests (dark mode persistence, locale switch, contact form flow)
- [ ] Set up Lighthouse CI in GitHub Actions (target: 95+ all categories)
- [ ] Configure custom domain `renellapur.dev`
- [ ] Enable Vercel Analytics + Speed Insights post-deploy
