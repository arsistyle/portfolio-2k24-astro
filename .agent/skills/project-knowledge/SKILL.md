---
name: project-knowledge
description: Complete knowledge base for the arsi.dev portfolio project. Use this skill whenever working on this codebase to get instant context about the stack, architecture, content, conventions, routes, components, styling, and deployment — without having to re-analyze the project each session.
---

## Project Overview

**arsi.dev** is the personal portfolio and blog of **Israel Larrondo (Arsi)**, a Front-End Designer/Developer with 7+ years of experience. It showcases his work, publishes bilingual blog content (EN/ES), and includes a small digital products shop.

- **Live site**: https://arsi.dev
- **Repository**: arsistyle/portfolio-2k24-astro
- **Hosting**: Cloudflare Pages (static + selective SSR hybrid)
- **Default language**: English (`/`), Spanish at `/es/`

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Astro 6.1.5 |
| UI Components | React 19 (islands) |
| Styling | TailwindCSS 4.2 + PostCSS Nesting |
| Language | TypeScript 5.9 (strict) |
| Content | MDX via @astrojs/mdx |
| Fonts | Syne Variable, Google Sans Flex |
| Icons | @tabler/icons-react, react-icons |
| Adapter | @astrojs/cloudflare 13.1.8 |
| Image CDN | Cloudflare R2 (`pub-e84866d2025a4715887cd3e35165cedc.r2.dev`) |
| Comments | Giscus (GitHub Discussions) |
| Analytics | Google AdSense |
| Payments | PayPal (donations + shop) |

**Key libraries:** `class-variance-authority`, `tailwind-merge`, `photoswipe`, `cmdk`, `js-cookie`, `react-final-marquee`, `smooth-scroll`, `astro-seo`, `@astrojs/sitemap`

---

## Directory Structure

```
src/
├── assets/img/           # Static images
├── components/
│   ├── core/             # ~25 reusable components
│   ├── sections/         # Page sections (Hero, About, Experience, etc.)
│   ├── shared/           # Header, Footer
│   ├── ui/               # Nav, Breadcrumbs, HeaderPage, Menu
│   └── icons/            # SVG icon components
├── middleware.ts          # Route protection — blocks disabled routes by env at runtime
├── config/               # giscus.ts, routes.ts, categories.ts
├── constants/            # index.ts — URLs, payment methods, blog settings
├── content/
│   ├── blog/             # ~52 MDX posts (bilingual)
│   ├── projects/         # Portfolio project MDX files
│   ├── products/         # Shop product JSON files
│   ├── sections/         # Localized about-section MDX
│   ├── seo/              # en.json / es.json per-page SEO metadata
│   ├── experience.ts     # Bilingual work history data
│   └── stack.ts          # Tech stack data
├── content.config.ts     # Astro Content Layer API — all collection definitions + Zod schemas
├── css/                  # global.css, main.css, typography.css, button.css, etc.
├── i18n/                 # en.json, es.json, utils.ts
├── layouts/              # Layout.astro, PageLayout.astro, PostLayout.astro, NotFoundLayout.astro
├── pages/                # Routes (root = EN, /es/ = ES)
├── types/                # TypeScript type definitions
└── utils/                # getBlogPosts, getProjects, image helpers, cookie utils
public/                   # favicon.svg, robots.txt, ads.txt
scripts/                  # fix-routes.mjs (post-build Cloudflare route fixer + worker bundler)
```

---

## Routes

| Route | Languages | Environment |
|---|---|---|
| `/` | EN + ES | all |
| `/blog/` | EN + ES | all |
| `/blog/[slug]/` | EN + ES | all |
| `/blog/[category]/` | EN + ES | all |
| `/projects/` | EN + ES | all |
| `/projects/[id]/` | EN + ES | all |
| `/shop/` | EN + ES | **local only** |
| `/shop/[id]/` | EN + ES | **local only** |
| `/shop/thank-you/` | EN + ES | **local only** |
| `/audit/` | EN + ES | all |
| `/contact/` | EN + ES | all |
| `/components/` | EN | dev |
| `/api/blog-index.json` | — | all (SSR) |
| `/api/contact` | — | all (SSR POST) |
| `/llms.txt` | — | all |

Spanish routes mirror English routes under `/es/` prefix. Route availability is controlled via `src/config/routes.ts` with env-based gating, **enforced at runtime by `src/middleware.ts`** — direct URL access to disabled routes returns 302 → `/404`.

### Route Protection Middleware (`src/middleware.ts`)

