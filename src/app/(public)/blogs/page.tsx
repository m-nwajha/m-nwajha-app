import BlogsPage from '@/components/pages/BlogsPage';
import connectDB from '@/config/mongodb';
import Blog from '@/server/models/Blog';

export const metadata = {
    title: 'المقالات | نواجحة تك',
    description: 'مدونة نواجحة التقنية - اكتشف أحدث المقالات والدروس التعليمية في مجال البرمجة والتصميم',
};

const PAGE_SIZE = 6;

export default async function Blogs() {
    let initialBlogs: any[] = [];
    let initialPagination = { total: 0, page: 1, limit: PAGE_SIZE, totalPages: 1 };

    try {
        await connectDB();
        const total = await Blog.countDocuments({ verified: true });
        const items = await Blog.find({ verified: true })
            .sort({ createdAt: -1 })
            .limit(PAGE_SIZE)
            .lean(); // lean() returns plain objects (serializable), not Mongoose documents

        initialBlogs = items.map(item => ({
            ...item,
            _id: String(item._id),
            createdAt: item.createdAt?.toISOString(),
            updatedAt: item.updatedAt?.toISOString(),
        }));

        initialPagination = {
            total,
            page: 1,
            limit: PAGE_SIZE,
            totalPages: Math.ceil(total / PAGE_SIZE),
        };
    } catch (e) {
        // Fallback: client will fetch when mounted
        console.error('Failed to fetch initial blogs on server:', e);
    }

    return <BlogsPage initialBlogs={initialBlogs} initialPagination={initialPagination} />;
}
