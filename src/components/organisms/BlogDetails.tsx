'use client';
import { Container, Grid } from '../ui';
import BlogDetailsMedia from '../molecules/BlogDetailsMedia';
import BlogDetailsContent from '../molecules/BlogDetailsContent';
import { motion } from 'framer-motion';

interface BlogDetailsProps {
    blog: {
        _id: string;
        title: string;
        category: string;
        image: string;
        videoUrl?: string;
        description: string;
        content?: string;
        tag?: string[];
        rating?: number;
        createdAt?: string;
    };
}

const BlogDetails = ({ blog }: BlogDetailsProps) => {
    if (!blog) return null;

    return (
        <Container className="relative z-10 py-24">
            <Grid gap={12} sm={1} md={1} lg={2} className="items-start">
                {/* Media Section */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <BlogDetailsMedia
                        image={blog.image}
                        videoUrl={blog.videoUrl}
                    />
                </motion.div>

                {/* Content Section */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <BlogDetailsContent blog={blog} />
                </motion.div>
            </Grid>
        </Container>
    );
};

export default BlogDetails;
