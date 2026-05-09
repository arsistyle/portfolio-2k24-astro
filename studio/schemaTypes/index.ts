// Documents
import { blogPost } from "./documents/blogPost"
import { project } from "./documents/project"
import { product } from "./documents/product"

// Objects (Portable Text blocks)
import { codeBlock } from "./objects/codeBlock"
import { contentBlock } from "./objects/contentBlock"
import { flowSteps } from "./objects/flowSteps"
import { sources } from "./objects/sources"

/**
 * Schema types array — pásalo al array `schema.types` en sanity.config.ts
 *
 * import { schemaTypes } from './schemaTypes'
 *
 * export default defineConfig({
 *   schema: { types: schemaTypes },
 * })
 */
export const schemaTypes = [
	// Documents
	blogPost,
	project,
	product,
	// Objects (custom Portable Text blocks)
	codeBlock,
	contentBlock,
	flowSteps,
	sources,
]

export { blogPost, project, product, codeBlock, contentBlock, flowSteps, sources }
