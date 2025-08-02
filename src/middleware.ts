import { NextRequest, NextResponse } from "next/server";
import middlewareAuth from "./utils/middlewareAuth";

export async function middleware(req: NextRequest) {
  const url = req.url;
  const path = req.nextUrl.pathname;

  if (path.startsWith("/signin")) {
    const user = await middlewareAuth(req);
    if (user) {
      return NextResponse.redirect(new URL("/", url));
    }
  }
  if (path.startsWith("/signup")) {
    const user = await middlewareAuth(req);
    if (user) {
      return NextResponse.redirect(new URL("/", url));
    }
  }
  if (path.startsWith("/profile")) {
    const user = await middlewareAuth(req);
    if (!user) {
      return NextResponse.redirect(new URL(`/signin?page=${path}`, url));
    }
  }
}

export const config = {
  matcher: ["/signin", "/signup", "/profile/:path*"],
};
