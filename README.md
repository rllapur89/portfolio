# rene.llapur — Portfolio

Personal portfolio of **Rene Llapur**, Senior Frontend Engineer with 12+ years of experience across finance, education, government, and enterprise.

**Live:** [rene-llapur-portfolio.vercel.app](https://rene-llapur-portfolio.vercel.app/)

---

## Stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 16 (App Router) + React 19 + TypeScript 5 |
| Styling | Tailwind CSS v4 (CSS variables, `oklch` color space) |
| Animations | Framer Motion 12 (`prefers-reduced-motion` aware) |
| i18n | next-intl v4 — `/en` / `/es` routing |
| Theming | next-themes — system auto-detect + toggle, persisted in localStorage |
| Icons | Lucide React + simple-icons |
| Slider | Swiper 12 |
| Forms | React Hook Form + Zod v4 + Resend (Server Action) |
| SEO | `generateMetadata`, `sitemap.ts`, `robots.ts`, JSON-LD Person schema |
| Fonts | Geist Sans + Geist Mono via `next/font/google` |
| Deploy | Vercel |
| Testing | Vitest + Testing Library (unit) · Playwright (E2E) |

---

## Under the Hood

### Architecture

One-page scroll with anchor-based navigation (`#about`, `#experience`, `#projects`, etc.). All sections are server-rendered by default — only interactive components (`Headline`, `Projects`, `Header`) are `'use client'`. Static data lives in `src/lib/data.ts`; copy lives in `src/messages/{en,es}.json`.

### Theming

Dark/light via `next-themes` with `attribute="class"`. CSS variables defined in `globals.css` using `@theme` (Tailwind v4 native). Dark mode background uses two `radial-gradient` layers (green left, blue right) with `background-attachment: fixed` for a depth effect on scroll. No FOUC — `next-themes` injects a blocking script before paint.

Accent color: **emerald** (`oklch(0.72 0.17 156)`). To change it, update `--color-accent` and `--color-ring` in both `:root` and `.dark` blocks in `src/app/globals.css`.

### i18n

`next-intl` v4 with static locale routing. `generateStaticParams` emits both locales at build time — zero runtime locale detection. Toggle in header switches locale preserving the current path. `hreflang` alternate links are generated automatically in `generateMetadata`.

### Animations

Framer Motion with a custom `usePrefersReducedMotion` hook. When `prefers-reduced-motion: reduce` is active, motion components fall back to plain `div`s — no layout shift, no jarring transitions. The hero typewriter cursor uses a keyframe array `[1, 1, 0, 0]` with `times: [0, 0.5, 0.5, 1]` to achieve a proper hold-then-blink cadence rather than a linear fade.

### Projects Slider

SwiperJS with responsive `slidesPerGroup`: 1 on mobile, 2 on tablet, 3 on desktop. Dot indicators are computed dynamically from `slidesPerGroup` via `onBreakpoint` — `Math.ceil(total / perGroup)` — so they always reflect the actual number of page groups at the current viewport. Navigation clicks use `slideTo(i * perGroup)` for correct group alignment.

### Performance

- `next/image` with `fill` + `sizes` for all project thumbnails — AVIF/WebP served automatically by Vercel
- Fonts via `next/font/google` with `display: swap` — no layout shift
- `optimizePackageImports` for `lucide-react` and `framer-motion`
- App Router automatic code splitting per route

### SEO

- `generateMetadata` with `title`, `description`, `openGraph`, `twitter`, `canonical`, and `alternates` (hreflang EN/ES)
- JSON-LD `Person` schema injected in root layout
- `sitemap.ts` and `robots.ts` generated at build time

### Accessibility

- Semantic HTML: `<header>`, `<main>`, `<nav>`, `<section aria-labelledby>`, `<footer>`
- Skip-to-content link (visible on focus)
- All interactive elements have `aria-label` or associated labels
- Focus ring via `focus-visible:` Tailwind utilities
- Slider dots use `role="tablist"` / `role="tab"` with `aria-selected`

---

## Project Structure

```text
src/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx          # Per-locale root: html lang, ThemeProvider, PageLoader, NextIntlClientProvider
│   │   ├── page.tsx            # Home — all sections assembled
│   │   └── actions.ts          # Server Action: sendContactMessage → Resend
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
└── messages/
    ├── en.json                 # All EN copy
    └── es.json                 # All ES copy
tests/
├── unit/
│   ├── setup.ts                # jsdom, next-intl/next-themes/framer-motion mocks, matchMedia stub
│   ├── actions/
│   │   └── send-contact-message.test.ts  # Server action — validation, Resend mock, error paths
│   ├── hooks/
│   │   ├── use-reduced-motion.test.ts    # matchMedia listener + cleanup
│   │   └── use-typewriter.test.ts        # State machine with fake timers
│   └── lib/
│       ├── contact-schema.test.ts        # Zod schema validation
│       ├── get-youtube-id.test.ts        # URL parsing utility
│       └── utils.test.ts                 # cn, getSiteUrl, absoluteUrl, formatDate
└── e2e/
    ├── accessibility.spec.ts   # skip link, main, h1, img alt, nav aria-label
    ├── contact-form.spec.ts    # validation errors, field labels, submit button
    ├── locale.spec.ts          # EN↔ES switching on desktop and mobile
    ├── navigation.spec.ts      # redirect /, nav links, anchor scroll
    └── theme.spec.ts           # dark default, toggle, persistence across reload
```

---

## Sections

| Section | Description |
| --- | --- |
| **PageLoader** | Terminal boot sequence — typewriter lines, `[OK]`/`[READY]` tags, progress bar. i18n EN/ES. Respects `prefers-reduced-motion`. |
| **Headline** | Hero with staggered Framer Motion entry, typewriter role switcher with blinking cursor, mouse-follow spotlight, CV download CTA. |
| **About** | Lead paragraph + 3 pillars (Clean Architecture, Performance, Mentoring). |
| **Experience** | Timeline of 4 companies (Switch, 2innovate, Arnaldo Castro, Desoft) with highlights and tech stack badges. |
| **Projects** | 9 production projects in a responsive SwiperJS carousel (3/2/1 per slide). Cards with 3D tilt, cursor spotlight and hover zoom. |
| **Skills** | Grouped by category (Frontend, State, Backend, Infra, Testing, Practices, Tools) with SimpleIcons. |
| **Talks** | Angular meetup talk + certifications list. |
| **Contact** | React Hook Form + Zod validation + Resend Server Action. |

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+

### Install & run

```bash
npm install
npm run dev        # http://localhost:3000 → redirects to /en
```

### Environment Variables

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

> Without `RESEND_API_KEY` the contact form returns an `unconfigured` error — the rest of the site works fine.

### Build

```bash
npm run build      # SSG — generates /en and /es
npm run start      # Serve production build locally
npm run lint       # ESLint flat config
npm run format     # Prettier
```

### Testing

```bash
npm run test           # Vitest unit tests (38 tests)
npm run test:watch     # Vitest in watch mode
npm run test:e2e       # Playwright E2E (38 tests, desktop + mobile)
npm run test:e2e:ui    # Playwright with interactive UI
```

Unit tests cover: utilities (`cn`, `getSiteUrl`, `absoluteUrl`, `formatDate`), Zod contact schema validation, hooks (`usePrefersReducedMotion`, `useTypewriter`), YouTube ID extraction, and the `sendContactMessage` server action (including Resend mock scenarios).

E2E tests cover (Chromium + Pixel 5 mobile): navigation and anchor scrolling, locale switching EN↔ES, dark/light theme toggle with persistence, contact form validation, and accessibility landmarks.

> E2E tests require a running dev server (`npm run dev`) or will start one automatically via Playwright's `webServer` config.

---

## Projects Data

Projects are configured in `src/lib/data.ts` (`projectMeta` + `projectOrder`). Copy lives in `src/messages/{en,es}.json` under `projects.items`.

Each project entry has: `accent` color, `slug`, `live` URL and `image` path (under `public/images/`).

| Key | Site |
| --- | --- |
| `bancoEstado` | [bancoestado.cl](https://www.bancoestado.cl) |
| `verifone` | [us.vfmerchantportal.com](https://us.vfmerchantportal.com/) |
| `miAuto` | [miauto.sbi.uy](https://miauto.sbi.uy/) |
| `paseLibre` | [panel.paselibre.uy](https://panel.paselibre.uy/public/login) |
| `bcie` | [bcie.org](https://www.bcie.org/) |
| `tata` | [portal-proveedores.tata.com.uy](https://portal-proveedores.tata.com.uy/public/login) |
| `arnaldo` | [arnaldocastro.com.uy](https://arnaldocastro.com.uy/) |
| `twoinnovate` | [2innovateit.com](https://2innovateit.com/) |
| `axletrees` | [axletrees.com](https://axletrees.com/) |

---

## Deploy (Vercel)

```bash
# 1. Push to GitHub (repo: rllapur89/portfolio)
# 2. Import project on vercel.com
# 3. Set environment variables (see above)
# 4. Deploy — Vercel auto-detects Next.js
```

Recommended settings:

- Framework: Next.js (auto-detected)
- Build command: `npm run build`
- Enable Vercel Analytics + Speed Insights in project dashboard
