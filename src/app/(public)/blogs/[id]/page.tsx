import BlogDetailsPage from '@/components/pages/BlogDetailsPage';
import { notFound } from 'next/navigation';
import connectDB from '@/config/mongodb';
import Blog from '@/server/models/Blog';

async function getBlogData(id: string) {
    try {
        await connectDB();
        const item = await Blog.findById(id);

        if (!item) {
            return null;
        }

        // Find the next project
        const nextBlog = await Blog.findOne({
            createdAt: { $lt: item.createdAt }
        })
            .sort({ createdAt: -1 })
            .select('_id');

        // Find the previous project
        const prevBlog = await Blog.findOne({
            createdAt: { $gt: item.createdAt }
        })
            .sort({ createdAt: 1 })
            .select('_id');

        const plainItem = JSON.parse(JSON.stringify(item));

        return {
            ...plainItem,
            nextBlogId: nextBlog ? nextBlog._id.toString() : null,
            prevBlogId: prevBlog ? prevBlog._id.toString() : null
        };
    } catch (error) {
        console.error('Error fetching blog data:', error);
        return null;
    }
}

export default async function Page({
    params,
}: {
    params: Promise<{ id: string; }>;
}) {
    const { id } = await params;
    const blog = await getBlogData(id);

    if (!blog) {
        notFound();
    }

    return <BlogDetailsPage blogDetails={blog} />;
}
