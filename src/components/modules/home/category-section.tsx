import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

// Mock data for categories
const categories = [
  {
    id: 1,
    name: "Clothing",
    image: "https://picsum.photos/200/300",
    count: 42,
  },
  {
    id: 2,
    name: "Home Decor",
    image: "https://picsum.photos/200/300",
    count: 36,
  },
  {
    id: 3,
    name: "Accessories",
    image: "https://picsum.photos/200/300",
    count: 28,
  },
  {
    id: 4,
    name: "Gifts",
    image: "https://picsum.photos/200/300",
    count: 19,
  },
];

export default function CategorySection() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {categories.map(category => (
        <Link
          key={category.id}
          href={`/categories/${category.name.toLowerCase().replace(" ", "-")}`}
        >
          <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={category.image || "https://picsum.photos/200/300"}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              <CardContent className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="font-medium text-lg">{category.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {category.count} products
                </p>
              </CardContent>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}
