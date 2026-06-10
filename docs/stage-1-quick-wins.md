# Stage 1 — Quick Wins ✅ Completado 2026-06-10

> Estimación: 1-2 semanas | Impacto: SEO técnico + bugs visuales + conversión

---

## 1. Bugs y Copy

### 1.1 Fix typo en hero
- **Archivo:** `src/i18n/en.ts` → key `home.hero.greeting`
- **Cambio:** `"Hi, im"` → `"Hi, I'm"`
- Verificar también versión ES en `src/i18n/es.ts`

### 1.2 Fix stat vacía en Home — bloque Audit CTA
~~El bloque "Are clients finding you online?" en la home tiene 3 columnas de stats pero la 3ª está vacía. Parece broken.~~

**✅ Descartado** — La columna vacía es diseño intencional. No modificar.

### 1.3 Fix layout de /projects — unificar con diseño de blog

**Spec:**
- El layout de projects debe usar el mismo grid y cards que el blog
- El primer proyecto siempre ocupa el ancho completo con el layout de `variant="first"` (imagen a la izquierda, texto a la derecha en desktop)
- Los proyectos siguientes usan el mismo card default del blog en un grid de 2-3 columnas

**Implementación:**
- **Archivo principal:** `src/components/core/Projects/List.astro`
  - Cambiar grid de `grid-cols-1 md:grid-cols-2` a `grid-cols-1 md:grid-cols-2 xl:grid-cols-3`
  - Reemplazar `<ProjectCard>` por `<BlogCard>` (ya existe en `@/components/core/BlogCard/BlogCard.astro`)
  - Pasar `variant="first"` al primer item (`index === 0`)
- **Mapeo de props** (Project → BlogCard):
  - `title` → `title`
  - `description` → `description`
  - `images.medium` → `image`
  - `name` → `slug` (para transition names)
  - `translatePath('/projects') + '/' + name` → `href`
  - `categories` → `categories`
  - `search_context`: usar `description` o string vacío
- **Nota:** `Projects/Card.astro` queda deprecated para esta vista. Verificar si se usa en alguna otra sección antes de eliminar.

---

## 2. UX — Contacto sin fricción

### 2.1 Formulario de contacto: auth LinkedIn como opcional
**Problema:** El formulario exige autenticarse con LinkedIn antes de poder enviar un mensaje. Es la barrera más alta del sitio — especialmente para dueños de negocio no técnicos (el cliente objetivo de la auditoría).

- **Archivo:** `src/components/sections/ContactForm.astro`
- **Fix recomendado:** Añadir formulario sin auth como opción principal. Mantener LinkedIn como alternativa "para más visibilidad" (opcional).
- **Fix mínimo:** Añadir un fallback visible — email directo o link a LinkedIn DM — para quien no quiera autenticarse.

---

## 3. Contenido — Eliminar PayPal Donate

### 3.1 Quitar botón de donación de los blog posts
**Problema:** El bloque "Did you like this content? Donate via PayPal" al final de cada post es incompatible con el posicionamiento de consultor B2B premium. El cliente que llega a ese post es exactamente quien podría contratar una auditoría — el botón de donación señala "creador de contenido que necesita apoyo", no "consultor que cobra 3–5 UF por sesión".

- **Archivo:** `src/components/core/DonationBox/DonationBox.astro` y donde se renderiza en `src/layouts/PostLayout.astro` o `BlogLayout.astro`
- **Acción:** Eliminar el componente de los posts del blog
- **Reemplazar por:** CTA a `/audit` — si el post les fue útil, la siguiente conversión es la auditoría

---

## 4. SEO Técnico

### 4.1 Fix meta title/description del Blog
- **Archivo:** `src/pages/blog/index.astro`
- Title actual: `"Blog"` → Cambiar a: `"Blog | Israel Larrondo"`
- Description actual: copia del homepage → `"Artículos sobre Astro, rendimiento web, SEO y herramientas de IA. Por Israel Larrondo."`
- Mismo fix para versión ES

