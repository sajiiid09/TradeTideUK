"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { GoogleIcon } from "@/components/common/icons";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const toggleLogin = () => {
    setIsLoading(true);
    signIn("google", { redirectTo: "/" });
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
