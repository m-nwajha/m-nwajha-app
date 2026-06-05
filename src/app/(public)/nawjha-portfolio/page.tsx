import type { Metadata } from 'next';
export const dynamic = 'force-dynamic';
import PortfolioPage from '@/components/pages/PortfolioPage';
import connectDB from '@/config/mongodb';
import Portfolio from '@/server/models/Portfolio';

export const metadata: Metadata = {
    title: 'الأعمال | Mohamed ALnawjha',
    description: 'معرض أعمالي التي قمت بتطويرها وتصميمها',
    robots: {
        index: false,
        follow: false,
    },
};

async function getPortfolioData() {
    try {
        const items = await Portfolio.find({}).sort({ createdAt: -1 }).lean();
        return items.map(item => ({
            ...item,
            _id: String(item._id)
        }));
    } catch (error) {
        console.error('Error fetching portfolio data:', error);
        return [];
    }
}

export default async function PortfolioPageContainer() {
    await connectDB();
    const portfolioData = await getPortfolioData();

    return <PortfolioPage initialProjects={portfolioData} />;
}
