'use client';

import Image from 'next/image';
import { Box } from '../ui';
import { motion } from 'framer-motion';

const AboutLeft = () => {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, ease: "easeOut" }
                }
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
        >
            <Box display='flex' justifyContent='center' alignItems='end' className='bg-[url(/assets/images/about-bg.svg)] bg-center bg-contain bg-no-repeat'>
                <Image src="/assets/images/about-img.svg" alt="about img" width={500} height={500} className="drop-shadow-xl" />
            </Box>
        </motion.div>
    );
};

export default AboutLeft;