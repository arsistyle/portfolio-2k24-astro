import { createClient } from "@sanity/client"
import type { Langs } from "@/types"
import type { CategoryConfig } from "@/config/categories"

/**
 * Creates a Sanity client.
 * Prioritizes runtime environment variables if provided,
 * falling back to import.meta.env.
 */
function createSanityClient(runtimeEnv?: Record<string, string | undefined>) {
	const cfEnv = runtimeEnv ?? (typeof process !== "undefined" ? process.env : {})

	const projectId =
		cfEnv.PUBLIC_SANITY_PROJECT_ID ?? import.meta.env.PUBLIC_SANITY_PROJECT_ID ?? "45naspfq"
	const dataset = cfEnv.PUBLIC_SANITY_DATASET ?? import.meta.env.PUBLIC_SANITY_DATASET ?? "develop"
	const token = cfEnv.SANITY_API_TOKEN ?? import.meta.env.SANITY_API_TOKEN

	return createClient({
		projectId,
		dataset,
		apiVersion: "2025-01-01",
		useCdn: false,
		perspective: import.meta.env.DEV ? "drafts" : "published",
		token,
	})
}

// 	const projectId = cfEnv.PUBLIC_SANITY_PROJECT_ID ?? import.meta.env.PUBLIC_SANITY_PROJECT_ID ?? "45naspfq"
// 	const dataset = cfEnv.PUBLIC_SANITY_DATASET ?? import.meta.env.PUBLIC_SANITY_DATASET ?? "develop"
// 	const token = cfEnv.SANITY_API_TOKEN ?? import.meta.env.SANITY_API_TOKEN

// 	return createClient({
// 		projectId,
// 		dataset,
// 		apiVersion: "2025-01-01",
// 		useCdn: false,
// 		perspective: import.meta.env.DEV ? "drafts" : "published",
// 		token,
// 	})
// }

// ─── Types ────────────────────────────────────────────────────────────────────

export type SanityBlogPost = {
	_id: string
	isDraft: boolean
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
  _id,
  _originalId,
  title,
  "slug": slug.current,
  description,
  "search_context": searchContext,
  date,
  categories,
  "lang": language,
  status,
  "image": select(image.type == 'url' => image.url, defined(image.asset->url) => image.asset->url, ""),
  "og_image": select(ogImage.type == 'url' => ogImage.url, defined(ogImage.asset->url) => ogImage.asset->url, ""),
  body
`

const ALL_POSTS_QUERY = /* groq */ `
  *[_type == "blogPost" && language == $lang && ($category == null || $category in categories)] 
  | order(date desc) [$start...$end] {
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

function withReadingTimeAndDraftStatus(post: any): SanityBlogPost {
	const isDraft =
		(post._originalId && post._originalId.startsWith("drafts.")) || post._id.startsWith("drafts.")

	// Limpiamos los campos internos antes de devolver
	const { _originalId, ...cleanPost } = post

	return { ...cleanPost, isDraft, readingTime: computeReadingTime(post.body) }
}

// ─── Exports ──────────────────────────────────────────────────────────────────

/**
 * Fetch all blog posts for a given language from Sanity.
 * Mirrors the interface of the legacy `getBlogPosts` from `@/utils/getBlogPosts`.
 */
export async function getBlogPosts({
	lang,
	category = null,
	start = 0,
	end = 100,
	includeFuture = false,
	runtimeEnv,
}: {
	lang: Langs
	category?: string | null
	start?: number
	end?: number
	includeFuture?: boolean
	runtimeEnv?: Record<string, string | undefined>
}): Promise<SanityBlogPost[]> {
	const client = createSanityClient(runtimeEnv)
	const raw = await client.fetch<Omit<SanityBlogPost, "readingTime">[]>(ALL_POSTS_QUERY, {
		lang,
		category,
		start,
		end,
	})

	const now = new Date()
	const isDev = import.meta.env.DEV

	return raw
		.filter((post: any) => isDev || includeFuture || new Date(post.date) <= now)
		.map(withReadingTimeAndDraftStatus)
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
	const client = createSanityClient()
	const raw = await client.fetch<any | null>(POST_BY_SLUG_QUERY, { slug, lang })
	if (!raw) return null
	return withReadingTimeAndDraftStatus(raw)
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
