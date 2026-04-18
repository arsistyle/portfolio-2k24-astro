import { defineConfig, fontProviders } from "astro/config"
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
		imageService: "compile",
		prerenderEnvironment: "node",
	}),
	integrations: [mdx(), react(), sitemap()],
	fonts: [
		{
			provider: fontProviders.fontsource(),
			name: "Syne",
			cssVariable: "--font-syne",
			weights: [400, 500, 600, 700, 800],
			styles: ["normal"],
			subsets: ["latin", "latin-ext"],
		},
		{
			provider: fontProviders.fontsource(),
			name: "Google Sans Flex",
			cssVariable: "--font-google-sans-flex",
			weights: [400, 500, 600, 700],
			styles: ["normal"],
			subsets: ["latin", "latin-ext"],
		},
	],
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
			alias: import.meta.env.PROD ? { "react-dom/server": "react-dom/server.edge" } : {},
		},
	},
})
