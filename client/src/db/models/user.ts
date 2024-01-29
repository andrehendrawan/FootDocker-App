import { NewUserInput, User } from "@/types/type";
import { getCollection } from "../config";
import { hashPassword } from "../helpers/bcrypt";
import { z } from "zod";
import { ObjectId } from "mongodb";

const UserInputSchema = z.object({
  name: z.string(),
  username: z.string(),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(5, { message: "Must be 5 or more characters long" }),
});

class UserModel {
  static getCollection() {
    return getCollection("Users");
  }

  static async findUsers() {
    return (await this.getCollection().find().toArray()) as User[];
  }

  static async Register(newUser: NewUserInput) {
    const parseResult = UserInputSchema.safeParse(newUser);
    if (!parseResult.success) {
      console.log(parseResult.error);
      throw parseResult.error;
    }
    const uniqueUser = await this.getCollection().findOne({
      username: newUser.username,
    });
    if (uniqueUser) {
      throw new Error("Username has been taken");
    }
    return await this.getCollection().insertOne({
      ...newUser,
      password: hashPassword(newUser.password),
    });
  }

  static async findUserbyId(id: string) {
    const objId = new ObjectId(id);
    return (await this.getCollection().findOne(
      {
        _id: objId,
      },
      {
        projection: { password: 0 },
      }
    )) as User | null;
  }

  static async findUserbyUsername(username: string) {
    return (await this.getCollection().findOne({
      username: username,
    })) as User | null;
  }
}

export default UserModel;
