"use client";

import { useState } from "react";
import Dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  CreditCard,
  MapPin,
  Package,
  Check,
  CircleAlert,
} from "lucide-react";

import { toast } from "sonner";
import { LoadingSpinner } from "@/components/common/loadingSpinner";

// fallback is loading spinner
const ShippingForm = Dynamic(
  () => import("@/components/modules/checkout/shipping-form"),
  {
    ssr: false,
    loading: () => <LoadingSpinner />,
  },
);
const PaymentForm = Dynamic(
  () => import("@/components/modules/checkout/payment-form"),
  {
    ssr: false,
    loading: () => <LoadingSpinner />,
  },
);
const ReviewOrder = Dynamic(
  () => import("@/components/modules/checkout/review-order"),
  {
    ssr: false,
    loading: () => <LoadingSpinner />,
  },
);
const OrderSummary = Dynamic(
  () => import("@/components/modules/checkout/order-summary"),
  {
    ssr: false,
    loading: () => <LoadingSpinner />,
  },
);

// Mock cart data
const cartItems = [
  {
    id: 1,
    name: "Jamdani Saree",
    price: 12500,
    image: "/placeholder.svg?height=200&width=200",
    quantity: 1,
    color: "Blue",
  },
  {
    id: 7,
    name: "Jute Handbag",
    price: 1500,
    image: "/placeholder.svg?height=200&width=200",
    quantity: 2,
    color: "Natural",
  },
];

type CheckoutStep = "shipping" | "payment" | "review";

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("shipping");
  const [isProcessing, setIsProcessing] = useState(false);
  const [shippingData, setShippingData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "Bangladesh",
  });
  const [paymentData, setPaymentData] = useState({
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    saveCard: false,
  });
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("credit");

  const router = useRouter();

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const shipping =
    shippingMethod === "express" ? 350 : subtotal > 5000 ? 0 : 150;
  const total = subtotal + shipping;

  const handleShippingSubmit = (data: typeof shippingData) => {
    setShippingData(data);
    setCurrentStep("payment");
    window.scrollTo(0, 0);
  };

  const handlePaymentSubmit = (data: typeof paymentData, method: string) => {
    setPaymentData(data);
    setPaymentMethod(method);
    setCurrentStep("review");
    window.scrollTo(0, 0);
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);

    // Simulate order processing
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast("Order placed successfully!", {
        className: "my-classname",
        description: "Thank you for shopping with Made In BD.",
        duration: 5000,
        icon: <Check />,
      });

      router.push("/checkout/confirmation");
    } catch (error) {
      console.error(error);
      toast("Error placing order", {
        className: "my-classname",
        description:
          "There was a problem processing your order. Please try again.",
        duration: 5000,
        icon: <CircleAlert />,
      });
      setIsProcessing(false);
    }
  };

  const steps = [
    { id: "shipping", label: "Shipping", icon: MapPin },
    { id: "payment", label: "Payment", icon: CreditCard },
    { id: "review", label: "Review", icon: Package },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link
          href="/cart"
          className="flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to cart
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold">Checkout</h1>
        <div className="mt-4 flex items-center justify-between max-w-3xl">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-1 items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                  currentStep === step.id
                    ? "border-primary bg-primary text-primary-foreground"
                    : currentStep === steps[index + 1]?.id ||
                        currentStep === steps[index + 2]?.id
                      ? "border-primary bg-primary/20 text-primary"
                      : "border-muted-foreground/30 text-muted-foreground"
                }`}
              >
                {currentStep === steps[index + 1]?.id ||
                currentStep === steps[index + 2]?.id ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <step.icon className="h-5 w-5" />
                )}
              </div>
              <div
                className={`hidden flex-1 border-t-2 ${
                  index < steps.length - 1
                    ? currentStep === steps[index + 1]?.id ||
                      currentStep === steps[index + 2]?.id
                      ? "border-primary"
                      : "border-muted-foreground/30"
                    : "border-transparent"
                } sm:block`}
              />
              <div className="ml-2 text-sm font-medium sm:ml-4">
                {step.label}
              </div>
              {index < steps.length - 1 && (
                <div className="flex-1 border-t-2 border-muted-foreground/30 sm:hidden" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {currentStep === "shipping" && (
            <ShippingForm
              initialData={shippingData}
              onSubmit={handleShippingSubmit}
              shippingMethod={shippingMethod}
              onShippingMethodChange={setShippingMethod}
            />
          )}

          {currentStep === "payment" && (
            <PaymentForm
              initialData={paymentData}
              onSubmit={handlePaymentSubmit}
              onBack={() => setCurrentStep("shipping")}
            />
          )}

          {currentStep === "review" && (
            <ReviewOrder
              shippingData={shippingData}
              paymentData={paymentData}
              paymentMethod={paymentMethod}
              shippingMethod={shippingMethod}
              onBack={() => setCurrentStep("payment")}
              onPlaceOrder={handlePlaceOrder}
              isProcessing={isProcessing}
            />
          )}
        </div>

        <div>
          <OrderSummary
            cartItems={cartItems}
            subtotal={subtotal}
            shipping={shipping}
            total={total}
            shippingMethod={shippingMethod}
          />
        </div>
      </div>
    </div>
  );
}
