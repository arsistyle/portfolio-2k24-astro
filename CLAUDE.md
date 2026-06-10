# arsi.dev — Claude Code Context

**Proyecto:** Portfolio personal + blog + tienda de Israel Larrondo (Arsi)
**Stack:** Astro 6 + React 19 + TailwindCSS 4.2 + Cloudflare Pages
**Repo:** arsistyle/portfolio-2k24-astro

---

## Skills de proyecto

Invocar antes de cualquier tarea relevante:

| Skill | Cuándo usarlo |
|---|---|
| `project-knowledge` | Al comenzar cualquier tarea — stack, rutas, componentes, convenciones, build |
| `arsi-ui-dna` | Antes de tocar UI — paleta de tokens, tipografía, stickers, reglas brutalistas |
| `auditoria-web` | Al trabajar en `/audit`, copy o lógica del servicio de auditoría |

---

## Plugins activos

- **graphify** — instalado en este proyecto. **Usar SIEMPRE.** Comandos clave:
  - `/graphify . --update` — al inicio de cualquier sesión o antes de explorar el código
  - `/graphify query "pregunta"` — para entender una parte del codebase antes de tocarla
  - `/graphify path "A" "B"` — para trazar conexiones entre módulos/componentes
  - `graphify export callflow-html` — para generar diagramas de arquitectura
- **engram** — memoria persistente entre sesiones. Guardar decisiones, bugs y convenciones proactivamente.
- **Sanity MCP** — CMS conectado. Usar `get_schema` antes de queries/mutations.

---

## Reglas rápidas

- Voz siempre en **primera persona singular** en todo el copy (Israel trabaja solo)
- Sin `shadow-*`, sin `border-*` en contenedores, sin modificadores de opacidad en colores
- Dark mode por defecto — siempre agregar `text-dark dark:text-white` en tipografía
- Scripts en Astro: envolver en `astro:page-load` (View Transitions activo)
- SSR pages: `export const prerender = false` al tope del archivo
- Imports internos siempre con alias `@/` → `src/`
- Imágenes: solo URLs de Cloudflare R2 CDN
- Rutas nuevas: registrar en `src/config/routes.ts` (el middleware las gatea automáticamente)

---

## Estructura .claude/

Reglas contextuales (cargadas automáticamente por Claude Code):

| Archivo | Qué cubre |
|---|---|
| `.claude/rules/copy-voice.md` | Voz, tono, errores frecuentes de copy |
| `.claude/rules/code-conventions.md` | Astro, TailwindCSS 4, React, imágenes, rutas |
| `.claude/rules/seo-geo.md` | SEO, JSON-LD schemas, GEO, blog quality |
| `.claude/commands/new-blog-post.md` | `/new-blog-post` — crear posts con estructura correcta |
| `.claude/commands/new-project.md` | `/new-project` — añadir proyectos al portfolio |

## Documentación del proyecto

| Archivo | Contenido |
|---|---|
| `docs/STATUS.md` | Estado actual del sitio — bugs, checks SEO, deuda técnica |
| `docs/PLAN.md` | Plan de mejora en 3 etapas (resumen + links) |
| `docs/stage-1-quick-wins.md` | Bugs, SEO técnico, JSON-LD, llms-full.txt |
| `docs/stage-2-content-seo.md` | Proyectos, blog, testimonios, FAQ |
| `docs/stage-3-growth.md` | Pricing, páginas de servicio, analytics, /shop |
