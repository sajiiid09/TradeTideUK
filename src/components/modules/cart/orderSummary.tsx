"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface IOrderSummary {
  subtotal: number;
  shipping: number;
  total: number;
}

export const OrderSummary = ({ subtotal, shipping, total }: IOrderSummary) => {
  const currency = `৳`;
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span>
              {currency}
              {subtotal.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Shipping</span>
            <span>{shipping === 0 ? "Free" : `${currency}${shipping}`}</span>
          </div>
          <Separator />
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>
              {currency}
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
        <Button className="w-full" size="lg" asChild>
          <Link href="/checkout">Proceed to Checkout</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
