# SKILL: Neo-Brutalist & Acid-Pop UI Architect

## DESCRIPTION
Especialista en diseño de interfaces de alto impacto que fusionan la crudeza del Neo-Brutalismo con la energía vibrante del Acid Graphics. Esta skill domina la creación de layouts estructurados, tipografías disruptivas y el uso de elementos lúdicos (emojis y badges) para humanizar interfaces técnicas.

---

## CORE DESIGN PRINCIPLES

1. **High-Contrast Foundation** — Uso estricto de fondos oscuros profundos (`black-800` / `#17191b`) combinados con acentos en colores "químicos" (Verde Neón, Lavender Eléctrico, Cian).
2. **Hard-Edge Geometry** — Ausencia total de gradientes suaves, sombras (difuminadas o sólidas) y bordes en contenedores. Las únicas líneas permitidas son divisores (`border-t`, `border-b`) para separar secciones o grupos de contenido.
3. **Extended Typography** — Prioridad a fuentes Sans-Serif de peso "Extended" o "Black" para jerarquías principales (fuente `Syne Variable`), comunicando estabilidad y modernidad técnica.
4. **Digital Ephemera** — Integración de elementos tipo "sticker", badges circulares con texto rotativo y micro-interacciones basadas en formas geométricas puras.
5. **Emotional Tech** — Reemplazo sistemático de iconografía industrial fría por Emojis estratégicos para suavizar la agresividad del brutalismo y mejorar la conexión con el usuario.

---

## VISUAL PARAMETERS

### Color Palette (tokens del proyecto)

| Rol | Token | Hex | Uso |
|---|---|---|---|
| Background principal | `black-800` | `#17191b` | Fondos oscuros base |
| Background secundario | `black-600` | `#222527` | Superficies elevadas |
| Acento primario (Green) | `primary-400` | `#3efa93` | CTAs, highlights, bordes activos |
| Acento secundario (Lavender) | `secondary-400` | `#9747ff` | Tags, badges, acentos secundarios |
| Acento secundario claro | `secondary-300` | `#af73fe` | Variante más clara del lavender |
| Acento terciario (Amber) | `tertiary-400` | `#faaa25` | Tercer acento, stickers, énfasis |
| Texto principal | `white` | `#ffffff` | Cuerpo de texto en fondos oscuros |
| Texto secundario | `gray-500` | `#b7b7b7` | Subtítulos, meta-info |
| Hard Shadow | — | — | ❌ No usar. El sistema no tiene sombras. |

### Typography
- **Display / H1–H2**: `font-syne` (Syne Variable), weight `black` / `900`
- **Body / UI**: `font-google-sans-flex` (Google Sans Flex Variable)
- **Tracking**: `tracking-tight` para display, `tracking-normal` para body

### Geometry
- **Corner Radius**: `rounded-none` (brutalista puro) vs. `rounded-[20px]` o mayor (contenedor moderno) — contraste deliberado entre formas
- **Sin sombras**: no usar `shadow-*` en ningún elemento. Ni difuminadas ni sólidas.
- **Sin bordes en contenedores**: no usar `border-*` en cards, secciones o cajas. Solo se permiten divisores lineales (`border-t`, `border-b`, `border-l`, `border-r`) con colores sólidos del sistema de tokens.
- **Sin opacidad**: no usar modificadores de opacidad en colores (`bg-white/20`, `text-dark/60`, `border-black/20`, etc.) ni `opacity-*` directamente en elementos. La opacidad solo está permitida dentro de `@keyframes` para animaciones de entrada/salida.

### Layout
- Grid-based con contenedores diferenciados por color de fondo, no por bordes
- Evitar márgenes implícitos — usar gap explícito siempre

---

## EMOJIS vs ICONOS TABLER

**Regla**: Usar emojis para elementos de acompañamiento al contenido (decorativos, ilustrativos). Reservar Tabler Icons (`react-icons/tb`) para elementos funcionales de UI (botones, acciones interactivas).

| Contexto | Usar |
|---|---|
| Decoración junto al texto, encabezados, descripciones | ✅ Emoji |
| Indicadores de estado, contadores, listas | ✅ Emoji |
| Dentro de stickers decorativos | ✅ Emoji o Tabler (ambos ok) |
| Botones con acción (CTA, submit, navigation arrows) | ✅ Tabler Icon |
| Iconos en nav, formularios, elementos interactivos | ✅ Tabler Icon |

