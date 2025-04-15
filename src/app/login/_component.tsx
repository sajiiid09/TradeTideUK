"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";
import { GoogleIcon } from "@/components/common/icons";
import { useRouter } from "next/navigation";
import { PRODUCTS_ROUTE } from "@/components/common/routes";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  useEffect(() => {
    if (session) {
      router.push(PRODUCTS_ROUTE);
    }
  });
  const toggleLogin = () => {
    setIsLoading(true);
    signIn("google");
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Sign in</h1>
          <p className="text-muted-foreground mt-2">
            Welcome back to Made In BD
          </p>
        </div>

        <div className="space-y-6">
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2 h-12"
            onClick={toggleLogin}
            disabled={isLoading}
          >
            <GoogleIcon />
            Sign in with Google
          </Button>
        </div>
      </div>
    </div>
  );
}
