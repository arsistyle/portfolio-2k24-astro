Agrega un nuevo proyecto al portfolio de arsi.dev.

Pide al usuario:
1. Nombre y cliente
2. URL del proyecto (si está live)
3. Stack tecnológico usado
4. Tipo: UX/UI, Web Dev, Auditoría, Full-Stack
5. URLs de imágenes en R2 CDN (hero + capturas)

Proceso:
1. Usar Sanity MCP (`get_schema`) para ver el schema de `project`
2. Crear la entrada: título, descripción (~150 chars), tags, URL, imagen hero
3. Verificar que `src/utils/getProjects.ts` lo recoge
4. Si es proyecto destacado, actualizar `llms.txt`

Contexto: el portfolio actualmente tiene solo 1 proyecto (clinicasmileworks).
Meta Stage 2: mínimo 4 proyectos publicados.

Código → `.claude/rules/code-conventions.md`
