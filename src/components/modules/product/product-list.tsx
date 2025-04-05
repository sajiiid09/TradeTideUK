import ProductCard from "@/components/common/productCard";

type TProduct = {
  id: string;
  name: string;
  // catagories: string[];
  price: number;
  image: string[];
  color: string[];
};

export default function ProductList({ products }: { products: TProduct[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map(product => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
}
