"use client";

import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface OrderSummaryProps {
  cartItems: {
    id: number;
    name: string;
    price: number;
    image: string;
    quantity: number;
    color: string;
  }[];
  subtotal: number;
  shipping: number;
  total: number;
  shippingMethod: string;
}

export default function OrderSummary({
  cartItems,
  subtotal,
  shipping,
  total,
  shippingMethod,
}: OrderSummaryProps) {
  const [promoCode, setPromoCode] = useState("");
  const [isApplying, setIsApplying] = useState(false);

  const handleApplyPromo = () => {
    if (!promoCode.trim()) return;

    setIsApplying(true);

    // Simulate API call
    setTimeout(() => {
      setIsApplying(false);
      setPromoCode("");
      // Here you would normally apply the discount
    }, 1000);
  };

  return (
    <div className="bg-muted rounded-lg p-6 sticky top-20">
      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

      <div className="space-y-4 mb-6">
        {cartItems.map(item => (
          <div key={item.id} className="flex gap-4">
            <div className="relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-sm">{item.name}</h3>
              <p className="text-sm text-muted-foreground">
                Color: {item.color}
              </p>
              <div className="flex justify-between mt-1">
                <p className="text-sm">Qty: {item.quantity}</p>
                <p className="font-medium">
                  ৳{(item.price * item.quantity).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>৳{subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>
            {shipping === 0 ? "Free" : `৳${shipping.toLocaleString()}`}
            <span className="text-xs text-muted-foreground ml-1">
              ({shippingMethod === "standard" ? "Standard" : "Express"})
            </span>
          </span>
        </div>
      </div>

      <div className="mt-4 mb-6">
        <div className="flex gap-2">
          <Input
            placeholder="Promo code"
            value={promoCode}
            onChange={e => setPromoCode(e.target.value)}
            className="flex-1"
          />
          <Button
            variant="outline"
            onClick={handleApplyPromo}
            disabled={isApplying || !promoCode.trim()}
          >
            {isApplying ? "..." : "Apply"}
          </Button>
        </div>
      </div>

      <Separator className="my-4" />

      <div className="flex justify-between font-semibold">
        <span>Total</span>
        <span>৳{total.toLocaleString()}</span>
      </div>
    </div>
  );
}
