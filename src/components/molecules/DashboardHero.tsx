'use client';

import React from 'react';
import { Box, Typography } from '@/components/ui';

interface DashboardHeroProps {
    title: string;
    subtitle: string;
    description?: string;
}

const DashboardHero: React.FC<DashboardHeroProps> = ({ title, subtitle, description }) => {
    return (
        <Box className="relative mb-12 bg-linear-to-r from-secondary/90 to-secondary/50 p-10 rounded-[30px] border border-secondary/10 overflow-hidden shadow-2xl">
            <div className="absolute z-9 inset-0 bg-[url(/assets/images/about-bg.svg)] opacity-30"></div>
            <div className="relative z-10">
                <Typography variant="h1" size="h3" color="primary" className="font-ex-bold mb-3 flex items-center gap-4">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    {title}
                </Typography>
                <Typography variant="h2" size="h5" color="white" className="font-bold mb-2 text-shadow-sm text-shadow-black/50">
                    {subtitle}
                </Typography>
                {description && (
                    <Typography variant="p" size="h6" color='white' className="max-w-xl leading-relaxed">
                        {description}
                    </Typography>
                )}
            </div>
        </Box>
    );
};

export default DashboardHero;
