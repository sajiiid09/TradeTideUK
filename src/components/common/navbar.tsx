"use client";

import Link from "next/link";
import { BookOpen, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signIn, signOut, useSession } from "next-auth/react";
import { APP_NAME } from "@/constants/app.constant";

export default function Navbar() {
  const { data: session } = useSession();
  const toggleLogin = () => {
    signIn("google", { redirectTo: "/" });
  };
  const toggleLogout = () => {
    signOut();
  };

  return (
    <nav className="top-0 right-0 left-0 z-10 fixed bg-black/50 backdrop-blur-md w-full">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <BookOpen className="mr-2 w-8 h-8 text-white" />
              <span className="font-bold text-white text-xl">{APP_NAME}</span>
            </Link>
          </div>
          <div className="flex items-center">
            {session?.user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative rounded-full w-8 h-8"
                  >
                    <Avatar className="w-8 h-8">
                      <AvatarImage
                        src={session?.user?.image ?? "/placeholder-avatar.jpg"}
                        alt="User"
                      />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuItem className="flex flex-col gap-1 font-semibold text-left">
                    <p>Hello {session?.user?.name}</p>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link
                      href="/my-books"
                      className="flex flex-row justify-between gap-2"
                    >
                      <BookOpen className="mr-2 w-4 h-4" />
                      <span>My Books</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={toggleLogout}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="ghost" size="icon" onClick={toggleLogin}>
                <User className="w-5 h-5 text-white" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
