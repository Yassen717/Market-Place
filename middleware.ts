import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * The marketplace itself is public — browsing, search and app details
 * need no account. Only member pages are gated. The cookie is a
 * presence signal set at login; Firebase auth state is authoritative
 * on the client.
 */
export function middleware(request: NextRequest) {
  const token =
    request.cookies.get("__session")?.value ||
    request.cookies.get("firebaseToken")?.value;

  if (!token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/upload/:path*", "/profile/:path*"],
};
