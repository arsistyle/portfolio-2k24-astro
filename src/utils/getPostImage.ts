import { getImage } from "astro:assets"

/**
 * Returns an Astro-optimized image object for blog post images.
 * Using this util in both BlogCard and PostLayout ensures both components
 * use the exact same resolved URL, which is required for view-transitions
 * to morph the image correctly.
 */
export async function getPostImage(src: string) {
	return getImage({ src, width: 1280, height: 720, format: "webp" })
}
