import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const url = req.nextUrl;

  const isAdminRoute = url.pathname.startsWith("/admin");

  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (isAdminRoute) {
    const roles = token.role;
    const isAdmin =
      (Array.isArray(roles) && roles.includes("admin")) || roles === "admin";

    if (!isAdmin) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/profile"],
};
