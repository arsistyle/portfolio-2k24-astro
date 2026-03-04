import { defineConfig } from "astro/config"
import mdx from "@astrojs/mdx"
import tailwindcss from "@tailwindcss/vite"
import react from "@astrojs/react"
import sitemap from "@astrojs/sitemap"
import cloudflare from "@astrojs/cloudflare"

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
			// Use react-dom/server.edge instead of react-dom/server.browser for React 19.
			// Without this, MessageChannel from node:worker_threads needs to be polyfilled.
			alias: import.meta.env?.PROD && {
				"react-dom/server": "react-dom/server.edge",
			},
		},
	},
})
