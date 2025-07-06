import {Button} from "@/components/ui/button";
import {ReactNode} from "react";
import {useRouter} from "next/router";
import {Toaster} from "@/components/ui/sonner";
import {Heart, ShoppingCart} from "lucide-react";

const Layout = ({ children }: { children: ReactNode }) => {
	const router = useRouter();
	return (
		<div className="p-6">
			<div className="flex items-center justify-between pb-6">
				<h3 className="scroll-m-20 text-2xl font-semibold tracking-tight cursor-pointer" onClick={() => router.push("/")}>
					Shopping Online
				</h3>
				<div className="flex gap-4">
					<Button className="font-bold cursor-pointer" onClick={() => router.push("/favorites")}>
						<Heart />
					</Button>
					<Button className="font-bold cursor-pointer" onClick={() => router.push("/carts")}>
						<ShoppingCart />
					</Button>
				</div>
			</div>
			{children}
			<Toaster position="top-right" richColors visibleToasts={1} />
		</div>
	)
}

export default Layout;
