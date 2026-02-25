import IconGemini from "@/components/icons/gemini"
import IconAi from "@/components/icons/IconAi"
import IconPrompt from "@/components/icons/IconPrompt"
import IconNanoBanana from "@/components/icons/nanobanana"
import type { JSX } from "astro/jsx-runtime"

export interface CategoryConfig {
	name: string
	label: string
	className?: string
	order: number
	icon?: JSX.Element
}

export const CATEGORIES: CategoryConfig[] = [
	{
		name: "ai",
		label: "AI",
		order: 0,
		icon: IconAi,
	},
	{
		name: "prompt",
		label: "Prompt",
		order: 0,
		icon: IconPrompt,
	},
	{
		name: "nano-banana",
		label: "Nano Banana",
		order: 1,
		className: "border-yellow-400! dark:border-yellow-400!",
		icon: IconNanoBanana,
	},
	{
		name: "gemini",
		label: "Gemini",
		order: 1,
		className:
			"border-blue-400! [&_.icon]:text-blue-400 dark:border-blue-400! dark:[&_.icon]:text-blue-400",
		icon: IconGemini,
	},
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

export const getCategoryConfig = (name: string): CategoryConfig | undefined =>
	CATEGORIES.find((c) => c.name === name)
