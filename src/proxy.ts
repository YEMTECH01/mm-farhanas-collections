import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isOnAdminPage = req.nextUrl.pathname.startsWith("/admin");
  const isOnLoginPage = req.nextUrl.pathname === "/admin/login";

  // If they are trying to access admin but aren't logged in, send to login
  if (isOnAdminPage && !isLoggedIn && !isOnLoginPage) {
    return NextResponse.redirect(new URL("/admin/login", req.nextUrl));
  }

  // If they are already logged in and try to go to login page, send to dashboard
  if (isOnLoginPage && isLoggedIn) {
    return NextResponse.redirect(new URL("/admin", req.nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*"],
};
