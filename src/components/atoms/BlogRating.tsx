'use client';

import { FC } from 'react';

interface BlogRatingProps {
    rating: number;
}

const BlogRating: FC<BlogRatingProps> = ({ rating }) => {
    return (
        <div className="flex items-center gap-1 text-sm font-bold text-amber-400">
            <i className="bi bi-star-fill text-[10px]"></i>
            <span>{rating}</span>
        </div>
    );
};

export default BlogRating;
