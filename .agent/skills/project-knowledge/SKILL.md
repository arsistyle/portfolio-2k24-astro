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
| Framework | Astro 5.18 |
| UI Components | React 19 (islands) |
| Styling | TailwindCSS 4.2 + PostCSS Nesting |
| Language | TypeScript 5.9 (strict) |
| Content | MDX via @astrojs/mdx |
| Fonts | Syne Variable, Google Sans Flex |
| Icons | @tabler/icons-react, react-icons |
| Adapter | @astrojs/cloudflare 12.6 |
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
├── config/               # giscus.ts, routes.ts, categories.ts
├── constants/            # index.ts — URLs, payment methods, blog settings
├── content/
│   ├── blog/             # ~52 MDX posts (bilingual)
│   ├── projects/         # Portfolio project MDX files
│   ├── products/         # Shop product JSON files
│   ├── sections/         # Localized about-section MDX
│   ├── seo/              # en.json / es.json per-page SEO metadata
│   ├── config.ts         # Astro content collections + Zod schemas
│   ├── experience.ts     # Bilingual work history data
│   └── stack.ts          # Tech stack data
├── css/                  # global.css, main.css, typography.css, button.css, etc.
├── i18n/                 # en.json, es.json, utils.ts
├── layouts/              # Layout.astro, PageLayout.astro, PostLayout.astro, NotFoundLayout.astro
├── pages/                # Routes (root = EN, /es/ = ES)
├── types/                # TypeScript type definitions
└── utils/                # getBlogPosts, getProjects, image helpers, cookie utils
public/                   # favicon.svg, robots.txt, ads.txt
scripts/                  # fix-routes.mjs (post-build Cloudflare route fixer)
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
| `/components/` | EN | dev |
| `/api/blog-index.json` | — | all (SSR) |
| `/llms.txt` | — | all |

Spanish routes mirror English routes under `/es/` prefix. Route availability is controlled via `src/config/routes.ts` with env-based gating.

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
| `Button` | Multi-variant button: filled/outlined, colors (primary/secondary/dark/light/whatsapp), sizes (xs–xl) |
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

**Section components:** `Hero` (animated blob avatar — Perlin noise + mouse tracking), `About`, `Experience` (timeline, dynamic year calc), `Stack` (marquee + tooltips), `Projects`, `ProjectsAll`, `Products`, `ProductsAll`, `ShopThankYou`, `AuditService` (composer for the audit page — imports `AuditWho`, `AuditLayers`, `AuditDeliverables`, `AuditCTA`).

**Icon system:** Custom SVG icons in `src/components/icons/`. Currently available: `Check` (checkmark SVG). Import via `import { Check } from "@/components/icons/index.astro"`. For additional icons use `@tabler/icons-react` or `react-icons`.

**Typography CSS classes** (from `typography.css`): `h1`–`h5` apply Syne font + responsive clamp sizing. `p.highlight` gives larger body text (`clamp(1.1rem,1.6vw,1.4rem)`). Color is NOT included in these classes — always add `text-dark dark:text-white` explicitly. The `h1.heading` variant uses `clamp(2.8rem,8vw,8rem)` for hero-scale display text.

**`p.highlight` requires BOTH classes** on the element: `<p class="p highlight">`. The Typography component renders `<Tag class={twMerge(type, className)}>`, so `type="highlight"` is NOT valid — it falls back to `<p>` but only applies the `highlight` class, missing `p`. Always write `<p class="p highlight ...">` directly.

**`font-syne` Tailwind utility** is available (from `--font-family-syne` in `@theme`) for inline decorative text that needs Syne without using the Typography component.

**Shared:** `Header` (with LangSelector), `Footer` (CTA + links).

---

## Content Collections

### Blog (`src/content/blog/`)
~52 MDX files. **Schema:**
```ts
status: z.enum(["active", "draft"])
title: z.string()
slug: z.string()
description: z.string()
search_context: z.string()
date: z.string()          // ISO 8601
lang: z.enum(["en", "es"])
image: z.string()         // R2 CDN URL
og_image: z.string()
categories: z.array(z.string())
```
10 posts per page. Posts with future dates are hidden in production.

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
- `npm run build` — `astro check && tsc && astro build && node scripts/fix-routes.mjs`
- `npm run preview` — Wrangler local preview
- `npm run format` — Prettier
- `npm run lint` — oxlint

**Post-build (`scripts/fix-routes.mjs`):**
Generates `_routes.json` for Cloudflare Pages. Includes all routes (`/*`), excludes static assets (`/_astro/*`, `/favicon.svg`, etc.), auto-excludes pre-rendered pages to stay under the 100-rule limit.

**Wrangler (`wrangler.toml`):**
- Output: `./dist`
- Compatibility date: 2025-08-15
- Node.js compat enabled

---

## TypeScript & Tooling

- **tsconfig**: extends `astro/tsconfigs/strict`, JSX react-jsx, `@/*` alias → `./src/*`
- **Prettier**: print width 100, no semicolons, tabs (2-space), trailing commas ES5, plugins: prettier-plugin-astro + prettier-plugin-tailwindcss
- **Linting**: oxlint (fast, Rust-based)

---

## Conventions

- **Path aliases:** `@/` maps to `src/` — use for all internal imports
- **Images:** Always use Cloudflare R2 CDN URLs for blog/project images
- **Language gating:** New content routes must be added to `src/config/routes.ts`
- **New blog categories:** Add to `src/config/categories.ts` with icon, className, order, and translations
- **SSR pages:** Add `export const prerender = false` at top of page file
- **Component variants:** Use `class-variance-authority` + `tailwind-merge`
- **Dark mode classes:** Use `dark:` Tailwind prefix (triggered by `.dark` on `<html>`)
- **No CLAUDE.md** exists in the repo — this skill is the authoritative project reference
- **Scroll animations:** Use CSS `animation-timeline: view()` with `animation-fill-mode: both`. Correct range: `entry 0% cover 30%` (or similar `cover` endpoint). Avoid `entry 0% entry X%` — the entry-only range completes too fast to be visible. Pattern already in use: `mark-text.css`. Named scroll timeline `--mainTimeline` is defined on `html` for parallax effects; separate from view()-based entrance animations.
- **Copy voice:** Israel works alone — always first person singular in all copy ("reviso", "audito", "evalúo" / "I review", "I audit"). Never "revisamos", "we review", etc.
- **In-page CTA vs Footer:** Footer uses an 8+4 split grid with green bg. In-page CTAs should use centered layout (`flex-col items-center text-center`) to avoid visual confusion with the Footer.
- **Bento grid pattern:** Used in AuditWho — `grid grid-cols-2 gap-4` with `col-span-2` full-width card + two `col-span-2 md:col-span-1` cards. Brand colors: `bg-secondary-400` (purple), `bg-primary-400` (green), `bg-tertiary-400` (orange). Text always `text-dark` on colored backgrounds.
