'use client';

import { FC, ReactNode } from 'react';
import { Card, Typography, Box } from '../ui';
import { CN } from '@/utils/className';

interface DashboardStatCardProps {
    title: string;
    value: string | number;
    icon: string;
    trend?: {
        value: string;
        isUp: boolean;
    };
    color?: 'secondary' | 'primary' | 'red';
}

const DashboardStatCard: FC<DashboardStatCardProps> = ({ title, value, icon, trend, color = 'secondary' }) => {
    return (
        <Card isHover className="overflow-hidden group">
            <Box display="flex" justifyContent="between" alignItems="center" className="mb-4">
                <Box
                    className={CN(
                        "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-lg",
                        color === 'secondary' ? "bg-secondary/10 text-secondary shadow-secondary/10" : "bg-white/5 text-white shadow-white/5"
                    )}
                >
                    <i className={CN("bi text-2xl", icon)}></i>
                </Box>
                {trend && (
                    <Box
                        className={CN(
                            "px-2 py-1 rounded-full text-[10px] font-bold flex items-center gap-1",
                            trend.isUp ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                        )}
                    >
                        <i className={CN("bi", trend.isUp ? "bi-arrow-up-right" : "bi-arrow-down-right")}></i>
                        {trend.value}
                    </Box>
                )}
            </Box>
            <Box display="flex" direction="col" gap={1}>
                <Typography size="body2" color="light" className="opacity-60 font-medium">
                    {title}
                </Typography>
                <Typography variant="h3" size="h3" color="white" className="font-bold tracking-tight">
                    {value}
                </Typography>
            </Box>
        </Card>
    );
};

export default DashboardStatCard;
