import ProductModel from "@/db/models/product";
import { MyResponse, NewUserInput, Product } from "@/types/type";
import { NextRequest, NextResponse } from "next/server";

import { ZodError } from "zod";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    await ProductModel.createProduct(body);
    return NextResponse.json<MyResponse<NewUserInput>>({ message: "Product Created Successfully" });
  } catch (error) {
    console.log(error);
    if (error instanceof ZodError) {
      const err = error.issues[0].path + " " + error.issues[0].message;
      return NextResponse.json<MyResponse<NewUserInput>>(
        {
          error: err,
        },
        {
          status: 400,
        }
      );
    }
    return NextResponse.json<MyResponse<NewUserInput>>(
      {
        error: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}

export async function GET(request: NextRequest) {
  const searchQuery = request.nextUrl.searchParams;
  const search = searchQuery.get("search")?.toString();
  const page = parseInt(searchQuery.get("page")?.toString() || "1");
  const limit = parseInt(searchQuery.get("limit")?.toString() || "4");
  const data = await ProductModel.findProduct(search, page, limit);
  return NextResponse.json<MyResponse<Product[]>>({ data });
}
