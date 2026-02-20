'use client';

import Image from 'next/image';
import { Box, Button, Typography } from '../ui';
import { FC } from 'react';
import SectionHeading from '../atoms/SectionHeading';
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
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" }
    }
};

const AboutRight: FC<{ title: { wordA: string, wordB: string; }, description: string, name: string, job: string, image: string, buttonA: { href: string, label: string; }; }> = ({ title, description, name, job, image, buttonA }) => {
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
        >
            <Box display='flex' direction='col' justifyContent='center' alignItems='center' gap={1} className='lg:px-12 px-4 relative after:absolute after:right-0.5 after:-bottom-4 after:bg-[url(/assets/images/about-arrow.svg)] after:bg-no-repeat after:bg-contain after:h-[151px] after:w-[147px]'>
                <motion.div variants={itemVariants} className="w-full">
                    <SectionHeading title={title} className='after:bg-[url(/assets/images/lightbulb.svg)]' />
                </motion.div>

                <motion.div variants={itemVariants}>
                    <Typography variant='p' size='h5' color='white' className='text-justify leading-loose'>
                        {description}
                    </Typography>
                </motion.div>

                <motion.div variants={itemVariants} className="w-full">
                    <Box display='flex' alignItems='center' justifyContent='end' gap={3} className='w-full'>
                        <Box display='flex' direction='col' gap={1}>
                            <Typography variant='h6' size='h5' color='white' className='font-bold tracking-wide'>{name}</Typography>
                            <Typography variant='span' size='h5' color='secondary' className='tracking-wider'>{job}</Typography>
                        </Box>
                        <Image src={image} alt="photo" width={80} height={80} className='rounded-full border-3 border-secondary shadow-lg shadow-secondary/30' />
                    </Box>
                </motion.div>

                <motion.div variants={itemVariants} className="w-full">
                    <Box display='flex' justifyContent='end' alignItems='center' gap={4} className='mt-4 w-full'>
                        <Button variant='bg' href={buttonA.href}>{buttonA.label}<i className='bi bi-download mx-1'></i></Button>
                    </Box>
                </motion.div>
            </Box>
        </motion.div>
    );
};

export default AboutRight;