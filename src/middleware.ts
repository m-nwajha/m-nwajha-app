import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // Only protect routes starting with /api
    if (request.nextUrl.pathname.startsWith('/api')) {
        const apiKey = request.headers.get('x-api-key');
        const validApiKey = process.env.NEXT_PUBLIC_API_KEY;

        // Skip check if no API_KEY is defined (e.g. for development convenience if needed, 
        // but here we expect it to be defined)
        if (!validApiKey || apiKey !== validApiKey) {
            return NextResponse.json(
                { error: '🚫 Unauthorized: Invalid or missing API Key' },
                { status: 401 }
            );
        }
    }

    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: '/api/:path*',
};
