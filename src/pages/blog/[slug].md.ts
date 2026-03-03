import type { APIRoute } from "astro"
import { getBlogPosts } from "@/utils/getBlogPosts"
import { getSiteUrl } from "@/utils/getSiteUrl"

export async function getStaticPaths() {
	const posts = getBlogPosts({ lang: "en" })
	return posts.map((post) => ({
		params: { slug: post.slug },
		props: { post },
	}))
}

export const GET: APIRoute = async (context) => {
	const { post } = context.props as { post: any }
	const site = getSiteUrl(context)

	let content = `# ${post.title}\n\n`
	content += `**Date:** ${new Date(post.date).toLocaleDateString("en-US")}\n`
	content += `**Categories:** ${post.categories.join(", ")}\n\n`
	content += `${post.description}\n\n`
	content += `---\n\n`
	content += `${post.search_context}\n\n`
	content += `*Read more at: ${site}/blog/${post.slug}*`

	return new Response(content, {
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
		},
	})
}
