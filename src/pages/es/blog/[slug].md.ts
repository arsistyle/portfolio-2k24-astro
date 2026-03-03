import type { APIRoute } from "astro"
import { getBlogPosts } from "@/utils/getBlogPosts"

export async function getStaticPaths() {
	const posts = getBlogPosts({ lang: "es" })
	return posts.map((post) => ({
		params: { slug: post.slug },
		props: { post },
	}))
}

export const GET: APIRoute = async ({ props }) => {
	const { post } = props as { post: any }

	let content = `# ${post.title}\n\n`
	content += `**Fecha:** ${new Date(post.date).toLocaleDateString("es-ES")}\n`
	content += `**Categorías:** ${post.categories.join(", ")}\n\n`
	content += `${post.description}\n\n`
	content += `---\n\n`
	content += `${post.search_context}\n\n`
	content += `*Leer más en: https://arsi.dev/es/blog/${post.slug}*`

	return new Response(content, {
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
		},
	})
}
