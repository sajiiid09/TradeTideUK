"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/modules/cart/cart.hooks";
import { LoadingSpinner } from "@/components/common/loadingSpinner";

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
    setCartItems,
    updateQuantity,
    removeItem,
    subtotal,
    shipping,
    total,
  } = useCart();

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
              <Button onClick={() => setCartItems([])}>Clear Cart</Button>
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
