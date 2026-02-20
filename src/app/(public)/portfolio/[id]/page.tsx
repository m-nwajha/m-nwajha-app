import PortfolioDetailsPage from '@/components/pages/PortfolioDetailsPage';
import { notFound } from 'next/navigation';
import connectDB from '@/config/mongodb';
import Portfolio from '@/server/models/Portfolio';

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
