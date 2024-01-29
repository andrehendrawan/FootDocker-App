import { NewProductInput, Product } from "@/types/type";
import { z } from "zod";
import { getCollection } from "../config";

const ProductInputSchema = z.object({
  name: z.string(),
  slug: z.string(),
  description: z.string().optional(),
  excerpt: z.string().optional(),
  price: z.number().optional(),
  tags: z.array(z.string()).optional(),
  thumbnail: z.string().optional(),
  images: z.array(z.string()).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

class ProductModel {
  static getCollection() {
    return getCollection("Products");
  }

  static async createProduct(newProduct: NewProductInput) {
    const parseResult = ProductInputSchema.safeParse(newProduct);
    if (!parseResult.success) {
      console.log(parseResult.error);
      throw parseResult.error;
    }
    return await this.getCollection().insertOne({
      ...newProduct,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  static async findProduct(search?: string, page: number = 1, limit: number = 10): Promise<Product[]> {
    if (search) {
      const filter = { name: { $regex: search, $options: "i" } };
      return (await this.getCollection().find(filter).toArray()) as Product[];
    } else if (page && limit) {
      const skip = (page - 1) * limit;
      // const data = await this.getCollection().find().skip(skip).limit(limit).toArray();
      const count = await this.getCollection().countDocuments({});
      const pages = Math.ceil(count / limit);
      // console.log(count, "<<<<<< ini count", limit, "<<<<<< ini limit", pages, "<<<< ini pages");

      return (await this.getCollection().find().skip(skip).limit(limit).toArray()) as Product[];
    } else {
      return (await this.getCollection().find().toArray()) as Product[];
    }
  }

  static async findProductbyId(slug: string) {
    return (await this.getCollection().findOne({
      slug: slug,
    })) as Product | null;
  }
}

export default ProductModel;
