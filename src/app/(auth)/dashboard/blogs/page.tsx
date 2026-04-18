import connectDB from '@/config/mongodb';
import Blog from '@/server/models/Blog';
import BlogsManager from '@/components/organisms/BlogsManager';
import DashboardHero from '@/components/molecules/DashboardHero';

export const metadata = {
    title: 'إدارة المدونة | لوحة التحكم',
};

async function getBlogsData() {
    try {
        await connectDB();
        const items = await Blog.find({}).sort({ createdAt: -1 });
        return JSON.parse(JSON.stringify(items));
    } catch (error) {
        console.error('Error fetching dashboard blogs data:', error);
        return [];
    }
}

export default async function BlogsDashboardPage() {
    const blogs = await getBlogsData();

    return (
        <div className="space-y-8 p-8">
            <DashboardHero
                title="لوحة التحكم"
                subtitle="إدارة المدونة"
                description="قم بكتابة مقالات جديدة، تعديل المقالات الحالية، ومشاركة أحدث التقنيات مع متابعيك."
            />

            <BlogsManager initialBlogs={blogs} />
        </div>
    );
}
