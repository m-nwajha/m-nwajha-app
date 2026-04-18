import BlogsPage from '@/components/pages/BlogsPage';
import connectDB from '@/config/mongodb';
import Blog from '@/server/models/Blog';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export const metadata = {
    title: 'المقالات التقنية',
    description:
        'مدونة Nawjha Tech بقلم Mohamed ALnawjha — أحدث المقالات والدروس التعليمية في عالم البرمجة: JavaScript، TypeScript، React، Next.js، Node.js، MongoDB، والتطوير الكامل Full-Stack.',
    keywords: [
        'مقالات برمجة',
        'Mohamed ALnawjha blog',
        'Nawjha Tech blog',
        'دروس JavaScript',
        'Next.js مقالات',
        'React تعليم',
        'Node.js شرح',
        'مدونة تقنية عربية',
        'تطوير ويب',
        'TypeScript tutorial',
    ],
    alternates: {
        canonical: `${BASE_URL}/blogs`,
    },
    openGraph: {
        title: 'المقالات التقنية | Nawjha Tech',
        description:
            'أحدث المقالات والدروس في البرمجة وتطوير الويب — JavaScript، React، Next.js، Node.js وأكثر.',
        url: `${BASE_URL}/blogs`,
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'المقالات التقنية | Nawjha Tech',
        description: 'أحدث المقالات والدروس في البرمجة وتطوير الويب.',
    },
};

const PAGE_SIZE = 6;

export default async function Blogs() {
    let initialBlogs: any[] = [];
    let initialPagination = { total: 0, page: 1, limit: PAGE_SIZE, totalPages: 1 };

    try {
        await connectDB();
        const [total, items] = await Promise.all([
            Blog.countDocuments({ verified: true }),
            Blog.find({ verified: true }).sort({ createdAt: -1 }).limit(PAGE_SIZE).lean()
        ]);

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
