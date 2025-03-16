import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

// Mock data for related products
const relatedProducts = [
  {
    id: 2,
    name: "Nakshi Kantha",
    price: 3500,
    image: "https://picsum.photos/400/400",
    category: "Home Decor",
  },
  {
    id: 5,
    name: "Muslin Scarf",
    price: 1200,
    image: "https://picsum.photos/400/400",
    category: "Accessories",
  },
  {
    id: 8,
    name: "Silk Panjabi",
    price: 4500,
    image: "https://picsum.photos/400/400",
    category: "Clothing",
  },
  {
    id: 9,
    name: "Wooden Jewelry Box",
    price: 2200,
    image: "https://picsum.photos/400/400",
    category: "Home Decor",
  },
];

export default function RelatedProducts() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {relatedProducts.map(product => (
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
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground mb-1">
                {product.category}
              </div>
              <h3 className="font-medium">{product.name}</h3>
              <p className="mt-1 font-semibold">
                ৳{product.price.toLocaleString()}
              </p>
            </CardContent>
          </Link>
        </Card>
      ))}
    </div>
  );
}
