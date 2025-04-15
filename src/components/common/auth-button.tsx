"use client";

import Link from "next/link";
import { UserRoundPen, ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut, useSession } from "next-auth/react";
import { useCartContext } from "../modules/cart/cart.context";
import { createCart } from "@/lib/repositories/cart.repository";
import { useRouter } from "next/navigation";

export function AuthButton() {
  const route = useRouter();
  const { data: session } = useSession();
  const { items } = useCartContext();
  const toggleLogin = () => {
    route.push("/login");
  };

  const toggleLogout = async () => {
    signOut();
    await createCart(
      session?.user?.id ?? "",
      items.map(item =>
        JSON.stringify({
          productId: item.id,
          quantity: item.quantity,
        }),
      ),
    );
  };

  const fallbackUserName = session?.user?.name?.split(" ") ?? ["J", "D"];

  const profileOptions = [
    {
      label: "My Profile",
      href: "/user/me",
      icon: UserRoundPen,
    },
    {
      label: "My Cart",
      href: "/cart",
      icon: ShoppingCart,
    },
  ];

  if (!session) {
    return (
      <Button variant="ghost" size="icon" onClick={toggleLogin}>
        <User className="h-5 w-5" />
        <span className="sr-only">Account</span>
      </Button>
    );
  }

  return (
    <div className="flex items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative rounded-full w-8 h-8">
            <Avatar className="w-8 h-8">
              <AvatarImage
                src={session?.user?.image ?? "/placeholder-avatar.jpg"}
                alt="User"
              />
              <AvatarFallback>
                {fallbackUserName[0]?.[0] || ""}
                {fallbackUserName[1]?.[0] || ""}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuItem className="flex flex-col gap-1 font-semibold text-left">
            <p>Hello {session?.user?.name}</p>
          </DropdownMenuItem>
          {profileOptions.map((elements, index) => (
            <DropdownMenuItem key={index}>
              <Link
                href={elements.href ?? "/"}
                className="flex flex-row justify-between gap-2"
              >
                <elements.icon className="mr-2 w-4 h-4" />
                <span>{elements.label}</span>
              </Link>
            </DropdownMenuItem>
          ))}

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={toggleLogout}>
            <div className="flex gap-4 hover:text-red-600 duration-300">
              <UserRoundPen />
              Log out
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
