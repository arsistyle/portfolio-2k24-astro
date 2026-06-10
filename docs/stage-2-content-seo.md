# Stage 2 — Contenido & Autoridad

> Estimación: 3-6 semanas | Requiere: Stage 1 completado
> Impacto: autoridad de dominio, mejores rankings, más citas en AI

---

## 1. Portfolio — Más proyectos

**Estado actual:** 1 proyecto. **Meta:** mínimo 4 proyectos.

Para cada proyecto nuevo:
- Usar comando `/new-project` → `.claude/commands/new-project.md`
- Imagen hero en R2 CDN + capturas adicionales
- Describir el resultado concreto (no solo el stack usado)
- Si es posible: métricas antes/después (Lighthouse score, conversión, etc.)

Proyectos candidatos:
- Proyectos de Boosmap (verificar NDA)
- Proyectos de Latadigital
- Trabajos freelance recientes
- arsi.dev como caso de estudio propio

---

## 2. Blog — Contenido de profundidad

**Estado actual:** 4 posts, todos <300 palabras. **Meta:** 8-10 posts, ≥800 palabras c/u.

Posts prioritarios (por búsqueda y autoridad):
1. "Cómo migrar a Astro desde Next.js" — SEO + Front-End
2. "Web performance: métricas Core Web Vitals que sí importan" — SEO
3. "GEO vs SEO: cómo posicionarse en motores de IA" — AI + SEO
4. "Caso de estudio: [cliente] — de X a 98 en Lighthouse" — Portfolio proof

Crear con: `/new-blog-post` → `.claude/commands/new-blog-post.md`

---

## 3. Author card en blog posts

**✅ Descartado** — Es un portfolio personal donde solo publica Israel. El author card no aporta valor en ese contexto.

---

## 4. Related posts en sidebar del blog

**Problema:** El sidebar actualmente solo muestra "Categories" y "Share". Después del fold queda completamente vacía — espacio desaprovechado.

Añadir a `src/components/core/Sidebar/index.astro`:
- Sección "More posts" con 2-3 posts relacionados (por categoría)
- Si no hay relacionados, mostrar los más recientes

---

## 5. Testimonios

**⏳ Movido a etapa final** — No hay testimonios disponibles actualmente. Implementar cuando todas las tareas previas estén completadas.

Añadir sección `Testimonials` en homepage (entre Experience y Projects):
- Mínimo 3 testimonios de clientes o colegas reales
- Formato: cita + nombre + empresa + foto (opcional)
- JSON-LD `Review` para GEO

También considerar 1-2 testimonios directamente en `/audit`, antes del CTA final.

---

## 6. FAQ en /audit

**Problema:** Silencio total sobre precio y proceso genera incertidumbre. Los motores de IA tampoco pueden extraer respuestas concretas sobre el servicio.

Añadir sección FAQ al final de `/audit` (antes del CTA):
- "¿Cuánto tiempo tarda una auditoría?"
- "¿Qué incluye exactamente?"
- "¿Necesito tener ya una web para contratar la auditoría?"
- "¿Cuánto cuesta?" (al menos rango orientativo)
- "¿Trabajas con clientes fuera de Chile?"

Markup: `<details>/<summary>` + JSON-LD `FAQPage` schema

---

## 7. Footer — Navegación completa

**Problema:** El footer actual solo tiene el bloque CTA verde + `All contents and designs © Arsi.` — sin ningún link.

Añadir a `src/components/shared/Footer.astro`:
- Links a páginas principales: Home, Projects, Web Audit, Blog, Contact
- Links a RRSS: LinkedIn, GitHub
- "Built with Astro · Hosted on Cloudflare" — social proof técnico para un Astro Expert
- Año dinámico en el copyright: `© {new Date().getFullYear()} Israel Larrondo`

---

## 8. Stack section — Labels de herramientas

**Problema:** Los logos del marquee son siluetas blancas sobre lila. No está claro qué herramienta representa cada logo sin conocerlas de antemano.

- **Archivo:** `src/components/sections/Stack.astro`
- Añadir nombre de la herramienta debajo de cada logo (o visible en hover)

---

## 9. Experience section — Fechas de los roles

**Problema:** Los 4 roles no tienen fechas. "Senior FE Developer at Boosmap" sin año no comunica timeline ni antigüedad.

- **Archivo:** `src/components/sections/Experience.astro`
- Añadir año de inicio (y fin si aplica) a cada rol
- Ejemplo: "Senior Front-End Developer at Boosmap · 2022 – presente"

---

## 10. Bio del homepage — Mejorar para GEO

**Propuesta de valor definida:** Israel audita Y construye — no solo da un reporte y se va. Especializado en Astro + performance. Basado en Chile, disponible globalmente para cualquier cliente de habla inglesa. Todo vía email, sin reuniones externas.

**Copy refinado — aplicar en `src/i18n/en.json` y `src/i18n/es.json` key `about.paragraph`:**

**EN:**
```
👉 <strong>I audit and build websites that perform</strong> — technically sound, fast, and visible. I design in <strong>Figma</strong> and develop with <strong>Astro</strong> to ship crawlable architectures ready for Google (<strong>SEO</strong>) and AI search engines (<strong>GEO</strong>). Based in Chile, available to any English-speaking client worldwide. My focus is always the same: cut the bloat and maximize <strong>speed and real-world visibility.</strong>
```

**ES:**
```
👉 <strong>Audito y construyo sitios web que rinden</strong> — técnicamente sólidos, rápidos y visibles. Diseño en <strong>Figma</strong> y desarrollo con <strong>Astro</strong> para entregar arquitecturas indexables por Google (<strong>SEO</strong>) y buscadores de IA (<strong>GEO</strong>). Con base en Chile, disponible para cualquier cliente de habla inglesa en el mundo. Mi foco es siempre el mismo: eliminar lo innecesario y maximizar la <strong>velocidad y visibilidad real.</strong>
```

**Notas de implementación:**
- Las etiquetas `<strong>` son las palabras con animación de scroll (procesadas en `About.astro`) — no modificar la cantidad ni posición
- Mismo carácter aproximado o mayor que el original ✓

---

## Definition of Done Stage 2

- [ ] Mínimo 4 proyectos en el portfolio
- [ ] Mínimo 6 posts, todos ≥800 palabras
- [ ] Author card al final de cada post
- [ ] Related posts en sidebar del blog
- [ ] Sección de testimonios live (home + audit)
- [ ] FAQ en /audit con JSON-LD FAQPage
- [ ] Footer con navegación + RRSS + stack badge
- [ ] Stack section con labels de herramientas
- [ ] Roles en Experience section con fechas
- [ ] Bio actualizada con disponibilidad y tipo de cliente

Siguiente → `docs/stage-3-growth.md`
