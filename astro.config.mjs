import { defineConfig } from "astro/config"
import mdx from "@astrojs/mdx"
import tailwindcss from "@tailwindcss/vite"
import react from "@astrojs/react"
import sitemap from "@astrojs/sitemap"
import cloudflare from "@astrojs/cloudflare"

const isProd = process.env.NODE_ENV === "production"

// https://astro.build/config
export default defineConfig({
	site: process.env.SITE || "https://arsi.dev",
	output: "static", // Default is static, individual pages use prerender = false
	adapter: cloudflare({
		platformProxy: {
			enabled: true,
		},
	}),
	integrations: [mdx(), react(), sitemap()],
	image: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "pub-e84866d2025a4715887cd3e35165cedc.r2.dev",
			},
		],
	},
	vite: {
		plugins: [tailwindcss()],
		resolve: {
			conditions: isProd ? ["workerd", "browser"] : undefined,
		},
	},
})
