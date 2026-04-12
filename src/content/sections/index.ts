import type { AstroComponentFactory } from "astro/runtime/server/index.js"
import AboutEs from "./about-es.astro"
import AboutEn from "./about-en.astro"

type SectionContent = {
	[key: string]: {
		about: AstroComponentFactory
	}
}

export const SECTIONS_CONTENT: SectionContent = {
	es: {
		about: AboutEs,
	},
	en: {
		about: AboutEn,
	},
}
