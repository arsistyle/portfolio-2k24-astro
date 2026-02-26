import type { BlogPostMDXContent, BlogPostMDXGlobResult } from "@/types"

export async function GET() {
	const blogFiles = import.meta.glob<BlogPostMDXContent>("@/content/blog/**/*.mdx", {
		eager: true,
	}) as BlogPostMDXGlobResult

	const index = Object.values(blogFiles)
		.map(({ frontmatter }) => ({
			slug: frontmatter.slug,
			title: frontmatter.title,
			date: frontmatter.date,
			status: frontmatter.status,
			lang: frontmatter.lang,
		}))
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

	return new Response(JSON.stringify(index), {
		headers: { "Content-Type": "application/json" },
	})
}
