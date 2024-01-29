import { NextRequest, NextResponse } from "next/server";
import UserModel from "../../../../db/models/user";
import { MyResponse, User } from "@/types/type";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const data = await UserModel.findUserbyId(params.id);

  return NextResponse.json<MyResponse<User>>({ data });
}
