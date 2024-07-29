import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
  const { pathname } = request.nextUrl;

  // If there's no token and the user is not on the signin page, redirect to signin
  if (!token && pathname !== "/auth/signin") {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  // If there's a token and the user is on the signin page or root, redirect to dashboard
  if (token && (pathname === "/auth/signin" || pathname === "/")) {
    return NextResponse.redirect(
      new URL("/dashboard/tarih-forecast", request.url)
    );
  }

  // For all other cases, continue with the request
  return NextResponse.next();
}

// Specify which routes this middleware should run for
export const config = {
  matcher: ["/", "/auth/signin", "/dashboard/:path*"],
};
