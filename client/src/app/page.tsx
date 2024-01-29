"use client";
import type { Metadata } from "next";
import { useEffect, useState } from "react";
import CardFeaturedProduct from "../components/cardProduct";
import { Product } from "../types/interface";
import Link from "next/link";
import Navbar from "@/components/navbar";

const DATA = [
  {
    name: "NIKE AIR FORCE 1 '07 MEN'S BASKETBALL SHOES - WHITE",
    slug: "nike-air-force-1-07-men-s-basketball-shoes-white-46",
    description: "Sepatu Basket Nike Air Force 1 '07 Berwarna Putih Khusus Pria",
    excerpt: "Selisih 1-2 cm mungkin terjadi dikarenakan proses pengembangan dan produksi.",
    price: 2099000,
    tags: ["nike", "sneakers"],
    brand: "Nike",
    thumbnail: "https://www.footlocker.id/media/catalog/product/cache/e81e4f913a1cad058ef66fea8e95c839/0/1/01-NIKE-FFSSBNIK5-NIKFJ4209100-White.jpg",
    images: [
      "https://www.footlocker.id/media/catalog/product/cache/1361a5fa2136490ab0bb297f837f6217/0/2/02-NIKE-FFSSBNIK5-NIKFJ4209100-White.jpg",
      "https://www.footlocker.id/media/catalog/product/cache/1361a5fa2136490ab0bb297f837f6217/0/3/03-NIKE-FFSSBNIK5-NIKFJ4209100-White.jpg",
      "https://www.footlocker.id/media/catalog/product/cache/1361a5fa2136490ab0bb297f837f6217/0/4/04-NIKE-FFSSBNIK5-NIKFJ4209100-White.jpg",
      "https://www.footlocker.id/media/catalog/product/cache/1361a5fa2136490ab0bb297f837f6217/0/5/05-NIKE-FFSSBNIK5-NIKFJ4209100-White.jpg",
      "https://www.footlocker.id/media/catalog/product/cache/1361a5fa2136490ab0bb297f837f6217/0/6/06-NIKE-FFSSBNIK5-NIKFJ4209100-White.jpg",
    ],
    createdAt: "2023-12-15T15:32:06.350Z",
    updatedAt: "2024-03-18T14:47:12.101Z",
  },
  {
    name: "NEW BALANCE 327 MEN'S SNEAKERS SHOES - KHAKI",
    slug: "new-balance-327-men-s-sneakers-shoes-khaki-13",
    description:
      "Karena lari rekreasional semakin populer di tahun 1970-an, tolok ukur untuk alas kaki lari bergeser dari sekadar keberadaan menjadi sebuah performa.Sementara era desain akan dianggap sederhana menurut standar saat ini, dekade ini menonjol sebagai momen ketika sepatu lari benar-benar menjadi miliknya. 327 menyoroti tahun 70-an sebagai masa inovasi dengan berani membentuk kembali elemen desain klasik dengan pandangan yang sepenuhnya kontemporer. Dengan pengerjaan ulang sudut dari siluet wedge yang sudah teruji, berukuran besar, branding 'N' yang diterapkan secara asimetris, dan lug outsole yang terinspirasi dari jejak, 327 memberikan konsep ulang yang lengkap dari warisan lari kami.",
    excerpt: "Selisih 1-2 cm mungkin terjadi dikarenakan proses pengembangan dan produksi.",
    price: 1500000,
    tags: ["newbalance", "sneakers"],
    brand: "New Balance",
    thumbnail: "https://www.footlocker.id/media/catalog/product/cache/e81e4f913a1cad058ef66fea8e95c839/0/1/01-NEW-BALANCE-FFSSBNEWA-NEWMS327MT-Brown.jpg",
    images: [
      "https://www.footlocker.id/media/catalog/product/cache/1361a5fa2136490ab0bb297f837f6217/0/2/02-NEW-BALANCE-FFSSBNEWA-NEWMS327MT-Brown.jpg",
      "https://www.footlocker.id/media/catalog/product/cache/1361a5fa2136490ab0bb297f837f6217/0/3/03-NEW-BALANCE-FFSSBNEWA-NEWMS327MT-Brown.jpg",
      "https://www.footlocker.id/media/catalog/product/cache/1361a5fa2136490ab0bb297f837f6217/0/4/04-NEW-BALANCE-FFSSBNEWA-NEWMS327MT-Brown.jpg",
      "https://www.footlocker.id/media/catalog/product/cache/1361a5fa2136490ab0bb297f837f6217/0/5/05-NEW-BALANCE-FFSSBNEWA-NEWMS327MT-Brown.jpg",
      "https://www.footlocker.id/media/catalog/product/cache/1361a5fa2136490ab0bb297f837f6217/0/6/06-NEW-BALANCE-FFSSBNEWA-NEWMS327MT-Brown.jpg",
    ],
    createdAt: "2024-01-22T13:15:24.887Z",
    updatedAt: "2024-01-25T18:19:54.047Z",
  },
  {
    name: "ADIDAS STAN SMITH MEN'S SNEAKERS - CORE BLACK",
    slug: "adidas-stan-smith-men-s-sneakers-core-black-20.",
    description:
      "Masuki gaya Original Adidas klasik dengan sepatu Stan Smith pria ini. Sebuah desain legendaris dengan silhouette low-cut yang terbuat dari bahan kulit di bagian atas dan 3-Stripes yang berrongga. Sentuhan cupsole karet yang ada memberikan ketahanan dan traksi di berbagai permukaan. Ukuran reguler pada sepatu memberikan keseimbangan yang sempurna antara longgar dan mendekap. Tampil dengan gaya kasual yang berkelas bersama sepatu ikonis ini.",
    excerpt: "Signature shoes that bring in a hint of soccer influence.",
    price: 2000000,
    tags: ["adidas", "sneakers"],
    brand: "Adidas",
    thumbnail: "https://www.footlocker.id/media/catalog/product/cache/e81e4f913a1cad058ef66fea8e95c839/0/1/01-ADIDAS-FFSSBADI5-ADIIG1319-Black.jpg",
    images: [
      "https://www.footlocker.id/media/catalog/product/cache/1361a5fa2136490ab0bb297f837f6217/0/2/02-ADIDAS-FFSSBADI5-ADIIG1319-Black.jpg",
      "https://www.footlocker.id/media/catalog/product/cache/1361a5fa2136490ab0bb297f837f6217/0/3/03-ADIDAS-FFSSBADI5-ADIIG1319-Black.jpg",
      "https://www.footlocker.id/media/catalog/product/cache/1361a5fa2136490ab0bb297f837f6217/0/4/04-ADIDAS-FFSSBADI5-ADIIG1319-Black.jpg",
      "https://www.footlocker.id/media/catalog/product/cache/1361a5fa2136490ab0bb297f837f6217/0/5/05-ADIDAS-FFSSBADI5-ADIIG1319-Black.jpg",
      "https://www.footlocker.id/media/catalog/product/cache/1361a5fa2136490ab0bb297f837f6217/0/6/06-ADIDAS-FFSSBADI5-ADIIG1319-Black.jpg",
    ],
    createdAt: "2024-08-09T03:01:50.432Z",
    updatedAt: "2023-05-17T16:42:21.208Z",
  },
  {
    name: "ASICS JAPAN S ST UNISEX SNEAKER SHOES - WHITE",
    slug: "asics-japan-s-st-unisex-sneaker-shoes-white-10",
    description:
      "Berasal dari persembahan masa lalu kami dari 1981, siluet ini mengembangkan desain ikonik dengan properti bantalan yang lebih baik. Upper sepatu ini memiliki konstruksi kulit sintetis dan beberapa detail aksen yang membantu memberikan kombinasi blok warna unik. Tooling platform sole ini diperbaharui dengan teknologi GELâ„¢ di bagian bawah. Sepatu ini didesain untuk membantu memberikan kenyamanan bawah kaki yang lebih baik untuk kehidupan modern saat ini.",
    excerpt: "Selisih 1-2 cm mungkin terjadi dikarenakan proses pengembangan dan produksi.",
    price: 1199000,
    brand: "Asics",
    tags: ["copia", "sursum", "omnis"],
    thumbnail: "https://www.footlocker.id/media/catalog/product/cache/e81e4f913a1cad058ef66fea8e95c839/0/1/01-ASICS-FFSSEASIA-ASI123A28913-White.jpg",
    images: [
      "https://www.footlocker.id/media/catalog/product/cache/1361a5fa2136490ab0bb297f837f6217/0/2/02-ASICS-FFSSEASIA-ASI123A28913-White.jpg",
      "https://www.footlocker.id/media/catalog/product/cache/1361a5fa2136490ab0bb297f837f6217/0/3/03-ASICS-FFSSEASIA-ASI123A28913-White.jpg",
      "https://www.footlocker.id/media/catalog/product/cache/1361a5fa2136490ab0bb297f837f6217/0/4/04-ASICS-FFSSEASIA-ASI123A28913-White.jpg",
      "https://www.footlocker.id/media/catalog/product/cache/1361a5fa2136490ab0bb297f837f6217/0/5/05-ASICS-FFSSEASIA-ASI123A28913-White.jpg",
      "https://www.footlocker.id/media/catalog/product/cache/1361a5fa2136490ab0bb297f837f6217/0/6/06-ASICS-FFSSEASIA-ASI123A28913-White.jpg",
    ],
    createdAt: "2024-03-06T12:32:37.477Z",
    updatedAt: "2024-06-10T19:39:46.154Z",
  },
];

export default function Home() {
  const [featuredProduct, setFeaturedProduct] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setFeaturedProduct(DATA);
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="w-full h-4/5">
        <Link href={"/products"}>
          <img className="w-full h-full object-cover" src="jumbotron.png" alt="Jumbotron Image" />
        </Link>
      </div>

      <div className="container mx-auto py-12">
        <h2 className="text-3xl font-bold mb-6">Featured Products</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {featuredProduct.map((product) => (
            <CardFeaturedProduct key={product.slug} product={product} />
          ))}
        </div>
        <div className="text-center">
          <Link href="/products" className="md:inline-block text-slate-900 px-3 py-3">
            <span className="hover:border-b-2 hover:border-slate-900 hover:transition duration-100 ease-out font-bold text-3xl">All Products</span>
          </Link>
        </div>
      </div>
    </>
  );
}
