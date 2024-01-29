import { NextRequest, NextResponse } from "next/server";
import { MyResponse, User } from "@/types/type";
import UserModel from "@/db/models/user";

export async function GET(request: NextRequest) {
  const data = await UserModel.findUsers();

  return NextResponse.json<MyResponse<User[]>>({ data });
}
