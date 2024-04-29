import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest, res: NextResponse) {
  console.log(req.cookies, "ini cookies");
  console.log(req.cookies.has("token"));
  if (req.cookies.has("token")) {
    return NextResponse.next();
  }

  const redirectResponse = NextResponse.redirect(
    new URL("/auth/sign-in", req.url)
  );
  redirectResponse.headers.set("x-middleware-cache", "no-cache"); // ! FIX: Disable caching
  return redirectResponse;
  // const token = req.cookies.get("token");

  // console.log("here", token);
  // if (!token) {
  //   return NextResponse.redirect(new URL("/auth/sign-in", req.url));
  // }

  // const response = NextResponse.next();

  // response.headers.set(`x-middleware-cache`, `no-cache`);
  // return response;
}

export const config = {
  matcher: ["/home"],
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
