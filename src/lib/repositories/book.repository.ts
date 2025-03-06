"use server";
import { prisma } from "@/lib/prisma";

export async function createBook(data: {
  id: string;
  title: string;
  author: string;
  description: string;
  rating?: number;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}) {
  try {
    if (!data.title || !data.author || !data.userId) {
      throw new Error("Title, author, and userId are required.");
    }

    if (data.rating !== undefined && (data.rating < 0 || data.rating > 5)) {
      throw new Error("Rating must be between 0 and 5.");
    }

    return await prisma.book.create({
      data,
    });
  } catch (err) {
    const error = err as { code: string };
    console.error("Error creating book:", error);
    throw error;
  }
}

export async function getAllBooks(page = 1, pageSize = 10) {
  try {
    const skip = (page - 1) * pageSize;

    const [books, total] = await prisma.$transaction([
      prisma.book.findMany({
        orderBy: { createdAt: "desc" },
        skip,
        take: pageSize,
        select: {
          id: true,
          title: true,
          description: true,
          author: true,
          rating: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      prisma.book.count(),
    ]);

    return {
      books,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  } catch (err) {
    const error = err as { code: string };
    console.error("Error fetching books:", error);
    throw error;
  }
}

export async function getBooksByUserId(
  userId: string,
  page = 1,
  pageSize = 10,
) {
  if (!userId) throw new Error("User ID is required.");
  try {
    const skip = (page - 1) * pageSize;

    const [books, total] = await prisma.$transaction([
      prisma.book.findMany({
        where: userId ? { userId } : undefined,
        orderBy: { createdAt: "desc" },
        skip,
        take: pageSize,
        select: {
          id: true,
          title: true,
          author: true,
          rating: true,
          description: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      prisma.book.count({ where: userId ? { userId } : undefined }),
    ]);

    return {
      books,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  } catch (err) {
    const error = err as { code: string };
    console.error("Error fetching books:", error);
    throw error;
  }
}

export async function getBookById(id: string) {
  try {
    if (!id) {
      console.log("Book ID is required.");
      return null;
    }

    const book = await prisma.book.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        author: true,
        rating: true,
        description: true,
        createdAt: true,
        updatedAt: true,
        userId: true,
      },
    });

    if (!book) {
      console.log("Book not found.");
      return null;
    }

    return book;
  } catch (err) {
    const error = err as { code: string };
    console.error("Error fetching book by ID:", error);
    throw error;
  }
}

export async function updateBook(
  id: string,
  data: {
    title?: string;
    author?: string;
    rating?: number;
    description: string;
  },
) {
  try {
    if (!id) {
      throw new Error("Book ID is required.");
    }

    if (data.rating !== undefined && (data.rating < 0 || data.rating > 5)) {
      throw new Error("Rating must be between 0 and 5.");
    }

    const updatedBook = await prisma.book.update({
      where: { id },
      data,
    });

    return updatedBook;
  } catch (err) {
    const error = err as { code: string };
    if (error.code === "P2025") {
      throw new Error("Book not found.");
    }
    console.error("Error updating book:", error);
    return null;
  }
}

export async function deleteBook(id: string): Promise<boolean> {
  try {
    if (!id) {
      throw new Error("Book ID is required.");
    }
    await prisma.book.delete({ where: { id } });
    return true;
  } catch (err) {
    const error = err as { code: string };
    if (error.code === "P2025") {
      throw new Error("Book not found.");
    }
    console.error("Error deleting book:", error);
    throw error;
  }
}

export async function getBooksBySearch(query: string, page = 1, pageSize = 10) {
  try {
    const skip = (page - 1) * pageSize;
    const searchQuery = query?.trim() || "";

    const [books, total] = await prisma.$transaction([
      prisma.book.findMany({
        where: {
          OR: [
            { title: { contains: searchQuery, mode: "insensitive" } },
            { author: { contains: searchQuery, mode: "insensitive" } },
          ],
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: pageSize,
        select: {
          id: true,
          title: true,
          author: true,
          rating: true,
          description: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      prisma.book.count({
        where: {
          OR: [
            { title: { contains: searchQuery, mode: "insensitive" } },
            { author: { contains: searchQuery, mode: "insensitive" } },
          ],
        },
      }),
    ]);
    if (!searchQuery) {
      return {
        books: [],
        total: 0,
        page,
        pageSize,
        totalPages: 0,
      };
    }
    return {
      books,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  } catch (err) {
    console.error("Error fetching books by search:", err);
    return null;
  }
}
