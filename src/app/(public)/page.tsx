import HomePage from '@/components/pages/HomePage';
import connectDB from '@/config/mongodb';
import Portfolio from '@/server/models/Portfolio';
import Testimonial from '@/server/models/Testimonial';
import Blog from '@/server/models/Blog';

async function getPortfolioData() {
  try {
    await connectDB();
    const items = await Portfolio.find({}).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(items));
  } catch (error) {
    console.error('Error fetching portfolio data:', error);
    return [];
  }
}

async function getTestimonialData() {
  try {
    await connectDB();
    const items = await Testimonial.find({ verified: true }).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(items));
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
}

async function getBlogsData() {
  try {
    await connectDB();
    const items = await Blog.find({ verified: true })
      .sort({ createdAt: -1 })
      .limit(3)
      .lean();
    return items.map(item => ({
      ...item,
      _id: String(item._id),
      createdAt: (item.createdAt as Date)?.toISOString(),
      updatedAt: (item.updatedAt as Date)?.toISOString(),
    }));
  } catch (error) {
    console.error('Error fetching blogs data:', error);
    return [];
  }
}

export default async function Home() {
  const [portfolioData, testimonialData, blogsData] = await Promise.all([
    getPortfolioData(),
    getTestimonialData(),
    getBlogsData(),
  ]);

  return <HomePage portfolioData={portfolioData} testimonialData={testimonialData} blogsData={blogsData} />;
}
