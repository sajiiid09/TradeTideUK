import type { ReactNode } from "react";
import Link from "next/link";
import { User, Settings, ShoppingBag, Heart, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface UserLayoutProps {
  children: ReactNode;
}

export default function UserLayout({ children }: UserLayoutProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold mb-4">My Account</h2>
            <nav className="space-y-1">
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/user/me" className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/user/settings" className="flex items-center">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Link>
              </Button>
              <Separator className="my-2" />
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/user/orders" className="flex items-center">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Orders
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/user/wishlists" className="flex items-center">
                  <Heart className="mr-2 h-4 w-4" />
                  Wishlist
                </Link>
              </Button>
              <Separator className="my-2" />
              <Button
                variant="ghost"
                className="w-full justify-start text-destructive hover:text-destructive"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </nav>
          </div>
        </div>
        <div className="md:col-span-3">{children}</div>
      </div>
    </div>
  );
}
