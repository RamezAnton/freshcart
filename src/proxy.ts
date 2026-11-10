import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";

const protectedRoutes = ["/profile", "/wishlist", "/orders", "/settings", "/checkout"];
const authRoutes = ["/login", "/register"];

export default async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET,
  });

  if (!token && protectedRoutes.some((path) => pathname === path || pathname.startsWith(`${path}/`))) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", `${pathname}${search}`);
    return NextResponse.redirect(loginUrl);
  }
  if (token && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/register",
    "/profile/:path*",
    "/wishlist/:path*",
    "/orders/:path*",
    "/settings/:path*",
    "/checkout/:path*",
  ],
};
