import type { Metadata } from 'next';
import PortfolioDetailsPage from '@/components/pages/PortfolioDetailsPage';
import { notFound } from 'next/navigation';
import connectDB from '@/config/mongodb';
import Portfolio from '@/server/models/Portfolio';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}): Promise<Metadata> {
    const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
    try {
        await connectDB();
        const { id } = await params;
        const project = await Portfolio.findById(id).select('title description image tech').lean();

        if (!project) {
            return {
                title: 'مشروع غير موجود',
                description: 'لم يتم العثور على المشروع المطلوب.',
            };
        }

        const title = (project as any).title ?? 'مشروع برمجي';
        const description =
            (project as any).description ?? 'اكتشف تفاصيل المشروع على Nawjha Tech.';
        const image = (project as any).image ?? '/assets/images/og-image.png';
        const tech: string[] = (project as any).tech ?? [];
        const url = `${BASE_URL}/portfolio/${id}`;

        return {
            title,
            description,
            authors: [{ name: 'Mohamed ALnawjha', url: BASE_URL }],
            keywords: [...tech, 'Nawjha Tech', 'Mohamed ALnawjha', 'مشاريع برمجية', 'portfolio'],
            alternates: { canonical: url },
            openGraph: {
                title: `${title} | Nawjha Tech`,
                description,
                url,
                type: 'article',
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
        return { title: 'Nawjha Tech Portfolio' };
    }
}


async function getProjectData(id: string) {
    try {
        await connectDB();
        const item = await Portfolio.findById(id);

        if (!item) {
            return null;
        }

        // Find the next project
        const nextProject = await Portfolio.findOne({
            createdAt: { $lt: item.createdAt }
        })
            .sort({ createdAt: -1 })
            .select('_id');

        // Find the previous project
        const prevProject = await Portfolio.findOne({
            createdAt: { $gt: item.createdAt }
        })
            .sort({ createdAt: 1 })
            .select('_id');

        const plainItem = JSON.parse(JSON.stringify(item));

        return {
            ...plainItem,
            nextProjectId: nextProject ? nextProject._id.toString() : null,
            prevProjectId: prevProject ? prevProject._id.toString() : null
        };
    } catch (error) {
        console.error('Error fetching project data:', error);
        return null;
    }
}

export default async function Page({
    params,
}: {
    params: Promise<{ id: string; }>;
}) {
    const { id } = await params;
    const project = await getProjectData(id);

    if (!project) {
        notFound();
    }

    return <PortfolioDetailsPage project={project} />;
}
