# Rene Llapur — Portfolio

Personal portfolio of **Rene Llapur**, Senior Frontend Engineer. Built with Next.js 15, Tailwind CSS v4, Framer Motion, and next-intl.

**Live:** `renellapur.dev` (pending deploy)

---

## Stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 15.x (App Router) + React 19 + TypeScript 5 |
| Styling | Tailwind CSS v4 (CSS variables, `oklch` color space) |
| Animations | Framer Motion 11 (`prefers-reduced-motion` aware) |
| i18n | next-intl v3 — `/en` / `/es` routing with `localePrefix: 'always'` |
| Theming | next-themes — system auto-detect + toggle, persisted in localStorage |
| Forms | React Hook Form + Zod + Resend (Server Action) |
| SEO | `generateMetadata`, `sitemap.ts`, `robots.ts`, JSON-LD Person schema |
| Fonts | Geist Sans + Geist Mono via `next/font/google` |

---

## Project structure

```text
src/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx          # Per-locale root: html lang, ThemeProvider, PageLoader, NextIntlClientProvider
│   │   ├── page.tsx            # Home — all sections assembled
│   │   └── actions.ts          # Server Action: sendContactMessage → Resend
│   ├── layout.tsx              # Root passthrough (Next.js requirement)
│   ├── globals.css             # Tailwind v4 @theme, CSS vars light/dark, utilities
│   ├── sitemap.ts
│   ├── robots.ts
│   └── manifest.ts
├── components/
│   ├── layout/                 # Header, Footer, ThemeToggle, LocaleSwitcher, ThemeProvider, PageLoader
│   ├── sections/               # Headline, About, Experience, Projects, Skills, Talks, Contact
│   ├── animations/             # FadeIn, Stagger, StaggerItem
│   └── ui/                     # Button, Badge, Section
├── hooks/
│   ├── use-reduced-motion.ts   # Reads prefers-reduced-motion
│   ├── use-typewriter.ts       # Typewriter effect for Hero roles
│   └── use-scroll-progress.ts
├── i18n/
│   ├── routing.ts              # defineRouting — locales, defaultLocale
│   ├── navigation.ts           # createNavigation (Link, useRouter, usePathname)
│   └── request.ts              # getRequestConfig — loads messages per locale
├── lib/
│   ├── data.ts                 # Experience, projects, skills, certifications — static typed data
│   ├── seo.ts                  # buildMetadata helper + personJsonLd
│   ├── site-config.ts          # Name, email, socials, nav sections
│   └── utils.ts                # cn(), absoluteUrl(), getSiteUrl()
├── messages/
│   ├── en.json                 # All EN copy
│   └── es.json                 # All ES copy
└── proxy.ts                    # next-intl middleware
```

---

## Sections

| Section | Description |
| --- | --- |
| **PageLoader** | Terminal boot sequence — typewriter lines, `[OK]`/`[READY]` tags, progress bar. i18n EN/ES. Respects `prefers-reduced-motion`. |
| **Headline** | Hero with staggered Framer Motion entry, typewriter role switcher, mouse-follow spotlight, CV download CTA. |
| **About** | Lead paragraph + 3 pillars (Clean Architecture, Performance, Mentoring). |
| **Experience** | Timeline of 4 companies (Switch, 2innovate, Arnaldo Castro, Desoft) with highlights and tech stack badges. |
| **Projects** | 6 production projects as image cards with 3D tilt, cursor spotlight and hover zoom. Opens in new tab. |
| **Skills** | Grouped by category (Frontend, State, Backend, Infra, Testing, Practices, Tools) with SimpleIcons. |
| **Talks** | Angular meetup talk + certifications list. |
| **Contact** | React Hook Form + Zod validation + Resend Server Action. |

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
npm run build      # SSG — generates /en and /es
npm run start      # Serve production build locally
npm run lint       # ESLint (flat config)
npm run format     # Prettier
```

---

## Projects data

The 6 featured projects are configured in `src/lib/data.ts` (`projectMeta` + `projectOrder`). Copy lives in `src/messages/{en,es}.json` under `projects.items`.

Each project has: `accent` color, `slug`, `live` URL and `image` path (under `public/images/`).

Current projects:

| Key | Site |
| --- | --- |
| `miAuto` | [miauto.sbi.uy](https://miauto.sbi.uy/) |
| `paseLibre` | [panel.paselibre.uy](https://panel.paselibre.uy/public/login) |
| `verifone` | [us.vfmerchantportal.com](https://us.vfmerchantportal.com/) |
| `bcie` | [bcie.org](https://www.bcie.org/) |
| `bancoEstado` | [bancoestado.cl](https://www.bancoestado.cl) |
| `tata` | [portal-proveedores.tata.com.uy](https://portal-proveedores.tata.com.uy/public/login) |

---

## i18n

| Locale | URL | Default |
| --- | --- | --- |
| English | `/en` | ✅ yes |
| Spanish | `/es` | — |

- Root `/` redirects to `/en` (middleware detects `Accept-Language` header).
- Toggle in header switches locale while preserving the current path.
- `hreflang` alternate links generated automatically in `generateMetadata`.
- PageLoader boot lines are also translated per locale.

To add a new locale: add it to `src/i18n/routing.ts` → `locales` array and create `src/messages/{locale}.json`.

---

## Theming

- Default: `dark`.
- Toggle in header switches and persists to `localStorage`.
- CSS variables defined in `globals.css` using `oklch` color space.
- Accent color: **emerald** (`oklch(0.72 0.17 156)`).

To change accent: update `--color-accent` and `--color-ring` in both `:root` and `.dark` blocks in [src/app/globals.css](src/app/globals.css).

---

## SEO checklist

- [x] `generateMetadata` on every route (title, description, canonical, alternates, OG, Twitter)
- [x] `hreflang` EN/ES via `alternates.languages`
- [x] `sitemap.xml` — static pages, both locales
- [x] `robots.txt` — allow all, sitemap reference
- [x] `manifest.webmanifest` — PWA metadata
- [x] JSON-LD `Person` schema injected in `<head>`
- [x] Self-hosted Geist fonts with `display: swap`
- [x] `next/image` with AVIF/WebP formats

---

## Performance notes

- `optimizePackageImports` enabled for `lucide-react` and `framer-motion`.
- All animations respect `prefers-reduced-motion: reduce` — motion disabled entirely.
- PageLoader skipped entirely when `prefers-reduced-motion` is active.

---

## Deploy (Vercel — pending)

```bash
# 1. Push to GitHub (repo: rllapur89/portfolio)
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

- [ ] Add real profile photo to About section
- [ ] Highlight GDE & MVP badges in Hero or About
- [ ] Set up Resend domain verification for contact form
- [ ] Add Vitest unit tests (theme toggle, locale switcher, form validation)
- [ ] Add Playwright E2E tests (dark mode persistence, locale switch, contact form flow)
- [ ] Set up Lighthouse CI in GitHub Actions (target: 95+ all categories)
- [ ] Configure custom domain `renellapur.dev`
- [ ] Enable Vercel Analytics + Speed Insights post-deploy
