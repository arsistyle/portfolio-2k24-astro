# Plan de mejora GEO — arsi.dev

**Fecha:** 2026-06-09
**Origen:** Diagnóstico de [isitagentready.com/arsi.dev?profile=content](https://isitagentready.com/arsi.dev?profile=content) + auditoría del repo
**Alcance de este documento:** análisis + plan + checklist. No incluye cambios de código (se documentan, no se ejecutan).

> GEO (Generative Engine Optimization) = hacer que el sitio sea legible, citable y descubrible por agentes y motores generativos (ChatGPT, Perplexity, Claude, Google AI Overviews), además de los buscadores tradicionales.

---

## 1. Estado actual (auditoría del repo)

Lo que **ya está implementado**:

| Capacidad | Estado | Dónde |
|---|---|---|
| `robots.txt` con sitemap | ✅ Básico | `public/robots.txt` |
| Sitemap XML | ✅ | integración `@astrojs/sitemap` |
| `llms.txt` (EN + ES) | ✅ Dinámico | `src/pages/llms.txt.ts`, `src/pages/es/llms.txt.ts` |
| Versiones Markdown de páginas | ⚠️ Parcial | rutas `.md.ts`: `/index.md`, `/blog/[slug].md`, `/projects/[id].md`, `/blog/index.md`, `/projects/index.md` |
| Meta tags / OG / canonical | ✅ | `astro-seo` en `Layout.astro` |
| Middleware de gating de rutas | ✅ | `src/middleware.ts` |
| Hosting con control de headers | ✅ Disponible | Cloudflare Pages (adapter + soporte `_headers`) |

Lo que **falta** (lo confirma el repo, no solo el test):

- **Sin `public/_headers`** → ningún header HTTP personalizado, por tanto sin `Link:` headers.
- **Sin Content-Signal** en `robots.txt`.
- **Las rutas `.md` devuelven `text/plain`**, no `text/markdown`, y **no hay negociación por `Accept:`** (solo URLs separadas).
- **Sin JSON-LD** en ninguna página (grep de `application/ld+json` / `schema.org` = 0 resultados). Ya estaba marcado como pendiente en `docs/seo-geo.md`.
- **Sin `llms-full.txt`** (pendiente declarado en `CLAUDE.md`).
- **Sin sección FAQ en `/audit`** (pendiente declarado).
- **Sin DNS-AID / DNSSEC** a nivel de zona DNS.

---

## 2. Diagnóstico de los 4 issues del test

### Issue 1 — Link headers (RFC 8288)
**Estado: no implementado.** No existe `public/_headers`.
**Qué es:** headers `Link:` en la respuesta HTTP de la home que apuntan a los recursos útiles para agentes (llms.txt, sitemap, versión markdown).
**Por qué importa:** es el mecanismo estándar de descubrimiento que un agente lee sin parsear el HTML.
**Cómo (Cloudflare Pages):** crear `public/_headers`. Ejemplo de directiva para `/`:

```
/*
  Link: </llms.txt>; rel="describedby"; type="text/plain"
  Link: </sitemap-index.xml>; rel="sitemap"; type="application/xml"

/
  Link: </index.md>; rel="alternate"; type="text/markdown"
```

> Nota: no existe aún un `rel` registrado en IANA específico para `llms.txt`; `describedby` o `alternate` son las opciones pragmáticas. Si se publica un catálogo de API en `/.well-known/api-catalog`, usar `rel="api-catalog"`.

**Esfuerzo:** Bajo (1 archivo nuevo). **Impacto:** Medio-alto. **Riesgo:** Bajo.

---

### Issue 2 — DNS-AID + DNSSEC
**Estado: no validado.** El test detecta registros pero sin DNSSEC firmado.
**Qué es:** registros SVCB/HTTPS bajo `_agents.arsi.dev` (p.ej. `_index._agents.arsi.dev`, `_a2a._agents.arsi.dev`) para descubrimiento de agentes por DNS, con la zona firmada con DNSSEC.
**Por qué importa:** capa de descubrimiento a nivel de dominio. Es un **draft IETF experimental**, no un estándar consolidado.
**Cómo:** se hace en el **dashboard de Cloudflare DNS**, no en el repo:
1. DNS → Settings → **habilitar DNSSEC** (y agregar el registro DS en el registrador del dominio).
2. Publicar registros SVCB/HTTPS de discovery con parámetros `alpn` y endpoint.

**Esfuerzo:** Medio (DNS + registrador). **Impacto:** Bajo hoy (spec emergente). **Riesgo:** Medio si se manipula DNSSEC sin cuidado (puede tumbar resolución del dominio). **Prioridad: la más baja / opcional.**

---

### Issue 3 — Markdown for Agents (negociación por `Accept:`)
**Estado: parcial.** Ya existen versiones `.md`, pero:
- se sirven como `text/plain` (deberían ser `text/markdown`),
- no hay negociación de contenido: un agente que pide `Accept: text/markdown` en `/blog/mi-post` recibe HTML.

**Qué falta:** que cuando llegue `Accept: text/markdown`, la misma URL devuelva la versión markdown con `Content-Type: text/markdown` (y `x-markdown-tokens` si está disponible), manteniendo HTML por defecto para navegadores.
**Cómo (2 caminos):**
- **A — Cloudflare "Markdown for Agents"**: feature nativa de la plataforma; evaluar si aplica al plan/proyecto actual.
- **B — En el código**: ajustar las rutas `.md.ts` a `Content-Type: text/markdown`, y añadir negociación en `src/middleware.ts` (hoy hace `return next()` ante cualquier path con `.`; habría que detectar el header `Accept` y reescribir a la ruta `.md` correspondiente).

**Esfuerzo:** Medio. **Impacto:** Medio-alto. **Riesgo:** Medio (tocar middleware afecta todo el routing — testear bien).

---

### Issue 4 — Content Signals en robots.txt
**Estado: no implementado.**
**Qué es:** directivas `Content-Signal` en `robots.txt` que declaran preferencias sobre uso del contenido: `ai-train` (entrenamiento), `search` (indexación), `ai-input` (uso como contexto en respuestas generativas).
**Decisión tomada:** perfil **Equilibrado** → `ai-train=no, search=yes, ai-input=yes`.

| Perfil | Directiva | Para quién |
|---|---|---|
| Máxima visibilidad | `ai-train=yes, search=yes, ai-input=yes` | Quiere aparecer y ser citado en todo |
| ✅ **Equilibrado (elegido)** | `ai-train=no, search=yes, ai-input=yes` | Quiere ser indexado y citado, pero no usado para entrenar modelos |
| Conservador | `ai-train=no, search=yes, ai-input=no` | Solo buscadores tradicionales |

**Justificación:** para un portfolio que busca visibilidad en asistentes, `ai-input=yes` permite que ChatGPT/Perplexity/Claude lo citen y `search=yes` mantiene la indexación tradicional, mientras `ai-train=no` reserva el contenido frente al entrenamiento de modelos.
**Cómo:** añadir a `public/robots.txt`:

```
User-agent: *
Allow: /
Content-Signal: ai-train=no, search=yes, ai-input=yes

Sitemap: https://arsi.dev/sitemap-index.xml
```

**Esfuerzo:** Muy bajo. **Impacto:** Medio (señal declarativa). **Riesgo:** Nulo.

---

## 3. Extras de GEO ya pendientes en el proyecto

Detectados en `docs/seo-geo.md` y `CLAUDE.md`, refuerzan los puntos anteriores:

- **JSON-LD** (no existe en el repo): `Person` + `WebSite`/`SearchAction` en home, `Article` en posts, `Service` en `/audit`, `BreadcrumbList` en internas. Es la fuente estructurada que más consumen los motores generativos.
- **`llms-full.txt`**: versión extendida con bio completa, servicios detallados y FAQ.
- **FAQ en `/audit`**: respuestas directas (qué incluye, cuánto tarda, precio) — alto valor para AEO/citas.
- **Coherencia de Content-Type** en las rutas `.md` (ligado al Issue 3).

---

## 4. Prioridización

| Prioridad | Acción | Esfuerzo | Impacto |
|---|---|---|---|
| 🔴 P1 | Content Signals en robots.txt | Muy bajo | Medio |
| 🔴 P1 | `public/_headers` con Link headers | Bajo | Medio-alto |
| 🟠 P2 | JSON-LD (Person, WebSite, Article, Service) | Medio | Alto |
| 🟠 P2 | Markdown negotiation + fix Content-Type `.md` | Medio | Medio-alto |
| 🟡 P3 | `llms-full.txt` + FAQ en `/audit` | Medio | Medio |
| ⚪ P4 | DNS-AID + DNSSEC | Medio | Bajo (experimental) |

Criterio: arrancar por lo de bajo esfuerzo / riesgo nulo y alto retorno declarativo (P1), luego lo estructural que mejora citas reales (P2), y dejar DNS-AID al final por ser spec emergente y de mayor riesgo operativo.

---

## 5. Checklist de tareas

### P1 — Quick wins (riesgo bajo/nulo)
- [x] Decidir perfil de Content-Signal → **Equilibrado: `ai-train=no, search=yes, ai-input=yes`**
- [ ] Añadir directiva `Content-Signal` a `public/robots.txt` con el perfil elegido
- [ ] Crear `public/_headers` con `Link:` a `llms.txt` y `sitemap-index.xml`
- [ ] Añadir `Link: alternate; type="text/markdown"` apuntando a la versión `.md` de la home
- [ ] Verificar headers en producción con `curl -I https://arsi.dev`

### P2 — Estructura para citas
- [ ] Implementar JSON-LD `Person` + `WebSite`/`SearchAction` en `Layout.astro` (home)
- [ ] Implementar JSON-LD `Article` en posts del blog
- [ ] Implementar JSON-LD `Service` en `/audit`
- [ ] Implementar JSON-LD `BreadcrumbList` en páginas internas
- [ ] Validar con Rich Results Test / Schema.org validator
- [ ] Cambiar `Content-Type` de las rutas `.md.ts` de `text/plain` a `text/markdown`
- [ ] Añadir negociación `Accept: text/markdown` (decidir vía A: feature Cloudflare, o B: middleware)
- [ ] Probar con `curl -H "Accept: text/markdown" https://arsi.dev/`

### P3 — Contenido GEO
- [ ] Crear `llms-full.txt` (bio completa + servicios + FAQ)
- [ ] Mantener `llms.txt`/`llms-full.txt` sincronizados al publicar post/proyecto
- [ ] Añadir sección FAQ en `/audit` (qué incluye, cuánto tarda, precio) + JSON-LD `FAQPage`

### P4 — DNS (opcional, dashboard Cloudflare)
- [ ] Habilitar DNSSEC en Cloudflare y registrar DS en el registrador
- [ ] Publicar registros SVCB/HTTPS DNS-AID (`_index._agents.arsi.dev`, `_a2a._agents.arsi.dev`)
- [ ] Re-validar en isitagentready.com

### Verificación final
- [ ] Re-ejecutar isitagentready.com/arsi.dev?profile=content y confirmar issues resueltos
- [ ] Confirmar que las 4 reglas de copy/voz y convenciones de código del proyecto se respetan en los cambios

---

## 6. Notas de implementación (para cuando se ejecute)

- Respetar las convenciones del repo: scripts cliente en `astro:page-load`, SSR con `prerender = false`, imports con alias `@/`, sin `shadow-*`/`border-*` en contenedores.
- El middleware actual ignora cualquier path con `.` (`pathname.includes(".")`); la negociación markdown debe insertarse **antes** de ese early-return o resolverse en la capa de Cloudflare para no romper el gating de rutas.
- `_headers` solo aplica en Cloudflare Pages; para respuestas SSR dinámicas también se pueden setear headers en el middleware.
- Cada cambio de copy debe ir en primera persona singular y con CTA claro (ver `.claude/rules/copy-voice.md`).

---

## 7. Referencias

- RFC 8288 (Web Linking): https://www.rfc-editor.org/rfc/rfc8288
- RFC 9727 (API catalog): https://www.rfc-editor.org/rfc/rfc9727#section-3
- DNS-AID draft: https://datatracker.ietf.org/doc/draft-mozleywilliams-dnsop-dnsaid/
- RFC 9460 (SVCB/HTTPS): https://www.rfc-editor.org/rfc/rfc9460
- Markdown for Agents (Cloudflare): https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/
- Content Signals: https://contentsignals.org/ · draft: https://datatracker.ietf.org/doc/draft-romm-aipref-contentsignals/
- Skills del test: link-headers, dns-aid, markdown-negotiation, content-signals en `isitagentready.com/.well-known/agent-skills/<skill>/SKILL.md`
