import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/_next/static") || pathname === "/favicon.ico") {
    return NextResponse.next();
  }

  if (pathname === "/auth/sign-in" || pathname === "/auth/sign-up") {
    return NextResponse.next();
  }

  const token = req.cookies.get("token");
  if (!token) {
    return NextResponse.redirect(new URL("/auth/sign-in", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/home", "/:username*", "/bookmarks", "/tweet/:id*"],
};
