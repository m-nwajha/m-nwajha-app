'use client';
import { SERVICES_DATA } from '@/constants/services';
import { Badge, Box, Button, Card, CardHeader, Typography } from '../ui';
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

const ServicesGrid = () => {
    return (
        <>

            {SERVICES_DATA.categories.map((category, index) => (
                <motion.div
                    key={index}
                    custom={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={cardVariants}
                    className="will-change-transform"
                >
                    <Card variant='secondary' topLine isHover>
                        {/* Header */}
                        <CardHeader variant='secondary' {...category} />
                        <Typography variant='p' size='h6' color='light' className='mb-10 leading-relaxed text-justify'>
                            {category.description}
                        </Typography>
                        <Box>
                            <Typography variant='h4' size='h6' color='white' className='mb-4 font-bold uppercase tracking-wider'>{SERVICES_DATA.techTitle}</Typography>
                            <div className='flex flex-wrap gap-3'>
                                {category.tech.map((badge, bIndex) => (
                                    <Badge variant='primary' key={bIndex}>
                                        {badge}
                                    </Badge>
                                ))}
                            </div>
                        </Box>
                        <Button variant='outline' className='mt-6' href='https://forms.gle/Hr8iHEt1znKc6ci97' target='_blank'>طلب الخدمة <i className='bi bi-arrow-left mx-1 transition-all ease-in group-hover:mr-2 '></i></Button>

                    </Card>
                </motion.div>
            ))}
        </>
    );
};

export default ServicesGrid;