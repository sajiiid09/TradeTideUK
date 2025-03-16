import { Suspense } from "react";
import ProductList from "@/components/product-list";
import ProductFilters from "@/components/product-filters";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-64 lg:w-72">
          <ProductFilters />
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-6">All Products</h1>
          <Suspense fallback={<ProductsLoading />}>
            <ProductList />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

function ProductsLoading() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 9 }).map((_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="h-[300px] w-full rounded-lg" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  );
}
