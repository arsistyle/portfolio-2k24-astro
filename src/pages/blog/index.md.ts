import type { APIRoute } from "astro"
import { getEntry } from "astro:content"
import { getBlogPosts } from "@/utils/getBlogPosts"

export const GET: APIRoute = async () => {
	const posts = getBlogPosts({ lang: "en" })
	const seoEntry = await getEntry("seo", "en" as any)
	const seo = (seoEntry as any)?.data?.pages?.blog

	let content = `# ${seo?.title || "Israel Larrondo | Blog"}\n\n`
	content += `${seo?.description || "Articles about web development, design, AI, and tech reflections."}\n\n`

	content += `## Articles\n`
	posts.forEach((post) => {
		content += `- [${post.title}](https://arsi.dev/blog/${post.slug}.md) - ${post.description}\n`
	})

	return new Response(content, {
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
		},
	})
}
