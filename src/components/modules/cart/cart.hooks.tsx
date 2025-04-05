"use client";
import { useCartContext } from "./cart.context";

export const useCart = () => {
  // Extract cart state and actions from Zustand context
  const { items, addItem, removeItem, updateItem, clearCart } =
    useCartContext();

  // Function to update the quantity of an item
  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return; // Prevent setting quantity below 1
    updateItem(id, newQuantity);
  };

  // Calculate subtotal, shipping, and total
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const shipping = subtotal > 5000 ? 0 : 150;
  const total = subtotal + shipping;

  // Return all necessary values and functions
  return {
    cartItems: items, // Use items directly from Zustand context
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    subtotal,
    shipping,
    total,
  };
};
