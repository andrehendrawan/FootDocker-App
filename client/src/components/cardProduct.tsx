import Link from "next/link";
import { Product } from "../types/interface";

export default function CardFeaturedProduct({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.slug}`} className="bg-white p-6 text-center hover:opacity-75">
      <img src={product.thumbnail} alt="Product 1" className="mb-4 w-full h-1/2 object-cover rounded-md" />
      <h3 className="text-xl font-semibold mb-2">{product.brand}</h3>
      <p className="text-gray-600">{product.name}</p>
    </Link>
  );
}
