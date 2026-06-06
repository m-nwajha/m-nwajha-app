'use client';
import { ADD_TESTIMONIAL } from '@/constants/testimonials';
import TestimonialForm from '../organisms/TestimonialForm';

import SubPageLayout from '../organisms/SubPageLayout';

const AddTestimonialPage = () => {
    const { title, breadcrumbs, hero } = ADD_TESTIMONIAL;
    return (
        <SubPageLayout
            title={title}
            breadcrumbs={breadcrumbs}
            heroTitle={hero?.title}
            heroDescription={hero?.supTitle}
        >
            <TestimonialForm />
        </SubPageLayout>
    );
};

export default AddTestimonialPage;