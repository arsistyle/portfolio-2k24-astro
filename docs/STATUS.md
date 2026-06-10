# arsi.dev — Status del Proyecto

> Última revisión: 2026-05-31 (navegación visual en Chrome)

## Estado general: 🟡 Funcional pero con deuda de contenido, UX y SEO

---

## Sitio live

| Página | Estado | Notas |
|---|---|---|
| `/` (Home) | 🟡 Issues | Typo hero, stat vacía, 1 solo proyecto desbalanceado |
| `/projects` | 🔴 Roto visualmente | 1 proyecto en grid 2 col → mitad derecha vacía y negra |
| `/audit` | ✅ La mejor página | Sin pricing ni FAQ — ver Stage 2 |
| `/blog` | 🟡 Escaso | 4 posts, todos <300 palabras, thin content |
| `/contact` | 🔴 Alta fricción | Auth con LinkedIn obligatoria para enviar mensaje |
| `/es/*` | 🟡 Parcial | Espejo EN, sin contenido diferenciado |
| `/shop` | ⚪ Desconocido | Pendiente auditar |

---

## Stack

- **Framework:** Astro 6.2.2 + React 19 + TailwindCSS 4.2
- **CMS:** Sanity (dataset `develop`)
- **Hosting:** Cloudflare Pages
- **Imágenes:** R2 CDN
- **Fuentes:** Syne + Google Sans Flex (via Fontsource)
- **Analytics/Ads:** AdSense inicializado
- **Auth:** Configurada (`src/auth.config.ts`) — usada en /contact (LinkedIn OAuth)

---

## SEO / GEO

| Check | Estado |
|---|---|
| `sitemap.xml` | ✅ Autogenerado (`@astrojs/sitemap`) |
| `robots.txt` | ⚠️ Verificar que existe en `public/` |
| `llms.txt` | ✅ Implementado (EN + ES) |
| `llms-full.txt` | ❌ No existe |
| JSON-LD schemas | ❌ No implementado |
| OG images por página | ⚠️ Todas usan la imagen genérica |
| Meta descriptions únicas | ⚠️ Blog y otros usan la del homepage |
| Título del blog | ❌ `<title>` es solo "Blog" sin branding |

---

## UX/UI — Issues encontrados (revisión visual 2026-05-31)

### Bugs visuales
| Elemento | Problema |
|---|---|
| Hero greeting | `"Hi, im"` — typo, falta apóstrofe |
| Home audit CTA | 3 columnas de stats pero la 3ª está vacía — parece broken |
| `/projects` con 1 item | Grid 2 columnas → mitad derecha completamente negra y vacía |

### Problemas de conversión
| Elemento | Problema |
|---|---|
| `/contact` | Formulario requiere auth LinkedIn obligatoria — alta fricción para clientes no técnicos |
| Blog posts | Botón "Donate via PayPal" al final — incompatible con posicionamiento B2B premium |
| Sin testimonios | Zero social proof en todo el sitio |
| Sin precio en `/audit` | El silencio total sobre precio genera incertidumbre |

### Oportunidades de mejora UX
| Elemento | Mejora |
|---|---|
| Stack section | Logos sin label — no está claro qué herramienta es cuál |
| Experience section | Sin fechas en los roles — no comunica timeline |
| Blog post sidebar | Solo muestra Categorías + Share; vacía después del fold |
| Blog post | Sin author card al final — el autor queda anónimo |
| Footer | Solo copyright; sin nav, sin RRSS, sin segundo CTA |
| Blog posts EN | H2s en español en posts con URL en inglés — inconsistencia de idioma |

---

## Claude directory (.claude/)

| Archivo | Estado |
|---|---|
| `CLAUDE.md` | ✅ En root, bien documentado |
| `.claude/skills/project-knowledge` | ✅ Existe |
| `.claude/skills/arsi-ui-dna` | ✅ Existe |
| `.claude/skills/auditoria-web` | ✅ Existe |
| `.claude/rules/copy-voice.md` | ✅ Creado 2026-05-31 |
| `.claude/rules/code-conventions.md` | ✅ Creado 2026-05-31 |
| `.claude/rules/seo-geo.md` | ✅ Creado 2026-05-31 |
| `.claude/commands/new-blog-post.md` | ✅ Creado 2026-05-31 |
| `.claude/commands/new-project.md` | ✅ Creado 2026-05-31 |
| `.claude/settings.json` | ⚠️ Solo `settings.local.json` (no compartido) |

---

## Deuda técnica y de contenido

- **Blocker UX crítico:** Auth obligatoria en /contact — bloquea leads
- **Daño de marca:** Botón PayPal Donate en posts del blog
- **Visual roto:** Grid de projects con 1 solo item
- **Bug home:** Stat vacía en el bloque del CTA de auditoría
- **SEO crítico:** JSON-LD faltante, meta descriptions genéricas
- **Contenido:** 1 proyecto, 4 posts cortos
- **GEO:** Sin FAQ estructurado, sin `llms-full.txt`

Ver plan completo → `docs/PLAN.md`
