import ProductCard from "@/components/product-ui/product-card";
import {useCartStore} from "@/store/useCartStore";
import {useRouter} from "next/router";
import { toast } from "sonner";
import {useProductStore} from "@/store/useProductStore";
import {ArrowLeft} from "lucide-react";

const Favorites = () => {
	const router = useRouter();
	const { addToCart } = useCartStore()
	const { favProducts, addToFav } = useProductStore()

	console.log(favProducts)
	return (
		<div className="max-w-6xl mx-auto p-6">
			<h1 className="flex flex-row item-center text-2xl font-bold mb-4 gap-4">
				<div className="flex flex-wrap content-center cursor-pointer" onClick={() => router.push("/")}>
					<ArrowLeft />
				</div>
				Favorite ❤️
			</h1>
			{
				favProducts().length === 0 ? (
					<p className="text-gray-500">There are no items in your favorite.</p>
				) : (
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
						{favProducts().map((product) => (
							<ProductCard
								key={product.id}
								name={product.name}
								image={product.image}
								price={product.price}
								favorite={product.favorite}
								onAddToCart={() => {
									console.log("Add to cart:", product.name)
									addToCart(product)
									toast(`${product.name}`, {
										description: "Added to cart",
										action: {
											label: "View cart",
											onClick: () => router.push("/carts"),
										},
									})
								}}
								onAddToFav={() => {
									console.log(`${product.favorite ? "Removed from" : "Add to"} favorite:`, product.name)
									addToFav(product.id)
									toast(`${product.name}`, {
										description: `${product.favorite ? "Removed from" : "Add to"} favorite`,
										action: {
											label: "Undo",
											onClick: () => addToFav(product.id),
										},
									})
								}}
								onClick={() => console.log("Go to product:", product.name)}
							/>
						))}
					</div>
				)
			}
		</div>
	)
}

export default Favorites;
