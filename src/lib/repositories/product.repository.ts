"use server";
import { Prisma, Product, ProductStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";

// Create a new product
export async function createProduct(data: {
  name: string;
  description: string;
  price: number;
  image: string[];
  quantity: number;
  attributes?: string;
  color: string[];
  categories: string[];
  status: ProductStatus;
}) {
  try {
    return await prisma.product.create({
      data: {
        ...data,
        attributes: data.attributes
          ? JSON.stringify(data.attributes)
          : undefined,
      },
    });
  } catch (err) {
    console.error("Error creating product:", err);
    throw err;
  }
}

// Get a single product by ID
export async function getProductById(id: string) {
  try {
    if (!id) {
      throw new Error("Product ID is required.");
    }
    const data = await prisma.product.findUnique({
      where: { id: id },
    });
    return data;
  } catch (err) {
    console.error("Error fetching product by ID:", err);
    // throw err;
    return null;
  }
}

// Get all products with pagination
export async function getProducts({
  skip = 0,
  take = 10,
  filter = {},
}: {
  skip?: number;
  take?: number;
  filter?: Partial<{
    name: string;
    status: ProductStatus;
    category: string;
  }>;
}) {
  try {
    const where: Prisma.ProductWhereInput = {
      name: filter.name ? { contains: filter.name } : undefined,
      status: filter.status ? filter.status : undefined,
      categories: filter.category ? { has: filter.category } : undefined,
    };

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take,
      }),
      prisma.product.count({ where }),
    ]);

    return { products, total };
  } catch (err) {
    console.error("Error fetching products:", err);
    throw err;
  }
}

// Update a product
export async function updateProduct(id: string, data: Partial<Product>) {
  try {
    if (!id) {
      throw new Error("Product ID is required.");
    }
    return await prisma.product.update({
      where: { id },
      data: {
        ...data,
        attributes: data.attributes
          ? JSON.stringify(data.attributes)
          : undefined,
      },
    });
  } catch (err) {
    console.error("Error updating product:", err);
    throw err;
  }
}

// Delete a product
export async function deleteProduct(id: string) {
  try {
    if (!id) {
      throw new Error("Product ID is required.");
    }
    return await prisma.product.delete({
      where: { id },
    });
  } catch (err) {
    console.error("Error deleting product:", err);
    throw err;
  }
}

export async function getManyProducts(ids: string[]) {
  try {
    return await prisma.product.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  } catch (err) {
    console.error("Error fetching products:", err);
    throw err;
  }
}

// search a product
export async function searchProduct(query: string): Promise<Product[]> {
  try {
    if (!query) return [];
    const data = await prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: query.toLowerCase() } },
          { description: { contains: query.toLowerCase() } },
        ],
      },
    });
    return data;
  } catch (err) {
    console.error("Error searching product:", err);
    throw err;
  }
}
