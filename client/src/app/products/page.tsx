"use client";
import CardAllProduct from "@/components/cardAllProduct";
import { Product } from "@/types/type";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDebounce } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export default function ProductPage() {
  const [data, setData] = useState<Product[]>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const [filteredData, setFilteredData] = useState<Product[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    if (debouncedSearchQuery) {
      const fetchData = async () => {
        setLoading(true);

        try {
          const response = await fetch(process.env.BASE_URL + `/api/products?search=${debouncedSearchQuery}`);

          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }

          const newData: { data: Product[] } = await response.json();
          // setData(newData.data);
          setFilteredData(newData.data);
          setError(null);
        } catch (error) {
          console.error("Error fetching data:", error);
          setError("Failed to fetch data. Please try again.");
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    } else {
      (async () => {
        setLoading(true);

        try {
          const response = await fetch(process.env.BASE_URL + "/api/products", {
            cache: "no-store",
          });

          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }

          const newData: { data: Product[] } = await response.json();
          setData(newData.data);
          setFilteredData(newData.data);
          setError(null);
        } catch (error) {
          console.error("Error fetching data:", error);
          setError("Failed to fetch data. Please try again.");
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [debouncedSearchQuery]);

  const handleSearch = () => {
    setSearchQuery(searchQuery.toLowerCase());
  };

  const fetchMoreData = async () => {
    setLoading(true);
    try {
      const response = await fetch(process.env.BASE_URL + `/api/products?page=${page + 1}`);
      // ... handle response
      const newData = await response.json();
      setFilteredData((prevData) => [...prevData, ...newData.data]);
      setPage((prevPage) => prevPage + 1);
      setHasMore(newData.data.length > 0); // Check if more data is available
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMoreData();
  }, []);

  return (
    <>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-2 flex items-center">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search products..."
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-gray-500 w-full mr-2"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
        />
        <button className="px-4 py-2 bg-slate-500 hover:bg-slate-900 text-white rounded-md flex items-center" onClick={handleSearch}>
          <FontAwesomeIcon icon={faSearch} className="mr-2" />
          Search
        </button>
      </div>
      <InfiniteScroll
        dataLength={filteredData?.length} // Total items currently loaded
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 mx-2">
          {loading ? <p>Loading...</p> : error ? <p>{error}</p> : filteredData?.length === 0 ? <p>No matching products found.</p> : filteredData?.map((product) => <CardAllProduct key={product.slug} product={product} />)}
        </div>
      </InfiniteScroll>
    </>
  );
}