Intercepts all non-API, non-asset requests and calls `isRouteEnabled()` from `routes.ts`. If the route is not allowed in the current env, redirects to `/404` (302).

- **Env detection:** `import.meta.env.APP_ENV` (override) → `import.meta.env.MODE` ("development" | "production")
- **Path normalization:** strips `/es` prefix before checking (routes in `ROUTES` use no lang prefix)
- **Skips:** `/api/*` and paths with a file extension (static assets)
- **Local dev (`astro dev`):** `MODE = "development"` → shop accessible (logic in `isRouteEnabled` treats "development" as "local")
- **Production build / Cloudflare deploy:** `MODE = "production"` → shop routes return 404
- **Override:** set `APP_ENV=local` in `.env` to simulate local-only access in any build mode

---

## Layouts

1. **`Layout.astro`** — Root layout. Injects SEO (astro-seo), View Transitions, fonts, AdSense script, dark-mode class (`<html class="dark">`), SVG filter defs, modal root.
2. **`PageLayout.astro`** — Wraps content pages. Route availability check, optional Sidebar, HeaderPage. **Important:** slot content is already inside a `container mx-auto flex max-w-6xl flex-col gap-6 px-6` wrapper — section components should NOT add an extra container div.
3. **`PostLayout.astro`** — Blog post layout. Hero image + reading time, 12-col grid (content 8 / sidebar 4), sticky sidebar with categories + share + ads, Giscus comments, BlogPaginator, DonationBox.
4. **`NotFoundLayout.astro`** — 404 page.

---

## Core Components Reference

| Component | Description |
|---|---|
| `Button` | Multi-variant button: filled/outlined, colors (primary/secondary/dark/light/whatsapp), sizes (xs–xl). Supports `id` prop (forwarded to the DOM element — useful for JS targeting like submit buttons). |
| `BlogCard` | Post preview card with reading time |
| `BlogPaginator` | Prev/next post navigation |
| `CategoryFilter` | Blog category filtering UI |
| `Comments` | Giscus wrapper — auto theme-switch via CustomEvent |
| `DonationBox` | PayPal donation CTA |
| `Gallery` | Photoswipe lightbox image gallery |
| `LangSelector` | EN ↔ ES language switcher |
| `Marquee` | Tech stack scrolling carousel |
| `Pagination` | Page pagination controls |
| `Products / ProductDetail` | Shop product grid + detail |
| `Projects / ProjectDetail` | Portfolio grid + detail |
| `ShareButtons` | Copy link, Twitter, LinkedIn, Facebook, WhatsApp |
| `Sidebar` | Navigation sidebar with nested menus |
| `SwitchScheme` | Dark/light mode toggle (cookie-persisted) |
| `Typography` | Semantic text wrappers (h1–h6, p, etc.) |
| `AdSlot` | Google AdSense + AdBlock fallback |
| `BackgroundGrid` | Decorative grid background |
| `CodeBlock` | Syntax-highlighted code snippet |
| `ContentBlock` | MDX content wrapper |
| `FlowStep` | Card with circular icon badge, title, and slot. Props: `icon: string`, `title: string`. Style: `bg-gray-100 dark:bg-black-700 rounded-2xl p-5`. Icon badge always uses primary green. **NOT exported from `core/index.astro`** — import directly: `import FlowStep from "@/components/core/FlowStep/FlowStep.astro"` |
| `FlowSteps` | Vertical column wrapper for FlowStep items (`flex flex-col gap-4`). Also NOT in core/index.astro — import directly: `import FlowSteps from "@/components/core/FlowStep/FlowSteps.astro"` |
| `Magnet` | Magnetic cursor effect |
| `PromptTutorial` | Educational flow for prompt posts |
| `ResponsePage` | Dynamic content layout |
| `Sources` | Citation/source links |

**Section components:** `Hero` (animated blob avatar — Perlin noise + mouse tracking), `About`, `Experience` (timeline, dynamic year calc), `Stack` (marquee + tooltips), `Projects`, `ProjectsAll`, `Products`, `ProductsAll`, `ShopThankYou`, `AuditService` (composer for the audit page — imports `AuditWho`, `AuditLayers`, `AuditDeliverables`, `AuditCTA`), `ContactForm` (contact form section — see below).

