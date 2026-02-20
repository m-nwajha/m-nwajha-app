'use client';

import { FC, ReactNode } from 'react';
import { Box } from './Box';
import { CN } from '@/utils/className';

type CardProps = {
    children: ReactNode;
    variant?: 'primary' | 'secondary';
    isHover?: boolean;
    topLine?: boolean;
    className?: string;

};
export const Card: FC<CardProps> = ({ children, variant = 'primary', isHover = false, topLine = false, className }) => {
    return (
        <Box
            className={CN('group relative p-8 rounded-2xl transition-all duration-300 overflow-hidden', isHover ? 'hover:-translate-y-2 hover:shadow-2xl' : '', variant === 'primary' ? 'bg-primary border border-secondary/10 hover:shadow-secondary/20' : 'bg-secondary/25 border border-primary/80 hover:shadow-secondary/10', className)}
        >
            {/* Top Accent Line */}
            {topLine && (<div className='line absolute top-0 right-0 from-secondary to-secondary/30 w-full h-1 bg-linear-to-r'></div>)}
            {children}
        </Box>
    );
};