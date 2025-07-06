import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import {Heart, HeartPlus} from "lucide-react";
import {ProductCardProps} from "@/types/product";

const ProductCard = (props: ProductCardProps) => {
	const { name, image, price, rating, count, favorite, onAddToCart, onAddToFav, onClick} = props
	return (
		<Card className="cursor-pointer hover:shadow-lg transition-all p-0" onClick={onClick}>
			<Image
				src={image}
				alt={name}
				width={400}
				height={300}
				className="rounded-t-xl object-cover w-full h-[200px]"
			/>
			<CardContent className="space-y-1 text-left py-4 p">
				<div className="flex items-center justify-between">
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
				{
					(count && count) &&
          <p className="text-sm text-gray-500">⭐{rating} ({count.toLocaleString()})</p>
				}
				<p className="font-bold text-md">฿{price.toLocaleString()}</p>

				<Button className="mt-2 w-full font-bold cursor-pointer" onClick={(e) => { e.stopPropagation(); onAddToCart?.() }}>
					Add to Cart
				</Button>
			</CardContent>
		</Card>
	)
}

export default ProductCard;
