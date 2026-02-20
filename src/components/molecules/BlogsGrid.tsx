'use client';

import { Box, Button, Grid } from '../ui';
import { BLOGS_DATA } from '@/constants/blogs';
import BlogItem from './BlogItem';
import { motion, Variants } from 'framer-motion';

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.1,
            duration: 0.5,
            ease: "easeOut"
        }
    })
};

const BlogsGrid = ({ initialItems = [] }: { initialItems?: any[]; }) => {
    // Use server data if available, otherwise fall back to last 3 static items
    const displayItems = initialItems.length > 0
        ? initialItems
        : BLOGS_DATA.items.slice(-3);

    return (
        <div className="w-full flex flex-col items-center">
            <Grid sm={1} md={2} lg={3} gap={6} className='mb-12'>
                {displayItems.map((blog, index) => (
                    <motion.div
                        key={blog._id || blog.id}
                        custom={index}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={cardVariants}
                        className="will-change-transform"
                    >
                        <BlogItem
                            title={blog.title}
                            category={blog.category}
                            description={blog.description}
                            rating={blog.rating}
                            image={blog.image}
                            tech={blog.tech}
                            detailsLink={String(blog._id)}
                        />
                    </motion.div>
                ))}
            </Grid>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5 }}
            >
                <Box display='flex' justifyContent='center'>
                    <Button variant='outline' className='group' href='/blogs'>
                        مشاهدة المزيد
                        <i className='bi bi-arrow-left mx-1 transition-all ease-in group-hover:mr-2'></i>
                    </Button>
                </Box>
            </motion.div>
        </div>
    );
};

export default BlogsGrid;

