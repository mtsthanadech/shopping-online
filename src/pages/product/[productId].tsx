import {useCartStore} from "@/store/useCartStore";
import {useRouter} from "next/router";
import { toast } from "sonner";
import {useProductStore} from "@/store/useProductStore";
import {useEffect, useState} from "react";
import ProductDetail from "@/components/product-ui/product-detail";
import {Product} from "@/types/product";
import {ArrowLeft} from "lucide-react";

const Products = () => {
	const router = useRouter();
	const productId = router.query.productId;
	const { addToCart } = useCartStore()
	const { addToFav, getProductDetails } = useProductStore()
	const [product, setProduct] = useState<Product>();

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
		getProduct()
	}

	const handleOnClick = (product: Product) => {
		console.log("Go to product:", product.name)
		router.push(`/product/${product.id}`)
	}

	const getProduct = () => {
		if (typeof productId === "string") {
			setProduct(getProductDetails(productId))
		} else {
			router.push("/404")
		}
	}
	useEffect(() => {
		if (productId) {
			getProduct()
		}
	}, [productId]);

	return (
		<div className="max-w-6xl mx-auto">
			<h1 className="flex flex-row item-center text-2xl font-bold mb-4 gap-4">
				<div className="flex flex-wrap content-center cursor-pointer" onClick={() => router.push("/")}>
					<ArrowLeft />
				</div>
				Product detail
			</h1>
			{
				!product ? (
					<p className="text-gray-500">There are no product detail.</p>
				) : (
					<div className="grid grid-cols-1 gap-6">
						<ProductDetail
							key={product.id}
							name={product.name}
							desc={product.desc}
							image={product.image}
							price={product.price}
							rating={product.rating.rate}
							count={product.rating.count}
							favorite={product.favorite}
							onClick={() => handleOnClick(product)}
							onAddToCart={() => handleAddToCart(product)}
							onAddToFav={() => handleAddToFav(product)}
						/>
					</div>
				)
			}
		</div>
	)
}

export default Products;
