import type { Langs } from "@/types"

export type AppEnv = "development" | "production" | "local"

export interface RouteAvailability {
	[key: string]: AppEnv[]
}

export interface Route {
	name: string
	href: string
	availability: RouteAvailability
}

export const ROUTES: Route[] = [
	{
		name: "nav.home",
		href: "/",
		availability: {
			en: ["local", "development", "production"],
			es: ["local", "development", "production"],
		},
	},
	{
		name: "nav.projects",
		href: "/projects",
		availability: {
			en: ["local", "development", "production"],
			es: ["local", "development", "production"],
		},
	},
	{
		name: "nav.audit",
		href: "/audit",
		availability: {
			en: ["local", "development", "production"],
			es: ["local", "development", "production"],
		},
	},
	{
		name: "nav.blog",
		href: "/blog",
		availability: {
			en: ["local", "development", "production"],
			es: ["local", "development", "production"],
		},
	},
	{
		name: "nav.shop",
		href: "/shop",
		availability: {
			en: ["local"],
			es: ["local"],
		},
	},
]

export const isRouteEnabled = (path: string, lang: Langs, env: string): boolean => {
	const normalizedPath = path.startsWith("/") ? path : `/${path}`
	const comparePath =
		normalizedPath.length > 1 && normalizedPath.endsWith("/")
			? normalizedPath.slice(0, -1)
			: normalizedPath

	const route = ROUTES.filter((r) => {
		if (r.href === "/") return comparePath === "/"
		return comparePath === r.href || comparePath.startsWith(r.href + "/")
	}).sort((a, b) => b.href.length - a.href.length)[0]

	if (!route) return true

	const allowedEnvs = route.availability[lang]
	if (!allowedEnvs) return false

	const currentEnv = env as AppEnv
	return (
		allowedEnvs.includes(currentEnv) || (env === "development" && allowedEnvs.includes("local"))
	)
}

export const getEnabledRoutes = (lang: Langs, env: string): Route[] => {
	return ROUTES.filter((route) => isRouteEnabled(route.href, lang, env))
}
