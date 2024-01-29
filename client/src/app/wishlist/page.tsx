"use client";
import { Wishlist } from "@/types/type";
import WishlistCard from "../../components/wishlistCard";
import { useEffect, useState } from "react";
import { authorizationToken } from "@/actions/wishlist";
import Cookies from "js-cookie";

export default function Wishlist() {
  const [data, setData] = useState<Wishlist[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const authorizationToken = Cookies.get("Authorization");

      try {
        const response = await fetch(process.env.BASE_URL + `/api/wishlist`, {
          method: "GET",
          headers: {
            Cookie: `Authorization=${authorizationToken}`,
          },
          cache: "no-store",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const newData: { data: Wishlist[] } = await response.json();
        console.log(newData, "<<<<<<<<");
        setData(newData.data);

        setError(null);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <h2 className="text-3xl font-bold mt-6 text-center">Wishlist</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0 p-4 mx-20">
        {loading ? <p>Loading...</p> : error ? <p>{error}</p> : data?.map((wishlist) => <WishlistCard key={wishlist.products?.slug} wishlist={wishlist} />)}
      </div>
    </>
  );
}
