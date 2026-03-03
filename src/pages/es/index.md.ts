import type { APIRoute } from "astro"
import { getEntry } from "astro:content"

export const GET: APIRoute = async () => {
	const seoEntry = await getEntry("seo", "es" as any)
	const seo = (seoEntry as any)?.data?.pages?.home

	let content = `# ${seo?.title || "Israel Larrondo | Desarrollador Creativo"}\n\n`
	content += `${seo?.description || "Desarrollador creativo enfocado en experiencias interactivas, interfaces premium y soluciones de vanguardia."}\n\n`

	content += `## Navegación\n`
	content += `- [Blog](https://arsi.dev/es/blog.md)\n`
	content += `- [Proyectos](https://arsi.dev/es/projects.md)\n`
	content += `- [Versión en Inglés](https://arsi.dev/index.md)\n\n`

	content += `## Sobre Mí\n`
	content += `Israel Larrondo es un Desarrollador Creativo y Diseñador con más de 7 años de experiencia. Enfocado en construir interfaces de alto nivel y experiencias interactivas utilizando tecnologías web modernas como Astro, React y flujos de trabajo impulsados por IA.\n\n`

	content += `## Stack Técnico\n`
	content += `- **Frontend:** React, Astro, Next.js, TypeScript, Tailwind CSS\n`
	content += `- **Design:** Figma, Diseño UX/UI, Identidad Visual\n`
	content += `- **AI:** Integración de LLMs, Prompting Avanzado, Automatización de Flujos\n`

	return new Response(content, {
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
		},
	})
}
