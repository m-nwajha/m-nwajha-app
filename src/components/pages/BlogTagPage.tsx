'use client';

import React, { useEffect, useCallback, useRef } from 'react';
import SubPageLayout from '../organisms/SubPageLayout';
import BlogItem from '../molecules/BlogItem';
import { Grid, Typography, Box } from '../ui';
import { motion, AnimatePresence } from 'framer-motion';
import useAPI from '@/hooks/useAPI';
import { IBlog } from '@/server/models/Blog';
import { ENDPOINTS } from '@/constants/endpoints';

interface BlogTagPageProps {
    tag: string;
    initialBlogs?: any[];
}

const BlogTagPage = ({ tag, initialBlogs = [] }: BlogTagPageProps) => {
    const decodedTag = decodeURIComponent(tag);
    const { data: apiResponse, isLoading, get } = useAPI(ENDPOINTS.blogs);
    const isFirstMount = useRef(true);

    const fetchBlogs = useCallback(() => {
        get(`${ENDPOINTS.blogs}?tag=${encodeURIComponent(decodedTag)}&limit=100`);
    }, [decodedTag, get]);

    useEffect(() => {
        if (isFirstMount.current && initialBlogs.length > 0) {
            isFirstMount.current = false;
            return;
        }
        isFirstMount.current = false;
        fetchBlogs();
    }, [fetchBlogs]);

    const blogs = (apiResponse?.data || []) as IBlog[];

    const breadcrumbs = [
        { label: 'الرئيسية', href: '/' },
        { label: 'المقالات', href: '/blogs' },
        { label: `هاشتاج: ${decodedTag}` },
    ];

    return (
        <SubPageLayout
            title={`هاشتاج: ${decodedTag}`}
            breadcrumbs={breadcrumbs}
            heroTitle={`مواضيع متعلقة بـ ${decodedTag}`}
            heroDescription={`استكشف جميع المقالات والدروس التي تتناول ${decodedTag}`}
        >
            {isLoading ? (
                <Box className="flex justify-center py-20">
                    <div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
                </Box>
            ) : blogs.length > 0 ? (
                <Grid sm={1} md={2} lg={3} gap={8}>
                    <AnimatePresence mode="popLayout">
                        {blogs.map((blog, index) => (
                            <motion.div
                                key={String(blog._id)}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                layout
                                transition={{ duration: 0.4, delay: index * 0.05 }}
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
                    </AnimatePresence>
                </Grid>
            ) : (
                <div className="text-center py-20">
                    <i className="bi bi-hash text-6xl text-secondary/20 mb-6 block"></i>
                    <Typography variant="h3" color="white" className="mb-4">
                        لا توجد مقالات بهذا الهاشتاج حالياً
                    </Typography>
                    <Typography className="text-light/50">
                        جرب البحث عن مواضيع أخرى أو تصفح جميع المقالات
                    </Typography>
                </div>
            )}
        </SubPageLayout>
    );
};

export default BlogTagPage;
