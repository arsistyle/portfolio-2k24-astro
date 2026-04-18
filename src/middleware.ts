import { defineMiddleware } from "astro:middleware"
import { defaultLang } from "@/i18n/ui"
import { getLangFromUrl } from "@/i18n/utils"
import { isRouteEnabled } from "@/config/routes"
import type { Langs } from "@/types"

export const onRequest = defineMiddleware(({ url, redirect }, next) => {
	const { pathname } = url

	if (pathname.startsWith("/api/") || pathname.includes(".")) {
		return next()
	}

	const lang = getLangFromUrl(url) as Langs
	const env = (import.meta.env.APP_ENV ?? import.meta.env.MODE) as string

	const routePath =
		lang !== defaultLang ? pathname.replace(new RegExp(`^/${lang}`), "") || "/" : pathname

	if (!isRouteEnabled(routePath, lang, env)) {
		return redirect("/404", 302)
	}

	return next()
})
