"use client";

import Link from "next/link";
import { Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { SearchModal } from "./searchModal";
import { useCartContext } from "../modules/cart/cart.context";
import { useRoutes } from "./routes";
import { CartButton } from "./cart-button";
import { AuthButton } from "./auth-button";

export default function SiteHeader() {
  const { items } = useCartContext();
  const { routes } = useRoutes();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    setCartCount(items.length);
  }, [items, items.length]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <div className="px-7">
              <Link href="/" className="flex items-center" onClick={() => {}}>
                <span className="font-bold text-xl">Made In BD</span>
              </Link>
            </div>
            <nav className="flex flex-col gap-4 px-7 mt-8">
              {routes.map(route => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "text-base transition-colors hover:text-foreground/80",
                    route.active
                      ? "text-foreground font-medium"
                      : "text-foreground/60",
                  )}
                >
                  {route.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="hidden font-bold text-xl sm:inline-block">
            Made In BD
          </span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {routes.map(route => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "transition-colors hover:text-foreground/80",
                route.active
                  ? "text-foreground font-medium"
                  : "text-foreground/60",
              )}
            >
              {route.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center space-x-4 ml-auto">
          <div className="hidden md:flex relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <SearchModal>
              <Input
                type="search"
                placeholder="Search products..."
                value=""
                onChange={() => {}}
                className="w-[200px] lg:w-[300px] pl-8 text-transparent"
              />
            </SearchModal>
          </div>

          <div className="md:hidden relative">
            <SearchModal>
              <Button variant="ghost" size="icon" className="relative" asChild>
                <Search className=" h-5 w-5 text-muted-foreground" />
              </Button>
            </SearchModal>
          </div>

          <CartButton cartCount={cartCount} />
          <AuthButton />
        </div>
      </div>
    </header>
  );
}
