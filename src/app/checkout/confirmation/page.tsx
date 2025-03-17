"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CheckCircle, Package, Truck, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ConfirmationPage() {
  const [orderNumber, setOrderNumber] = useState("");

  useEffect(() => {
    // Generate a random order number
    const randomOrderNumber = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();
    setOrderNumber(randomOrderNumber);
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
          <CheckCircle className="h-8 w-8" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
        <p className="text-muted-foreground mb-2">
          Thank you for your purchase. Your order has been received and is being
          processed.
        </p>
        <p className="text-lg font-medium">Order #{orderNumber}</p>
      </div>

      <Card className="mb-8">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">What&apos;s Next?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-muted rounded-full p-3 mb-4">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium mb-2">Order Processing</h3>
              <p className="text-sm text-muted-foreground">
                We&apos;re preparing your items for shipment. You&apos;ll
                receive an email once your order ships.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-muted rounded-full p-3 mb-4">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium mb-2">Shipping</h3>
              <p className="text-sm text-muted-foreground">
                Your order will be delivered within 3-5 business days. You can
                track your shipment from your account.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-muted rounded-full p-3 mb-4">
                <ShoppingBag className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium mb-2">Enjoy Your Purchase</h3>
              <p className="text-sm text-muted-foreground">
                We hope you love your handcrafted items. Don&apos;t forget to
                share your experience with us!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-center">
        <p className="text-muted-foreground mb-6">
          A confirmation email has been sent to your email address with all the
          details of your order.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="/products">Continue Shopping</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/account/orders">View My Orders</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
