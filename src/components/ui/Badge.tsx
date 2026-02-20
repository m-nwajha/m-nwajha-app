'use client';

import { CN } from '@/utils/className';
import Link from 'next/link';
import { ReactNode } from 'react';

interface BadgeProps {
    children: ReactNode;
    href?: string;
    variant?: 'primary' | 'secondary' | 'outline' | 'success';
    className?: string;
    showHash?: boolean;
}

export const Badge = ({ children, variant = 'secondary', href, className, showHash = false }: BadgeProps) => {
    const badgeContent = (
        <>
            {showHash && '# '}
            {children}
        </>
    );

    const classes = CN(
        'px-4 py-2 border text-xs font-bold rounded-full uppercase tracking-tighter transition-all duration-300',
        variant === 'secondary' && 'bg-linear-to-r from-secondary/20 to-secondary/10 hover:bg-secondary hover:text-primary text-shadow-sm text-shadow-black/50 hover:text-shadow-none border-secondary/30 text-secondary',
        variant === 'primary' && 'bg-linear-to-r from-primary/40 to-primary/60 hover:bg-primary hover:text-secondary border-primary/30 text-light',
        variant === 'outline' && 'bg-white/5 border-white/10 text-light hover:bg-secondary/10 hover:text-secondary hover:border-secondary/20 px-3 py-1.5 rounded-xl font-medium',
        variant === 'success' && 'bg-green-500/10 border-green-500/20 text-green-500 px-3 py-1.5 rounded-xl font-medium',
        !href && 'cursor-default',
        className
    );

    if (href) {
        return (
            <Link href={href} className={classes}>
                {badgeContent}
            </Link>
        );
    }

    return (
        <span className={classes}>
            {badgeContent}
        </span>
    );
};