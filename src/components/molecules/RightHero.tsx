'use client';
import Image from 'next/image';
import { Box } from '../ui';
import { motion } from 'framer-motion';

const RightHero = () => {
    return (
        <motion.div
            className='order-2 md:order-2 xl:order-1'
            initial={{ opacity: 0, scale: 0.8, x: -50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
        >
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
        </motion.div>
    );
};

export default RightHero;