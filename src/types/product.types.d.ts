import { $Enums, Prisma } from "@prisma/client";

export type TProducts = {
  name: string;
  id: string;
  image: string[];
  createdAt: Date;
  updatedAt: Date;
  description: string;
  price: number;
  quantity: number;
  attributes: Prisma.JsonValue | null;
  color: string[];
  categories: string[];
  status: $Enums.ProductStatus;
};
