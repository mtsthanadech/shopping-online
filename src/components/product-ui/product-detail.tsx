import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import {Heart, HeartPlus} from "lucide-react";
import {ProductCardProps} from "@/types/product";

const ProductDetail = (props: ProductCardProps) => {
	const { name, desc, image, price, rating, count, favorite, onAddToCart, onAddToFav} = props
	console.log(props)
	return (
		<Card className="flex flex-col lg:flex-row cursor-pointer transition-all p-0">
			<Image
				src={image}
				alt={name}
				width={1200}
				height={900}
				className="rounded-t-xl object-cover lg:max-w-[600px]"
			/>
			<CardContent className="flex flex-col justify-between py-6">
				<div className="space-y-4">
					<div className="flex items-start justify-between">
						<h3 className="text-base font-bold leading-snug line-clamp-2">{name}</h3>
						<div className="text-base font-bold leading-snug line-clamp-2 cursor-pointer"
								 onClick={(e) => { e.stopPropagation(); onAddToFav?.() }}>
							{
								favorite ?
									<Heart color="#ff0000"/> :
									<HeartPlus />
							}
						</div>
					</div>
					<p className="font-sm text-md">{desc}</p>
				</div>

				<div className="flex flex-col justify-between gap-2">
					{
						(count && count) &&
            <p className="text-sm text-gray-500">⭐{rating} ({count.toLocaleString()})</p>
					}
					<p className="font-bold text-md">฿{price.toLocaleString()}</p>

					<Button className="w-full font-bold cursor-pointer" onClick={(e) => { e.stopPropagation(); onAddToCart?.() }}>
						Add to Cart
					</Button>
				</div>
			</CardContent>
		</Card>
	)
}

export default ProductDetail;
