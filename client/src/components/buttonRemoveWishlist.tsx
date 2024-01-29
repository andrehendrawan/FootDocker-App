"use client";
import { Wishlist } from "@/types/type";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

export default function RemoveWishlist({ wishlist }: { wishlist: Wishlist }) {
  const removeWishlist = async () => {
    const authorizationToken = Cookies.get("Authorization");
    console.log(wishlist, "<<<<<<<");

    try {
      const response = await fetch(process.env.BASE_URL + `/api/wishlist`, {
        method: "DELETE",
        headers: {
          Cookie: `Authorization=${authorizationToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: wishlist.productId }),
      });

      if (!response.ok) {
        throw new Error("Failed to remove item from wishlist");
      }

      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#000000",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
          window.location.reload();
        }
      });
    } catch (error) {
      console.error("Error removing item from wishlist:", error);
    }
  };
  return (
    <button className="text-red-500 hover:text-red-700 focus:outline-none" onClick={removeWishlist}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  );
}
