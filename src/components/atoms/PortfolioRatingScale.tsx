'use client';

import { FC, useState } from 'react';
import { Box, Typography } from '../ui';
import { CN } from '@/utils/className';
import useAPI from '@/hooks/useAPI';

interface PortfolioRatingScaleProps {
    projectId: string;
    initialRating?: number;
}

const PortfolioRatingScale: FC<PortfolioRatingScaleProps> = ({ projectId, initialRating = 0 }) => {
    const [rating, setRating] = useState(initialRating);
    const { patch, isLoading } = useAPI(`/api/portfolio/${projectId}`);

    const smileys = [
        { value: 1, icon: 'bi-emoji-frown', label: 'سيء', color: 'hover:text-red-500' },
        { value: 2, icon: 'bi-emoji-expressionless', label: 'مقبول', color: 'hover:text-orange-500' },
        { value: 3, icon: 'bi-emoji-neutral', label: 'متوسط', color: 'hover:text-yellow-500' },
        { value: 4, icon: 'bi-emoji-smile', label: 'جيد', color: 'hover:text-green-500' },
        { value: 5, icon: 'bi-emoji-heart-eyes', label: 'ممتاز', color: 'hover:text-pink-500' },
    ];

    const handleRate = async (value: number) => {
        if (isLoading) return;

        try {
            const res = await patch({ rating: value });
            if (res && res.success) {
                setRating(value);
            }
        } catch (error) {
            console.error('Failed to update rating:', error);
        }
    };

    return (
        <Box display='flex' direction='col' justifyContent='center' alignItems='center' className="portfolio-rating-scale mt-8 p-6 rounded-2xl bg-white/5 border border-white/10">
            <Typography variant="h4" size="h6" className="font-semibold mb-4 text-white/90">
                ما رأيك في هذا المشروع؟
            </Typography>

            <div className="flex items-center gap-4">
                {smileys.map((smiley) => (
                    <button
                        key={smiley.value}
                        onClick={() => handleRate(smiley.value)}
                        disabled={isLoading}
                        className={CN(
                            "flex flex-col items-center justify-center gap-2 transition-all duration-300 group",
                            smiley.color,
                            rating === smiley.value ? "scale-125 text-secondary drop-shadow-[0_0_8px_rgba(var(--primary-rgb),0.5)]" : "text-light/50 grayscale hover:grayscale-0"
                        )}
                        title={smiley.label}
                    >
                        <i className={CN("bi text-3xl transition-transform", smiley.icon, rating === smiley.value ? "bi-fill" : "")}></i>
                        <span className="text-[10px] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                            {smiley.label}
                        </span>
                    </button>
                ))}
            </div>

            {isLoading && (
                <div className="mt-2 text-[10px] text-secondary animate-pulse">
                    جاري تحديث التقييم...
                </div>
            )}
        </Box>
    );
};

export default PortfolioRatingScale;
