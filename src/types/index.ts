import type { ButtonProps } from "../components/core/Button/types"

export type Langs = "en" | "es"

export type BreadcrumbTypes = "link" | "separator" | "current"
export type BreadcrumbsItem = {
	name?: string
	type: BreadcrumbTypes
	url?: string
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
	category: string
	content?: any
}

export type ProjectWithLang = {
	[key in Langs]: Project
}

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
}

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
	title: string
	breadcrumbs: any[]
	nav?: NavProps
	name?: string
}
