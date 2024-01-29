import { NextResponse, NextRequest } from "next/server";
import * as jose from "jose";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/api/wishlist")) {
    let cookie = request.cookies.get("Authorization");
    let token = cookie?.value.split(" ")[1] as string;
    // console.log(token, ">>>>>>");

    const secret = new TextEncoder().encode(process.env.JWT_SECRET as string);

    try {
      const verifiedData = await jose.jwtVerify<{ _id: string; username: string }>(token, secret);
      console.log(verifiedData);

      const requestHeaders = new Headers(request.headers);
      requestHeaders.set("x-userid", verifiedData.payload._id);
      requestHeaders.set("x-username", verifiedData.payload.username);
      const response = NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
      return response;
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        {
          message: "Invalid Token",
        },
        {
          status: 401,
        }
      );
    }

    // return NextResponse.redirect(new URL("/login", request.url));
  }

  if (request.nextUrl.pathname.startsWith("/wishlist")) {
    let cookie = request.cookies.get("Authorization");
    let token = cookie?.value.split(" ")[1] as string;
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    {
      return NextResponse.next();
    }
  }

  const response = NextResponse.next();

  return response;
}

// See "Matching Paths" below to learn more
// export const config = {
//   matcher: '/about/:path*',
// }
