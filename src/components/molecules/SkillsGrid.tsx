'use client';

import { FC } from 'react';
import { Box, Card, CardHeader, TimeLine } from '../ui';
import { SKILLS_DATA } from '@/constants/skills';
import { motion, Variants } from 'framer-motion';

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.1,
            duration: 0.5,
            ease: "easeOut"
        }
    })
};

const SkillsGrid: FC = () => {
    return (
        <Box className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {SKILLS_DATA.categories.map((category, index) => (
                <motion.div
                    key={index}
                    custom={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={cardVariants}
                    className="will-change-transform"
                >
                    <Card topLine isHover>
                        {/* Header */}
                        <CardHeader {...category} />

                        {/* Skills Animation List */}
                        <Box display='flex' direction='col' gap={6}>
                            {category.skills.map((skill, sIndex) => (
                                <TimeLine key={sIndex} {...skill} />
                            ))}
                        </Box>
                    </Card>
                </motion.div>
            ))}
        </Box>
    );
};

export default SkillsGrid;