### 4.2 Fix meta description de Projects
- Description genérica → `"Portfolio de proyectos web: diseño UX/UI, desarrollo Astro y optimización de rendimiento."`

### 4.3 Verificar robots.txt
- Comprobar que `public/robots.txt` existe con:
```
User-agent: *
Allow: /
Sitemap: https://arsi.dev/sitemap-index.xml
```

### 4.4 Consistencia de idioma en blog posts
Los posts con URL en inglés tienen H2s en español (ej: "Cómo estructurar tu archivo llms.txt" en `/blog/llms-txt-the-new-robots-txt-for-the-ai-era`). Esto confunde a Google sobre el idioma de la página.
- **Regla:** Si la URL es en EN → todos los headings en EN. Si es ES → todos en ES.
- Revisar los 4 posts existentes y corregir inconsistencias.

---

## 5. JSON-LD Structured Data

### 5.1 Person + WebSite en Layout.astro
Añadir en `<head>` de `src/layouts/Layout.astro`:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://arsi.dev/#website",
      "url": "https://arsi.dev",
      "name": "Israel Larrondo",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://arsi.dev/blog?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "Person",
      "@id": "https://arsi.dev/#person",
      "name": "Israel Larrondo",
      "url": "https://arsi.dev",
      "sameAs": [
        "https://www.linkedin.com/in/arsistyle/",
        "https://github.com/arsistyle",
        "https://twitter.com/arsistyle"
      ],
      "jobTitle": "Performance Auditor & Astro Expert",
      "knowsAbout": ["Astro", "Web Performance", "SEO", "Front-End Development", "UX/UI Design"]
    }
  ]
}
</script>
```

### 5.2 Article schema en posts del blog
En `src/layouts/PostLayout.astro` o `BlogLayout.astro`, inyectar schema `Article` con título, autor, fecha.

### 5.3 BreadcrumbList en páginas internas
En `PageLayout.astro`, inyectar `BreadcrumbList` basado en el **array estructurado** que ya recibe el componente de breadcrumbs existente — no parsear la URL dinámicamente. El JSON-LD debe espejear ese mismo array estático.

---

## 6. GEO — llms-full.txt

Crear `src/pages/llms-full.txt.ts` con:
- Bio completa (especialidad, stack, experiencia, tipo de clientes, disponibilidad)
- Lista completa de servicios con descripción
- FAQ con preguntas clave del servicio de auditoría
- Todos los posts y proyectos (sin límite de 10)

---

## 7. Estructura .claude/ (✅ completado 2026-05-31)

- `.claude/rules/copy-voice.md` ✅
- `.claude/rules/code-conventions.md` ✅
- `.claude/rules/seo-geo.md` ✅
- `.claude/commands/new-blog-post.md` ✅
- `.claude/commands/new-project.md` ✅

---

## Definition of Done Stage 1

- [x] Typo "Hi, im" corregido en EN (`src/i18n/en.json`)
- [x] Stat vacía en HomeAuditCTA — ✅ Descartado (diseño intencional)
- [x] Layout de projects unificado con BlogCard (`src/components/core/Projects/List.astro`)
- [x] Contacto: auth LinkedIn como opcional — formulario siempre visible, LinkedIn = pre-fill opcional
- [x] Botón PayPal Donate eliminado de posts — reemplazado por CTA a /audit
- [x] Blog y Projects con meta descriptions únicas (SEO JSON actualizado + blog index usa `getEntry("seo")`)
- [ ] Inconsistencias de idioma en posts corregidas (pendiente — requiere editar contenido en Sanity, fuera del scope de código)
- [x] `robots.txt` verificado ✓ correcto
- [x] JSON-LD Person + WebSite en `Layout.astro`
- [x] JSON-LD Article en `PostLayout.astro`
- [x] JSON-LD BreadcrumbList en `PageLayout.astro`
- [x] `llms-full.txt` creado en `src/pages/llms-full.txt.ts`

Siguiente → `docs/stage-2-content-seo.md`
