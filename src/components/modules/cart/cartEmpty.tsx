import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CartEmpty = ()=> (
    <div className="text-center py-12">
    <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
    <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
    <p className="text-muted-foreground mb-6">
      Looks like you haven&apos;t added anything to your cart yet.
    </p>
    <Button asChild>
      <Link href="/products">Continue Shopping</Link>
    </Button>
  </div>
)