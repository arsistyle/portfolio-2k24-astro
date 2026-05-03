import { createClient } from "@sanity/client"
import type { Langs } from "@/types"
import type { CategoryConfig } from "@/config/categories"

const sanityClient = createClient({
	projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID ?? "45naspfq",
	dataset: import.meta.env.PUBLIC_SANITY_DATASET ?? "develop",
	apiVersion: "2025-01-01",
	useCdn: false,
	token: import.meta.env.SANITY_API_TOKEN,
})

// ─── Types ────────────────────────────────────────────────────────────────────

export type SanityBlogPost = {
	title: string
	slug: string
	description: string
	search_context: string
	date: string
	categories: string[]
	lang: Langs
	status: "active" | "draft"
	image: string
	og_image?: string
	body: any[]
	readingTime: number
}

export interface CategoryWithCount {
	name: string
	label: string
	icon?: any
	className?: string
	order: number
	count: number
}

// ─── GROQ Queries ─────────────────────────────────────────────────────────────

const POST_FIELDS = /* groq */ `
  title,
  "slug": slug.current,
  description,
  "search_context": searchContext,
  date,
  categories,
  "lang": language,
  status,
  "image": coalesce(image.asset->url, ""),
  "og_image": ogImage.asset->url,
  body
`

const ALL_POSTS_QUERY = /* groq */ `
  *[_type == "blogPost" && language == $lang] | order(date desc) {
    ${POST_FIELDS}
  }
`

const POST_BY_SLUG_QUERY = /* groq */ `
  *[_type == "blogPost" && slug.current == $slug && language == $lang][0] {
    ${POST_FIELDS}
  }
`

// ─── Helpers ──────────────────────────────────────────────────────────────────

function computeReadingTime(body: any[]): number {
	if (!body?.length) return 1
	const text = body
		.filter((b) => b._type === "block")
		.flatMap((b) => b.children ?? [])
		.filter((s) => s._type === "span")
		.map((s) => s.text ?? "")
		.join(" ")
	const words = text.trim().split(/\s+/).filter(Boolean).length
	return Math.max(1, Math.ceil(words / 200))
}

function withReadingTime(post: Omit<SanityBlogPost, "readingTime">): SanityBlogPost {
	return { ...post, readingTime: computeReadingTime(post.body) }
}

// ─── Exports ──────────────────────────────────────────────────────────────────

/**
 * Fetch all blog posts for a given language from Sanity.
 * Mirrors the interface of the legacy `getBlogPosts` from `@/utils/getBlogPosts`.
 */
export async function getBlogPosts({
	lang,
	includeFuture = false,
}: {
	lang: Langs
	includeFuture?: boolean
}): Promise<SanityBlogPost[]> {
	const raw = await sanityClient.fetch<Omit<SanityBlogPost, "readingTime">[]>(ALL_POSTS_QUERY, {
		lang,
	})

	const now = new Date()
	const isDev = import.meta.env.DEV

	return raw
		.filter(
			(post: Omit<SanityBlogPost, "readingTime">) =>
				isDev || includeFuture || new Date(post.date) <= now
		)
		.map(withReadingTime)
}

/**
 * Fetch a single blog post by slug + language.
 * Returns `null` when not found.
 */
export async function getBlogPost({
	slug,
	lang,
}: {
	slug: string
	lang: Langs
}): Promise<SanityBlogPost | null> {
	const raw = await sanityClient.fetch<Omit<SanityBlogPost, "readingTime"> | null>(
		POST_BY_SLUG_QUERY,
		{ slug, lang }
	)
	if (!raw) return null
	return withReadingTime(raw)
}

/** Pure: extract unique category slugs from a post list. */
export function getAllCategories(posts: SanityBlogPost[]): string[] {
	const set = new Set<string>()
	posts.forEach((p) => p.categories?.forEach((c) => set.add(c)))
	return Array.from(set).sort()
}

/** Pure: build category list with post counts, sorted by registry order. */
export function getCategoriesWithCount(
	posts: SanityBlogPost[],
	registry: CategoryConfig[]
): CategoryWithCount[] {
	const countMap = new Map<string, number>()
	posts.forEach((p) => p.categories?.forEach((c) => countMap.set(c, (countMap.get(c) ?? 0) + 1)))

	const cfgMap = new Map(registry.map((c) => [c.name, c]))

	return Array.from(countMap.entries())
		.map(([name, count]) => {
			const cfg = cfgMap.get(name)
			return {
				name,
				label: cfg?.label ?? name,
				className: cfg?.className,
				order: cfg?.order ?? 999,
				count,
			}
		})
		.sort((a, b) => a.order - b.order || a.label.localeCompare(b.label))
}