**Razón**: Los emojis encajan con la estética acid-pop/Y2K del portafolio y crean conexión emocional ("Emotional Tech"). El frío visual de Tabler Icons debe reservarse para UI funcional donde la precisión importa.

---

## STICKERS — Estética Y2K / Digital Ephemera

Los stickers son elementos decorativos flotantes que acompañan la UI. Evocan los adhesivos que se pegaban en CDs y cuadernos en los 2000: coloridos, tipográficos, con actitud.

### Variedad de Color — REGLA CRÍTICA

Los stickers **no deben ser siempre `bg-holo`**. Deben alternar entre los 3 colores de acento del sistema:

| Color | Token | Cuándo usar |
|---|---|---|
| Verde Neón | `bg-primary-400` | Acción, positivo, CTA |
| Lavender | `bg-secondary-400` | Categoría, etiqueta, tag |
| Amber | `bg-tertiary-400` | Énfasis, advertencia amigable, contraste |
| Holográfico | `bg-holo` | Énfasis especial único, máximo 1 por sección |

**Nunca usar el mismo color para dos stickers en la misma sección.**

### Variedad de Forma — REGLA CRÍTICA

Mezclar formas en cada sección. No repetir la misma forma en stickers del mismo grupo:

- `rounded-full` — pill circular
- `rounded-xl` / `rounded-2xl` — rectángulo redondeado
- `rounded-none` — rectángulo/cuadrado brutalista
- Clip-path geométrico — formas puras (ver sección siguiente)

### Stickers Geométricos con Clip-Path

Para stickers con letras o números que actúan como identificadores visuales, usar formas geométricas con `clip-path`:

#### Las 3 formas canónicas

**1. Círculo**
```html
<span
  class="aspect-square rounded-full p-6 ..."
  style="clip-path: circle(50%)"
>
  A
</span>
```

**2. Triángulo (punta abajo, esquinas redondeadas)**

Requiere SVG `<clipPath>` en el documento con `clipPathUnits="objectBoundingBox"` para que escale con el contenido:

```html
<!-- Definición SVG — colocar fuera del loop, una vez por página/componente -->
<svg aria-hidden="true" width="0" height="0" class="absolute">
  <defs>
    <clipPath id="clip-triangle-down" clipPathUnits="objectBoundingBox">
      <path d="M 0.07,0.11 Q 0.03,0.03 0.12,0.03 L 0.88,0.03 Q 0.97,0.03 0.93,0.11 L 0.54,0.89 Q 0.5,0.97 0.47,0.89 Z" />
    </clipPath>
  </defs>
</svg>

<!-- Sticker triángulo -->
<span
  class="aspect-square rounded-none p-10 ..."
  style="clip-path: url(#clip-triangle-down)"
>
  B
</span>
```

> **Nota**: El triángulo necesita `p-10` (vs `p-6` para círculo/cuadrado) por compensación óptica — ver sección siguiente.

**3. Cuadrado redondeado**
```html
<span
  class="aspect-square rounded-md p-6 ..."
  style="clip-path: inset(0 round 0.375rem)"
>
  R
</span>
```

#### Regla técnica: clip-path escalable

- ✅ **Usar**: SVG `<clipPath>` con `clipPathUnits="objectBoundingBox"` — coordenadas en rango 0-1, escala con el elemento
- ❌ **Nunca**: `clip-path: path("M 10,16 ...")` con valores en píxeles — no escala con el contenido

### Compensación Óptica de Formas Geométricas

Los triángulos, a igual tamaño de bounding box que círculos y cuadrados, **parecen visualmente más pequeños** (ilusión óptica clásica — menos área visual ocupada).

**Regla**: Si un triángulo debe percibirse del mismo tamaño que círculos/cuadrados adyacentes, compensar con ~30% más de bounding box o reducir el padding interno en ~30%.

Ejemplo en práctica:
```
Círculo:   aspect-square p-6   (bounding box = tamaño base)
Cuadrado:  aspect-square p-6   (mismo padding)
Triángulo: aspect-square p-10  (más padding = letra más pequeña = el clip-path ocupa más área relativa)
```

### Posicionamiento de Stickers

**Opción A — Flujo del flex (recomendado para cards con margen negativo)**
```html
<div class="relative mt-16 flex flex-col gap-8 ...">
  <span class="-mt-24 self-start ...">A</span>  <!-- Margen negativo saca el sticker fuera del card -->
  <div>contenido...</div>
</div>
```

