import AddTestimonialPage from '@/components/pages/AddTestimonialPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'إضافة تقييم جديد',
    description: 'إضافة تقييم جديد Nawjha Tech',
}
export default function AddTestimonial() {
    return <AddTestimonialPage />
}
