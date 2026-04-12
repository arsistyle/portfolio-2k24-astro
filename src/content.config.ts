import { defineCollection } from "astro:content"
import { z } from "astro/zod"
import { glob } from "astro/loaders"
import { CATEGORY_SLUGS } from "./config/categories"

const projectsCollection = defineCollection({
	loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/projects" }),
})

const proyectosCollection = defineCollection({
	loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/proyectos" }),
})

const blogCollection = defineCollection({
	loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		search_context: z.string(),
		date: z.string(),
		lang: z.enum(["en", "es"]),
		image: z.string(),
		og_image: z.string().optional(),
		categories: z.array(z.enum(CATEGORY_SLUGS)),
		status: z.enum(["active", "draft"]),
	}),
})

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
	projects: projectsCollection,
	proyectos: proyectosCollection,
	blog: blogCollection,
	seo: seoCollection,
}
