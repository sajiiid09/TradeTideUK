"use client";

import { useEffect, useRef } from "react";
import { useCartContext } from "./cart.context";
import { useSession } from "next-auth/react";

// This component is used to initialize the cart on the client side
export function CartInitializer() {
  // Access the store to initialize it
  const initialized = useRef(false);
  const { clearCart } = useCartContext();
  const { data: session } = useSession();

  useEffect(() => {
    if (!initialized.current) {
      useCartContext.getState();
      if (session) {
        if (useCartContext.getState().user !== session.user?.id) {
          console.log(useCartContext.getState().user, session.user?.id);
          // clearCart();
        } else {
          useCartContext.getState();
        }
      } else {
        console.log(session);
        console.log("else triggered!");
        // clearCart();
      }
      initialized.current = true;
    }
  }, [clearCart, session, session?.user]);

  return null;
}
