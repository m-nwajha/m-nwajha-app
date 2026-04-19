'use client';

import Image from 'next/image';
import { FC } from 'react';
import { Box, Typography } from '../ui';

interface TestimonialItemProps {
    name: string;
    role: string;
    content: string;
    avatar: string;
    company: string;
    rating: number;
    verified: boolean;
}

const TestimonialItem: FC<TestimonialItemProps> = ({ name, role, content, avatar, company, rating, verified }) => {
    return (
        <Box className='h-full flex flex-col bg-dark/40 backdrop-blur-sm border border-secondary/10 rounded-3xl p-8 relative overflow-hidden transition-all duration-300 hover:border-secondary/50 group before:content-[""] before:absolute before:top-0 before:left-0 before:right-0 before:h-1 before:bg-linear-to-r before:from-secondary before:to-sky-400 before:rounded-t-3xl '>

            {/* Header */}
            <div className='flex items-start gap-4 mb-6'>
                <div className='relative w-16 h-16 shrink-0'>
                    {avatar && !avatar.includes('cloudinary.com/demo') ? (
                        <Image
                            src={avatar}
                            alt={name}
                            fill
                            className='rounded-[20px] object-cover border-3 border-secondary/20'
                        />
                    ) : (
                        <div className='w-full h-full rounded-[20px] bg-linear-to-br from-secondary/20 to-secondary/5 border-3 border-secondary/20 flex items-center justify-center'>
                            <Typography variant='h4' size='h4' color='secondary' className='font-bold uppercase'>
                                {name.charAt(0)}
                            </Typography>
                        </div>
                    )}
                </div>
                <div className='flex-1'>
                    <Typography variant='h3' size='h6' color='white' className='font-bold mb-1 leading-tight'>
                        {name}
                    </Typography>
                    <Typography variant='span' size='h6' color='light' className='block font-medium mb-2'>
                        {role}
                    </Typography>
                    <div className='flex gap-0.5'>
                        {[...Array(rating)].map((_, i) => (
                            <i key={i} className='bi bi-star-fill text-amber-400 text-sm'></i>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className='grow relative mb-6'>
                <div className='absolute -top-9 left-1 w-12 h-12 bg-linear-to-br from-secondary to-sky-400 rounded-full flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity'>
                    <i className='bi bi-quote text-white text-xl'></i>
                </div>
                <Typography variant='p' size='h6' color='light' className='leading-relaxed font-medium text-justify relative z-10 pt-2 line-clamp-3'>
                    {content}
                </Typography>
            </div>

            {/* Footer */}
            <div className='flex justify-between items-center pt-5 border-t border-white/5'>
                <div className='flex items-center gap-2 px-3 py-2 bg-secondary/10 rounded-xl'>
                    <i className='bi bi-building text-secondary text-sm'></i>
                    <Typography variant='span' size='span1' color='secondary' className='font-bold text-xs'>
                        {company}
                    </Typography>
                </div>
                {verified && (
                    <div className='flex items-center gap-1.5'>
                        <i className='bi bi-patch-check-fill text-emerald-500 text-lg'></i>
                        <Typography variant='span' size='span1' className='text-emerald-500 font-bold text-xs'>
                            موثق
                        </Typography>
                    </div>
                )}
            </div>
        </Box>
    );
};

export default TestimonialItem;
