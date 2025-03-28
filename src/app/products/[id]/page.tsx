import { Minus, Plus, ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RelatedProducts from "@/components/modules/product/related-products";
import { getProductById } from "@/lib/repositories/product.repository";
import { LoadingSpinnerLayout } from "@/components/common/loadingSpinner";
import SanityImage from "@/components/common/sanity-image.client";

export default async function ProductPage({ params }: { params: { id: string } }) {
  // Fetch product data
  const productData = await getProductById(params.id);

  // Handle loading state (optional, only for dynamic rendering)
  if (!params.id) {
    return (
      <div className="flex items-center justify-center h-full">
        <h1 className="text-2xl font-bold">Invalid product ID</h1>
      </div>
    );
  }

  // Handle case where product data is still being fetched
  if (!productData) {
    return (
      <div className="flex items-center justify-center h-full">
        <LoadingSpinnerLayout />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg">
          <SanityImage alt={productData.name} image={productData.image[0]} className="object-cover"/>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {productData?.image.map((image, index) => (
              <div
                key={index}
                className="relative aspect-square overflow-hidden rounded-lg border cursor-pointer"
              >
                <SanityImage
                  alt={productData.name} 
                  image={productData.image[0]}
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{productData?.name}</h1>
            <p className="text-2xl font-semibold mt-2">
              ৳{productData?.price.toLocaleString()}
            </p>
          </div>

          <p className="text-muted-foreground">{productData?.description}</p>

          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Color</h3>
              <div className="flex space-x-2">
                {productData?.color.map(colors => (
                  <Button
                    key={colors}
                    variant="outline"
                    className="rounded-full px-4"
                  >
                    {colors}
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
              <p>{productData?.description}</p>
              {/* <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium">Materials</h4>
                  <p className="text-muted-foreground">{productData.materials}</p>
                </div>
                <div>
                  <h4 className="font-medium">Dimensions</h4>
                  <p className="text-muted-foreground">{productData.dimensions}</p>
                </div>
              </div> */}
            </TabsContent>
            {/* <TabsContent value="care" className="pt-4">
              <p>{productData.care}</p>
            </TabsContent> */}
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