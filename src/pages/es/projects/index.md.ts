import type { APIRoute } from "astro"
import { getEntry } from "astro:content"
import { getProjects } from "@/utils/getProjects"
import { getSiteUrl } from "@/utils/getSiteUrl"

export const GET: APIRoute = async (context) => {
	const site = getSiteUrl(context)
	const projects = getProjects({ lang: "es" })
	const seoEntry = await getEntry("seo", "es" as any)
	const seo = (seoEntry as any)?.data?.pages?.projects

	let content = `# ${seo?.title || "Israel Larrondo | Proyectos"}\n\n`
	content += `${seo?.description || "Una exhibición de proyectos seleccionados que combinan diseño premium con implementaciones técnicas sólidas."}\n\n`

	content += `## Proyectos\n`
	projects.forEach((project) => {
		content += `- [${project.title}](${site}/es/projects/${project.name}.md) - ${project.description || "Proyecto del portafolio."}\n`
	})

	return new Response(content, {
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
		},
	})
}
