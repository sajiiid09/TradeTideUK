"use server";
import { prisma } from "@/lib/prisma";

export async function createWishlist(userId: string, productId: string) {
  return await prisma.wishlist.create({
    data: {
      userId,
      productId: [productId],
    },
  });
}
export async function addProductToWishlist(userId: string, productId: string) {
  try {
    if (!userId || !productId) {
      throw new Error("User ID and Product ID are required.");
    }

    const wishlist = await prisma.wishlist.findUnique({
      where: { userId },
    });

    const updatedProductIds = wishlist?.productId
      ? [...wishlist.productId, productId]
      : [productId];

    return await prisma.wishlist.upsert({
      where: { userId },
      update: { productId: updatedProductIds },
      create: { userId, productId: updatedProductIds },
    });
  } catch (err) {
    console.error("Error adding product to wishlist:", err);
    throw err;
  }
}

// Remove a product from the wishlist
export async function removeProductFromWishlist(
  userId: string,
  productId: string,
) {
  try {
    if (!userId || !productId) {
      throw new Error("User ID and Product ID are required.");
    }

    const wishlist = await prisma.wishlist.findUnique({
      where: { userId },
    });

    if (!wishlist) {
      throw new Error("Wishlist not found.");
    }

    const updatedProductIds = wishlist.productId.filter(id => id !== productId);

    return await prisma.wishlist.update({
      where: { userId },
      data: { productId: updatedProductIds },
    });
  } catch (err) {
    console.error("Error removing product from wishlist:", err);
    throw err;
  }
}

// Get a user's wishlist
export async function getWishlist(userId: string) {
  try {
    if (!userId) {
      throw new Error("User ID is required.");
    }

    return await prisma.wishlist.findUnique({
      where: { userId },
      select: {
        productId: true,
      },
    });
  } catch (err) {
    console.error("Error fetching wishlist:", err);
    throw err;
  }
}

// Clear a user's wishlist
export async function clearWishlist(userId: string) {
  try {
    if (!userId) {
      throw new Error("User ID is required.");
    }

    return await prisma.wishlist.update({
      where: { userId },
      data: { productId: [] },
    });
  } catch (err) {
    console.error("Error clearing wishlist:", err);
    throw err;
  }
}
