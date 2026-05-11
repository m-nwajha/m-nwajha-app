'use client';
import Image from 'next/image';
import { Box } from '../ui';

const RightHero = () => {
    return (
        <div
            className='order-2 md:order-2 xl:order-1'>
            <Box
                display='flex'
                justifyContent='center'
                alignItems='center' >
                <Image
                    alt='hero-img'
                    src='/assets/images/hero-img.png'
                    width={400}
                    height={400}
                    className="drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)] animate-float"
                />
            </Box>
        </div>
    );
};

export default RightHero;