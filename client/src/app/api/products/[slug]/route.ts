import { NextRequest, NextResponse } from "next/server";
import ProductModel from "../../../../db/models/product";
import { MyResponse, Product } from "@/types/type";

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  const data = await ProductModel.findProductbyId(params.slug);
  return NextResponse.json<MyResponse<Product>>({ data });
}