**ContactForm (`src/components/sections/ContactForm.astro`):**
Two-column layout: `grid grid-cols-1 items-start gap-12 md:grid-cols-[5fr_7fr] md:gap-20`.
- **Left column:** description paragraph + "Why work with me?" heading + 3 highlight props (reply, privacy, transparency) — all from i18n keys `contact.props.*`
- **Right column:** the form with `Input`, `Select`, `Textarea` form components + Cloudflare Turnstile CAPTCHA + submit `Button` (variant="filled" color="primary" class="w-full") with `TbLoader` spinner from `react-icons/tb` as `startIcon` slot
- **Loading state:** during submission, all fields get `disabled` + `opacity-60 cursor-not-allowed` classes. Spinner uses `hidden`/`block` toggle via `getElementById("submit-spinner")`
- **Status messages:** `#form-status` div toggled `hidden`/`block` with success/error messages from `data-success`/`data-error` attributes
- **Turnstile:** site key from `import.meta.env.PUBLIC_TURNSTILE_SITE_KEY` (fallback: `"1x00000000000000000000AA"` for local testing)
- **Form components** (`src/components/form/`): `Input.astro`, `Select.astro`, `Textarea.astro` — styled form fields

**Icon system:** Custom SVG icons in `src/components/icons/`. Currently available: `Check` (checkmark SVG). Import via `import { Check } from "@/components/icons/index.astro"`. For additional icons use `@tabler/icons-react` or `react-icons`.

**Typography CSS classes** (from `typography.css`): `h1`–`h5` apply Syne font + responsive clamp sizing. `p.highlight` gives larger body text (`clamp(1.1rem,1.6vw,1.4rem)`). Color is NOT included in these classes — always add `text-dark dark:text-white` explicitly. The `h1.heading` variant uses `clamp(2.8rem,8vw,8rem)` for hero-scale display text.

**`p.highlight` requires BOTH classes** on the element: `<p class="p highlight">`. The Typography component renders `<Tag class={twMerge(type, className)}>`, so `type="highlight"` is NOT valid — it falls back to `<p>` but only applies the `highlight` class, missing `p`. Always write `<p class="p highlight ...">` directly.

**Always add `text-dark` explicitly** to Typography components. The `h1`–`h5` and other typographic classes do NOT include a light-mode text color — omitting `text-dark dark:text-white` causes invisible text in light mode. Convention: every Typography usage should have `class="text-dark ... dark:text-white"` (or equivalent).

**`font-syne` Tailwind utility** is available (from `--font-family-syne` in `@theme`) for inline decorative text that needs Syne without using the Typography component.

**Shared:** `Header` (with LangSelector), `Footer` (CTA + links).

---

## Content Collections

### Blog (`src/content/blog/`)
~52 MDX files. **Schema:**
```ts
title: z.string()
description: z.string()
search_context: z.string()
date: z.string()          // ISO 8601
lang: z.enum(["en", "es"])
image: z.string()         // R2 CDN URL
og_image: z.string().optional()
categories: z.array(z.enum(CATEGORY_SLUGS))
status: z.enum(["active", "draft"])
```
10 posts per page. Posts with future dates are hidden in production. The `id` (slug) is derived from the filename by the Content Layer API — no `slug` field in frontmatter.

### Projects (`src/content/projects/` and `proyectos/`)
MDX files with:
```ts
name, lang, title, description, categories, date (YYYYMM), og_image
images: { small, medium, large }  // all R2 CDN URLs
```

### Products (`src/content/products/`)
JSON files. Example: Bob Squarepants Faces digital asset pack.
```ts
category, description, gallery: [{ url, alt }], price, paymentMethods, thumbnail
```

### SEO (`src/content/seo/`)
`en.json` / `es.json` — per-page: `title`, `description`, `og_title`, `og_image`.

### Experience (`src/content/experience.ts`)
4 bilingual roles, 2017–present (Front-End Developer → Technical Lead → Layout Designer).

---

## Blog Categories (18)

AI, Prompt, Nano Banana, Gemini, Blog, Personal, Front-End, UI/UX, Resources, Templates, Tools, Astro, React, CSS, JavaScript, TypeScript, HTML, SEO.

Each category has: custom icon, Tailwind className overrides, display order, and bilingual labels.

---

## Styling System

**TailwindCSS 4.2** with `@theme` block in `main.css`:

**Fonts:** `--font-syne` (display), `--font-google-sans` (body)

