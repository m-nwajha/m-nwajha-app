import connectDB from '@/config/mongodb';
import Testimonial from '@/server/models/Testimonial';
import TestimonialsManager from '@/components/organisms/TestimonialsManager';
import { Container, Typography, Box } from '@/components/ui';

import DashboardHero from '@/components/molecules/DashboardHero';

async function getTestimonialsData() {
    try {
        await connectDB();
        const items = await Testimonial.find({}).sort({ createdAt: -1 });
        return JSON.parse(JSON.stringify(items));
    } catch (error) {
        console.error('Failed to fetch testimonials for dashboard:', error);
        return [];
    }
}

export default async function DashboardTestimonialsPage() {
    const testimonials = await getTestimonialsData();

    return (
        <section className="py-8 px-8">
            <DashboardHero
                title="لوحة التحكم"
                subtitle="أراء العملاء"
                description="أهلاً بك في قسم إدارة أراء العملاء. هنا يمكنك إضافة تقييمات يدوية، مراجعة طلبات التقييم القادمة من الموقع، وتفعيلها بضغطة واحدة."
            />

            <TestimonialsManager initialTestimonials={testimonials} />
        </section>
    );
}
