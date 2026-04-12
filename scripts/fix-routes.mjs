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

import { writeFileSync, existsSync, rmSync, readdirSync, statSync } from "fs"
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

// Remove dist/server/wrangler.json and .wrangler/deploy/config.json.
// @astrojs/cloudflare generates a Worker wrangler.json that is incompatible
// with Cloudflare Pages. The adapter also writes a deploy/config.json that
// redirects wrangler to it. Deleting both lets wrangler fall back to the
// root wrangler.toml (pages_build_output_dir) which is the correct Pages config.
const wranglerPath = "dist/server/wrangler.json"
if (existsSync(wranglerPath)) {
	rmSync(wranglerPath)
	console.log("[postbuild] dist/server/wrangler.json removed ✓")
}
const deployConfigPath = ".wrangler/deploy/config.json"
if (existsSync(deployConfigPath)) {
	rmSync(deployConfigPath)
	console.log("[postbuild] .wrangler/deploy/config.json removed ✓")
}