**Color palettes (8 shades each):**
- **Primary (green):** `--color-primary-*` (#f0fff6 → #1e874b)
- **Secondary (purple):** `--color-secondary-*` (#f8f5fc → #381c63)
- **Tertiary (orange):** `--color-tertiary-*` (#fcf4e8 → #bc5b04)
- **Gray:** `--color-gray-*`
- **Black:** `--color-black-*` (#3f4244 → #17191b)
- **Semantic:** success, danger, info, warning

**Dark mode:** `@custom-variant dark (&:where(.dark, .dark *))` — toggled via class on `<html>`. Default is dark mode.

**CSS files:** `global.css` (aggregator), `main.css` (tokens), `typography.css`, `button.css`, `timelineAnimation.css`, `mark-text.css`.

**Patterns:** Tailwind utilities + scoped `<style>` blocks in `.astro` files + `class-variance-authority` for component variants + `tailwind-merge` for conditional classes.

---

## i18n System

- **Languages:** `en` (default, `/`) and `es` (`/es/`)
- **Translation files:** `src/i18n/en.json` (84 keys), `src/i18n/es.json` (83 keys)
- **Helpers** (`src/i18n/utils.ts`):
  - `getLangFromUrl(url)` — extract lang from pathname
  - `useTranslations(lang)` — returns `t(key)` function
  - `useTranslatedPath(lang)` — returns `path(route)` for localized links
  - `getRouteFromUrl(url)` — extract route name
  - `cleanUrl(url)` — strip `/es/` prefix
- Content is physically separated by `lang` field in frontmatter; utilities filter by language.

---

## Key Features

**Dark/Light Theme**
- Default: dark mode (`class="dark"` on `<html>`)
- Toggle via `SwitchScheme` component
- Persisted in cookie via `js-cookie`
- Giscus theme syncs via `CustomEvent('theme-change')`

**Giscus Comments**
- Backend: GitHub Discussions on `arsistyle/portfolio-2k24-astro`
- Config in `src/config/giscus.ts`
- Lazy-loaded on blog posts
- Automatic dark/light theme sync

**SEO**
- `astro-seo` for meta/OG tags
- Canonical URLs
- `@astrojs/sitemap` (auto-generated `sitemap-0.xml`)
- `robots.txt` in public/
- `og_image` fallback to language-specific default (R2 CDN)
- `ads.txt` for AdSense
- `llms.txt` for LLM indexing

**Performance**
- Static pre-rendering by default, SSR with `export const prerender = false` per-page
- Sharp for image optimization
- Astro View Transitions
- Photoswipe lazy gallery
- Cloudflare CDN edge

**Blog Search**
- `/api/blog-index.json` — SSR endpoint returning search index
- `search_context` field in frontmatter for richer search

**Contact API (`/src/pages/api/contact.ts`):**
- `export const prerender = false` — SSR route
- Method: POST, accepts `application/x-www-form-urlencoded`
- Validation: Zod schemas per lang (`src/utils/validations.ts`) — fields: `name`, `email`, `subject`, `message`, `cf-turnstile-response`, `lang`
- Security: HTML-escapes all user inputs via `escapeHtml()` before embedding in email HTML
- Cloudflare Turnstile verification (POST to `https://challenges.cloudflare.com/turnstile/v0/siteverify`)
- Email via Resend API (`https://api.resend.com/emails`)
- Env vars: `TURNSTILE_SECRET_KEY`, `RESEND_API_KEY`, `RESEND_TO_EMAIL`, `RESEND_FROM_EMAIL` (read via Cloudflare runtime env with `import.meta.env` fallback)

---

## Constants (`src/constants/index.ts`)

```ts
MAIN_URL = "https://arsi.dev"
TWITTER_HANDLE = "@arsistyle"
FB_APP_ID = "747608188232727"
PAYPAL_DONATE = { es: "...", en: "..." }
DEFAULT_OG_IMAGE = { es: "...", en: "..." }  // R2 CDN URLs
BLOG_POSTS_PER_PAGE = 10
```

---

## Astro Config Summary (`astro.config.mjs`)

```js
site: "https://arsi.dev"
output: "static"          // hybrid: pages set prerender=false for SSR
adapter: cloudflare({ platformProxy: { enabled: true } })
integrations: [mdx(), react(), sitemap()]
image.remotePatterns: [R2 CDN hostname]
vite.plugins: [tailwindcss()]
vite.resolve.alias (prod): "react-dom/server" → "react-dom/server.edge"
```

---

## Build & Deployment

**Scripts:**
- `npm run dev` — Astro dev server
- `npm run build` — `astro check && astro build` (postbuild runs automatically)
- `npm run postbuild` — `node scripts/fix-routes.mjs` (auto-runs after build)
- `npm run preview` — `wrangler pages dev ./dist/client`
- `npm run check` — `astro check && tsc --noEmit`
- `npm run format` — Prettier
- `npm run lint` — oxlint

**Post-build (`scripts/fix-routes.mjs`):**
Runs automatically after `astro build`. Does three things:

1. **`_routes.json`** — written to `dist/client/`. Includes all routes (`/*`), excludes static assets (`/_astro/*`, `/favicon.svg`, etc.) and pre-rendered page dirs to stay under the 100-rule limit.

2. **Worker bundle** — bundles `dist/server/entry.mjs` + its chunks into a single `dist/client/_worker.js` using esbuild (`bundle: true`, `format: esm`, `external: ["cloudflare:*","node:*"]`). This is required because `@astrojs/cloudflare` v13 outputs a Workers Assets setup (`dist/server/` + `wrangler.json`) that Cloudflare Pages rejects. Pages advanced mode requires a self-contained `_worker.js` in the build output root.

3. **Cleanup** — removes `dist/server/wrangler.json` and `.wrangler/deploy/config.json` to prevent Cloudflare's "redirected wrangler configuration" from conflicting with the root `wrangler.toml`.

**Cloudflare runtime env pattern (SSR routes):** On Cloudflare Pages, secret env vars are available via `locals.runtime.env`, NOT via `import.meta.env` at runtime. Always read them with fallback: `const runtimeEnv = (locals as any).runtime?.env || {}; const secret = runtimeEnv.MY_VAR || import.meta.env.MY_VAR`. The `import.meta.env` fallback covers local dev (wrangler dev / astro dev with platformProxy).

**Wrangler (`wrangler.toml`):**
- Output: `./dist/client` (`pages_build_output_dir`) — points to where the adapter puts static files
- Compatibility date: 2025-08-15
- Node.js compat enabled

**Build output structure (`@astrojs/cloudflare` v13):**
```
dist/
├── client/          ← pages_build_output_dir (served by Cloudflare Pages CDN)
│   ├── _worker.js   ← bundled SSR worker (generated by postbuild)
│   ├── _routes.json ← routing rules (generated by postbuild)
│   ├── _astro/      ← hashed CSS/JS assets
│   ├── index.html   ← prerendered pages
│   └── ...
└── server/          ← adapter intermediary (NOT deployed to Pages)
    ├── entry.mjs
    └── chunks/
```

---

## TypeScript & Tooling

- **tsconfig**: extends `astro/tsconfigs/strict`, JSX react-jsx, `@/*` alias → `./src/*`
- **Prettier**: print width 100, no semicolons, tabs (2-space), trailing commas ES5, plugins: prettier-plugin-astro + prettier-plugin-tailwindcss
- **Linting**: oxlint (fast, Rust-based)

---

## Conventions

- **Path aliases:** `@/` maps to `src/` — use for all internal imports
- **Images:** Always use Cloudflare R2 CDN URLs for blog/project images
- **Language gating:** New content routes must be added to `src/config/routes.ts` — the middleware enforces availability automatically; no per-page guard needed
- **New blog categories:** Add to `src/config/categories.ts` with icon, className, order, and translations
- **SSR pages:** Add `export const prerender = false` at top of page file
- **Component variants:** Use `class-variance-authority` + `tailwind-merge`
- **Dark mode classes:** Use `dark:` Tailwind prefix (triggered by `.dark` on `<html>`)
- **No CLAUDE.md** exists in the repo — this skill is the authoritative project reference
- **Scroll animations:** Use CSS `animation-timeline: view()` with `animation-fill-mode: both`. Correct range: `entry 0% cover 30%` (or similar `cover` endpoint). Avoid `entry 0% entry X%` — the entry-only range completes too fast to be visible. Pattern already in use: `mark-text.css` (highlight color: `primary.400`). Named scroll timeline `--mainTimeline` is defined on `html` for parallax effects; separate from view()-based entrance animations.
- **Copy voice:** Israel works alone — always first person singular in all copy ("reviso", "audito", "evalúo" / "I review", "I audit"). Never "revisamos", "we review", etc.
- **In-page CTA vs Footer:** Footer uses an 8+4 split grid with green bg. In-page CTAs should use centered layout (`flex-col items-center text-center`) to avoid visual confusion with the Footer.
- **Bento grid pattern:** Used in AuditWho — `grid grid-cols-3 gap-4` with cards as `col-span-3 lg:col-span-1` (each card takes full width on mobile, 1/3 on large screens). Brand colors: `bg-secondary-400` (purple), `bg-primary-400` (green), `bg-tertiary-400` (orange). Text always `text-dark` on colored backgrounds. Cards use `hover:translate-y-4 transition-transform duration-300 cursor-default`.
