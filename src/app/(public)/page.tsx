import type { Metadata } from 'next';
export const dynamic = 'force-dynamic';
import HomePage from '@/components/pages/HomePage';
import connectDB from '@/config/mongodb';
import Portfolio from '@/server/models/Portfolio';
import Testimonial from '@/server/models/Testimonial';
import Blog from '@/server/models/Blog';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export const metadata: Metadata = {
  title: 'Nawjha Tech | Mohamed ALnawjha - Full-Stack JavaScript Engineer',
  description:
    'Mohamed ALnawjha — Full-Stack JavaScript Engineer with 3+ years of experience in JavaScript & TypeScript. I build landing pages, portfolio sites, and full e-commerce stores using React, Next.js, Node.js & MongoDB.',
  keywords: [
    'Mohamed ALnawjha',
    'محمد النواجحة',
    'Nawjha Tech',
    'Full-Stack Developer',
    'برمجة صفحة هبوط',
    'برمجة موقع تعريفي',
    'متجر إلكتروني',
    'React Next.js Developer',
    'Node.js Express.js',
    'MongoDB TypeScript',
    'تطوير مواقع الويب',
    'مطور ويب فري لانس',
  ],
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: 'Nawjha Tech | Mohamed ALnawjha - Full-Stack Developer',
    description:
      'Mohamed ALnawjha — Full-Stack Developer with 3+ years of experience. 50+ completed projects and 30+ happy clients.',
    url: BASE_URL,
    type: 'website',
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
async function getTestimonialData() {
  try {
    const items = await Testimonial.find({ verified: true }).lean();
    return items.map((item) => ({
      ...item,
      _id: String(item._id)
    }));
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
}

async function getBlogsData() {
  try {
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
  await connectDB();
  const [portfolioData, testimonialData, blogsData] = await Promise.all([
    getPortfolioData(),
    getTestimonialData(),
    getBlogsData(),
  ]);

  return <HomePage portfolioData={portfolioData} testimonialData={testimonialData} blogsData={blogsData} />;
}
