import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export function middleware(req: NextRequest, res: NextResponse) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("token");
  if (accessToken) {
    return NextResponse.next();
  }

  const redirectResponse = NextResponse.redirect(
    new URL("/auth/sign-in", req.url)
  );

  redirectResponse.headers.set("x-middleware-cache", "no-cache"); // ! FIX: Disable caching
  return redirectResponse;
  //   const token = req.cookies.get("token")?.value;

  //   console.log("here", token);
  //   if (!token) {
  //     return NextResponse.redirect(new URL("/auth/sign-in", req.url));
  //   }

  //   const response = NextResponse.next();

  //   response.headers.set(`x-middleware-cache`, `no-cache`);
  //   return response;
  // }
}

export const config = {
  matcher: ["/home"],
};
