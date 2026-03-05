// Generates a correct _routes.json for Astro 5 + @astrojs/cloudflare.
//
// Why: The adapter auto-generates /blog/* in BOTH include AND exclude, causing:
//   - Blog listing (/blog) → not matched by any include → 404
//   - Blog posts (/blog/opal) → matched by include AND exclude equally → exclude wins → CDN ✓
//
// Strategy: Include only the SSR routes explicitly, and exclude each prerendered post slug
// specifically. Cloudflare Pages uses "most specific match wins", so:
//   - /blog/2     → matched by include /blog/* only → worker ✓ (SSR paginated listing)
//   - /blog/opal  → matched by include /blog/* (broad) AND exclude /blog/opal (specific)
//                 → exclude /blog/opal wins → CDN serves dist/blog/opal/index.html ✓

import { writeFileSync, readdirSync, statSync } from "fs"
import { join } from "path"

function getStaticDirs(dir) {
	try {
		return readdirSync(dir).filter((entry) => statSync(join(dir, entry)).isDirectory())
	} catch {
		return []
	}
}

const enSlugs = getStaticDirs("dist/blog")
const esSlugs = getStaticDirs("dist/es/blog")

const blogPostExcludes = [
	...enSlugs.flatMap((slug) => [`/blog/${slug}`, `/blog/${slug}/*`]),
	...esSlugs.flatMap((slug) => [`/es/blog/${slug}`, `/es/blog/${slug}/*`]),
]

const routes = {
	version: 1,
	include: ["/_server-islands/*", "/_image", "/blog", "/blog/*", "/es/blog", "/es/blog/*"],
	exclude: [
		"/_astro/*",
		"/favicon.svg",
		"/robots.txt",
		"/ads.txt",
		"/sitemap-index.xml",
		"/sitemap-0.xml",
		...blogPostExcludes,
	],
}

writeFileSync("dist/_routes.json", JSON.stringify(routes, null, 2))
console.log("[postbuild] dist/_routes.json fixed ✓")
console.log(`[postbuild] Excluded ${blogPostExcludes.length} prerendered blog paths`)
