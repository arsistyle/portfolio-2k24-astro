---
description: Convenciones de código para Astro, TailwindCSS 4, React y Sanity en este proyecto
---

## Astro

- Scripts cliente: siempre en `document.addEventListener('astro:page-load', ...)` — View Transitions activo
- Páginas SSR: `export const prerender = false` al top del archivo
- Imports: alias `@/` → `src/` (nunca rutas relativas largas)
- Layouts: usar `Layout.astro` base; no crear wrappers ad-hoc

## TailwindCSS 4.2

- **Prohibido:** `shadow-*`, `border-*` en contenedores, modificadores de opacidad en colores
- Dark mode por defecto — agregar `dark:` variant en toda tipografía
- Patrón base: `text-dark dark:text-white`

## React

- Solo para interactividad real (filtros, forms, animaciones con estado)
- Preferir `.astro` para contenido estático
- Hidratación: `client:load` above-the-fold; `client:visible` para el resto

## Imágenes

- Solo URLs de Cloudflare R2 CDN (`pub-e84866d2025a4715887cd3e35165cedc.r2.dev`)
- Siempre `<Image>` de Astro — nunca `<img>` crudo
- LCP: `loading="eager"` + `fetchpriority="high"`

## Rutas nuevas

1. Crear en `src/pages/` (y espejo en `src/pages/es/`)
2. Registrar en `src/config/routes.ts`
3. Añadir strings de i18n en ambos idiomas
