import type { ButtonProps } from "../components/core/Button/types"

export type Langs = "en" | "es"

export type BreadcrumbTypes = "link" | "separator" | "current"
export type BreadcrumbsItem = {
	name?: string
	type: BreadcrumbTypes
	url?: string
}

export type MDXContent = {
	Content: () => any
	file: string
	url: string
}

/*

  Project

*/

export type Project = {
	name: string
	lang: Langs
	title: string
	description: string
	images: {
		small: string
		medium: string
		large: string
	}
	categories: string[]
	content?: any
	date: number
	og_image?: string
}

export type ProjectMDXContent = MDXContent & {
	frontmatter: Project
}

export type ProjectFromImport = Pick<
	Project,
	"lang" | "name" | "title" | "categories" | "images" | "description" | "og_image"
> & {
	Content: ProjectMDXContent["Content"]
}

export type ProjectMDXGlobResult = Record<string, ProjectMDXContent>

/*

  Product

*/

export type Product = {
	category: string
	description: string
	gallery: {
		src: string
		alt: string
		width: number
		height: number
	}[]
	lang: Langs
	name: string
	paymentMethods: {
		name: string
		url: string
		paymentName: string
	}[]
	price: number
	thumbnail: string
	title: string
	og_image?: string
}

export type ProductMDXContent = MDXContent & {
	default: Product
}

export type ProductFromImport = Pick<
	Product,
	| "category"
	| "description"
	| "gallery"
	| "lang"
	| "name"
	| "paymentMethods"
	| "price"
	| "thumbnail"
	| "title"
	| "og_image"
> & {
	Content: MDXContent["Content"]
}

export type ProductMDXGlobResult = Record<string, ProductMDXContent>

export type ProductPaymentButtons = {
	[key: string]: {
		className: string
		color: ButtonProps["color"]
		icon: any
	}
}

/*

  PageLayout

*/

export type NavItemProps = {
	label: string
	name: string
	path: string
}

export type NavItemsProps = {
	label: string
	items: NavItemProps[]
}

export type NavProps = {
	items: NavItemsProps[]
}

export type PageLayoutProps = {
	pageTitle?: string
	title?: string
	breadcrumbs: any[]
	nav?: NavProps
	name?: string
	description?: string
	og_image?: string
	og_title?: string
	og_type?: string
	canonical?: string
	langSelector?: boolean
}
