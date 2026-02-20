'use client';

import React from 'react';
import { Box, Typography, Button } from '@/components/ui';
import { CN } from '@/utils/className';

interface DashboardManagerHeaderProps {
    title: string;
    subtitle?: string;
    icon: string;
    count?: number;
    onAdd: () => void;
    addButtonLabel: string;
}

const DashboardManagerHeader: React.FC<DashboardManagerHeaderProps> = ({
    title,
    subtitle,
    icon,
    count,
    onAdd,
    addButtonLabel,
}) => {
    return (
        <Box display="flex" justifyContent="between" alignItems="center" className="mb-8">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary shadow-lg shadow-secondary/5 border border-secondary/10">
                    <i className={CN("bi text-2xl", icon)}></i>
                </div>
                <div>
                    <Typography color='secondary' variant="h2" size="h4" className="font-bold">
                        {title} {count !== undefined && count > 0 && `(${count})`}
                    </Typography>
                    {subtitle && <Typography className="text-light text-sm">{subtitle}</Typography>}
                </div>
            </div>
            <Button
                onClick={onAdd}
                variant="bg"
                className="h-12 px-6 rounded-xl font-bold bg-secondary hover:scale-105 active:scale-95 transition-all shadow-lg shadow-secondary/20"
            >
                <i className="bi bi-plus-lg ml-2"></i>
                {addButtonLabel}
            </Button>
        </Box>
    );
};

export default DashboardManagerHeader;
