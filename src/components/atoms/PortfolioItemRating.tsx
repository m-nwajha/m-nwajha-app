'use client';

import { FC } from 'react';

interface PortfolioItemRatingProps {
    rating: number;
}

const PortfolioItemRating: FC<PortfolioItemRatingProps> = ({ rating }) => {
    return (
        <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white transition-all duration-300 group-hover:scale-110">
            <i className="bi bi-star-fill text-secondary text-xs"></i>
            <span className="text-xs font-bold leading-none">{rating}</span>
        </div>
    );
};

export default PortfolioItemRating;
