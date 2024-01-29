import { NewWishlistInput, Wishlist } from "@/types/type";
import { getCollection } from "../config";
import { NextRequest } from "next/server";
import { ObjectId } from "mongodb";

class WishlistModel {
  static getCollection() {
    return getCollection("Wishlists");
  }

  static async createWishlist(userId: any, productId: string) {
    const agg = [
      {
        $match: {
          productId: new ObjectId(productId),
        },
      },
      {
        $match: {
          userId: new ObjectId(userId),
        },
      },
    ];
    const findWishlist = await this.getCollection().aggregate(agg).toArray();

    if (findWishlist.length === 0) {
      return await this.getCollection().insertOne({
        userId: new ObjectId(userId),
        productId: new ObjectId(productId),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    } else {
      throw new Error("Already added this product");
    }
  }

  static async findWishlistByUserId(userId: any) {
    const agg = [
      {
        $match: {
          userId: new ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "Users",
          localField: "userId",
          foreignField: "_id",
          as: "users",
        },
      },
      {
        $lookup: {
          from: "Products",
          localField: "productId",
          foreignField: "_id",
          as: "products",
        },
      },
      {
        $unwind: {
          path: "$users",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: "$products",
          preserveNullAndEmptyArrays: true,
        },
      },
    ];
    return (await this.getCollection().aggregate(agg).toArray()) as Wishlist[];
  }

  static async deleteWishlist(userId: any, productId: string) {
    const deleteResult = await this.getCollection().deleteOne({
      userId: new ObjectId(userId),
      productId: new ObjectId(productId),
    });

    return deleteResult.deletedCount || 0;
  }
}

export default WishlistModel;
