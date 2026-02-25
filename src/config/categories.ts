export interface CategoryConfig {
	/** Unique kebab-case slug used in MDX frontmatter, e.g. "nano-banana" */
	name: string
	/** Display label */
	label: string
	/** Optional emoji or symbol shown before the label */
	icon?: string
	/** Optional custom class for special styling */
	className?: string
	/** Sort priority — lower numbers appear first. Featured items use 0-9 */
	order: number
}

/**
 * Central registry of blog categories.
 * Categories not listed here will still appear in the filter,
 * appended at the end in alphabetical order.
 */
export const CATEGORIES: CategoryConfig[] = [
	{
		name: "nano-banana",
		label: "Nano Banana",
		icon: "✦",
		order: 0,
		className:
			"border-blue-400 [&_span]:text-blue-400 dark:border-blue-400 dark:[&_span]:text-blue-400",
	},
	{ name: "prompts", label: "Prompts", icon: "✍️", order: 1 },
	{ name: "blog", label: "Blog", order: 10 },
	{ name: "chat", label: "Chat", order: 10 },
	{ name: "dashboard", label: "Dashboard", order: 10 },
	{ name: "e-commerce", label: "E-commerce", order: 10 },
	{ name: "email", label: "Email", order: 10 },
	{ name: "forms", label: "Forms", order: 10 },
	{ name: "gallery", label: "Gallery", order: 10 },
	{ name: "landing-page", label: "Landing Page", order: 10 },
	{ name: "mobile", label: "Mobile", order: 10 },
	{ name: "portfolio", label: "Portfolio", order: 10 },
	{ name: "productivity", label: "Productivity", order: 10 },
	{ name: "restaurant", label: "Restaurant", order: 10 },
	{ name: "saas", label: "SaaS", order: 10 },
	{ name: "social-media", label: "Social Media", order: 10 },
]

export const CATEGORY_SLUGS = CATEGORIES.map((c) => c.name) as [string, ...string[]]

/** Look up a category config by name. Returns undefined for unknown categories. */
export const getCategoryConfig = (name: string): CategoryConfig | undefined =>
	CATEGORIES.find((c) => c.name === name)
