import { defineMiddleware } from "astro:middleware"
import { defaultLang } from "@/i18n/ui"
import { getLangFromUrl } from "@/i18n/utils"
import { isRouteEnabled } from "@/config/routes"
import type { Langs } from "@/types"

export const onRequest = defineMiddleware(({ url, locals, rewrite }, next) => {
	const { pathname } = url

	if (pathname.startsWith("/api/") || pathname.includes(".")) {
		return next()
	}

	const lang = getLangFromUrl(url) as Langs
	const cfEnv = (locals as { runtime?: { env?: Record<string, string> } }).runtime?.env
	const env = (cfEnv?.APP_ENV ?? import.meta.env.APP_ENV ?? import.meta.env.MODE) as string

	const routePath =
		lang !== defaultLang
			? pathname.replace(new RegExp(`^/${lang}(?=/|$)`), "") || "/"
			: pathname

	if (!isRouteEnabled(routePath, lang, env)) {
		return rewrite("/404")
	}

	return next()
})
