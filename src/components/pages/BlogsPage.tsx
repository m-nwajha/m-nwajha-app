'use client';

import SubPageLayout from '../organisms/SubPageLayout';
import BlogItem from '../molecules/BlogItem';
import { Grid } from '../ui';
import { motion } from 'framer-motion';

import { useState, useEffect, useCallback, useRef } from 'react';
import FilterBar from '../molecules/FilterBar';
import { AnimatePresence } from 'framer-motion';
import { Input, Typography, Box } from '../ui';
import useAPI from '@/hooks/useAPI';
import Pagination from '../molecules/Pagination';
import { IBlog } from '@/server/models/Blog';
import { BLOGS_DATA } from '@/constants/blogs'; // Keep this for filters for now
import { ENDPOINTS } from '@/constants/endpoints';

interface BlogsPageProps {
    initialBlogs?: any[];
    initialPagination?: { total: number; page: number; limit: number; totalPages: number; };
}

const BlogsPage = ({ initialBlogs = [], initialPagination }: BlogsPageProps) => {
    const [activeFilter, setActiveFilter] = useState('*');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 6;
    const isFirstMount = useRef(true);

    const { data: apiResponse, isLoading, get } = useAPI(ENDPOINTS.blogs);

    const fetchBlogs = useCallback((page: number, filter: string, search: string) => {
        let url = `${ENDPOINTS.blogs}?page=${page}&limit=${pageSize}`;
        if (filter !== '*') url += `&category=${filter}`;
        if (search) url += `&search=${encodeURIComponent(search)}`;
        get(url);
    }, [get]);

    // Fetch when page or filter changes — skip only the very first mount if server data is available
    useEffect(() => {
        if (isFirstMount.current && initialBlogs.length > 0) {
            isFirstMount.current = false;
            return;
        }
        isFirstMount.current = false;
        fetchBlogs(currentPage, activeFilter, searchQuery);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, activeFilter]);

    // Debounced search - only reacts to searchQuery changes
    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentPage(1);
            fetchBlogs(1, activeFilter, searchQuery);
        }, 500);
        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchQuery]);

    const breadcrumbs = [
        { label: 'الرئيسية', href: '/' },
        { label: 'المقالات' },
    ];

    // Use server-provided data as initial state; replaced by API response after client fetch
    const blogs = (apiResponse?.data || initialBlogs) as IBlog[];
    const pagination = apiResponse?.pagination || initialPagination || { totalPages: 1, total: 0 };

    return (
        <SubPageLayout
            title="المقالات"
            breadcrumbs={breadcrumbs}
            heroTitle="مدونة نواجحة التقنية"
            heroDescription="اكتشف أحدث المقالات والدروس التعليمية في مجال البرمجة والتصميم"
        >
            <div className="max-w-2xl mx-auto mb-16 relative">
                <div className="relative group">
                    <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none text-secondary">
                        <i className="bi bi-search text-xl"></i>
                    </div>
                    <Input
                        type="text"
                        placeholder="ابحث عن مقال معين..."
                        className="pr-14 h-16 rounded-[20px] bg-white/5 border-white/10 text-lg focus:border-secondary transition-all"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                {searchQuery && (
                    <Typography className="mt-4 text-center text-light/50 text-sm">
                        نتائج البحث عن: <span className="text-secondary font-medium">"{searchQuery}"</span>
                        {!isLoading && ` (${pagination.total || 0} مقال)`}
                    </Typography>
                )}
            </div>

            <FilterBar
                filters={BLOGS_DATA.filters}
                activeFilter={activeFilter}
                onFilterChange={(f) => {
                    setActiveFilter(f);
                    setCurrentPage(1);
                }}
                className="mb-12"
            />

            {isLoading ? (
                <Box className="flex justify-center py-20">
                    <div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
                </Box>
            ) : blogs.length > 0 ? (
                <>
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
                                        tag={blog.tag}
                                        detailsLink={String(blog._id)}
                                    />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </Grid>

                    <Pagination
                        currentPage={currentPage}
                        totalPages={pagination.totalPages}
                        onPageChange={setCurrentPage}
                    />
                </>
            ) : (
                <div className="text-center py-20">
                    <i className="bi bi-journal-x text-6xl text-secondary/20 mb-6 block"></i>
                    <Typography variant="h3" color="white" className="mb-4">
                        لم يتم العثور على مقالات
                    </Typography>
                    <Typography className="text-light/50">
                        جرب تغيير معايير البحث أو الفلترة لرؤية المزيد
                    </Typography>
                </div>
            )}
        </SubPageLayout>
    );
};

export default BlogsPage;
