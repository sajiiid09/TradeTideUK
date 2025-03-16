import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function SiteFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="container px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <Link href="/" className="inline-block font-bold text-xl mb-4">
              Made In BD
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Celebrating the rich heritage and craftsmanship of Bangladesh
              through authentic handcrafted products.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="font-medium mb-4">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/products"
                  className="text-muted-foreground hover:text-foreground"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/clothing"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Clothing
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/home-decor"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Home Decor
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/accessories"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Accessories
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/gifts"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Gifts
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-foreground"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/artisans"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Our Artisans
                </Link>
              </li>
              <li>
                <Link
                  href="/sustainability"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Sustainability
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/shipping"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-muted-foreground hover:text-foreground"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-service"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t pt-6 text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} Made In BD. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
