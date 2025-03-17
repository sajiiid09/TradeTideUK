import Link from "next/link";
import { Button } from "@/components/ui/button";
import PlaceholderSvg from "@/assets/placeholder.svg";
export default function HeroSection() {
  return (
    <div className="relative bg-muted overflow-hidden">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/50"
          style={{
            backgroundImage: PlaceholderSvg,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </div>
      <div className="relative container mx-auto px-4 py-24 sm:py-32 lg:py-40">
        <div className="max-w-lg">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            <span className="block">Authentic</span>
            <span className="block text-primary">Made In Bangladesh</span>
          </h1>
          <p className="mt-6 text-xl text-muted-foreground">
            Discover handcrafted treasures that celebrate the rich heritage and
            artisanal skills of Bangladesh.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg">
              <Link href="/products">Shop Now</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/about">Our Story</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
