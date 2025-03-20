import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "../ui/card";
import { ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";

type TProduct = {
    id: number;
    name: string;
    category: string;
    price: number;
    image: string;
}
export default function ProductCard({product}: {product: TProduct}){
    return(
        <Card key={product.id} className="overflow-hidden">
        <Link href={`/products/${product.id}`}>
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={product.image || "https://picsum.photos/200/300"}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        </Link>
        <CardContent className="p-4">
          <div className="text-sm text-muted-foreground mb-1">
            {product.category}
          </div>
          <Link href={`/products/${product.id}`} className="hover:underline">
            <h3 className="font-medium">{product.name}</h3>
          </Link>
          <p className="mt-1 font-semibold">
            ৳{product.price.toLocaleString()}
          </p>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button className="w-full" size="sm">
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    )
}