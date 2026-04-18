import type { MetadataRoute } from 'next';
import connectDB from '@/config/mongodb';
import Portfolio from '@/server/models/Portfolio';
import Blog from '@/server/models/Blog';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    /* ── Static routes ── */
    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: BASE_URL,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },
        {
            url: `${BASE_URL}/blogs`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
    ];

    /* ── Dynamic: Portfolio projects ── */
    let portfolioRoutes: MetadataRoute.Sitemap = [];
    try {
        await connectDB();
        const projects = await Portfolio.find({}).select('_id updatedAt').lean();
        portfolioRoutes = projects.map((p: any) => ({
            url: `${BASE_URL}/portfolio/${p._id}`,
            lastModified: p.updatedAt ? new Date(p.updatedAt) : new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        }));
    } catch {
        // silently skip if DB is unavailable at build time
    }

    /* ── Dynamic: Blog posts ── */
    let blogRoutes: MetadataRoute.Sitemap = [];
    try {
        const blogs = await Blog.find({ verified: true }).select('_id updatedAt').lean();
        blogRoutes = blogs.map((b: any) => ({
            url: `${BASE_URL}/blogs/${b._id}`,
            lastModified: b.updatedAt ? new Date(b.updatedAt) : new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.6,
        }));
    } catch {
        // silently skip if DB is unavailable at build time
    }

    return [...staticRoutes, ...portfolioRoutes, ...blogRoutes];
}
