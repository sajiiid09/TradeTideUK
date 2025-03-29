import { Metadata } from "next";
import NextHead from "@/components/common/metaData";

import ProductPage from "./_component";

export const metadata: Metadata = NextHead({
  title: "Products",
});
export default function Products() {
  return <ProductPage />;
}
