"use client";
import { Product } from "@/types/type";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

export default function ButtonAddToWishlist({ product, productById }: { product?: Product; productById: Product }) {
  const [isInWishlist, setIsInWishlist] = useState<boolean>(false);

  const addToWishlist = async () => {
    const authorizationToken = Cookies.get("Authorization");

    try {
      let productId;
      if (product) {
        productId = product._id;
      } else if (productById) {
        productId = productById._id;
      } else {
        console.error("Both product and productById are missing. Cannot add to wishlist.");
        return;
      }

      console.log(productId, "<<<<<<<");

      const response = await fetch(process.env.BASE_URL + `/api/wishlist`, {
        method: "POST",
        headers: {
          Cookie: `Authorization=${authorizationToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      });

      if (!response.ok) {
        throw new Error("Failed to add item to wishlist");
      }
      Swal.fire("Added to Wishlist!");
      setIsInWishlist(true);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "You already added this item",
        text: "Please check your wishlist",
      });
      console.error("Error adding item to wishlist:", error);
      // Handle the error as needed, e.g., show a user-friendly message
    }
  };

  return (
    <button className={`mt-4 flex items-center text-red-500 hover:text-red-700 focus:outline-none ${isInWishlist ? "text-red-700" : ""}`} onClick={addToWishlist} disabled={isInWishlist}>
      <FontAwesomeIcon icon={faHeart} className="mr-2" />
      {isInWishlist ? "Added to Wishlist" : "Add to Wishlist"}
    </button>
  );
}
