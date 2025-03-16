import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

// Mock data for products
const products = [
  {
    id: 1,
    name: "Jamdani Saree",
    price: 12500,
    image: "https://picsum.photos/200/300",
    category: "Clothing",
  },
  {
    id: 2,
    name: "Nakshi Kantha",
    price: 3500,
    image: "https://picsum.photos/200/300",
    category: "Home Decor",
  },
  {
    id: 3,
    name: "Terracotta Jewelry Set",
    price: 1800,
    image: "https://picsum.photos/200/300",
    category: "Accessories",
  },
  {
    id: 4,
    name: "Bamboo Basket",
    price: 950,
    image: "https://picsum.photos/200/300",
    category: "Home Decor",
  },
  {
    id: 5,
    name: "Muslin Scarf",
    price: 1200,
    image: "https://picsum.photos/200/300",
    category: "Accessories",
  },
  {
    id: 6,
    name: "Clay Tea Set",
    price: 2800,
    image: "https://picsum.photos/200/300",
    category: "Home Decor",
  },
  {
    id: 7,
    name: "Jute Handbag",
    price: 1500,
    image: "https://picsum.photos/200/300",
    category: "Accessories",
  },
  {
    id: 8,
    name: "Silk Panjabi",
    price: 4500,
    image: "https://picsum.photos/200/300",
    category: "Clothing",
  },
  {
    id: 9,
    name: "Wooden Jewelry Box",
    price: 2200,
    image: "https://picsum.photos/200/300",
    category: "Home Decor",
  },
];

export default function ProductList() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map(product => (
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
      ))}
    </div>
  );
}
