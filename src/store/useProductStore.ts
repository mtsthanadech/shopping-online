// store/useCartStore.ts
import {create} from "zustand"
import type {Product} from "@/types/product"
import {productList} from "@/mock/products";

type ProductState = {
	products: Product[]
	favProducts: () => Product[]
	addProduct: (product: Product) => void
	addToFav: (productId: number) => void
	getProductDetails: (productId: number | string) => Product | undefined
}

export const useProductStore = create<ProductState>((set, get) => ({
	products: [...productList],
	addProduct: (newProduct: Product) =>
		set((state) => {
			const existing = state.products.find((product) => product.id === newProduct.id)
			if (!existing) {
				return {
					products: [...state.products, newProduct],
				}
			}
			return state
		}),
	addToFav: (productId: number) =>
		set((state) => {
			const existing = state.products.find((product) => product.id === productId)
			if (!existing) {
				return state
			}
			const newProduct = state.products.map(product => {
				if (product.id === productId) {
					return {...product, favorite: !product.favorite}
				}
				return product
			})
			console.log(newProduct)
			return {
				products: newProduct,
			}
		}),
	favProducts: () => {
		return get().products.filter((product) => product.favorite === true)
	},
	getProductDetails: (productId: number | string) => {
		return get().products.find((product) => String(product.id) === String(productId))
	}
}))
