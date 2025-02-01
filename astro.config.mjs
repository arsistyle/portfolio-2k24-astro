import { defineConfig, passthroughImageService } from "astro/config"
import mdx from "@astrojs/mdx"
import tailwindcss from "@tailwindcss/vite"

import react from "@astrojs/react"

// https://astro.build/config
export default defineConfig({
	integrations: [mdx(), react()],
	image: {
		service: passthroughImageService(),
	},
	vite: {
		plugins: [tailwindcss()],
	},
})
