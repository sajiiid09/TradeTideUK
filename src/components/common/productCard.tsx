"use client";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "../ui/card";
import { ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { getSanityImage } from "@/lib/getSanityImage";
import { toast } from "sonner";
import { useCartContext } from "../modules/cart/cart.context";

type TProduct = {
  id: string;
  name: string;
  price: number;
  image: string[];
  color: string[];
};
export default function ProductCard({ product }: { product: TProduct }) {
  const [mainImageUrl, setMainImageUrl] = useState<string>("");
  const { addItem } = useCartContext();
  useEffect(() => {
    async function main() {
      try {
        const res = await getSanityImage(product.image[0]);
        setMainImageUrl(res.data.imageUrl);
      } catch (err: unknown) {
        const errorMessage = err as { message: string };
        console.log(errorMessage);
      }
    }
    main();
  });
  const addProductToCart = (
    id: string,
    name: string,
    price: number,
    image: string,
    color: string[],
  ) => {
    const data = {
      id,
      name,
      price,
      image,
      quantity: 1,
      color,
    };
    addItem(data);
    console.log(data);
    toast.success(`Product added to cart`);
  };
  return (
    <Card key={product.id} className="overflow-hidden">
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={mainImageUrl ?? "https://picsum.photos/200/300"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      </Link>
      <CardContent className="p-4">
        <div className="text-sm text-muted-foreground mb-1">
          {/*product.catagories*/}
        </div>
        <Link href={`/products/${product.id}`} className="hover:underline">
          <h3 className="font-medium">{product.name}</h3>
        </Link>
        <p className="mt-1 font-semibold">৳{product.price.toLocaleString()}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full"
          size="sm"
          onClick={() =>
            addProductToCart(
              product.id,
              product.name,
              product.price,
              product.image[0],
              [product.color[0]],
            )
          }
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
