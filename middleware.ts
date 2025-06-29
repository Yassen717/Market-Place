import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // You may need to adjust the cookie name depending on your Firebase setup
  const token = request.cookies.get('__session')?.value || request.cookies.get('firebaseToken')?.value;

  // Allow access to login and signup pages without authentication
  if (pathname.startsWith('/login') || pathname.startsWith('/signup')) {
    if (token) {
      // If already authenticated, redirect to home
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  // For all other pages, require authentication
  if (!token) {
    // Redirect to signup (or login)
    return NextResponse.redirect(new URL('/signup', request.url));
  }

  // If authenticated, allow access
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|favicon.ico|public|assets|api).*)'],
}; 