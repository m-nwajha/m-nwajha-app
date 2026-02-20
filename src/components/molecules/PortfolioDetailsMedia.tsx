'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';
import { Badge, Grid } from '../ui';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface PortfolioDetailsMediaProps {
    images: string[];
    techStack?: string[];
}

const PortfolioDetailsMedia = ({ images, techStack }: PortfolioDetailsMediaProps) => {
    const [swiper, setSwiper] = useState<SwiperType | null>(null);

    return (
        <div className="portfolio-details-media">
            <div className="main-image mb-4 rounded-[20px] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.08)] relative">
                <Swiper
                    onSwiper={setSwiper}
                    modules={[Autoplay, Navigation]}
                    loop={true}
                    speed={1000}
                    autoplay={{
                        delay: 6000,
                        disableOnInteraction: false,
                    }}
                    slidesPerView={1}
                    navigation={{
                        nextEl: '.swiper-button-next-details',
                        prevEl: '.swiper-button-prev-details',
                    }}
                    className="portfolio-details-slider"
                >
                    {images.map((img, index) => (
                        <SwiperSlide key={index}>
                            <Image
                                src={img}
                                alt={`Portfolio Image ${index + 1}`}
                                width={800}
                                height={600}
                                unoptimized
                                className="aspect-[3/2] object-cover w-full"
                            />
                        </SwiperSlide>
                    ))}

                    {/* Navigation Buttons */}
                    <button className="swiper-button-prev-details absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/10 hover:bg-secondary rounded-full flex items-center justify-center transition-all duration-300 group cursor-pointer border border-white/10">
                        <i className="bi bi-chevron-left text-white group-hover:text-primary font-bold"></i>
                    </button>
                    <button className="swiper-button-next-details absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/10 hover:bg-secondary rounded-full flex items-center justify-center transition-all duration-300 group cursor-pointer border border-white/10">
                        <i className="bi bi-chevron-right text-white group-hover:text-primary font-bold"></i>
                    </button>
                </Swiper>
            </div>

            <div className="thumbnail-grid mt-3">
                <Grid gap={2} sm={4} md={4} lg={4}>
                    {images.map((img, index) => (
                        <motion.div
                            key={index}
                            className="relative aspect-square cursor-pointer overflow-hidden rounded-lg group"
                            onClick={() => swiper?.slideToLoop(index)}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                        >
                            <Image
                                src={img}
                                alt={`Gallery Image ${index + 1}`}
                                fill
                                unoptimized
                                className="object-cover transition-all duration-500 shadow-[0_4px_10px_rgba(0,0,0,0.05)] group-hover:scale-110 group-hover:rotate-2 group-hover:shadow-[0_8px_15px_rgba(0,0,0,0.1)]"
                            />
                        </motion.div>
                    ))}
                </Grid>
            </div>

            {techStack && techStack.length > 0 && (
                <div className="tech-stack-badges flex flex-wrap gap-2 mt-6">
                    {techStack.map((tech, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.5 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                            <Badge variant="outline" className="text-white border-white/20 bg-white/5 hover:bg-secondary/20 hover:border-secondary/30 transition-all duration-300 hover:-translate-y-0.5" showHash={false}>
                                {tech}
                            </Badge>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PortfolioDetailsMedia;
