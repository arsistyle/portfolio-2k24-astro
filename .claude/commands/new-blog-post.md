Crea un nuevo post de blog para arsi.dev.

Primero pide al usuario:
1. Título (EN y ES si aplica)
2. Categoría(s): AI, Tools, SEO, Front-End, Personal
3. Tema central y angle (qué aprende el lector)
4. Idioma principal

Luego genera:
- Slug en kebab-case del título EN
- Contenido: mínimo 800 palabras, introducción enganchadora en primeras 2 líneas
- Al menos 3 H2s con keywords del tema
- Meta description única (150-160 chars)

Si usa Sanity: `get_schema` primero para ver schema de `post`.
Si es MDX local: crear en `src/content/blog/`.

Voz → `.claude/rules/copy-voice.md`
SEO → `.claude/rules/seo-geo.md`
