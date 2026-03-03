import type { APIRoute } from "astro"
import { getEntry } from "astro:content"
import { getBlogPosts } from "@/utils/getBlogPosts"
import { getProjects } from "@/utils/getProjects"

export const GET: APIRoute = async (context) => {
	const site = context.site
		? context.site.origin
		: import.meta.env.SITE?.replace(/\/$/, "") || "https://arsi.dev"
	const posts = getBlogPosts({ lang: "en" })
	const projects = getProjects({ lang: "en" })

	const seoEntry = await getEntry("seo", "en" as any)
	const seo = (seoEntry as any)?.data?.pages?.home

	let content = `# ${seo?.title || "Israel Larrondo | Front-End Designer"}\n\n`
	content += `> ${seo?.description || "Creative developer portfolio and blog."}\n\n`
	content += `This file provides a directory of information for Israel Larrondo's portfolio (arsi.dev), optimized for LLMs.\n\n`

	content += `## Navigation\n`
	content += `- [Home](${site}/index.md)\n`
	content += `- [Spanish Version](${site}/es/llms.txt)\n\n`

	content += `## Sections\n`
	content += `- [Blog Index](${site}/blog/index.md) - Full list of articles.\n`
	content += `- [Projects Index](${site}/projects/index.md) - Full list of technical projects.\n\n`

	content += `## Featured Projects\n`
	if (projects.length > 0) {
		projects.slice(0, 5).forEach((project) => {
			content += `- [${project.title}](${site}/projects/${project.name}.md) - ${project.description || "Technical project details."}\n`
		})
	}
	content += `\n`

	content += `## Recent Blog Posts\n`
	if (posts.length > 0) {
		posts.slice(0, 10).forEach((post) => {
			content += `- [${post.title}](${site}/blog/${post.slug}.md) - ${post.description}\n`
		})
	}

	return new Response(content, {
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
		},
	})
}
