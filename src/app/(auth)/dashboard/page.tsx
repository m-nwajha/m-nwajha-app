import HomeDashboard from '@/components/pages/HomeDashboard';
import connectDB from '@/config/mongodb';
import Blog from '@/server/models/Blog';
import Contact from '@/server/models/Contact';
import Portfolio from '@/server/models/Portfolio';
import Testimonial from '@/server/models/Testimonial';

export const metadata = {
    title: 'نظرة عامة | لوحة التحكم',
};

async function getStats() {
    try {
        await connectDB();
        const totalBlogs = await Blog.countDocuments();
        const totalContacts = await Contact.countDocuments();
        const unreadContacts = await Contact.countDocuments({ isRead: false });
        const totalProjects = await Portfolio.countDocuments();
        const totalTestimonials = await Testimonial.countDocuments();

        // Mock visitor data (as no actual analytics model exists)
        const totalVisitors = 1250; // Mocked
        const dailyVisitorsTrend = "+12%"; // Mocked

        return {
            totalBlogs,
            totalContacts,
            unreadContacts,
            totalProjects,
            totalTestimonials,
            totalVisitors,
            dailyVisitorsTrend
        };
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        return {
            totalBlogs: 0,
            totalContacts: 0,
            unreadContacts: 0,
            totalProjects: 0,
            totalTestimonials: 0,
            totalVisitors: 0,
            dailyVisitorsTrend: "0%"
        };
    }
}

export default async function Dashboard() {
    const stats = await getStats();
    return <HomeDashboard stats={stats} />;
}