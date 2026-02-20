'use client';

import SectionHeading from '../atoms/SectionHeading';
import { Container } from '../ui';
import BlogsGrid from '../molecules/BlogsGrid';
import { BLOGS_DATA } from '@/constants/blogs';

const Blogs = ({ blogs = [] }: { blogs?: any[]; }) => {
    return (
        <section id='blogs' className='py-20'>
            <Container>
                <SectionHeading
                    title={BLOGS_DATA.title}
                    className='after:bg-[url(/assets/images/keyboard.svg)] after:h-30 after:w-30 after:-bottom-10 after:-right-35'
                />

                <BlogsGrid initialItems={blogs} />
            </Container>
        </section>
    );
};

export default Blogs;
