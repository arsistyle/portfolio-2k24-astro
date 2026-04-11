# SKILL — Auditoría Web
**Israel Larrondo · arsi.dev**
*Documento de contexto completo para uso interno y referencia de página pública*

---

## ÍNDICE

1. [Contexto del servicio](#1-contexto-del-servicio)
2. [Concepto central: las 3 capas](#2-concepto-central-las-3-capas)
3. [Situaciones de entrada del cliente](#3-situaciones-de-entrada-del-cliente)
4. [Flujo A — Tiene sitio web pero no funciona](#4-flujo-a--tiene-sitio-web-pero-no-funciona)
5. [Flujo R — Tiene sitio web y quiere rediseñarlo](#5-flujo-r--tiene-sitio-web-y-quiere-rediseñarlo)
6. [Flujo B — No tiene sitio web](#6-flujo-b--no-tiene-sitio-web)
7. [Cierre de la auditoría](#7-cierre-de-la-auditoría)
8. [Stack y capacidades](#8-stack-y-capacidades)
9. [Propuesta de valor diferencial](#9-propuesta-de-valor-diferencial)
10. [RESUMEN PÚBLICO — Para la página en arsi.dev](#10-resumen-público--para-la-página-en-arsidev)

---

## 1. CONTEXTO DEL SERVICIO

La Auditoría Web es una consultoría educativa. Su objetivo no es vender un proyecto de inmediato, sino que el cliente entienda su situación real y lo que necesita para mejorarla. La construcción del sitio (si aplica) se define después de la auditoría, no durante.

**Premisa de trabajo:** Israel no solo construye sitios. Entiende el negocio, el usuario y el ecosistema completo. Del diagnóstico al código. Del diseño al lanzamiento. Del tráfico a los clientes.

**Frase ancla del servicio:**
> "Yo te construyo el Ferrari… El volante es tuyo." — arsi.dev

**Frase complementaria (sin conductos):**
> "Un sitio sin conductos es una oficina en el desierto. Primero construyamos el camino."

---

## 2. CONCEPTO CENTRAL: LAS 3 CAPAS

Este modelo se presenta al inicio de cualquier flujo. El cliente debe entender que ninguna capa funciona sola y que cada una tiene un responsable diferente.

| Capa | Qué incluye | Responsable |
|------|-------------|-------------|
| **Conductos de tráfico** | Redes sociales, Ads, SEO, Email, Eventos, Referidos | **Cliente** |
| **El sitio web** | Diseño, Velocidad, Contenido, UX, Estructura | **Diseñador / Dev (Israel)** |
| **Conversión / Acción** | CTA, Formularios, WhatsApp — ¿qué hace el visitante al llegar? | **Responsabilidad compartida** |

**Tarea en presentación:** Explicar este modelo antes de entrar al diagnóstico. Dejar claro desde el inicio que Israel no controla los conductos — eso depende del cliente.

---

## 3. SITUACIONES DE ENTRADA DEL CLIENTE

Al inicio de la sesión se identifica en cuál de estas tres situaciones está el cliente:

| Situación | Descripción | Flujo |
|-----------|-------------|-------|
| **No tiene sitio web** | Se evalúa si tiene sentido construir uno y si el cliente está listo para sostenerlo | → Flujo B |
| **Sí tiene sitio, solo optimizar** | Diagnóstico completo. Las mejoras quedan en manos de su equipo o developer | → Flujo A |
| **Sí tiene sitio, rediseñarlo** | Auditoría + propuesta de rediseño desde cero con el stack de Israel | → Flujo R |

---

## 4. FLUJO A — TIENE SITIO WEB PERO NO FUNCIONA

**Estructura:** A1 → A2 → A3 → A4 → A5 → A6 → A7

---

### A1 · Diagnóstico Técnico
**Pregunta guía:** ¿El sitio está bien construido?

**Semáforo técnico:**
- Verde — Sin problemas críticos
- Amarillo — Optimizaciones necesarias
- Rojo — Bloquea el crecimiento

**Qué se revisa:**
- **Velocidad y Core Web Vitals** — PageSpeed Insights: Performance, LCP, CLS, FID
- **Indexación real en Google** — `site:dominio.com` — ¿Cuántas páginas conoce Google?
- **Google Search Console** — Impresiones, clics, posición promedio, errores de rastreo
- **Versión móvil funcional** — Mobile-first: diseño, tap targets, legibilidad
- **SSL activo (HTTPS)** — Certificado vigente, sin mixed content
- **Análisis de competencia** — ¿Quién rankea para los mismos términos?
- **Contraste y legibilidad** — Afecta tanto usuarios como SEO
- **Texto alternativo en imágenes** — Google lee el alt text; si está vacío, las imágenes no aportan al SEO

**Nota:** Se revisa antes de hablar de diseño o rediseño.

**Tareas de Israel:**
- [ ] Auditar con PageSpeed, GSC, Screaming Frog o similar
- [ ] Documentar errores con evidencia
- [ ] Clasificar hallazgos por urgencia

**Tareas del cliente:**
- [ ] Dar acceso a Google Search Console
- [ ] Dar acceso a Google Analytics (si existe)
- [ ] Confirmar con quién está el dominio y el hosting

---

### A2 · Diagnóstico de Reputación Online
**Pregunta guía:** ¿Cómo los califican en la web?

**Concepto clave:** La reputación online es el filtro previo. Si no pasa esta prueba, el sitio nunca recibe la visita. Es lo que ve el cliente antes de entrar al sitio.

**Qué se revisa:**
- **Google Business Profile** — ¿Existe, está verificado, tiene fotos, horario y descripción actualizados?
- **Reseñas** — Cantidad, puntaje promedio y si hay respuestas del negocio
- **Directorios del rubro** — ¿Aparecen en Páginas Amarillas, LinkedIn, directorios sectoriales?
- **Menciones externas** — ¿Otros sitios los mencionan o enlazan? Eso es autoridad para Google
- **Redes sociales activas** — ¿La última publicación tiene semanas o años?

**Tareas de Israel:**
- [ ] Revisar presencia en redes y frecuencia de publicación
- [ ] Verificar estado de GBP
- [ ] Identificar fuentes de tráfico en Analytics/GSC si hay acceso

**Tareas del cliente:**
- [ ] Indicar qué canales tiene activos y cuáles están abandonados
- [ ] Confirmar si tiene o ha tenido campañas de pago
- [ ] Reflexionar sobre cómo llegan sus clientes actuales

---

### A3 · Diagnóstico de Contenido
**Pregunta guía:** ¿El sitio comunica bien?

**Concepto clave:** Un sitio puede ser técnicamente perfecto y comunicar pésimo. Y viceversa. Ambos diagnósticos son necesarios y complementarios.

**Qué se revisa:**
1. ¿Queda claro en 5 segundos qué hace la empresa? — Prueba de los 5 segundos con alguien externo
2. ¿Los servicios están bien descritos? — Lenguaje del cliente, no jerga interna
3. ¿Tiene llamadas a la acción claras? — CTA accionable, visible y con dirección
4. ¿El contenido está pensado para el cliente? — No es un catálogo interno, es una conversación
5. ¿Hay palabras clave del rubro presentes? — ¿Google puede entender de qué trata el sitio?
6. **Intención de búsqueda** — ¿El contenido usa las palabras que el cliente real escribe en Google?

**Tareas de Israel:**
- [ ] Revisar cada página: claridad, CTA y estructura
- [ ] Identificar páginas que faltan (servicios, contacto, about)
- [ ] Señalar oportunidades de SEO on-page (títulos, metas, encabezados)

**Tareas del cliente:**
- [ ] Listar sus servicios con descripción real, no genérica
- [ ] Definir qué acción quiere que tome el visitante
- [ ] Reunir materiales de marca (fotos, textos, logo)

---

### A4 · Diagnóstico de Conversión
**Pregunta guía:** ¿Dónde hace clic? ¿Qué hace después de leer? ¿Cuántos pasos lo separan de contactarte?

**Qué se revisa:**
- **CTA visible** — ¿Hay una acción clara en cada página? Contacto, WhatsApp, formulario
- **Teléfono clicable en móvil** — El número debe ser un link `tel:` activo, no texto plano
- **Formulario funcional** — ¿Llega el mensaje? ¿Hay confirmación visual al enviarlo?
- **Pasos hasta el contacto** — ¿Cuántos clics separan al visitante de comunicarse? Menos es más
- **Propuesta de valor en primer scroll** — ¿Queda claro qué hacen y para quién antes de hacer scroll?
- **Análisis de competencia** — ¿Quién rankea para los mismos términos?

---

### A5 · Diagnóstico de Conductos
**Pregunta guía:** ¿Hay algo trayendo gente al sitio?

**Concepto clave — La verdad incómoda:** El sitio puede estar perfecto, pero si no hay conductos, no llega nadie. La mejor tienda del mundo en un callejón sin salida.

**Qué se revisa:**
1. ¿Tienen redes sociales activas y con audiencia real? — Instagram, LinkedIn, Facebook
2. ¿Tienen Google Business Profile configurado y activo? — Reseñas, horarios, fotos, categoría correcta
3. ¿Han corrido campañas de publicidad alguna vez? — Google Ads, Meta Ads
4. ¿Tienen base de contactos o email marketing? — Lista de clientes, newsletter, CRM activo
5. ¿Hay menciones o links al sitio desde otros medios? — Directorios, prensa, alianzas, link building natural

---

### A6 · Enseñanza Central
**Pregunta guía:** ¿Por qué está muerto tu sitio? No es el diseño. Son los conductos.

**Estructura de la slide:**
- **Lo que revisamos:** Técnico · Contenido · Conductos → Aquí está el diagnóstico real
- **El problema real:** El sitio existe. Pero no hay nada trayendo gente. Sin conductos activos, el tráfico no llega solo
- **La solución:** Activar los conductos correctos para tu negocio. Eso es lo que define la hoja de ruta

**Frase ancla:**
> "Yo te construyo el Ferrari… El volante es tuyo."

---

### A7 · Hoja de Ruta — Optimizar sitio existente

**Presentar como guía, no como propuesta de trabajo. Dejar que el cliente decida los próximos pasos.**

| Fase | Qué se hace | Responsable |
|------|-------------|-------------|
| Fase 1 | **Correcciones técnicas urgentes** — SSL, velocidad, indexación, errores GSC, responsive | Developer o Israel |
| Fase 2 | **Contenido y SEO on-page** — Páginas por servicio, palabras clave, CTA, estructura | Israel + cliente |
| Fase 3 | **Activar conductos de tráfico** — LinkedIn, GBP activo, campañas, email, eventos | Cliente (Israel asesora) |
| Fase 4 | **Medición mensual y ajustes** — GSC, Analytics, qué conducto trae más, optimizar | Ambos |

**Tareas de Israel:**
- [ ] Presentar la hoja de ruta como guía, no propuesta
- [ ] Dejar al cliente con claridad sobre su situación y próximos pasos
- [ ] Abrir espacio para preguntas antes de hablar de cualquier siguiente acción

**Tareas del cliente:**
- [ ] Validar que el diagnóstico refleja su situación real
- [ ] Empezar a pensar qué puede resolver por su cuenta y qué necesita delegar

---

## 5. FLUJO R — TIENE SITIO WEB Y QUIERE REDISEÑARLO

**Estructura:** R1 → R2 → R3 → R4 → R5

---

### R1 · Diagnóstico de Reputación Online
*(Mismo contenido que A2 — ver arriba)*

**Concepto clave en contexto de rediseño:** La reputación online es el filtro previo. Si no pasa esta prueba, el sitio nunca recibe la visita.

---

### R2 · Diagnóstico de Conductos
*(Mismo contenido que A5 — ver arriba)*

**Concepto clave en contexto de rediseño:** El rediseño no resuelve conductos inactivos. Un sitio nuevo sin piloto sigue siendo un sitio muerto. Este diagnóstico define qué hay que activar en paralelo al rediseño.

---

### R3 · Relevamiento de Marca e Identidad
**Pregunta guía:** ¿Con qué recursos contamos para el rediseño?

**Concepto clave:** Sin estos recursos, el rediseño se detiene o se improvisa. Lo que no está listo hoy es parte de la hoja de ruta. Este levantamiento define qué aporta el cliente y qué construimos juntos.

**Qué se revisa:**
1. ¿Tienen branding definido? — Logo en vectores, colores oficiales, tipografías
2. ¿Tienen guía de marca? — Brand guidelines, manual de uso, reglas de aplicación
3. ¿Tienen recursos multimedia? — Fotos, videos e ilustraciones propias y de calidad
4. ¿Tienen referentes visuales? — Sitios o marcas que les gustan, inspiran o admiran
5. ¿El copy está listo? — Textos, descripciones de servicios, sobre nosotros, CTA

---

### R4 · Rediseño y Construcción

| Fase | Qué se hace | Responsable |
|------|-------------|-------------|
| Fase 0 | **Arquitectura y UX** — Estructura del sitio, flujos de navegación, wireframes | Israel |
| Fase 1 | **Diseño visual** — UI, componentes, sistema de diseño basado en el branding relevado | Israel |
| Fase 2 | **Desarrollo y deploy** — Construcción en Astro, GSC configurado, publicación a producción | Israel |
| Fase 3 | **Activar conductos de tráfico** — Redes activas, GBP, campañas, email marketing, eventos | Cliente (Israel asesora) |
| Fase 4 | **Medición mensual y ajustes** — Analytics, GSC, qué funciona, qué escalar | Cliente + Israel |

---

### R5 · Hoja de Ruta — Rediseño completo

| Fase | Qué se hace | Responsable |
|------|-------------|-------------|
| Fase 0 | **Auditoría y relevamiento** — Reputación online, conductos actuales, branding e identidad disponible | Israel |
| Fase 1 | **Diseño y desarrollo** — Arquitectura, UX, UI, desarrollo en Astro, GSC configurado, deploy | Israel + cliente |
| Fase 2 | **Activar conductos de tráfico** — Redes activas, GBP, campañas, email marketing, eventos | Cliente + Israel |
| Fase 3 | **Sostener conductos** — Redes activas, Ads si aplica, email marketing, eventos del sector | Cliente (Israel asesora) |
| Fase 4 | **Medición mensual y ajustes** — Analytics, GSC, qué funciona, qué escalar | Cliente + Israel |

---

## 6. FLUJO B — NO TIENE SITIO WEB

**Estructura:** B1 → B2 → B3 → [B4-A o B4-B]

---

### B1 · Diagnóstico de Presencia Digital
**Pregunta guía:** ¿Dónde existe la empresa hoy en internet?

**Resultado posible:** Puede que tengan más presencia de la que creen… o absolutamente nada. Este mapa define el punto de partida antes de proponer cualquier inversión.

**Qué se revisa:**
- **Google Business Profile** — ¿Está creado y activo? ¿Reseñas, fotos, horarios?
- **LinkedIn de empresa** — ¿Tiene página? ¿Está actualizada y activa?
- **Redes sociales** — ¿Cuáles tienen? ¿Activas o abandonadas?
- **Directorios del rubro** — ¿Aparecen en portales del sector, asociaciones?
- **¿Cómo los encuentra un cliente hoy?** — Referido, buscador, red social — pregunta directa

**Tareas de Israel:**
- [ ] Buscar al cliente en Google y documentar qué aparece
- [ ] Revisar estado de GBP
- [ ] Evaluar actividad y coherencia en redes sociales

**Tareas del cliente:**
- [ ] Indicar en qué plataformas tiene presencia actualmente
- [ ] Compartir acceso a GBP si ya lo tiene reclamado

---

### B2 · Auditoría de Necesidad
**Pregunta guía — La pregunta incómoda:** ¿Para qué quieren el sitio?

**Concepto clave:** Sus respuestas determinan si construir el sitio ahora o esperar.

**Las 6 preguntas:**
1. **¿Quién es su cliente objetivo y cómo los busca?** — Define si el sitio web es el canal correcto y qué palabras usa su cliente para buscarlos
2. **¿Qué quieren que haga el sitio?** — Generar contactos, credibilidad, mostrar servicios, vender
3. **¿Tienen alguien para mantener conductos activos?** — Un sitio sin mantenimiento vuelve a morir
4. **¿Tienen presupuesto para marketing post-lanzamiento?** — El sitio es el destino. Sin tráfico, no sirve de nada
5. **¿Saben quién ya existe en su rubro online?** — Conocer la competencia digital define qué tan difícil será posicionarse
6. **¿Qué acción quieren que tome el visitante al llegar?** — Sin una conversión definida, el sitio no tiene propósito medible

**Tareas de Israel:**
- [ ] Hacer las preguntas clave con honestidad
- [ ] Dar una opinión honesta sobre si un sitio web tiene sentido en este momento

**Tareas del cliente:**
- [ ] Definir claramente qué vende y a quién
- [ ] Tener al menos una forma de contacto funcional antes de construir

---

### B3 · ¿Están listos para tener un sitio?
**La bifurcación decisiva.**

**SI están listos — requieren:**
- Claridad del propósito del sitio
- Saben a quién va dirigido
- Alguien para gestionar los conductos
- Presupuesto para sostenerlo

→ Se planifica con UX orientado a conversión y plan de conductos desde el día 1. → **Va a B4-A**

**NO están listos — recomendación honesta:**
- Google Business Profile activo
- LinkedIn de empresa configurado
- Definir servicios y audiencia objetivo
- Landing page simple mientras se organizan

> "Un sitio sin conductos es una oficina en el desierto. Primero construyamos el camino."

→ **Va a B4-B**

**Tareas de Israel:**
- [ ] Presentar el checklist y evaluar cada punto junto al cliente
- [ ] Comunicar la conclusión con claridad

**Tareas del cliente:**
- [ ] Responder el checklist con honestidad
- [ ] Aceptar la recomendación aunque no sea la que esperaban

---

### B4-A · Hoja de Ruta — Sí están listos

| Fase | Qué se hace | Responsable |
|------|-------------|-------------|
| Fase 0 | **Presencia digital básica** — GBP, LinkedIn empresa, redes mínimas activas | Cliente |
| Fase 1 | **Planificación y construcción del sitio** — Arquitectura, UX, diseño, desarrollo, contenido inicial, GSC configurado | Israel (punto de partida) |
| Fase 2 | **Activar conductos de tráfico** — LinkedIn, GBP activo, campañas, email, eventos | Cliente + Israel |
| Fase 3 | **Sostener conductos** — Redes activas, Ads si aplica, email marketing, eventos del sector | Cliente (Israel asesora) |
| Fase 4 | **Medición mensual y ajustes** — Analytics, GSC, qué funciona, qué escalar | Cliente + Israel |

---

### B4-B · Hoja de Ruta — No están listos aún

**Tareas de Israel:**
- [ ] Entregar pasos concretos que el cliente debe completar antes de construir el sitio
- [ ] Dejar abierta la puerta para retomar cuando estén listos
- [ ] Proponer una **landing de transición:**
  - Una sola sección
  - Quiénes son + qué hacen (2–3 líneas)
  - Links a redes sociales
  - Botón de contacto directo (WhatsApp o email)

**Tareas del cliente:**
- [ ] Activar Google Business Profile
- [ ] Configurar LinkedIn de empresa
- [ ] Definir servicios y audiencia con claridad
- [ ] Considerar una landing page simple como presencia mínima mientras se organizan

| Fase | Qué se hace | Responsable |
|------|-------------|-------------|
| Fase 0 | **Presencia digital básica** — GBP, LinkedIn empresa, redes mínimas activas | Cliente (Israel asesora) |
| Fase 1 | **Landing de transición** — Mientras se construye el sitio real, al menos Google puede encontrarte y quien llegue sabe dónde seguirte | Israel (punto de partida) |
| Fase 2 | **Contenido y SEO desde el inicio** — Páginas por servicio, palabras clave del rubro, estructura semántica | Israel + cliente |
| Fase 3 | **Activar conductos de tráfico** — Redes activas, Ads si aplica, email marketing, eventos del sector | Cliente (Israel asesora) |
| Fase 4 | **Medición mensual y ajustes** — Analytics, GSC, qué funciona, qué escalar | Cliente + Israel |

---

## 7. CIERRE DE LA AUDITORÍA

Se resume el valor de la auditoría y lo que el cliente se lleva, independientemente de lo que decida hacer después.

**El cliente sale con:**
- Claridad sobre su situación real
- Mapa de responsabilidades (qué hace Israel, qué depende de él)
- Una hoja de ruta concreta con fases y responsables
- Honestidad: lo que necesita escuchar, no lo que quiere escuchar

**Tareas de Israel:**
- [ ] Dejar al cliente con claridad sobre su situación y próximos pasos
- [ ] Abrir espacio para preguntas antes de hablar de cualquier siguiente acción comercial

---

## 8. STACK Y CAPACIDADES

| Área | Herramienta / Capacidad | Nota |
|------|-------------------------|------|
| UX / UI | Investigación · Wireframes · Prototipos · Diseño final | El punto de partida |
| Front-End | React · Next.js · Astro | Lo que ves, funciona |
| Email Dev | Emails responsivos en React | — |
| AI SEO | llms.txt · Markdown dinámico por capas | Visible para Google y la IA |
| Google Search Console | Indexación · Errores · Rendimiento orgánico | — |
| SEO On-Page | Estructura semántica · Palabras clave · Metadatos | — |
| Cloudflare Pages | Deploy · CDN global · Performance garantizada | — |
| Figma | Diseño de interfaz · Prototipado y handoff | — |

---

## 9. PROPUESTA DE VALOR DIFERENCIAL

Estos son los pilares que diferencian la auditoría de Israel de un diagnóstico técnico genérico:

- **Diagnóstico honesto** — Te digo lo que necesitas, no lo que quieres escuchar
- **Responsabilidades claras** — Sabes exactamente qué hace Israel y qué depende de ti
- **Entregas por fases** — Sin sorpresas. Siempre sabes en qué fase estás
- **Visión de largo plazo** — No termina en el lanzamiento. Te acompaño a crecer
- **SEO para IA** — Tu sitio visible para Google y para los modelos de IA

**Experiencia:** +10 años en diseño y desarrollo web.

---

---

# 10. RESUMEN PÚBLICO — Para la página en arsi.dev

> Esta sección está diseñada para mostrar el servicio de auditoría al público general en arsi.dev. No expone el detalle metodológico. Muestra qué es, para quién es y qué se lleva el cliente.

---

## Headline sugerido
**Tus clientes te buscan online. ¿Te encuentran?**

## Subheadline
Una auditoría consultiva que te dice la verdad sobre tu presencia digital — y qué hacer al respecto.

---

## Qué es la Auditoría Web

No es una revisión técnica genérica. Es una sesión de trabajo donde analizamos tu situación real: tu sitio, tu reputación online y los canales que (deberían) traer clientes. El resultado es un mapa claro de dónde estás y qué necesitas para mejorar.

---

## Para quién es

La auditoría está pensada para tres tipos de situación:

**Tienes sitio web pero no está funcionando**
Tu sitio existe pero nadie llega. Lo revisamos en profundidad: técnica, contenido, conversión y los conductos que deberían estar trayendo tráfico.

**Tienes sitio web y quieres rediseñarlo**
Antes de rediseñar, auditamos. No hay rediseño sin diagnóstico. Revisamos tu reputación online, tus conductos actuales y tus recursos de marca antes de proponer cualquier cosa.

**No tienes sitio web**
Evaluamos si tiene sentido construir uno ahora — y si estás realmente listo para sostenerlo. A veces hay pasos más urgentes antes de invertir en un sitio.

---

## Qué revisamos

La auditoría cubre las tres capas que definen si una presencia web funciona o no:

**Conductos de tráfico** — ¿Hay algo trayendo gente? Redes sociales, Google Business Profile, campañas, menciones externas, email.

**El sitio web** — ¿Está bien construido y comunica bien? Velocidad, indexación, contenido, estructura, conversión.

**La acción del visitante** — ¿Queda claro qué hacer al llegar? CTA, formularios, pasos hasta el contacto.

---

## Qué te llevas

Al terminar la sesión tienes:

- Un diagnóstico claro de tu situación actual
- Una hoja de ruta con fases, acciones y responsables
- Claridad sobre qué hace Israel y qué depende de ti
- Una recomendación honesta — no una propuesta de venta

---

## Cómo funciona

La auditoría se hace en una sesión de trabajo. Se presenta en formato visual, sin tecnicismos innecesarios. El resultado no es un informe de 40 páginas — es claridad accionable.

---

## La idea central

> "Yo te construyo el Ferrari. El volante es tuyo."

Puedo diseñar y desarrollar tu sitio. Pero los conductos — redes sociales, Google Business Profile, campañas, email — dependen de ti. La auditoría te ayuda a entender esa división antes de invertir.

---

## CTA sugerido para la página

> **¿Quieres saber cómo estás realmente?**
> [Agenda una auditoría →]

---

## Notas de arquitectura para la página en arsi.dev

**Secciones sugeridas (en orden):**
1. Hero — Headline + subheadline + CTA
2. Qué es — 2–3 líneas, sin tecnicismos
3. Para quién es — 3 cards (situaciones de entrada)
4. Qué revisamos — 3 capas (conductos / sitio / conversión)
5. Qué te llevas — 4 puntos concretos
6. Frase ancla — "Yo te construyo el Ferrari…"
7. CTA final — Agenda / contacto

**Tono:** Directo. Sin promesas vacías. Sin jerga. El mismo tono que Israel usa en la sesión.

**Identidad visual a aplicar:** Brand system de arsi.dev — fondo `#0F0F10`, verde `#3EFA93`, púrpura `#9747FF`, Syne Bold para títulos, Inter para cuerpo.
