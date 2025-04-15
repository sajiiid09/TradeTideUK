"use server";
import { prisma } from "@/lib/prisma";
import { IUser } from "@/types/user.types";
import { UserStatus, type UserProfile } from "@prisma/client";

export async function getOneUserWithProfile({
  id,
}: {
  id: string;
}): Promise<{ data: IUser | null; message: string }> {
  if (!id) return { data: null, message: "Error fetching user profiles" };
  try {
    const oneUserProfile = await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        email: true,
        profiles: {
          where: {
            status: { not: UserStatus.BLOCKED },
          },
          select: {
            id: true,
            firstName: true,
            lastName: true,
            phoneNumber: true,
            address: true,
            image: true,
            createdAt: true,
            updatedAt: true,
            status: true,
            wishlists: {
              select: {
                id: true,
                userId: true,
                productId: true,
                createdAt: true,
                updatedAt: true,
              },
            },
            carts: {
              select: {
                id: true,
                userId: true,
                productId: true,
                createdAt: true,
                updatedAt: true,
              },
            },
            checkouts: {
              select: {
                id: true,
                userId: true,
                products: true,
                shippingCharge: true,
                paymentMethod: true,
                createdAt: true,
                updatedAt: true,
              },
            },
            orders: {
              select: {
                id: true,
                userId: true,
                products: true,
                shippingCharge: true,
                paymentMethod: true,
                billingAddress: true,
                shippingAddress: true,
                createdAt: true,
                updatedAt: true,
              },
            },
          },
        },
      },
    });

    if (!oneUserProfile) {
      return { data: null, message: "User profile not found" };
    }

    return { data: oneUserProfile, message: "success" };
  } catch (err) {
    console.error("Error fetching user profiles:", err);
    return { data: null, message: "Error fetching user profiles" };
  }
}

export async function getOneUserIfProfileExists({
  id,
}: {
  id: string;
}): Promise<{
  data: {
    profiles: {
      id: string;
    }[];
  } | null;
  message: string;
}> {
  if (!id) return { data: null, message: "Error fetching user profiles" };
  const data = await prisma.user.findUnique({
    where: { id },
    select: {
      profiles: {
        where: {
          status: { not: UserStatus.BLOCKED },
        },
        select: {
          id: true,
        },
      },
    },
  });
  return { data, message: "success" };
}

export async function updateUserWithProfile({
  id,
  userData,
}: {
  id: string;
  userData: Partial<UserProfile>;
}) {
  try {
    console.log(userData);
    const response = await prisma.userProfile.update({
      where: { id },
      data: userData,
    });
    console.log(response);
    return true;
  } catch (err: unknown) {
    const errorData = err as { code: string; message: string };
    if (errorData.code === "P2002") {
      console.log("Duplicate entry");
      return false;
    }
    console.log("Error updating user profile:", errorData.message);
  }
}

export async function createUserWithProfile({
  userId,
  profileData,
}: {
  userId: string;
  profileData: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: string;
    image: string;
  };
}) {
  try {
    console.log(userId, profileData);
    const response = await prisma.userProfile.create({
      data: {
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        phoneNumber: profileData.phoneNumber,
        address: profileData.address,
        image: profileData.image,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
    return response;
  } catch (err: unknown) {
    const errorData = err as { code: string; message: string };
    if (errorData.code === "P2002") {
      console.log("Duplicate entry");
      return false;
    }
    console.log("Error creating user profile:", errorData.message);
  }
  return null;
}
