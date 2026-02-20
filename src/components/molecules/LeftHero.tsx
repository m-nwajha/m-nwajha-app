'use client';
import Image from 'next/image';
import { Box, Button, Typography } from '../ui';
import Link from 'next/link';
import { CN } from '@/utils/className';
import { motion, Variants } from 'framer-motion';

const containerVariants: Variants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            staggerChildren: 0.2,
            duration: 0.8,
            ease: "easeOut"
        }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    }
};

const LeftHero = ({ title, description, buttonA, buttonB }: { title: string, description: string, buttonA: { href: string, label: string; }, buttonB: { href: string, label: string; }; }) => {
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className='order-1 md:order-1 xl:order-2'
        >
            <Box
                display='flex'
                direction='col'
                justifyContent='center'
                alignItems='center'
                gap={2}
                className={CN(
                    'relative lg:ml-20 lg:pl-20 lg:items-end',
                    'lg:after:absolute lg:after:left-2 lg:after:top-20 lg:after:-z-1 lg:after:bg-[url(/assets/images/hero-arrow.svg)] lg:after:h-[235px] lg:after:w-[79px]'
                )}
            >
                <motion.div variants={itemVariants}>
                    <Link href='/'>
                        <Image alt='logo-nawjha-tech' src='/assets/images/logo.png' height={190} width={190} />
                    </Link>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <Typography variant='h1' color='secondary' className='font-bold font-en text-5xl lg:text-7xl mb-4 text-balance text-shadow-lg text-shadow-secondary/15'>
                        {title}
                    </Typography>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <Typography variant='h2' size='h2' color='white' className='font-en text-[1.2rem] lg:text-3xl font-semibold text-white/90'>
                        {description}
                    </Typography>
                </motion.div>

                <motion.div variants={itemVariants} className='mt-4 w-full flex justify-center lg:justify-end'>
                    <Box display='flex' direction='col' justifyContent='center' alignItems='center' gap={4} className='lg:flex-row'>
                        <Button variant='outline' href={buttonA.href}>{buttonA.label}<i className='bi bi-lightbulb mx-1'></i></Button>
                        <Button href={buttonB.href}>{buttonB.label}<i className='bi bi-heart mx-1'></i></Button>
                    </Box>
                </motion.div>
            </Box>
        </motion.div>
    );
};

export default LeftHero;