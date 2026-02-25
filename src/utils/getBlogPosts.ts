import type { Langs, BlogPostFromImport, BlogPostMDXContent, BlogPostMDXGlobResult } from "@/types"
import type { CategoryConfig } from "@/config/categories"

export const getBlogPosts = ({ lang }: { lang: Langs }) => {
	const blogFiles = import.meta.glob<BlogPostMDXContent>("@/content/blog/**/*.mdx", {
		eager: true,
	}) as BlogPostMDXGlobResult

	const postList: BlogPostFromImport[] = Object.values(blogFiles)
		.filter(
			(post): post is BlogPostMDXContent & { frontmatter: { lang: Langs } } =>
				post.frontmatter.lang === lang
		)
		.map(({ frontmatter, Content }) => ({
			...frontmatter,
			Content,
		}))
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

	return postList
}

export const getAllCategories = (posts: BlogPostFromImport[]): string[] => {
	const categories = new Set<string>()
	posts.forEach((post) => {
		post.categories.forEach((cat) => categories.add(cat))
	})
	return Array.from(categories).sort()
}

export interface CategoryWithCount {
	name: string
	label: string
	icon?: string
	className?: string
	order: number
	count: number
}

export const getCategoriesWithCount = (
	posts: BlogPostFromImport[],
	registry: CategoryConfig[]
): CategoryWithCount[] => {
	const countMap = new Map<string, number>()
	posts.forEach((post) => {
		post.categories.forEach((cat) => {
			countMap.set(cat, (countMap.get(cat) || 0) + 1)
		})
	})

	const configMap = new Map(registry.map((c) => [c.name, c]))
	const FALLBACK_ORDER = 999

	return Array.from(countMap.entries())
		.map(([name, count]) => {
			const cfg = configMap.get(name)
			return {
				name,
				label: cfg?.label ?? name,
				icon: cfg?.icon,
				className: cfg?.className,
				order: cfg?.order ?? FALLBACK_ORDER,
				count,
			}
		})
		.sort((a, b) => a.order - b.order || a.label.localeCompare(b.label))
}
