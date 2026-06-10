---
description: Estándares SEO y GEO (Generative Engine Optimization) para arsi.dev
---

## SEO — Requisitos por página

| Campo | Regla |
|---|---|
| `<title>` | Patrón: `[Página] \| Israel Larrondo` — nunca solo el nombre de sección |
| `meta description` | Única por página, 150-160 chars, nunca copiar la del homepage |
| OG image | Específica por página si existe; fallback a `DEFAULT_OG_IMAGE[lang]` |
| `canonical` | Autogenerado por `Layout.astro` — no sobrescribir sin motivo |

## JSON-LD — Pendiente implementar (Stage 1)

Schemas a añadir en `Layout.astro`:
- Homepage: `WebSite` con `SearchAction` + `Person` con sameAs
- Blog posts: `Article`
- `/audit`: `Service`
- Páginas internas: `BreadcrumbList`

## Blog — Calidad

- **Mínimo 800 palabras por post** — posts actuales (~300 palabras) tienen riesgo de thin content
- Cada post: al menos 3 H2s con keywords, imagen OG propia
- Categorías existentes: AI, Tools, SEO, Front-End, Personal — mantener

## GEO — Generative Engine Optimization

- `llms.txt` ya existe — actualizar con cada nuevo post/proyecto
- **Pendiente:** `llms-full.txt` con bio completa, servicios detallados y FAQ
- Añadir sección FAQ en `/audit` con respuestas directas (qué incluye, cuánto tarda)
- Bio del homepage: especificar especialidad + stack + tipo de clientes + disponibilidad geográfica

## robots.txt

Verificar que `public/robots.txt` contiene:
```
User-agent: *
Allow: /
Sitemap: https://arsi.dev/sitemap-index.xml
```
