import ButtonAddToWishlist from "@/components/buttonAddtoWishlist";
import { formatToRupiah } from "@/db/helpers/formatter";
import { Product } from "@/types/type";

import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  // read route params
  const slug = params.slug;

  // fetch data
  const product = (await fetch(process.env.BASE_URL + `/api/products/${slug}`).then((res) => res.json())) as Product;

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      images: ["/some-specific-page-image.jpg", ...previousImages],
    },
  };
}

async function getDataById(slug: string) {
  const res = await fetch(process.env.BASE_URL + `/api/products/${slug}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
export default async function ProductDetail({ params }: { params: { slug: string } }) {
  const data = await getDataById(params.slug);
  console.log(data, "<<<<<<");

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img src={data.data.thumbnail} alt="Product Image" className="w-full h-4/6 mb-4" />
          {/* Below Images */}
          <div className="grid grid-cols-4 gap-4">
            <img src={data.data.images[0]} alt="Product Image 3" className="w-full h-auto" />
            <img src={data.data.images[1]} alt="Product Image 3" className="w-full h-auto" />
            <img src={data.data.images[2]} alt="Product Image 4" className="w-full h-auto" />
            <img src={data.data.images[3]} alt="Product Image 5" className="w-full h-auto" />
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{data.data.name}</h1>
          <p className="text-gray-600 mb-4">{formatToRupiah(data.data.price)}</p>
          <p className="mb-4">{data.data.description}</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-gray-600">Size:</span>
              <div className="mt-2 space-y-2">
                <button className="bg-gray-200 text-gray-600 px-4 py-2 rounded-md mr-2">US 6.5</button>
                <button className="bg-gray-200 text-gray-600 px-4 py-2 rounded-md mr-2">US 7.5</button>
                <button className="bg-gray-200 text-gray-600 px-4 py-2 rounded-md mr-2">US 8</button>
                <button className="bg-gray-200 text-gray-600 px-4 py-2 rounded-md mr-2">US 8.5</button>
                <button className="bg-gray-200 text-gray-600 px-4 py-2 rounded-md mr-2">US 9</button>
              </div>
            </div>
            <div>
              <span className="text-gray-600">Quantity:</span>
              <div className="mt-2 space-y-2">
                <button className="bg-gray-200 text-gray-600 px-4 py-2 rounded-md mr-2">1</button>
                <button className="bg-gray-200 text-gray-600 px-4 py-2 rounded-md mr-2">2</button>
                <button className="bg-gray-200 text-gray-600 px-4 py-2 rounded-md mr-2">3</button>
                <button className="bg-gray-200 text-gray-600 px-4 py-2 rounded-md mr-2">4</button>
                <button className="bg-gray-200 text-gray-600 px-4 py-2 rounded-md">5</button>
              </div>
            </div>
            <p className="mt-4 text-gray-600">Tags: {data.data.tags} </p>
            <p className="mt-4 text-gray-600">Brand: {data.data.brand}</p>
            <p className="mt-4 text-lg font-semibold text-gray-900">{data.data.excerpt}</p>
          </div>
          <ButtonAddToWishlist product={data.data} productById={data.data} />
        </div>
      </div>
    </div>
  );
}
