export type Product = {
	id: number
	name: string
	desc: string
	image: string
	price: number,
	rating: {
		rate: number
		count: number
	},
	favorite?: boolean,
}

export type ProductCardProps = {
	name: string
	image: string
	price: number
	desc?: string
	rating?: number
	count?: number
	favorite?: boolean
	onAddToCart?: () => void
	onAddToFav?: () => void
	onClick?: () => void
}
