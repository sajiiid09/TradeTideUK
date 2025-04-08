"use server";
import { prisma } from "@/lib/prisma";

// Create or update a cart for a user
// export async function upsertCart(userId: string, productIds?: string[]) {
//   try {
//     if (!userId) {
//       throw new Error("User ID is required.");
//     }

//     return await prisma.cart.upsert({
//       where: { userId },
//       update: {
//         productId: productIds || [],
//       },
//       create: {
//         userId,
//         productId: productIds || [],
//       },
//     });
//   } catch (err) {
//     console.error("Error creating/updating cart:", err);
//     throw err;
//   }
// }

export async function createCart(
  email: string,
  productIds?: string[],
): Promise<{ message: string; status: boolean }> {
  try {
    if (!email) {
      return { message: "User email is required.", status: false };
    }

    const userProfile = await prisma.user.findFirst({
      where: { email },
      select: {
        profiles: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!userProfile || userProfile.profiles.length === 0) {
      return {
        message: "Please create your profile to proceed.",
        status: false,
      };
    }

    const userId = userProfile.profiles[0].id;

    await prisma.cart.create({
      data: {
        userId,
        productId: productIds || [],
      },
    });

    return { message: "Cart created successfully!", status: true };
  } catch (error) {
    console.error("Error creating cart:", error);

    if (error instanceof Error) {
      return {
        message: `Failed to create cart: ${error.message}`,
        status: false,
      };
    }

    return {
      message: "An unexpected error occurred while creating the cart.",
      status: false,
    };
  }
}

// Add a product to the cart
export async function addProductToCart(userId: string, productId: string, cartId: string) {
  try {
    if (!userId || !productId) {
      throw new Error("User ID and Product ID are required.");
    }

    const cart = await prisma.cart.findFirst({
      where: { userId },
    })

    const updatedProductIds = cart?.productId
      ? [...cart.productId, productId]
      : [productId];

    return await prisma.cart.upsert({
      where: { id: cartId },
      update: { productId: updatedProductIds },
      create: { userId, productId: updatedProductIds },
    });

  } catch (err) {
    console.error("Error adding product to cart:", err);
    throw err;
  }
}

// Remove a product from the cart
export async function removeProductFromCart(userId: string, productId: string, cartId: string) {
  try {
    if (!userId || !productId || !cartId) {
      throw new Error("User ID, Product ID and cart ID are required.");
    }

    const cart = await prisma.cart.findUnique({
      where: { id: cartId },
    });

    if (!cart) {
      throw new Error("Cart not found.");
    }

    const updatedProductIds = cart.productId.filter(id => id !== productId);

    return await prisma.cart.update({
      where: { id: cartId },
      data: { productId: updatedProductIds },
    });
  } catch (err) {
    console.error("Error removing product from cart:", err);
    throw err;
  }
}

// Get a user's cart
export async function getCart(userId: string, cartId: string) {
  try {
    if (!userId) {
      throw new Error("User ID is required.");
    }

    return await prisma.cart.findUnique({
      where: { id: cartId },
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
export async function clearCart(userId: string, cartId: string) {
  try {
    if (!userId) {
      throw new Error("User ID is required.");
    }

    return await prisma.cart.update({
      where: { id: cartId },
      data: { productId: [] },
    });
  } catch (err) {
    console.error("Error clearing cart:", err);
    throw err;
  }
}
