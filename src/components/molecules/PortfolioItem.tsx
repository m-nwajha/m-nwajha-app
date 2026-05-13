'use client';

import { FC } from 'react';
import { Typography } from '../ui';
import { CN } from '@/utils/className';
import PortfolioItemThumbnail from '../atoms/PortfolioItemThumbnail';
import PortfolioItemOverlay from '../atoms/PortfolioItemOverlay';
import PortfolioItemAction from '../atoms/PortfolioItemAction';
import PortfolioItemRating from '../atoms/PortfolioItemRating';
import { motion, Variants } from 'framer-motion';
import { PORTFOLIO_DATA } from '@/constants/portfolio';
import { useRouter } from 'next/navigation';

interface PortfolioItemProps {
    _id: string;
    title: string;
    category: string;
    image?: string;
    rating?: number;
    projectUrl?: string;
}

const PortfolioItem: FC<PortfolioItemProps> = ({
    title,
    category,
    image = '/assets/images/placeholder-portfolio.jpg',
    _id,
    rating = 5,
    projectUrl = '#'
}) => {
    const router = useRouter();
    // Find category label from filters
    const categoryInfo = PORTFOLIO_DATA.filters.find(f => f.id === category);
    const categoryLabel = categoryInfo ? categoryInfo.label : category;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className={CN('portfolio-item isotope-item will-change-transform break-inside-avoid mb-6 cursor-pointer', category)}
            onClick={() => router.push(`/portfolio/${_id}`)}
        >
            <article className="group relative rounded-2xl overflow-hidden bg-white/5 shadow-lg transition-all duration-300 mb-4">
                <PortfolioItemRating rating={rating} />
                <PortfolioItemThumbnail src={image} alt={title} />

                <PortfolioItemOverlay>
                    <div className="flex gap-4 justify-center items-center h-full" onClick={(e) => e.stopPropagation()}>
                        <PortfolioItemAction
                            href={`https://${projectUrl}`}
                            icon="bi-link"
                            delayClass="delay-150"
                        />
                        <PortfolioItemAction
                            href={`/portfolio/${_id}`}
                            icon="bi-arrow-left"
                            delayClass="delay-200"
                        />
                    </div>
                </PortfolioItemOverlay>
            </article>

            <div className="px-1">
                <Typography
                    variant="h3"
                    color='white'
                    size="h6"
                    className="font-bold mb-1 line-clamp-1 group-hover:text-secondary transition-colors duration-300"
                >
                    {title}
                </Typography>
                <p className="text-white/50 text-sm font-medium">
                    {categoryLabel} • 2026
                </p>
            </div>
        </motion.div>
    );
};

export default PortfolioItem;
