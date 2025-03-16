import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import FeaturedProducts from "@/components/featured-products";
import HeroSection from "@/components/hero-section";
import CategorySection from "@/components/category-section";
import Newsletter from "@/components/newsletter";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">
          Featured Categories
        </h2>
        <CategorySection />
      </div>
      <div className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Featured Products
          </h2>
          <FeaturedProducts />
        </div>
      </div>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Handcrafted with Pride</h2>
          <p className="text-muted-foreground mb-6">
            At Made In BD, we celebrate the rich heritage and craftsmanship of
            Bangladesh. Each product tells a story of tradition, skill, and
            dedication passed down through generations.
          </p>
          <Button asChild size="lg">
            <Link href="/products">
              Shop All Products
              <ShoppingBag className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
      <Newsletter />
    </main>
  );
}
