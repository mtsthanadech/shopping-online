import Image from "next/image";
import {Button} from "@/components/ui/button";
import {Minus, Plus, Trash2} from "lucide-react";
import {Input} from "@/components/ui/input";
import {CardContent} from "@/components/ui/card";
import {useCartStore} from "@/store/useCartStore";
import {CartItem} from "@/types/cart";

const ProductCart = ({item}: {item: CartItem}) => {
	const { removeFromCart, addToCart, minusFromCart } = useCartStore()
	return (
		<CardContent key={item.id} className="flex lg:h-[150px] gap-4 border-b pb-4 flex-col md:flex-row items-center">
			<div className="flex max-w-[150px] lg:h-[150px]">
				<Image
					src={item.image}
					alt={item.name}
					width={400}
					height={300}
					className="rounded object-cover"
				/>
			</div>

			<div className="flex-1">
				<h3 className="text-base font-bold leading-snug line-clamp-2">{item.name}</h3>
				<p className="text-sm text-gray-500">฿{item.price.toLocaleString()} x {item.quantity}</p>
				<p className="text-purple-500 font-semibold mt-1">
					Total price: ฿{(item.price * item.quantity).toLocaleString()}
				</p>
			</div>

			<div className="flex flex-row gap-2">
				<Button
					variant="outline"
					className="font-bold cursor-pointer"
					onClick={() => minusFromCart(item)}
					disabled={item.quantity <= 1}
				>
					<Minus />
				</Button>
				<Input value={item.quantity} placeholder="Quantity" />
				<Button
					variant="outline"
					className="font-bold cursor-pointer"
					onClick={() => addToCart(item)}
					disabled={item.quantity >= 10}
				>
					<Plus />
				</Button>
				<Button
					variant="destructive"
					className="font-bold cursor-pointer"
					onClick={() => removeFromCart(item.id)}
				>
					<Trash2 />
				</Button>
			</div>
		</CardContent>
	)
}

export default ProductCart;
