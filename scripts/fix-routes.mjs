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
import * as esbuild from "esbuild"

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
const enAuditSlugs = getStaticDirs("dist/audit")
const esAuditSlugs = getStaticDirs("dist/es/audit")
const enContactSlugs = getStaticDirs("dist/contact")
const esContactSlugs = getStaticDirs("dist/es/contact")

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
	// Audit
	...enAuditSlugs.map((slug) => `/audit/${slug}/*`),
	...esAuditSlugs.map((slug) => `/es/audit/${slug}/*`),
	// Contact
	...enContactSlugs.map((slug) => `/contact/${slug}/*`),
	...esContactSlugs.map((slug) => `/es/contact/${slug}/*`),
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
// Write to dist/client/ — that's where @astrojs/cloudflare v13 puts static
// files, and what wrangler.toml's pages_build_output_dir now points to.
writeFileSync("dist/client/_routes.json", JSON.stringify(routes, null, 2))
console.log("[postbuild] dist/client/_routes.json fixed ✓")
console.log(`[postbuild] Total rules: ${totalRules}/100`)
console.log(`[postbuild] Static page excludes: ${staticPageExcludes.length}`)
if (totalRules > 100) {
	console.error(`[postbuild] ⚠️  WARNING: ${totalRules} rules exceed Cloudflare's 100-rule limit!`)
	process.exit(1)
}

// Bundle dist/server/entry.mjs into dist/_worker.js for Cloudflare Pages.
//
// @astrojs/cloudflare v13 outputs a Workers Assets setup (entry.mjs + chunks +
// wrangler.json) that targets standalone Workers deployment. Cloudflare Pages
// rejects the generated wrangler.json because it contains both `main` and
// `pages_build_output_dir`, plus Pages-unsupported fields (assets, rules, no_bundle).
//
// Pages advanced mode expects a single self-contained _worker.js at the build
// output root. We use esbuild to bundle entry.mjs + its chunk imports into that
// file, keeping cloudflare:* and node:* as externals (runtime-provided).
const workerEntry = "dist/server/entry.mjs"
if (existsSync(workerEntry)) {
	await esbuild.build({
		entryPoints: [workerEntry],
		outfile: "dist/client/_worker.js",
		bundle: true,
		format: "esm",
		platform: "browser",
		external: ["cloudflare:*", "node:*"],
		conditions: ["workerd", "worker", "browser"],
		logLevel: "warning",
	})
	console.log("[postbuild] dist/client/_worker.js bundled ✓")
}

// Remove the Worker-mode config files that conflict with Pages deployment.
// After bundling to _worker.js, Pages uses the root wrangler.toml directly.
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
