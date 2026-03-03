import type { APIRoute } from "astro"
import { getEntry } from "astro:content"
import { getBlogPosts } from "@/utils/getBlogPosts"
import { getProjects } from "@/utils/getProjects"
import { getSiteUrl } from "@/utils/getSiteUrl"

export const GET: APIRoute = async (context) => {
	const site = getSiteUrl(context)
	const posts = getBlogPosts({ lang: "es" })
	const projects = getProjects({ lang: "es" })

	const seoEntry = await getEntry("seo", "es" as any)
	const seo = (seoEntry as any)?.data?.pages?.home

	let content = `# ${seo?.title || "Israel Larrondo | Diseñador Front-End"}\n\n`
	content += `> ${seo?.description || "Portafolio y blog de desarrollador creativo."}\n\n`
	content += `Este archivo proporciona un directorio del contenido de arsi.dev, optimizado para LLMs y agentes de IA.\n\n`

	content += `## Navegación\n`
	content += `- [Inicio](${site}/es/index.md)\n`
	content += `- [Versión en Inglés](${site}/llms.txt)\n\n`

	content += `## Secciones\n`
	content += `- [Índice del Blog](${site}/es/blog/index.md) - Lista completa de artículos.\n`
	content += `- [Índice de Proyectos](${site}/es/projects/index.md) - Lista completa de proyectos técnicos.\n\n`

	content += `## Proyectos Destacados\n`
	if (projects.length > 0) {
		projects.slice(0, 5).forEach((project) => {
			content += `- [${project.title}](${site}/es/projects/${project.name}.md) - ${project.description || "Información técnica del proyecto."}\n`
		})
	}
	content += `\n`

	content += `## Artículos Recientes\n`
	if (posts.length > 0) {
		posts.slice(0, 10).forEach((post) => {
			content += `- [${post.title}](${site}/es/blog/${post.slug}.md) - ${post.description}\n`
		})
	}

	return new Response(content, {
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
		},
	})
}
