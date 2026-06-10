---
description: Voz, tono y reglas de copywriting para todo el contenido de arsi.dev
---

## Voz

- **Primera persona singular siempre** — "yo audito", "yo diseño", "mi enfoque"
- Directo y honesto — sin pitch de ventas, sin compromisos vacíos
- Frase ancla del servicio: _"Yo te construyo el Ferrari… El volante es tuyo."_
- En inglés: mismo tono — direct, confident, no fluff, no corporate speak

## Errores frecuentes

- `"Hi, im"` → siempre `"Hi, I'm"` — bug activo en `src/i18n/en.ts` → `home.hero.greeting`
- No usar "leverage", "synergy", "cutting-edge solutions" — sobreusado
- No abrir con "Welcome to..." — genérico

## Copy de página

- Párrafos: máx 3 líneas en bloques de copy de marketing
- CTAs: acción concreta — "Book an audit", "Let's talk", "See the project"
- H1: impacto directo; emojis solo donde ya están aprobados (hero usa 👋)

## Checklist antes de commitear copy nuevo

1. ¿Está en primera persona?
2. ¿Tiene un CTA claro?
3. ¿Meta description es única para esta página? → ver `.claude/rules/seo-geo.md`
