"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/modules/cart/cart.hooks";
import { LoadingSpinner } from "@/components/common/loadingSpinner";
import { useSession } from "next-auth/react";
import { createCart } from "@/lib/repositories/cart.repository";
import { useCartContext } from "@/components/modules/cart/cart.context";
import { toast } from "sonner";

const CartItems = dynamic(
  () => import("@/components/modules/cart/cartItem").then(mod => mod.CartItems),
  {
    ssr: false,
    loading: () => <LoadingSpinner />,
  },
);
const OrderSummary = dynamic(
  () =>
    import("@/components/modules/cart/orderSummary").then(
      mod => mod.OrderSummary,
    ),
  {
    ssr: false,
    loading: () => <LoadingSpinner />,
  },
);
const CartEmpty = dynamic(
  () =>
    import("@/components/modules/cart/cartEmpty").then(mod => mod.CartEmpty),
  {
    ssr: false,
    loading: () => <LoadingSpinner />,
  },
);

export default function CartPage() {
  const {
    cartItems,
    clearCart,
    updateQuantity,
    removeItem,
    subtotal,
    shipping,
    total,
  } = useCart();
  const { items } = useCartContext();
  const { data: session } = useSession();
  const saveCart = async () => {
    console.log(
      session?.user?.id ?? "",
      items.map(item =>
        JSON.stringify({
          productId: item.id,
          quantity: item.quantity,
        }),
      ),
    );
    const response = await createCart(
      session?.user?.email ?? "",
      items.map(item =>
        JSON.stringify({
          productId: item.id,
          quantity: item.quantity,
        }),
      ),
    );
    if (response.message.includes("profile")) {
      toast(() => (
        <>
          {response.message}&nbsp;
          <a
            href="user/onboard"
            target="_blank"
            className="underline underline-offset-1 text-blue-500"
          >
            Click here
          </a>
        </>
      ));
    } else {
      toast.success(response.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <CartEmpty />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cartItems.map(item => (
                <CartItems
                  item={item}
                  key={item.id}
                  updateQuantity={updateQuantity}
                  removeItem={removeItem}
                />
              ))}
            </div>

            <div className="mt-8 flex justify-between">
              <Button variant="outline" asChild>
                <Link href="/products">Continue Shopping</Link>
              </Button>
              <div className="flex flex-row gap-2">
                <Button onClick={() => saveCart()}>Save Cart</Button>
                <Button onClick={() => clearCart()}>Clear Cart</Button>
              </div>
            </div>
          </div>

          <div>
            <OrderSummary
              subtotal={subtotal}
              shipping={shipping}
              total={total}
            />
          </div>
        </div>
      )}
    </div>
  );
}
