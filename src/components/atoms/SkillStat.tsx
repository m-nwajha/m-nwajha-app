'use client';

import { FC } from 'react';
import { Box, Typography } from '../ui';

interface SkillStatProps {
    number: string;
    label: string;
    icon: string;
}

const SkillStat: FC<SkillStatProps> = ({ number, label, icon }) => {
    return (
        <Box display='flex' alignItems='center' gap={4} className='group'>
            <div className='w-14 h-14 rounded-full bg-linear-to-br from-secondary to-secondary/40 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 shadow-lg shadow-secondary/20'>
                <i className={`bi ${icon} text-primary text-xl font-bold`}></i>
            </div>
            <Box display='flex' direction='col'>
                <Typography variant='span' size='h4' color='white' className='font-bold leading-none'>{number}</Typography>
                <Typography variant='span' size='h6' color='light' className='opacity-70'>{label}</Typography>
            </Box>
        </Box>
    );
};

export default SkillStat;
