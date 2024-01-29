import Link from "next/link";
import { Product } from "../types/type";
import ButtonAddToWishlist from "./buttonAddtoWishlist";
import { formatToRupiah } from "../db/helpers/formatter";

export default function CardAllProduct({ product }: { product: Product }) {
  return (
    <>
      <div className="group border-2 border-transparent hover:border-gray-500 p-8">
        <Link href={`/products/${product.slug}`} className="w-full min-h-80 bg-white rounded-md overflow-hidden group-hover:opacity-75">
          <img src={product.thumbnail} />
        </Link>
        <h2 className="mt-4 text-xl font-semibold text-gray-900">{product.name}</h2>
        <p className="mt-1 text-sm text-gray-600">{product.brand}</p>
        <p className="mt-4 text-lg font-semibold text-gray-900">{formatToRupiah(product.price)}</p>
        <ButtonAddToWishlist productById={product} />
      </div>
    </>
  );
}
