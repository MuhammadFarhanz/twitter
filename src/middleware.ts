import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest, res: NextResponse) {
  const token = req.cookies.get("token");

  if (!token) {
    return NextResponse.redirect(new URL("/auth/sign-in", req.url));
  }

  const response = NextResponse.next();

  response.headers.set(`x-middleware-cache`, `no-cache`);
  return response;
}

export const config = {
  matcher: ["/home", "/[username]", "/bookmarks", "/tweet/[id]"],
};
