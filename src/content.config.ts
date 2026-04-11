import { defineCollection } from "astro:content"
import { z } from "astro/zod"
import { glob } from "astro/loaders"

const seoCollection = defineCollection({
	loader: glob({ pattern: "*.json", base: "./src/content/seo" }),
	schema: z.object({
		pages: z.record(
			z.string(),
			z.object({
				title: z.string(),
				description: z.string(),
				og_title: z.string().optional(),
				og_image: z.string().optional(),
			})
		),
	}),
})

export const collections = {
	seo: seoCollection,
}
