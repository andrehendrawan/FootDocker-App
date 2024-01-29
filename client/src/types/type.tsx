import { ObjectId } from "mongodb";

export type MyResponse<T> = {
  message?: string;
  error?: string;
  data?: T | null | undefined;
};

export type FindProductResponse = {
  data: Product[];
  count: number;
  pages: number;
};

export type User = {
  _id: ObjectId;
  name: string;
  username: string;
  email: string;
  password: string;
};

export type NewUserInput = Omit<User, "_id">;

export type Product = {
  _id: ObjectId;
  name: string;
  slug: string;
  description: string;
  excerpt: string;
  price: number;
  brand: string;
  tags: string[];
  thumbnail: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
};

export type NewProductInput = Omit<Product, "_id">;

export type ProductResponse = {
  data: Product[];
};

export type Wishlist = {
  _id: ObjectId;
  userId: ObjectId;
  productId: ObjectId;
  createdAt: string;
  updatedAt: string;
  products: Product;
  users: User;
};

export type NewWishlistInput = Omit<Wishlist, "_id">;
