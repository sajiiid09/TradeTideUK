"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CURRENCY } from "@/constants/app.constant";
import { useLocalStorage } from "@/lib/useLocalStorage";

interface IOrderSummary {
  subtotal: number;
  shipping: number;
  total: number;
}

export const OrderSummary = ({ subtotal, shipping, total }: IOrderSummary) => {
  const { data: session } = useSession();
  const { getLocalStorage } = useLocalStorage();
  const router = useRouter();
  const redirectTo = (): void => {
    if (getLocalStorage("profile") && session?.user?.id) {
      router.push("/checkout");
    } else if (!session?.user) {
      toast.warning("Please login to proceed");
      router.push("/login");
    } else {
      toast.warning("Please create your profile to proceed");
      router.push("/user/onboard");
    }
  };
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span>
              {CURRENCY}
              {subtotal.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Shipping</span>
            <span>{shipping === 0 ? "Free" : `${CURRENCY}${shipping}`}</span>
          </div>
          <Separator />
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>
              {CURRENCY}
              {total.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div>
            <h3 className="font-medium mb-2">Promo Code</h3>
            <div className="flex gap-2">
              <Input placeholder="Enter code" className="flex-1" />
              <Button variant="outline">Apply</Button>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button className="w-full" size="lg" onClick={redirectTo}>
          Proceed to Checkout
        </Button>
      </CardFooter>
    </Card>
  );
};
