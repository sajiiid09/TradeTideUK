import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Our Story</h1>
        <p className="text-xl text-muted-foreground">
          Celebrating the rich heritage and craftsmanship of Bangladesh
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-muted-foreground mb-4">
            At Made In BD, our mission is to preserve and promote the rich
            cultural heritage of Bangladesh through authentic handcrafted
            products. We believe in supporting local artisans and sustainable
            practices while bringing the beauty of Bangladeshi craftsmanship to
            the world.
          </p>
          <p className="text-muted-foreground mb-4">
            Each product in our collection tells a story of tradition, skill,
            and dedication passed down through generations. By choosing Made In
            BD, you&apos;re not just purchasing a product – you&apos;re becoming
            part of a movement to sustain traditional crafts and empower the
            artisans behind them.
          </p>
          <Button asChild className="mt-2">
            <Link href="/products">Explore Our Products</Link>
          </Button>
        </div>
        <div className="relative h-[400px] rounded-lg overflow-hidden">
          <Image
            src="https://picsum.photos/200/300"
            alt="Artisan crafting traditional product"
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
        <div className="order-2 md:order-1 relative h-[400px] rounded-lg overflow-hidden">
          <Image
            src="https://picsum.photos/200/300"
            alt="Sustainable materials"
            fill
            className="object-cover"
          />
        </div>
        <div className="order-1 md:order-2">
          <h2 className="text-2xl font-bold mb-4">Sustainability</h2>
          <p className="text-muted-foreground mb-4">
            Sustainability is at the heart of everything we do. We work directly
            with artisans to ensure fair wages and ethical working conditions.
            Our products are made using traditional techniques and natural,
            locally-sourced materials that minimize environmental impact.
          </p>
          <p className="text-muted-foreground mb-4">
            We&apos;re committed to preserving traditional crafts while adapting
            them for the modern world. By supporting sustainable practices,
            we&apos;re helping to ensure these crafts can continue to thrive for
            generations to come.
          </p>
          <Button variant="outline" asChild className="mt-2">
            <Link href="/sustainability">Learn More About Our Practices</Link>
          </Button>
        </div>
      </div>

      <div className="bg-muted rounded-lg p-8 mb-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-6">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">Authenticity</h3>
              <p className="text-muted-foreground">
                We celebrate genuine craftsmanship and cultural heritage in
                every product we offer.
              </p>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">Community</h3>
              <p className="text-muted-foreground">
                We support artisan communities by providing fair opportunities
                and sustainable livelihoods.
              </p>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">Quality</h3>
              <p className="text-muted-foreground">
                We ensure exceptional quality through careful curation and
                direct relationships with skilled artisans.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mb-16">
        <h2 className="text-2xl font-bold mb-6">Meet Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="text-center">
              <div className="relative h-64 w-64 mx-auto rounded-full overflow-hidden mb-4">
                <Image
                  src="https://picsum.photos/200/300"
                  alt={`Team member ${i}`}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-semibold text-lg">Team Member {i}</h3>
              <p className="text-muted-foreground">Position</p>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-bold mb-6">Join Our Journey</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
          We&apos;re on a mission to bring the beauty of Bangladeshi
          craftsmanship to the world while supporting the artisans who make it
          possible. Join us in celebrating and preserving these traditions.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="/products">Shop Our Collection</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
