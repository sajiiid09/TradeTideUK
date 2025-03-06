"use server";
import { prisma } from "@/lib/prisma";

export async function upsertUser(data: {
  id?: string;
  name?: string;
  email: string;
  image?: string;
}) {
  try {
    if (!data.email) {
      throw new Error("Email is required.");
    }
    return await prisma.user.upsert({
      where: { email: data.email },
      update: {
        name: data.name,
        image: data.image,
      },
      create: {
        id: data.id,
        name: data.name,
        email: data.email,
        image: data.image,
      },
    });
  } catch (err) {
    const error = err as { code: string };
    console.error("Error upserting user:", error);
    throw error;
  }
}

export async function getUserById(id: string) {
  try {
    if (!id) {
      throw new Error("User ID is required.");
    }
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
      },
    });
    if (!user) {
      throw new Error("User not found.");
    }
    return user;
  } catch (err) {
    const error = err as { code: string };
    console.error("Error fetching user by ID:", error);
    return null;
  }
}

export async function getUserByEmail(email: string) {
  try {
    if (!email) {
      throw new Error("Email is required.");
    }
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
      },
    });
    if (!user) {
      throw new Error("User not found.");
    }
    return user;
  } catch (err) {
    const error = err as { code: string };
    console.error("Error fetching user by email:", error);
    return null;
  }
}

export async function deleteUser(id: string) {
  try {
    if (!id) {
      throw new Error("User ID is required.");
    }
    await prisma.user.delete({ where: { id } });
  } catch (err) {
    const error = err as { code: string };
    if (error.code === "P2025") {
      console.error("User not found.");
      return null;
    }
    console.error("Error deleting user:", error);
    return null;
  }
}
