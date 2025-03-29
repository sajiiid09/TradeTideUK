"use server";
import { prisma } from "@/lib/prisma";
import { OrderStatus, PaymentMethod } from "@prisma/client";

// Create an order
export async function createOrder(data: {
  userId: string;
  products: string[];
  shippingAddress?: string;
  billingAddress?: string;
  shippingCharge: number;
  orderStatus: OrderStatus;
  paymentMethod: PaymentMethod;
}) {
  try {
    if (!data.userId) {
      throw new Error("User ID is required.");
    }

    return await prisma.order.create({
      data: {
        userId: data.userId,
        products: data.products,
        shippingAddress: JSON.stringify(data.shippingAddress),
        billingAddress: JSON.stringify(data.billingAddress),
        shippingCharge: data.shippingCharge,
        orderStatus: data.orderStatus,
        paymentMethod: data.paymentMethod,
      },
    });
  } catch (err) {
    console.error("Error creating order:", err);
    throw err;
  }
}

// Get an order by ID
export async function getOrderById(id: string) {
  try {
    if (!id) {
      throw new Error("Order ID is required.");
    }

    return await prisma.order.findUnique({
      where: { id },
    });
  } catch (err) {
    console.error("Error fetching order:", err);
    throw err;
  }
}

// Update an order's status
export async function updateOrderStatus(id: string, orderStatus: OrderStatus) {
  try {
    if (!id) {
      throw new Error("Order ID is required.");
    }

    return await prisma.order.update({
      where: { id },
      data: { orderStatus },
    });
  } catch (err) {
    console.error("Error updating order status:", err);
    throw err;
  }
}

// Delete an order
export async function deleteOrder(id: string) {
  try {
    if (!id) {
      throw new Error("Order ID is required.");
    }

    return await prisma.order.delete({
      where: { id },
    });
  } catch (err) {
    console.error("Error deleting order:", err);
    throw err;
  }
}
