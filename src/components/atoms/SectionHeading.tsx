'use client';
import { CN } from '@/utils/className';
import { Box, Typography } from '../ui';

const SectionHeading = ({ title, className }: { title: { wordA: string, wordB: string; }, className?: string; }) => {
    return (
        <Box display='flex' justifyContent='center' className='mb-16 mr-15 md:mr-0'>
            <Typography color='secondary' variant='h3' size='h2' className={CN('font-bold relative after:absolute after:-right-24 after:-bottom-7 after:bg-no-repeat after:bg-contain after:h-[101px] after:w-[79px]' ,className)}><Typography variant='span' size='h2' color='white'>{title.wordA}</Typography> {title.wordB}</Typography>
        </Box>
    );
};

export default SectionHeading;