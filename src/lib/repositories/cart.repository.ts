"use server";
import { prisma } from "@/lib/prisma";

// Create or update a cart for a user
export async function upsertCart(userId: string, productIds?: string[]) {
  try {
    if (!userId) {
      throw new Error("User ID is required.");
    }

    return await prisma.cart.upsert({
      where: { userId },
      update: {
        productId: productIds || [],
      },
      create: {
        userId,
        productId: productIds || [],
      },
    });
  } catch (err) {
    console.error("Error creating/updating cart:", err);
    throw err;
  }
}

// Add a product to the cart
export async function addProductToCart(userId: string, productId: string) {
  try {
    if (!userId || !productId) {
      throw new Error("User ID and Product ID are required.");
    }

    const cart = await prisma.cart.findUnique({
      where: { userId },
    });

    const updatedProductIds = cart?.productId
      ? [...cart.productId, productId]
      : [productId];

    return await prisma.cart.upsert({
      where: { userId },
      update: { productId: updatedProductIds },
      create: { userId, productId: updatedProductIds },
    });
  } catch (err) {
    console.error("Error adding product to cart:", err);
    throw err;
  }
}

// Remove a product from the cart
export async function removeProductFromCart(userId: string, productId: string) {
  try {
    if (!userId || !productId) {
      throw new Error("User ID and Product ID are required.");
    }

    const cart = await prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      throw new Error("Cart not found.");
    }

    const updatedProductIds = cart.productId.filter(id => id !== productId);

    return await prisma.cart.update({
      where: { userId },
      data: { productId: updatedProductIds },
    });
  } catch (err) {
    console.error("Error removing product from cart:", err);
    throw err;
  }
}

// Get a user's cart
export async function getCart(userId: string) {
  try {
    if (!userId) {
      throw new Error("User ID is required.");
    }

    return await prisma.cart.findUnique({
      where: { userId },
      select: {
        productId: true,
      },
    });
  } catch (err) {
    console.error("Error fetching cart:", err);
    throw err;
  }
}

// Clear a user's cart
export async function clearCart(userId: string) {
  try {
    if (!userId) {
      throw new Error("User ID is required.");
    }

    return await prisma.cart.update({
      where: { userId },
      data: { productId: [] },
    });
  } catch (err) {
    console.error("Error clearing cart:", err);
    throw err;
  }
}
