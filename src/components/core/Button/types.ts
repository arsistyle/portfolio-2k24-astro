export interface ButtonProps {
	class?: string
	color?: "primary" | "secondary" | "dark" | "light" | "whatsapp"
	disabled?: boolean
	href?: string
	rel?: string
	shape?: "square" | "rounded" | "circle"
	size?: "xs" | "sm" | "md" | "lg" | "xl"
	tag?: "button" | "a" | "span"
	target?: "_blank" | "_self" | "_parent" | "_top" | "framename"
	title?: string
	type?: "button" | "submit" | "reset" | undefined | null
	variant?: "filled" | "outlined"
	slotProps?: any
}
