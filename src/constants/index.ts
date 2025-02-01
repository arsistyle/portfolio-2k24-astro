import type { NavItem } from "./types"

export const MAIN_URL = "https://arsi.dev"

export const NAV_ITEMS: NavItem[] = [
	{
		name: "nav.home",
		href: "/",
	},
	{
		name: "nav.projects",
		href: "/projects",
	},
	{
		name: "nav.shop",
		href: "/shop",
	},
]

export const SEO_DATA = {
	es: {
		title: "Israel Larrondo - Portafolio",
		image: `${MAIN_URL}/og-image.png`,
		description: "Portafolio de proyectos y alguna que otra cosa más.",
		canonical_url: MAIN_URL,
	},
	en: {
		title: "Israel Larrondo - Portfolio",
		image: `${MAIN_URL}/og-image.png`,
		description: "Portfolio of projects and something else.",
		canonical_url: MAIN_URL,
	},
}
