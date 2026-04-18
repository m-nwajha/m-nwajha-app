'use client';

import { Box, Button, Typography } from '@/components/ui';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

export default function NotFound() {

    const floatRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let frame: number;
        let start: number | null = null;

        const animate = (timestamp: number) => {
            if (!start) start = timestamp;
            const elapsed = timestamp - start;
            const y = Math.sin(elapsed / 1000) * 12;
            if (floatRef.current) {
                floatRef.current.style.transform = `translateY(${y}px)`;
            }
            frame = requestAnimationFrame(animate);
        };

        frame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frame);
    }, []);

    return (
        <Box
            display='flex'
            direction='col'
            justifyContent='center'
            alignItems='center'
            className='fixed inset-0 bg-primary overflow-hidden'
        >
            {/* Glowing blobs in background */}
            <div className='absolute w-[500px] h-[500px] rounded-full bg-secondary/5 blur-[120px] top-[-100px] left-[-100px] pointer-events-none' />
            <div className='absolute w-[400px] h-[400px] rounded-full bg-secondary/8 blur-[100px] bottom-[-80px] right-[-80px] pointer-events-none' />


            {/* Floating logo */}
            <div ref={floatRef} className='transition-transform duration-100 mb-4'>
                <Image
                    alt='logo-nawjha-tech'
                    src='/assets/images/logo.png'
                    height={70}
                    width={70}
                    className='opacity-80'
                />
            </div>

            {/* 404 glowing text */}
            <div className='relative select-none mb-2'>
                <span
                    className='text-[8rem] sm:text-[11rem] font-extrabold leading-none tracking-tighter'
                    style={{
                        background: 'linear-gradient(135deg, var(--secondary) 0%, color-mix(in oklab, var(--secondary) 50%, white) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        filter: 'drop-shadow(0 0 40px color-mix(in oklab, var(--secondary) 60%, transparent))',
                    }}
                >
                    404
                </span>
                {/* Reflection */}
                <span
                    className='absolute left-0 right-0 text-[8rem] sm:text-[11rem] font-extrabold leading-none tracking-tighter top-full opacity-10 scale-y-[-1] blur-[2px] pointer-events-none'
                    style={{
                        background: 'linear-gradient(135deg, var(--secondary) 0%, color-mix(in oklab, var(--secondary) 50%, white) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}
                >
                    404
                </span>
            </div>

            {/* Separator line */}
            <div className='w-[120px] h-[2px] rounded-full bg-linear-to-r from-transparent via-secondary to-transparent mb-6' />

            {/* Message */}
            <Typography variant='h3' size='h4' color='white' className='mb-2 text-center px-4 font-bold'>
                الصفحة غير موجودة
            </Typography>

            <Typography variant='p' size='body2' color='light' className='text-center px-8 max-w-sm mb-8 leading-relaxed'>
                يبدو أن الصفحة التي تبحث عنها قد اختفت أو لم تكن موجودة أصلاً.
            </Typography>

            {/* Buttons */}
            <Box display='flex' gap={3} alignItems='center'>
                <Button href='/' variant='bg'>
                    <i className='bi bi-house me-2' />
                    العودة للرئيسية
                </Button>
                <Button onClick={() => window.history.back()} variant='outline'>
                    <i className='bi bi-arrow-right me-2' />
                    الصفحة السابقة
                </Button>
            </Box>

            {/* Bottom brand caption */}
            <Typography variant='p' size='span1' color='light' className='absolute bottom-6 opacity-40'>
                Nawjha Tech © {new Date().getFullYear()}
            </Typography>
        </Box>
    );
}
