'use client';

import { FC } from 'react';
import { Box, Typography } from './index';
import { motion } from 'framer-motion';

export const TimeLine: FC<{ percentage: number; name?: string; }> = ({ percentage, name }) => {
    return (
        <Box className='w-full'>
            <Box display='flex' justifyContent='between' alignItems='center' className='mb-2'>
                <Typography variant='span' size='h6' color='white' className='font-semibold'>{name}</Typography>
                <Typography variant='span' size='h6' color='secondary' className='font-bold'>{percentage}%</Typography>
            </Box>
            <div className='h-2 bg-white/5 rounded-full overflow-hidden'>
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${percentage}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                    className='h-full bg-linear-to-r from-secondary to-secondary/60 rounded-full relative'
                >
                    <div className='absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent translate-x-full animate-shimmer'></div>
                </motion.div>
            </div>
        </Box>
    );
};