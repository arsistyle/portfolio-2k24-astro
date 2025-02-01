import type { Langs, ProductFromImport, ProductMDXContent, ProductMDXGlobResult } from "@/types"

export const getProducts = ({ lang }: { lang: Langs }) => {
	const productFiles = import.meta.glob<ProductMDXContent>("@/content/products/**/*.json", {
		eager: true,
	}) as ProductMDXGlobResult

	const productList: ProductFromImport[] = Object.values(productFiles)
		.filter(
			(product): product is ProductMDXContent & { default: { lang: Langs } } =>
				product.default.lang === lang
		)
		.map(({ default: data, Content }) => ({
			...data,
			Content,
		}))

	return productList
}
