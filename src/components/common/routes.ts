"use client";

import { usePathname } from "next/navigation";

export const HOME_ROUTE = "/home";
export const PRODUCTS_ROUTE = "/products";
export const CATEGORIES_ROUTE = "/categories";
export const ABOUT_ROUTE = "/about";
export const CONTACT_ROUTE = "/contact";

export const useRoutes = () => {
  const pathname = usePathname();
  const routes = [
    {
      href: "/",
      label: HOME_ROUTE,
      active: pathname === "/",
    },
    {
      href: PRODUCTS_ROUTE,
      label: "Products",
      active: pathname === "/products",
    },
    {
      href: CATEGORIES_ROUTE,
      label: "Categories",
      active: pathname === "/categories",
    },
    {
      href: ABOUT_ROUTE,
      label: "About",
      active: pathname === "/about",
    },
    {
      href: CONTACT_ROUTE,
      label: "Contact",
      active: pathname === "/contact",
    },
  ];
  return {
    routes,
  };
};
