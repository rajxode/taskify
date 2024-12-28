import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const token = request.cookies.get("token")?.value || "";

    const privatePath = path.startsWith("/dashboard");

    if(!privatePath && token) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    } 

    if(!token && privatePath) {
        return NextResponse.redirect(new URL("/", request.url));
    }
}
 
// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/',
        '/signin',
        '/signup',
        '/dashboard/:path*'
    ],
}