import WishlistModel from "@/db/models/wishlist";
import { MyResponse, NewWishlistInput, Wishlist } from "@/types/type";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const userId = request.headers.get("x-userid");
  const data = await WishlistModel.findWishlistByUserId(userId);
  return NextResponse.json<MyResponse<Wishlist[]>>({ data });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const userId = request.headers.get("x-userid");
    console.log(userId, "<<<<<");
    console.log(body, "<<<<<< INI BODYYYY");

    await WishlistModel.createWishlist(userId, body.productId);
    return NextResponse.json<MyResponse<NewWishlistInput>>({ message: "Wishlist created" });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Already added this product") {
        return NextResponse.json<MyResponse<NewWishlistInput>>(
          {
            error: "Already added this product",
          },
          {
            status: 400,
          }
        );
      }
    }
    return NextResponse.json<MyResponse<NewWishlistInput>>(
      {
        error: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const userId = request.headers.get("x-userid");
    const body = await request.json();

    const deletedCount = await WishlistModel.deleteWishlist(userId, body.productId);

    if (deletedCount > 0) {
      return NextResponse.json<MyResponse<NewWishlistInput>>({ message: "Deleted Wishlist Product" });
    } else {
      return NextResponse.json<MyResponse<NewWishlistInput>>({ message: "Wishlist Product not found" });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json<MyResponse<NewWishlistInput>>(
      {
        error: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}
