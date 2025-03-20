import ProductCard from "@/components/common/productCard";

// Mock data for products
const products = [
  {
    id: 1,
    name: "Jamdani Saree",
    price: 12500,
    image: "https://picsum.photos/200/300",
    category: "Clothing",
  },
  {
    id: 2,
    name: "Nakshi Kantha",
    price: 3500,
    image: "https://picsum.photos/200/300",
    category: "Home Decor",
  },
  {
    id: 3,
    name: "Terracotta Jewelry Set",
    price: 1800,
    image: "https://picsum.photos/200/300",
    category: "Accessories",
  },
  {
    id: 4,
    name: "Bamboo Basket",
    price: 950,
    image: "https://picsum.photos/200/300",
    category: "Home Decor",
  },
  {
    id: 5,
    name: "Muslin Scarf",
    price: 1200,
    image: "https://picsum.photos/200/300",
    category: "Accessories",
  },
  {
    id: 6,
    name: "Clay Tea Set",
    price: 2800,
    image: "https://picsum.photos/200/300",
    category: "Home Decor",
  },
  {
    id: 7,
    name: "Jute Handbag",
    price: 1500,
    image: "https://picsum.photos/200/300",
    category: "Accessories",
  },
  {
    id: 8,
    name: "Silk Panjabi",
    price: 4500,
    image: "https://picsum.photos/200/300",
    category: "Clothing",
  },
  {
    id: 9,
    name: "Wooden Jewelry Box",
    price: 2200,
    image: "https://picsum.photos/200/300",
    category: "Home Decor",
  },
];

export default function ProductList() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map(product => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
}
