import { defineCollection } from "astro:content"

const projectsCollection = defineCollection({
	type: "content",
})
const proyectosCollection = defineCollection({
	type: "content",
})

export const collections = {
	projects: projectsCollection,
	proyectos: proyectosCollection,
}
