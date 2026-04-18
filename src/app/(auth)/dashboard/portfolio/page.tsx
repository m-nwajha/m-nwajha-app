import { notFound } from 'next/navigation';
import connectDB from '@/config/mongodb';
import Portfolio from '@/server/models/Portfolio';
import PortfolioManager from '@/components/organisms/PortfolioManager';

import DashboardHero from '@/components/molecules/DashboardHero';

export const metadata = {
    title: 'إدارة الأعمال | لوحة التحكم',
};

async function getPortfolioData() {
    try {
        await connectDB();
        const items = await Portfolio.find({}).sort({ createdAt: -1 });
        return JSON.parse(JSON.stringify(items));
    } catch (error) {
        console.error('Error fetching dashboard portfolio data:', error);
        return [];
    }
}

export default async function PortfolioDashboardPage() {
    const projects = await getPortfolioData();

    return (
        <div className="space-y-8 p-8">
            <DashboardHero
                title="لوحة التحكم"
                subtitle="إدارة الأعمال"
                description="قم بإدارة أعمالك السابقة، إضافة مشاريع جديدة، وتحسين ظهورك للعملاء."
            />

            <PortfolioManager initialProjects={projects} />
        </div>
    );
}
