import { Wishlist } from "@/types/type";
import RemoveWishlist from "./buttonRemoveWishlist";
import { formatToRupiah } from "@/db/helpers/formatter";
import Link from "next/link";

export default function WishlistCard({ wishlist }: { wishlist: Wishlist }) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-white p-4 border border-gray-300 rounded-md shadow-md max-w-xs md:max-w-full my-4 mx-4">
      <div className="flex items-center md:space-x-4">
        <img src={wishlist.products?.thumbnail} alt="" className="w-36 h-36 md:w-24 md:h-24 object-cover rounded-md" />
        <div className="text-left md:text-center">
          <Link href={`products/${wishlist.products?.slug}`}>
            <p className="text-xs font-semibold text-gray-800 mb-1 md:mb-3">{wishlist.products?.name}</p>
            <p className="text-xs text-gray-600">{formatToRupiah(wishlist.products?.price)}</p>
          </Link>
        </div>
      </div>
      <RemoveWishlist wishlist={wishlist} />
    </div>
  );
}
