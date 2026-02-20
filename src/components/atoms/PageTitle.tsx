'use client';

import { Container, Typography } from '../ui';
import Link from 'next/link';
import { CN } from '@/utils/className';

interface PageTitleProps {
    title: string;
    breadcrumbs: { label: string; href?: string; }[];
}

const PageTitle = ({ title, breadcrumbs }: PageTitleProps) => {
    return (
        <div className="page-title py-7 bg-linear-to-r from-secondary/90 to-secondary/50 relative z-1 after:absolute after:-z-1 after:inset-0 after:bg-[url(/assets/images/about-bg.svg)] after:opacity-30">
            <Container>
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <Typography variant="h1" size="h2" color="white" className="font-bold mb-0 text-shadow-sm text-shadow-black/50">
                       <i className="bi bi-balloon-heart mx-1.5 text-[3rem]"></i>{title} 
                    </Typography>
                    <nav className="breadcrumbs">
                        <ol className="flex items-center gap-2 text-sm">
                            {breadcrumbs.map((crumb, index) => (
                                <li key={index} className="flex items-center gap-2">
                                    {crumb.href ? (
                                        <Link
                                            href={crumb.href}
                                            className="text-primary hover:text-white transition-colors"
                                        >
                                            {crumb.label}
                                        </Link>
                                    ) : (
                                        <span className="text-white font-medium">
                                            {crumb.label}
                                        </span>
                                    )}
                                    {index < breadcrumbs.length - 1 && (
                                        <span className="text-white/90">/</span>
                                    )}
                                </li>
                            ))}
                        </ol>
                    </nav>
                </div>
            </Container>
        </div>
    );
};

export default PageTitle;
