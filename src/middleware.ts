import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    const { pathname } = request.nextUrl;
    const apiKey = request.headers.get('x-api-key');

    // 1. API Protection (Must be first for API calls)
    if (pathname.startsWith('/api')) {
        // Skip API key check for auth routes
        if (pathname.startsWith('/api/auth')) {
            return NextResponse.next();
        }
        if (apiKey !== process.env.NEXT_PUBLIC_API_KEY) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized: Invalid API Key' },
                { status: 401 }
            );
        }
    }

    // 2. Protect dashboard routes
    if (pathname.startsWith('/dashboard')) {
        if (!token) {
            return NextResponse.redirect(new URL('/login-app', request.url));
        }
    }

    // 3. Redirect to dashboard if logged in and trying to access login-app page
    if (pathname === '/login-app') {
        if (token) {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/login-app', '/api/:path*'],
};
