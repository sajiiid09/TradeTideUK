"use server";
import { prisma } from "@/lib/prisma";
import { PaymentMethod } from "@prisma/client";

// Create a checkout
export async function createCheckout(data: {
  userId: string;
  products: string[];
  shippingAddress?: string;
  billingAddress?: string;
  shippingCharge: number;
  paymentMethod: PaymentMethod;
}) {
  try {
    if (!data.userId) {
      throw new Error("User ID is required.");
    }

    return await prisma.checkout.create({
      data: {
        userId: data.userId,
        products: data.products,
        shippingAddress: JSON.stringify(data.shippingAddress),
        billingAddress: JSON.stringify(data.billingAddress),
        shippingCharge: data.shippingCharge,
        paymentMethod: data.paymentMethod,
      },
    });
  } catch (err) {
    console.error("Error creating checkout:", err);
    throw err;
  }
}

// Get a checkout by ID
export async function getCheckoutById(id: string) {
  try {
    if (!id) {
      throw new Error("Checkout ID is required.");
    }

    return await prisma.checkout.findUnique({
      where: { id },
    });
  } catch (err) {
    console.error("Error fetching checkout:", err);
    throw err;
  }
}

// Delete a checkout
export async function deleteCheckout(id: string) {
  try {
    if (!id) {
      throw new Error("Checkout ID is required.");
    }

    return await prisma.checkout.delete({
      where: { id },
    });
  } catch (err) {
    console.error("Error deleting checkout:", err);
    throw err;
  }
}

// get all checkout data for admin with pagination
export async function getAllCheckouts(page: number, pageSize: number) {
  try {
    if (!page || !pageSize) {
      throw new Error("Page and pageSize are required.");
    }

    return await prisma.checkout.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (err) {
    console.error("Error fetching all checkouts:", err);
    throw err;
  }
}