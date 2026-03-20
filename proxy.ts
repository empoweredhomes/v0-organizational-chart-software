import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { auth } from "@/auth"
import { isPreviewEnvironment } from "@/lib/env"

// Public routes that don't require authentication
const publicRoutes = ["/login", "/api/auth"]

export default auth((req) => {
  const { pathname } = req.nextUrl
  const hostname = req.nextUrl.hostname

  // Bypass auth in preview environments (v0 preview, localhost)
  if (isPreviewEnvironment(hostname)) {
    return NextResponse.next()
  }

  // Allow public routes
  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next()
  }

  // Allow static files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.includes(".")
  ) {
    return NextResponse.next()
  }

  // Check if user is authenticated
  if (!req.auth?.user) {
    const loginUrl = new URL("/login", req.url)
    loginUrl.searchParams.set("callbackUrl", pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Check admin routes - require is_admin flag
  if (pathname.startsWith("/admin")) {
    if (!req.auth.user.isAdmin) {
      return NextResponse.redirect(new URL("/org-chart", req.url))
    }
  }

  return NextResponse.next()
})

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
