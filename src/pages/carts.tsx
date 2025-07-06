import { useCartStore } from "@/store/useCartStore"
import {Card} from "@/components/ui/card";
import ProductCart from "@/components/product-ui/product-cart";
import {ArrowLeft} from "lucide-react";
import {useRouter} from "next/router";

export default function CartPage() {
	const router = useRouter();
	const { cartItems } = useCartStore()

	const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

	return (
		<div className="max-w-6xl mx-auto p-6">
			<h1 className="flex flex-row item-center text-2xl font-bold mb-4 gap-4">
				<div className="flex flex-wrap content-center cursor-pointer" onClick={() => router.push("/")}>
					<ArrowLeft />
				</div>
				Shopping Cart 🛒
			</h1>

			{cartItems.length === 0 ? (
				<p className="text-gray-500">There are no items in your cart.</p>
			) : (
				<Card className="p-6">
					{cartItems.map((item) => (
						<ProductCart key={item.id} item={item}/>
					))}

					<div className="text-right mt-6">
						<p className="text-xl font-bold">Total: ฿{total.toLocaleString()}</p>
					</div>
				</Card>
			)}
		</div>
	)
}
