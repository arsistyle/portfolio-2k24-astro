import type { APIRoute } from "astro"
import { getEntry } from "astro:content"
import { getSiteUrl } from "@/utils/getSiteUrl"

export const GET: APIRoute = async (context) => {
	const site = getSiteUrl(context)
	const seoEntry = await getEntry("seo", "es" as any)
	const seo = (seoEntry as any)?.data?.pages?.home

	let content = `# ${seo?.title || "Israel Larrondo | Desarrollador Creativo"}\n\n`
	content += `${seo?.description || "Desarrollador creativo enfocado en experiencias interactivas, interfaces premium y soluciones de vanguardia."}\n\n`

	content += `## Navegación\n`
	content += `- [Blog](${site}/es/blog/index.md)\n`
	content += `- [Proyectos](${site}/es/projects/index.md)\n`
	content += `- [Versión en Inglés](${site}/index.md)\n\n`

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
