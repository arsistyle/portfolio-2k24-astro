import type { APIRoute } from "astro"
import { getEntry } from "astro:content"
import { getProjects } from "@/utils/getProjects"
import { getSiteUrl } from "@/utils/getSiteUrl"

export const GET: APIRoute = async (context) => {
	const site = getSiteUrl(context)
	const projects = getProjects({ lang: "en" })
	const seoEntry = await getEntry("seo", "en" as any)
	const seo = (seoEntry as any)?.data?.pages?.projects

	let content = `# ${seo?.title || "Israel Larrondo | Projects"}\n\n`
	content += `${seo?.description || "A showcase of selected projects that combine premium design with solid technical implementations."}\n\n`

	content += `## Projects\n`
	projects.forEach((project) => {
		content += `- [${project.title}](${site}/projects/${project.name}.md) - ${project.description || "Portfolio project."}\n`
	})

	return new Response(content, {
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
		},
	})
}
