import { NextRequest } from 'next/server';
import { getBlogById, updateBlog, deleteBlog } from '@/server/controllers/blogController';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string; }>; }) {
    const { id } = await params;
    return getBlogById(id);
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string; }>; }) {
    const { id } = await params;
    return updateBlog(id, req);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string; }>; }) {
    const { id } = await params;
    return deleteBlog(id);
}
