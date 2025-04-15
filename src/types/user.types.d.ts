import type {
  Cart,
  Checkout,
  Order,
  UserStatus,
  Wishlist,
} from "@prisma/client";

export interface IUserProfile {
  id: string;
  email: string;
  profiles: {
    id: string;
    image: string;
    createdAt: Date;
    updatedAt: Date;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: string;
    status: $Enums.UserStatus | null;
    wishlists: Wishlist[];
    carts: Cart[];
    checkouts: Checkout[];
    orders: Order[];
  }[];
}

export interface IUser {
  id: string;
  email: string;
  profiles: Profile[];
}

export interface IProfile {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  status: UserStatus;
  wishlists: Wishlist[];
  carts: Cart[];
  checkouts: Checkout[];
  orders: Order[];
}

export interface IWishlist {
  id: string;
  userId: string;
  productId: string[];
  createdAt: string;
  updatedAt: string;
}

interface Cart {
  id: string;
  userId: string;
  productId: string[]; // contains JSON strings like {"productId":"...","quantity":...}
  createdAt: string;
  updatedAt: string;
}

interface Checkout {
  id: string;
  userId: string;
  products: string[];
  shippingAddress: string[];
  billingAddress: string[];
  shippingCharge: number;
  paymentMethod: "CASH_ON_DELIVERY" | "ONLINE" | string;
  createdAt: string;
  updatedAt: string;
}

export interface IOrder {
  id: string;
  userId: string;
  products: string[];
  shippingAddress: {
    address: string;
  };
  billingAddress: {
    address: string;
  };
  shippingCharge: number;
  orderStatus: "PENDING" | "CONFIRMED" | "SHIPPED" | "DELIVERED" | string;
  paymentMethod: "CASH_ON_DELIVERY" | "ONLINE" | string;
  createdAt: Date;
  updatedAt: Date;
}
