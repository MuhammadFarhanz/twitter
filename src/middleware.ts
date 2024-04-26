import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest, res: NextResponse) {
  const token = req.cookies.get("token");

  console.log("here", token, req.cookies.has("token"));
  if (!token) {
    return NextResponse.redirect(new URL("/auth/sign-in", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/home", "/user"],
};

// import { NextRequest, NextResponse } from "next/server";

// export async function middleware(req: any, res: NextResponse) {
//   const token = req.cookies.get("token")?.value;

//   console.log("here", req, token);
//   if (!token) {
//     return NextResponse.redirect(new URL("/auth/sign-in", req.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/", "/user"],
// };
