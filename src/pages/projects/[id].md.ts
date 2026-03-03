import type { APIRoute } from "astro"
import { getProjects } from "@/utils/getProjects"
import { getSiteUrl } from "@/utils/getSiteUrl"

export async function getStaticPaths() {
	const projects = getProjects({ lang: "en" })
	return projects.map((project) => ({
		params: { id: project.name },
		props: { project },
	}))
}

export const GET: APIRoute = async (context) => {
	const { project } = context.props as { project: any }
	const site = getSiteUrl(context)

	let content = `# ${project.title}\n\n`
	content += `**Categories:** ${project.categories.join(", ")}\n\n`
	content += `${project.description || "Detailed project information."}\n\n`
	content += `---\n\n`
	content += `*View project details at: ${site}/projects/${project.name}*`

	return new Response(content, {
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
		},
	})
}
