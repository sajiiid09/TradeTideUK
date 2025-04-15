"use client";
import React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { getManyProducts } from "@/lib/repositories/product.repository";
import type { IWishlist } from "@/types/user.types";
import { TProducts } from "@/types/product.types";
import SanityImage from "@/components/common/sanity-image.client";

const WishListsTab = ({ wishlist }: { wishlist: IWishlist }) => {
  const [productData, setProductData] = React.useState<TProducts[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function fetchProductData() {
      try {
        // Fetch products using the wishlist's productId array
        const response = await getManyProducts(wishlist.productId);

        // Check if the response contains valid data
        if (response) {
          setProductData(response); // Set the fetched product data
        } else {
          setError("No products found for the given wishlist.");
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to fetch products. Please try again later.");
      } finally {
        setIsLoading(false); // Mark loading as complete
      }
    }

    fetchProductData();
  }, [wishlist.productId]);

  if (isLoading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-4">
      {productData.length === 0 ? (
        <div className="text-center py-4">
          No products found in your wishlist.
        </div>
      ) : (
        productData.map(item => (
          <Card key={item.id}>
            <CardContent className="p-4">
              <div className="flex gap-4">
                <div className="relative w-16 h-16 flex-shrink-0">
                  <SanityImage
                    image={item.image[0]}
                    alt={item.name}
                    className="object-cover rounded-md"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm font-semibold mt-1">
                    ৳{item.price.toLocaleString()}
                  </p>
                  <div className="flex gap-2 mt-2">
                    <Button size="sm" variant="outline" className="h-8 text-xs">
                      Add to Cart
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 text-xs text-destructive"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default WishListsTab;
/*

              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm font-semibold mt-1">
                        ৳{item.price.toLocaleString()}
                      </p>
                      <div className="flex gap-2 mt-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 text-xs"
                        >
                          Add to Cart
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 text-xs text-destructive"
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              */
