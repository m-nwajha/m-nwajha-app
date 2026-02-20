'use client';

import { FC } from 'react';
import { Typography } from '../ui';
import { CN } from '@/utils/className';
import PortfolioItemThumbnail from '../atoms/PortfolioItemThumbnail';
import PortfolioItemOverlay from '../atoms/PortfolioItemOverlay';
import PortfolioItemMeta from '../atoms/PortfolioItemMeta';
import PortfolioItemAction from '../atoms/PortfolioItemAction';
import PortfolioItemRating from '../atoms/PortfolioItemRating';
import { motion, Variants } from 'framer-motion';
import { PORTFOLIO_DATA } from '@/constants/portfolio';

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
    // Find category label from filters
    const categoryInfo = PORTFOLIO_DATA.filters.find(f => f.id === category);
    const categoryLabel = categoryInfo ? categoryInfo.label : category;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className={CN('portfolio-item isotope-item will-change-transform', category)}
        >
            <article className="group relative rounded-2xl overflow-hidden bg-white/5 shadow-lg transition-all duration-300">
                <PortfolioItemRating rating={rating} />
                <PortfolioItemThumbnail src={image} alt={title} />

                <PortfolioItemOverlay>
                    <PortfolioItemMeta text={categoryLabel} />

                    <Typography
                        variant="h3"
                        color='white'
                        size="h5"
                        className="text-shadow-sm text-shadow-primary/10 font-semibold mb-5"
                    >
                        {title}
                    </Typography>

                    <div className="flex gap-4">
                        <PortfolioItemAction
                            href={projectUrl}
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
        </motion.div>
    );
};

export default PortfolioItem;
