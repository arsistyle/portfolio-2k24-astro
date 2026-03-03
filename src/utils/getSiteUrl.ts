export const getSiteUrl = (context: any) => {
	// context.site is available if 'site' is set in astro.config.mjs
	if (context.site) {
		return context.site.origin.replace(/\/$/, "")
	}
	// Fallback to environment variable
	return (import.meta.env.SITE || "https://arsi.dev").replace(/\/$/, "")
}
