import { NextRequest } from 'next/server';
import { getBlogs, createBlog } from '@/server/controllers/blogController';

export async function GET(req: NextRequest) {
    return getBlogs(req);
}

export async function POST(req: NextRequest) {
    return createBlog(req);
}
