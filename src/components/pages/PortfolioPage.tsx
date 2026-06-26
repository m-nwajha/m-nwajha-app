'use client';

import SubPageLayout from '../organisms/SubPageLayout';
import PortfolioItem from '../molecules/PortfolioItem';
import { Grid } from '../ui';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import FilterBar from '../molecules/FilterBar';
import { Typography, Box } from '../ui';
import { PORTFOLIO_DATA } from '@/constants/portfolio';

interface PortfolioPageProps {
    initialProjects?: any[];
}

const PortfolioPage = ({ initialProjects = [] }: PortfolioPageProps) => {
    const [activeFilter, setActiveFilter] = useState('*');
    const [filteredProjects, setFilteredProjects] = useState(initialProjects);

    useEffect(() => {
        if (activeFilter === '*') {
            setFilteredProjects(initialProjects);
        } else {
            setFilteredProjects(initialProjects.filter((item: any) => item.category === activeFilter));
        }
    }, [activeFilter, initialProjects]);

    const breadcrumbs = [
        { label: 'الرئيسية', href: '/' },
        { label: 'الأعمال' },
    ];

    return (
        <SubPageLayout
            title="الأعمال"
            breadcrumbs={breadcrumbs}
            heroTitle="معرض أعمالي"
            heroDescription="اكتشف مجموعة من المشاريع التي قمت بتطويرها وتصميمها"
        >
            <div className="max-w-4xl mx-auto mb-12 bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                <div className="flex items-center justify-center gap-3 mb-3 text-secondary">
                    <i className="bi bi-info-circle-fill text-xl"></i>
                    <Typography variant="h5" color="white" className="font-bold">ملاحظة هامة</Typography>
                </div>
                <Typography className="text-light/70 leading-relaxed text-sm md:text-base">
                    هناك أعمال معروضة هنا تم إنجازها خلال فترة عملي لدى شركة <a href="https://orionlens.net/" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">orionlens</a>، ولا أملك حقوق الكود الخاص بها بالرغم من أنني كنت المطور المسؤول عنها خلال فترة عملي في الشركة.
                </Typography>
            </div>

            <FilterBar
                filters={PORTFOLIO_DATA.filters}
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
                className="mb-12"
            />

            {filteredProjects.length > 0 ? (
                <Grid sm={1} md={2} lg={4} className="gap-6 px-0">
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((item: any, index) => (
                            <motion.div
                                key={String(item._id)}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                layout
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                                className="mb-6 break-inside-avoid"
                            >
                                <PortfolioItem
                                    _id={String(item._id)}
                                    title={item.title}
                                    category={item.category}
                                    image={item.image}
                                    rating={item.rating}
                                    projectUrl={item.projectUrl}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </Grid>
            ) : (
                <div className="text-center py-20">
                    <i className="bi bi-folder-x text-6xl text-secondary/20 mb-6 block"></i>
                    <Typography variant="h3" color="white" className="mb-4">
                        لم يتم العثور على أعمال
                    </Typography>
                    <Typography className="text-light/50">
                        جرب تغيير معايير الفلترة لرؤية المزيد
                    </Typography>
                </div>
            )}
        </SubPageLayout>
    );
};

export default PortfolioPage;
