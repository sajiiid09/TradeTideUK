"use client";
import { useState } from "react";

// Mock cart data
const initialCartItems = [
    {
      id: 1,
      name: "Jamdani Saree",
      price: 12500,
      image: "https://picsum.photos/200/300",
      quantity: 1,
      color: "Blue",
    },
    {
      id: 7,
      name: "Jute Handbag",
      price: 1500,
      image: "https://picsum.photos/200/300",
      quantity: 2,
      color: "Natural",
    },
  ];

export const useCart = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const updateQuantity = (id: number, newQuantity: number) => {
  if (newQuantity < 1) return;

  setCartItems(
      cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item,
      ),
  );
  };

  const removeItem = (id: number) => {
  setCartItems(cartItems.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce(
  (total, item) => total + item.price * item.quantity,
  0,
  );
  const shipping = subtotal > 5000 ? 0 : 150;
  const total = subtotal + shipping;

  return {
  cartItems,
  setCartItems,
  updateQuantity,
  removeItem,
  subtotal,
  shipping,
  total,
  }
}