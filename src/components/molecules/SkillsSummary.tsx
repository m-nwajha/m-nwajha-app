'use client';

import { FC } from 'react';
import { Badge, Box, Card, CardHeader, Typography } from '../ui';
import { SKILLS_DATA } from '@/constants/skills';
import SkillStat from '../atoms/SkillStat';
import SkillCertifications from '../atoms/SkillCertifications';
import { motion, Variants } from 'framer-motion';

const containerVariants: Variants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut",
            staggerChildren: 0.1
        }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4 }
    }
};

const SkillsSummary: FC = () => {
    const { summary } = SKILLS_DATA;

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
        >
            <Card>
                <motion.div variants={itemVariants}>
                    <CardHeader title={summary.title} />
                </motion.div>

                <motion.div variants={itemVariants}>
                    <Typography variant='p' size='h6' color='light' className='mb-10 leading-relaxed text-justify'>
                        {summary.description}
                    </Typography>
                </motion.div>

                {/* Statistics */}
                <Box display='flex' direction='col' gap={6} className='mb-10'>
                    {summary.stats.map((stat, index) => (
                        <motion.div key={index} variants={itemVariants}>
                            <SkillStat {...stat} />
                        </motion.div>
                    ))}
                </Box>

                {/* Certifications */}
                <motion.div variants={itemVariants}>
                    <SkillCertifications {...summary.certifications} />
                </motion.div>
            </Card>
        </motion.div>
    );
};

export default SkillsSummary;
