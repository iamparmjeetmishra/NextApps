import { NextResponse, NextRequest } from "next/server";


export function middleware(request: NextRequest) {
   const path = request.nextUrl.pathname

   const isPublicPath =
      path === '/login' ||
      path === '/sign-up' ||
      path === '/verifyemail'

   const token = request.cookies.get('token')?.value || ''

   if (isPublicPath && token) {
      return NextResponse.redirect(new URL('/', request.nextUrl))
   }
   if (!isPublicPath && !token) {
      return NextResponse.redirect(new URL('/login', request.nextUrl))
   }

   if (request.nextUrl.pathname.startsWith("/_next")) {
      return NextResponse.next();
      }
}


// Matching Paths
export const config = {
   mathcer: [
      '/',
      '/login',
      '/sign-up',
      '/verifyemail',
      '/profile'
   ]
}