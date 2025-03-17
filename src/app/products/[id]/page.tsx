import Image from "next/image";
import { Minus, Plus, ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RelatedProducts from "@/components/modules/product/related-products";

// Mock product data
const product = {
  id: 1,
  name: "Jamdani Saree",
  price: 12500,
  description:
    "Handwoven Jamdani saree with intricate traditional motifs. Made from the finest cotton by skilled artisans in Dhaka, Bangladesh. Each piece is unique and represents centuries of heritage and craftsmanship.",
  images: [
    "https://picsum.photos/200/300",
    "https://picsum.photos/200/300",
    "https://picsum.photos/200/300",
  ],
  colors: ["Red", "Blue", "Green"],
  details:
    "Jamdani is a fine muslin textile produced for centuries in South Asia, particularly in Bangladesh. It is one of the most time and labor-intensive forms of handloom weaving, and the finished product is known for its elaborate designs and durability.",
  care: "Dry clean only. Handle with care. Store folded in a cool, dry place.",
  materials: "100% Cotton",
  dimensions: "5.5 meters x 1.25 meters",
};

export default function ProductPage({ params }: { params: { id: string } }) {
  console.log(params.id);
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg">
            <Image
              src={product.images[0] || "https://picsum.photos/200/300"}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {product.images.map((image, index) => (
              <div
                key={index}
                className="relative aspect-square overflow-hidden rounded-lg border cursor-pointer"
              >
                <Image
                  src={image || "https://picsum.photos/200/300"}
                  alt={`${product.name} ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-2xl font-semibold mt-2">
              ৳{product.price.toLocaleString()}
            </p>
          </div>

          <p className="text-muted-foreground">{product.description}</p>

          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Color</h3>
              <div className="flex space-x-2">
                {product.colors.map(color => (
                  <Button
                    key={color}
                    variant="outline"
                    className="rounded-full px-4"
                  >
                    {color}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Quantity</h3>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="icon">
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center">1</span>
                <Button variant="outline" size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="flex-1">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
            <Button variant="outline" size="lg">
              <Heart className="mr-2 h-5 w-5" />
              Add to Wishlist
            </Button>
          </div>

          <Tabs defaultValue="details">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="care">Care</TabsTrigger>
              <TabsTrigger value="shipping">Shipping</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="space-y-4 pt-4">
              <p>{product.details}</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium">Materials</h4>
                  <p className="text-muted-foreground">{product.materials}</p>
                </div>
                <div>
                  <h4 className="font-medium">Dimensions</h4>
                  <p className="text-muted-foreground">{product.dimensions}</p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="care" className="pt-4">
              <p>{product.care}</p>
            </TabsContent>
            <TabsContent value="shipping" className="pt-4">
              <p>Free shipping on all domestic orders over ৳5,000.</p>
              <p>International shipping available at checkout.</p>
              <p>
                Delivery typically takes 3-5 business days for domestic orders.
              </p>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
        <RelatedProducts />
      </div>
    </div>
  );
}
