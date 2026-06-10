# Stage 3 — Crecimiento & Conversión

> Estimación: 2-3 meses | Requiere: Stage 2 completado
> Impacto: conversión real, pipeline de clientes, referente del nicho

---

## 1. Pricing visible en /audit

**Problema:** El silencio total sobre precio genera dos problemas: clientes no cualificados que contactan esperando precios imposibles, y clientes cualificados que no contactan por inseguridad.

**Spec (ver `docs/AUDIT_COST.md` para el desglose completo):**
- Mostrar solo el gancho — sin tabla de precios ni desglose
- Formato sugerido: _"A 90-minute working session. Starting at 3 UF — deducted if we continue."_
- Precio en UF (no en CLP ni USD) — es la unidad que Israel usa internamente
- Posición: antes del CTA final en `/audit`, en la sección o FAQ existente

---

## 2. Páginas de servicio independientes

Separar los servicios en páginas propias para SEO dedicado y mayor claridad:

- `/services/web-audit` — ya existe en `/audit`, potencialmente mover aquí
- `/services/web-development` — desarrollo Astro, arquitectura frontend
- `/services/ux-design` — diseño en Figma, prototipado, handoff

Cada página: H1 con keyword principal, descripción del proceso, entregables, testimonios del servicio específico, FAQ, CTA.

---

## 3. SEO multiidioma profundo

La versión `/es/` actualmente es un espejo directo sin diferenciación.

- Contenido de blog propio en ES (no solo traducción 1:1)
- Keywords en español: "auditoría web", "desarrollador Astro Chile", "rendimiento web"
- `hreflang` verificado en todas las páginas bilingües — usar `es-CL` (Chile, no `es-ES`)
- Google Search Console verificado para ambas propiedades (EN + ES)

---

## 4. Analytics y seguimiento de conversiones

- **GSC ✅ ya conectado** — verificar que el `sitemap-index.xml` esté indexado
- **Pendiente:** Configurar eventos de conversión — click en "Book an audit", envío de formulario de contacto
- Revisar Core Web Vitals mensualmente — usa tu propio servicio de auditoría en tu propio sitio

---

## 5. Distribución de contenido

Para cada post del blog:
- Workflow RRSS ya definido en `.agent/workflows/rrss-blog-posts.md`
- Publicar resumen + enlace en LinkedIn (el canal con más ROI para servicios B2B)
- **Newsletter — ⏳ Movido a etapa posterior** — implementar cuando todas las tareas previas estén completadas

---

## 6. Caso de estudio: arsi.dev

El propio portfolio es el mejor caso de estudio disponible:
- Decisiones de arquitectura: por qué Astro vs Next.js para un portfolio
- Performance: Lighthouse scores reales del sitio
- GEO: cómo se preparó el sitio para motores de IA (llms.txt, JSON-LD, etc.)
- Proceso de diseño: del concepto brutalista al sitio live

Alto potencial de backlinks y citas en IA.

---

## 7. Productos digitales (/shop)

**⏳ Movido a etapa posterior** — implementar cuando todas las tareas previas estén completadas.

El directorio `/shop` existe pero su estado es desconocido.

Evaluar qué tiene sentido vender:
- Templates Astro (starter packs, componentes)
- Guías: "Cómo preparar tu sitio para GEO" o "Checklist de auditoría web"
- Auditoría express como producto digital de precio fijo

Integración de pagos: Stripe o Lemon Squeezy (ambos fáciles de integrar con Astro + Cloudflare).
Schema JSON-LD `Product` + `Offer` en cada producto.

---

## 8. Página 404 personalizada

La página 404 existe (`src/pages/404.astro`) pero no fue auditada visualmente.
- Verificar que tiene CTA útil (link a home, a blog, o al formulario de contacto)
- Oportunidad para mantener el tono de marca en un momento frustrante del usuario

---

## Definition of Done Stage 3

- [ ] Rango de pricing visible en /audit
- [ ] Al menos 2 páginas de servicio con URL propia
- [ ] Blog EN y ES con contenido diferenciado
- [ ] Google Search Console activo y monitorizado
- [ ] Sistema de distribución de posts funcionando
- [ ] Caso de estudio arsi.dev publicado
- [ ] /shop con al menos 1 producto live

← Volver al plan → `docs/PLAN.md`
