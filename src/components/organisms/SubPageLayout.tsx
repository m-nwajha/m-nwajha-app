'use client';

import React from 'react';
import { Container, Typography } from '../ui';
import PageTitle from '../atoms/PageTitle';
import { CN } from '@/utils/className';
import { motion } from 'framer-motion';

interface SubPageLayoutProps {
    title: string;
    breadcrumbs: { label: string; href?: string; }[];
    children: React.ReactNode;
    heroTitle?: string;
    heroDescription?: string;
    className?: string;
    id?: string;
    withContainer?: boolean;
}

const SubPageLayout = ({
    title,
    breadcrumbs,
    children,
    heroTitle,
    heroDescription,
    className,
    id = 'hero',
    withContainer = true
}: SubPageLayoutProps) => {
    return (
        <section className={CN("min-h-screen bg-dark pb-24 relative overflow-hidden flex flex-col", className)} id={id}>
            {/* Premium Background Decorations */}
            <motion.div
                initial={{ opacity: 0, x: 100, y: -100 }}
                animate={{ opacity: 1, x: 50, y: -50 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute top-0 right-0 w-1/3 h-1/3 bg-secondary/5 blur-[120px] rounded-full pointer-events-none"
            ></motion.div>
            <motion.div
                initial={{ opacity: 0, x: -100, y: 100 }}
                animate={{ opacity: 1, x: -50, y: 50 }}
                transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
                className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-primary/20 blur-[100px] rounded-full pointer-events-none"
            ></motion.div>

            <PageTitle
                title={title}
                breadcrumbs={breadcrumbs}
            />

            <div className="flex-1 relative z-10">
                {withContainer ? (
                    <Container className="mt-12">
                        {(heroTitle || heroDescription) && (
                            <div className="text-center mb-12 max-w-3xl mx-auto">
                                {heroTitle && (
                                    <Typography variant="h2" size="h3" color="white" className="font-bold mb-4">
                                        {heroTitle}
                                    </Typography>
                                )}
                                {heroDescription && (
                                    <Typography className="text-light/60 text-lg">
                                        {heroDescription}
                                    </Typography>
                                )}
                            </div>
                        )}
                        {children}
                    </Container>
                ) : (
                    children
                )}
            </div>
        </section>
    );
};

export default SubPageLayout;
