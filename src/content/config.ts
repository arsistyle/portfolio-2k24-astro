import { defineCollection, z } from "astro:content"
import { CATEGORY_SLUGS } from "../config/categories"

const projectsCollection = defineCollection({
	type: "content",
})
const proyectosCollection = defineCollection({
	type: "content",
})
const blogCollection = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		description: z.string(),
		search_context: z.string(),
		date: z.string(),
		lang: z.enum(["en", "es"]),
		image: z.string(),
		categories: z.array(z.enum(CATEGORY_SLUGS)),
		status: z.enum(["active", "draft"]),
	}),
})

export const collections = {
	projects: projectsCollection,
	proyectos: proyectosCollection,
	blog: blogCollection,
}
