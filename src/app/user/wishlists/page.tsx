"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, ShoppingCart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

// Mock wishlist data
const mockWishlist = [
  {
    id: "wl1",
    name: "Silk Panjabi",
    price: 4500,
    image: "/placeholder.svg?height=200&width=200",
    category: "Clothing",
  },
  {
    id: "wl2",
    name: "Terracotta Jewelry Set",
    price: 1800,
    image: "/placeholder.svg?height=200&width=200",
    category: "Accessories",
  },
  {
    id: "wl3",
    name: "Nakshi Kantha",
    price: 3500,
    image: "/placeholder.svg?height=200&width=200",
    category: "Home Decor",
  },
  {
    id: "wl4",
    name: "Jute Handbag",
    price: 1500,
    image: "/placeholder.svg?height=200&width=200",
    category: "Accessories",
  },
  {
    id: "wl5",
    name: "Wooden Jewelry Box",
    price: 2200,
    image: "/placeholder.svg?height=200&width=200",
    category: "Home Decor",
  },
];

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<typeof mockWishlist>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Simulate API fetch
    const fetchWishlist = async () => {
      try {
        // In a real app, you would fetch from your API
        await new Promise(resolve => setTimeout(resolve, 1000));
        setWishlist(mockWishlist);
      } catch (error) {
        console.error("Failed to fetch wishlist:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  const handleRemoveItem = (id: string) => {
    setWishlist(prev => prev.filter(item => item.id !== id));

    toast.success("The item has been removed from your wishlist.");
  };

  const handleAddToCart = (id: string) => {
    // In a real app, you would add the item to the cart
    console.log(id);
    toast("The item has been added to your cart.");
  };

  const filteredWishlist = wishlist.filter(
    item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading your wishlist...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search wishlist..."
          className="pl-9"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
      </div>

      {filteredWishlist.length === 0 ? (
        <div className="text-center py-12 bg-muted rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Your Wishlist is Empty</h2>
          <p className="text-muted-foreground mb-6">
            {searchQuery
              ? "No items match your search criteria."
              : "You haven't added any items to your wishlist yet."}
          </p>
          <Button asChild>
            <Link href="/products">Explore Products</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredWishlist.map(item => (
            <Card key={item.id} className="overflow-hidden">
              <div className="relative aspect-square">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-4">
                <div className="text-sm text-muted-foreground mb-1">
                  {item.category}
                </div>
                <Link href={`/products/${item.id}`} className="hover:underline">
                  <h3 className="font-medium">{item.name}</h3>
                </Link>
                <p className="mt-1 font-semibold">
                  ৳{item.price.toLocaleString()}
                </p>
                <div className="flex gap-2 mt-4">
                  <Button
                    className="flex-1"
                    size="sm"
                    onClick={() => handleAddToCart(item.id)}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Remove</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
