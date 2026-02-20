'use client';

import Image from 'next/image';
import { Box } from '../ui';
import { motion } from 'framer-motion';

const AboutLeft = () => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <Box display='flex' justifyContent='center' alignItems='end' className='bg-[url(/assets/images/about-bg.svg)] bg-center bg-contain bg-no-repeat'>
                <Image src="/assets/images/about-img.svg" alt="about img" width={500} height={500} className="drop-shadow-xl" />
            </Box>
        </motion.div>
    );
};

export default AboutLeft;