// Generates a correct _routes.json for Astro 5 + @astrojs/cloudflare.
//
// Strategy: Use "include everything" (/*) then exclude static assets.
// This avoids per-slug rules that hit Cloudflare's 100-rule limit.
//
// Cloudflare "most specific match wins":
//   - /_astro/foo.js  → exclude /_astro/* wins → CDN ✓
//   - /blog/2         → include /* only → worker ✓ (SSR paginated listing)
//   - /blog/opal      → include /* AND exclude /blog/opal/* → exclude wins → CDN ✓
//   - /es/blog/opal   → include /* AND exclude /es/blog/opal/* → exclude wins → CDN ✓

import { writeFileSync, readFileSync, existsSync, readdirSync, statSync } from "fs"
import { join } from "path"

function getStaticDirs(dir) {
	try {
		return readdirSync(dir).filter((entry) => statSync(join(dir, entry)).isDirectory())
	} catch {
		return []
	}
}

// Collect static pages that should be served from CDN (not the worker)
const enBlogSlugs = getStaticDirs("dist/blog")
const esBlogSlugs = getStaticDirs("dist/es/blog")
const enProjectSlugs = getStaticDirs("dist/projects")
const esProjectSlugs = getStaticDirs("dist/es/projects")
const enShopSlugs = getStaticDirs("dist/shop")
const esShopSlugs = getStaticDirs("dist/es/shop")

const staticPageExcludes = [
	// Static top-level pages
	"/404.html",
	"/components/*",
	// Blog posts (prerendered static HTML)
	...enBlogSlugs.map((slug) => `/blog/${slug}/*`),
	...esBlogSlugs.map((slug) => `/es/blog/${slug}/*`),
	// Projects
	...enProjectSlugs.map((slug) => `/projects/${slug}/*`),
	...esProjectSlugs.map((slug) => `/es/projects/${slug}/*`),
	// Shop
	...enShopSlugs.map((slug) => `/shop/${slug}/*`),
	...esShopSlugs.map((slug) => `/es/shop/${slug}/*`),
]

const routes = {
	version: 1,
	include: ["/*"],
	exclude: [
		// Static assets
		"/_astro/*",
		"/favicon.svg",
		"/robots.txt",
		"/ads.txt",
		"/sitemap-index.xml",
		"/sitemap-0.xml",
		// Static pages
		...staticPageExcludes,
	],
}

const totalRules = routes.include.length + routes.exclude.length
writeFileSync("dist/_routes.json", JSON.stringify(routes, null, 2))
console.log("[postbuild] dist/_routes.json fixed ✓")
console.log(`[postbuild] Total rules: ${totalRules}/100`)
console.log(`[postbuild] Static page excludes: ${staticPageExcludes.length}`)
if (totalRules > 100) {
	console.error(`[postbuild] ⚠️  WARNING: ${totalRules} rules exceed Cloudflare's 100-rule limit!`)
	process.exit(1)
}

// Fix dist/server/wrangler.json for Cloudflare Pages compatibility.
// @astrojs/cloudflare generates a wrangler.json with fields Pages rejects.
const wranglerPath = "dist/server/wrangler.json"
if (existsSync(wranglerPath)) {
	const wrangler = JSON.parse(readFileSync(wranglerPath, "utf-8"))

	// Pages rejects triggers: {} — must be omitted when there are no crons
	if (wrangler.triggers && Object.keys(wrangler.triggers).length === 0) {
		delete wrangler.triggers
	}

	// KV namespace bindings without an "id" can't be deployed; remove them
	if (Array.isArray(wrangler.kv_namespaces)) {
		wrangler.kv_namespaces = wrangler.kv_namespaces.filter((ns) => ns.id)
		if (wrangler.kv_namespaces.length === 0) delete wrangler.kv_namespaces
	}

	// "ASSETS" is reserved in Pages projects; Pages provides it automatically
	if (wrangler.assets?.binding === "ASSETS") {
		delete wrangler.assets.binding
		if (Object.keys(wrangler.assets).length === 0) delete wrangler.assets
	}

	writeFileSync(wranglerPath, JSON.stringify(wrangler, null, 2))
	console.log("[postbuild] dist/server/wrangler.json fixed ✓")
}
