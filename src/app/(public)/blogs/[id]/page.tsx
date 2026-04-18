import type { Metadata } from 'next';
import BlogDetailsPage from '@/components/pages/BlogDetailsPage';
import { notFound } from 'next/navigation';
import connectDB from '@/config/mongodb';
import Blog from '@/server/models/Blog';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}): Promise<Metadata> {
    const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
    try {
        await connectDB();
        const { id } = await params;
        const blog = await Blog.findById(id).select('title description tags image').lean();

        if (!blog) {
            return {
                title: 'مقالة غير موجودة',
                description: 'لم يتم العثور على المقالة المطلوبة.',
            };
        }

        const title = (blog as any).title ?? 'مقالة تقنية';
        const description = (blog as any).description ?? 'اقرأ المقالة على مدونة Nawjha Tech.';
        const image = (blog as any).image ?? '/assets/images/og-image.png';
        const tags: string[] = (blog as any).tags ?? [];
        const url = `${BASE_URL}/blogs/${id}`;

        return {
            title,
            description,
            authors: [{ name: 'Mohamed ALnawjha', url: BASE_URL }],
            keywords: [...tags, 'Nawjha Tech', 'Mohamed ALnawjha', 'مقالات برمجة', 'تطوير ويب'],
            alternates: { canonical: url },
            openGraph: {
                title: `${title} | Nawjha Tech`,
                description,
                url,
                type: 'article',
                authors: [`${BASE_URL}`],
                images: [{ url: image, width: 1200, height: 630, alt: title }],
                siteName: 'Nawjha Tech',
            },
            twitter: {
                card: 'summary_large_image',
                title: `${title} | Nawjha Tech`,
                description,
                images: [image],
                site: '@nawjha_m',
                creator: '@nawjha_m',
            },
        };
    } catch {
        return { title: 'Nawjha Tech Blog' };
    }
}


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
