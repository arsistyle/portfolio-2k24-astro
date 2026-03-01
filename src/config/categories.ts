import IconGemini from "@/components/icons/gemini"
import IconAi from "@/components/icons/ai"
import IconPrompt from "@/components/icons/prompt"
import IconNanoBanana from "@/components/icons/nanobanana"
import IconArsi from "@/components/icons/arsi"

export interface CategoryConfig {
	name: string
	label: string
	className?: string
	order: number
	icon?: any
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
	{
		name: "personal",
		label: "Personal",
		order: 10,
		icon: IconArsi,
		className: "[&_.icon]:text-secondary-500! dark:[&_.icon]:text-secondary!",
	},
	{ name: "front-end", label: "Front-End", order: 10 },
	{
		name: "ui-ux",
		label: "UI/UX",
		order: 10,
	},
	{
		name: "resources",
		label: "Resources",
		order: 10,
	},
	{
		name: "templates",
		label: "Templates",
		order: 10,
	},
	{
		name: "tools",
		label: "Tools",
		order: 10,
	},
	{
		name: "astro",
		label: "Astro",
		order: 10,
	},
	{
		name: "react",
		label: "React",
		order: 10,
	},
	{
		name: "css",
		label: "CSS",
		order: 10,
	},
	{
		name: "javascript",
		label: "JavaScript",
		order: 10,
	},
	{
		name: "typescript",
		label: "TypeScript",
		order: 10,
	},
	{
		name: "html",
		label: "HTML",
		order: 10,
	},
	{
		name: "seo",
		label: "SEO",
		order: 10,
	},
]

export const CATEGORY_SLUGS = CATEGORIES.map((c) => c.name) as [string, ...string[]]

export const getCategoryConfig = (name: string): CategoryConfig | undefined =>
	CATEGORIES.find((c) => c.name === name)
