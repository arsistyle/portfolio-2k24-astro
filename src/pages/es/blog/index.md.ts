import type { APIRoute } from "astro"
import { getEntry } from "astro:content"
import { getBlogPosts } from "@/utils/getBlogPosts"
import { getSiteUrl } from "@/utils/getSiteUrl"

export const GET: APIRoute = async (context) => {
	const site = getSiteUrl(context)
	const posts = getBlogPosts({ lang: "es" })
	const seoEntry = await getEntry("seo", "es" as any)
	const seo = (seoEntry as any)?.data?.pages?.blog

	let content = `# ${seo?.title || "Israel Larrondo | Blog"}\n\n`
	content += `${seo?.description || "Artículos sobre desarrollo web, diseño, IA y reflexiones tecnológicas."}\n\n`

	content += `## Artículos\n`
	posts.forEach((post) => {
		content += `- [${post.title}](${site}/es/blog/${post.slug}.md) - ${post.description}\n`
	})

	return new Response(content, {
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
		},
	})
}