**Opción B — Absolute sobre contenido**
```html
<div class="relative overflow-hidden ...">
  <span class="absolute -top-2 right-6 ...">sticker</span>
  <div>contenido...</div>
</div>
```

### Características visuales generales
- **Sin bordes** — el fondo sólido ya define el sticker, no necesita contorno
- **Sin sombras** — coherente con el sistema global
- **Sin opacidad** — colores sólidos siempre
- **Rotación leve**: `-rotate-1`, `rotate-2`, `-rotate-3` — nunca más de ±6deg para mantener legibilidad
- **Tipografía**: `font-syne font-black` en ALL CAPS o mixed case, `tracking-widest` o `tracking-tight`
- **Tamaño**: pequeño y compacto para stickers de etiqueta; grande para stickers identificadores (letras/números)
- **Máximo 2-3 stickers por sección** para no saturar

### Contenido típico de stickers
- Labels de categoría: "✍️ WEB AUDIT", "Blog", "NEW"
- Versiones: "v.001", "v2.0"
- Claims cortos: "HONEST", "NO B.S.", "FREE DIAGNOSIS"
- Emojis solos o combinados con texto corto
- Letras/números como identificadores visuales (A, B, R, 01, 02...)

### Ejemplos de implementación

```html
<!-- Pill sticker — label de categoría -->
<span class="bg-primary-400 font-syne inline-block rotate-2 rounded-full px-4 py-2 text-xs font-black tracking-widest text-dark uppercase">
  ✍️ WEB AUDIT
</span>

<!-- Badge rectangular — versión/número -->
<span class="bg-secondary-400 font-syne inline-block -rotate-1 rounded-xl px-3 py-1.5 text-xs font-black text-dark uppercase">
  v.001
</span>

<!-- Sticker oscuro sobre fondo claro -->
<span class="bg-dark font-syne inline-block rotate-1 rounded-2xl px-4 py-2 text-xs font-black tracking-widest text-white uppercase">
  NEW
</span>

<!-- Sticker holográfico — efecto visual especial -->
<span class="bg-holo font-syne text-dark absolute -top-2 -right-16 inline-block rotate-6 rounded-full px-4 py-2 font-black tracking-widest uppercase">
  ✓ NO COMMITMENT
</span>

<!-- Sticker letra-círculo (identificador visual) -->
<span
  class="bg-secondary-400 font-syne aspect-square -mt-24 flex items-center justify-center p-6 text-6xl font-black tracking-widest text-dark uppercase rotate-2 rounded-full self-start"
  style="clip-path: circle(50%)"
>
  A
</span>

<!-- Sticker letra-triángulo (con compensación óptica) -->
<span
  class="bg-primary-400 font-syne aspect-square -mt-24 flex items-center justify-center p-10 text-6xl font-black tracking-widest text-dark uppercase -rotate-3 rounded-none self-start"
  style="clip-path: url(#clip-triangle-down)"
>
  B
</span>
```

> **Nota técnica**: `bg-holo` es una utilidad Tailwind v4 definida con `@utility` en `src/css/main.css`. No requiere plugin ni config adicional — se usa como cualquier clase de Tailwind.

---

## OUTPUT GUIDELINES

Al proponer componentes o layouts:
- **Legibilidad sobre ornamentación**: el aire "Avant-Garde" surge de la estructura, no de efectos.
- **Sin gradientes ni glassmorphism** — el sistema de diseño usa colores sólidos. Excepción única: `bg-holo` para stickers decorativos.
- **Sin sombras ni bordes en contenedores** — diferenciación solo por color de fondo.
- **Sin opacidad** en colores ni elementos — solo en `@keyframes` para animaciones.
- **Usar blobs y formas vectoriales SVG** para dar profundidad sin sombras.
- **Emojis como UI primitives**: reemplazar iconos fríos por emojis donde aporten calidez (acompañamiento de contenido). Tabler Icons solo para UI funcional.
- **Stickers Y2K** como elementos decorativos: rotados, sólidos, tipográficos, variados en color y forma.
- **Stickers geométricos**: usar clip-path escalable (SVG `objectBoundingBox`), nunca píxeles fijos. Aplicar compensación óptica para triángulos.
- Toda clase Tailwind debe referenciar los tokens del proyecto, nunca colores arbitrarios salvo los hardcodeados en esta guía.
