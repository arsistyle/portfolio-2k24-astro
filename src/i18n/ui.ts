import esUi from "./es.json"
import enUi from "./en.json"

export type UiKeys = keyof typeof enUi

export const languages = {
	en: "English",
	es: "Español",
}

export const defaultLang = "en"

export const showDefaultLang = false

export const ui = {
	en: enUi,
	es: esUi,
}

type Routes = {
	[key: string]: { projects: string }
}

export const routes: Routes = {
	en: {
		projects: "projects",
	},
	es: {
		projects: "projects",
	},
}
