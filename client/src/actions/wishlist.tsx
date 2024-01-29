"use server";

import { cookies } from "next/headers";

export const authorizationToken = cookies().get("Authorization");
