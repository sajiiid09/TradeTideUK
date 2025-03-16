"use client";

import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface ReviewOrderProps {
  shippingData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  paymentData: {
    cardName: string;
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    saveCard: boolean;
  };
  paymentMethod: string;
  shippingMethod: string;
  onBack: () => void;
  onPlaceOrder: () => void;
  isProcessing: boolean;
}

export default function ReviewOrder({
  shippingData,
  paymentData,
  paymentMethod,
  shippingMethod,
  onBack,
  onPlaceOrder,
  isProcessing,
}: ReviewOrderProps) {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Review Your Order</h2>
        <p className="text-muted-foreground">
          Please review your order details before placing your order
        </p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium mb-2">Shipping Information</h3>
                <p className="text-sm">
                  {shippingData.firstName} {shippingData.lastName}
                </p>
                <p className="text-sm">{shippingData.address}</p>
                <p className="text-sm">
                  {shippingData.city}, {shippingData.state}{" "}
                  {shippingData.postalCode}
                </p>
                <p className="text-sm">{shippingData.country}</p>
                <p className="text-sm mt-2">{shippingData.email}</p>
                <p className="text-sm">{shippingData.phone}</p>
              </div>
              <Button variant="outline" size="sm" onClick={onBack}>
                Edit
              </Button>
            </div>
            <Separator className="my-4" />
            <div>
              <h3 className="font-medium mb-2">Shipping Method</h3>
              <p className="text-sm">
                {shippingMethod === "standard"
                  ? "Standard Shipping (3-5 business days)"
                  : "Express Shipping (1-2 business days)"}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium mb-2">Payment Method</h3>
                {paymentMethod === "credit" && (
                  <div>
                    <p className="text-sm">Credit/Debit Card</p>
                    <p className="text-sm">
                      {paymentData.cardName} ••••{" "}
                      {paymentData.cardNumber.slice(-4)}
                    </p>
                  </div>
                )}
                {paymentMethod === "cash" && (
                  <p className="text-sm">Cash on Delivery</p>
                )}
                {paymentMethod === "bkash" && <p className="text-sm">bKash</p>}
              </div>
              <Button variant="outline" size="sm" onClick={onBack}>
                Edit
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="pt-4 space-y-4">
          <p className="text-sm text-muted-foreground">
            By placing your order, you agree to Made In BD&apos;s{" "}
            <a
              href="/terms-of-service"
              className="text-primary hover:underline"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy-policy" className="text-primary hover:underline">
              Privacy Policy
            </a>
            .
          </p>

          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <Button type="button" variant="outline" onClick={onBack}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Payment
            </Button>
            <Button
              onClick={onPlaceOrder}
              disabled={isProcessing}
              className="sm:min-w-[200px]"
            >
              {isProcessing ? "Processing..." : "Place Order"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
