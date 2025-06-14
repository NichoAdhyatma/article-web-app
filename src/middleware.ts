import { NextRequest, NextResponse } from "next/server";
import { authRoleName, authTokenName } from "./lib/constants";

const PUBLIC_PATHS = ["/auth/login", "/auth/register"];
const PRIVATE_PATHS = [
  "/profile",
  "/article",
  "/admin/article",
  "/admin/category",
  "/admin/profile",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authCookie = request.cookies.get(authTokenName);
  const role = request.cookies.get(authRoleName);

  const isPublicPath = PUBLIC_PATHS.includes(pathname);
  const isPrivatePath = PRIVATE_PATHS.some((path) => pathname.startsWith(path));

  if (!authCookie && isPrivatePath) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (authCookie && isPublicPath) {
    if (role && role.value === "Admin") {
      return NextResponse.redirect(new URL("/admin/article", request.url));
    } else if (role && role.value === "User") {
      return NextResponse.redirect(new URL("/article", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
