import ProjectEnDemo from "./en/demo.astro"
import ProjectEsDemo from "./es/demo.astro"

export const PROJECTS_CONTENT: Record<string, any> = {
	"mocho-store": {
		en: ProjectEnDemo,
		es: ProjectEsDemo,
	},
}
