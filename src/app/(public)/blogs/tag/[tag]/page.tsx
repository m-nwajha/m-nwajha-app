import BlogTagPage from '@/components/pages/BlogTagPage';
import connectDB from '@/config/mongodb';
import Blog from '@/server/models/Blog';

export async function generateMetadata({ params }: { params: Promise<{ tag: string; }>; }) {
    const { tag: rawTag } = await params;
    const tag = decodeURIComponent(rawTag);
    return {
        title: `مقالات ${tag} | نواجحة تك`,
        description: `جميع المقالات والدروس المتعلقة بـ ${tag} في مدونة نواجحة التقنية`,
    };
}

export default async function BlogTag({ params }: { params: Promise<{ tag: string; }>; }) {
    const { tag } = await params;
    const decodedTag = decodeURIComponent(tag);

    let initialBlogs: any[] = [];

    try {
        await connectDB();
        const items = await Blog.find({ verified: true, tag: decodedTag })
            .sort({ createdAt: -1 })
            .limit(100)
            .lean();

        initialBlogs = items.map(item => ({
            ...item,
            _id: String(item._id),
            createdAt: item.createdAt?.toISOString(),
            updatedAt: item.updatedAt?.toISOString(),
        }));
    } catch (e) {
        console.error('Failed to fetch initial tag blogs on server:', e);
    }

    return <BlogTagPage tag={tag} initialBlogs={initialBlogs} />;
}
