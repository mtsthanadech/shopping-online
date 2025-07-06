// store/useCartStore.ts
import { create } from "zustand"
import {Product} from "@/types/product"
import {CartItem} from "@/types/cart";

type CartState = {
	cartItems: CartItem[]
	addToCart: (product: Product) => void
	minusFromCart: (product: Product) => void
	removeFromCart: (id: number) => void
	clear: () => void
}

export const useCartStore = create<CartState>((set) => ({
	cartItems: [],
	addToCart: (product) =>
		set((state) => {
			const existing = state.cartItems.find((item) => item.id === product.id)
			if (existing) {
				return {
					cartItems: state.cartItems.map((item) =>
						item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
					),
				}
			}
			return { cartItems: [...state.cartItems, { ...product, quantity: 1 }] }
		}),
	minusFromCart: (product) =>
		set((state) => {
			const existing = state.cartItems.find((item) => item.id === product.id)
			if (existing) {
				return {
					cartItems: state.cartItems.map((item) =>
						item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
					),
				}
			}
			return { cartItems: [...state.cartItems, { ...product, quantity: 1 }] }
		}),
	removeFromCart: (id) => set((state) => ({ cartItems: state.cartItems.filter((i) => i.id !== id) })),
	clear: () => set({ cartItems: [] }),
}))
