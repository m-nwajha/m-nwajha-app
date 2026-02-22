'use client';

import { FC } from 'react';
import { Typography, Badge } from '../ui';
import { motion } from 'framer-motion';
import BlogRatingScale from '../atoms/BlogRatingScale';
import BlogSocialShare from '../molecules/BlogSocialShare';
import BlogComments from '../molecules/BlogComments';
import Link from 'next/link';

interface BlogDetailsContentProps {
    blog: {
        _id: string;
        title: string;
        category: string;
        description: string;
        content?: string;
        rating?: number;
        createdAt?: string;
        tag?: string[];
    };
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
} as const;

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" }
    }
} as const;

const BlogDetailsContent: FC<BlogDetailsContentProps> = ({ blog }) => {
    const displayDate = blog.createdAt
        ? new Date(blog.createdAt).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })
        : 'قريباً';

    // In a real app, this would be the actual page URL
    const pageUrl = typeof window !== 'undefined' ? window.location.href : '';

    return (
        <motion.div
            className="blog-details-content flex flex-col h-full lg:pl-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
        >
            <motion.div className="blog-meta flex flex-wrap justify-between items-center mb-6 gap-4" variants={itemVariants}>
                <div className="badge-wrapper">
                    <Badge variant="outline" className="text-secondary bg-secondary/10 border-secondary/20 font-semibold px-4 py-2">
                        {blog.category}
                    </Badge>
                </div>
                <div className="meta-item flex items-center text-sm text-light/70 font-medium">
                    <i className="bi bi-calendar-check text-secondary ml-2"></i>
                    <span>{displayDate}</span>
                </div>
            </motion.div>

            <motion.div variants={itemVariants}>
                <Typography variant="h2" color='white' size="h2" className="font-bold mb-6 leading-tight">
                    {blog.title}
                </Typography>
            </motion.div>

            <motion.div variants={itemVariants}>
                <Typography className="lead text-xl leading-relaxed text-light/90 mb-8 border-r-4 border-secondary pr-6 italic bg-white/5 py-4 rounded-l-2xl">
                    {blog.description}
                </Typography>
            </motion.div>

            <motion.div variants={itemVariants} className="blog-main-content">
                <div
                    className="prose prose-invert max-w-none text-light/80 leading-loose text-lg"
                    dangerouslySetInnerHTML={{ __html: blog.content || '<p>لا يوجد محتوى متاح حالياً.</p>' }}
                />
            </motion.div>

            {/* Tags/Slug Section for SEO */}

            {blog.tag && blog.tag.length > 0 && (
                <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-light/50 text-sm">الوسوم:</span>

                    <div className="tag-badges flex flex-wrap gap-2 mt-6">
                        {blog.tag.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.5 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                            >
                                <Link href={`/blogs/tag/${encodeURIComponent(item)}`} className="block transform transition-transform hover:scale-105 active:scale-95">
                                    <Badge variant="outline" showHash={true} className="cursor-pointer hover:border-secondary/40 hover:bg-secondary/5">
                                        {item}
                                    </Badge>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}

            {/* Social Share */}
            <motion.div variants={itemVariants}>
                <BlogSocialShare title={blog.title} url={pageUrl} />
            </motion.div>

            {/* Rating */}
            <motion.div variants={itemVariants}>
                <BlogRatingScale blogId={blog._id} initialRating={blog.rating} />
            </motion.div>

            {/* Comments */}
            {/* <motion.div variants={itemVariants} className="mt-8">
                <BlogComments />
            </motion.div> */}
        </motion.div>
    );
};

export default BlogDetailsContent;
