import ProductCard from "@/components/product-ui/product-card";
import {useCartStore} from "@/store/useCartStore";
import {useRouter} from "next/router";
import { toast } from "sonner";
import {useProductStore} from "@/store/useProductStore";
import {Product} from "@/types/product";

const Products = () => {
	const router = useRouter();
	const { addToCart } = useCartStore()
	const { products, addToFav } = useProductStore()

	const handleAddToCart = (product: Product) => {
		console.log("Add to cart:", product.name)
		addToCart(product)
		toast(`${product.name}`, {
			description: "Added to cart",
			action: {
				label: "View cart",
				onClick: () => router.push("/carts"),
			},
		})
	}

	const handleAddToFav = (product: Product) => {
		console.log(`${product.favorite ? "Removed from" : "Add to"} favorite:`, product.name)
		addToFav(product.id)
		toast(`${product.name}`, {
			description: `${product.favorite ? "Removed from" : "Add to"} favorite`,
			action: {
				label: "Undo",
				onClick: () => addToFav(product.id),
			},
		})
	}

	const handleOnClick = (product: Product) => {
		console.log("Go to product:", product.name)
		router.push(`/product/${product.id}`)
	}

	return (
		<div className="max-w-6xl mx-auto">
			<h1 className="text-2xl font-bold mb-4">
				Product lists
			</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
				{products.map((product) => (
					<ProductCard
						key={product.id}
						name={product.name}
						image={product.image}
						price={product.price}
						rating={product.rating.rate}
						count={product.rating.count}
						favorite={product.favorite}
						onClick={() => handleOnClick(product)}
						onAddToCart={() => handleAddToCart(product)}
						onAddToFav={() => handleAddToFav(product)}
					/>
				))}
			</div>
		</div>
	)
}

export default Products;
