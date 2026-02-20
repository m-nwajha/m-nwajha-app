import { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import { TESTIMONIALS_DATA } from '@/constants/testimonials';
import SectionHeading from '../atoms/SectionHeading';
import { Container, Button, Typography } from '@/components/ui';
import TestimonialItem from '../molecules/TestimonialItem';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface TestimonialsProps {
    testimonials?: any[];
}

const Testimonials: FC<TestimonialsProps> = ({ testimonials = [] }) => {
    // Merge database items (verified) with static items as fallback
    const displayItems = testimonials.length > 0 ? testimonials : TESTIMONIALS_DATA.items;

    return (
        <section id='testimonials' className='py-24 bg-secondary/3 relative after:absolute after:right-10 after:bottom-9 after:bg-[url(/assets/images/about-arrow.svg)] after:bg-no-repeat after:bg-contain after:h-[151px] after:w-[147px] overflow-hidden'>
            <Container>
                <div className="relative">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <SectionHeading
                            title={TESTIMONIALS_DATA.title}
                            className='after:bg-[url(/assets/images/client-img-heading.svg)] after:rotate-12 after:-bottom-8 after:-right-24'
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className='mt-12 testimonials-slider'
                    >
                        <Swiper
                            modules={[Autoplay, Pagination]}
                            loop={displayItems.length > 1}
                            speed={600}
                            autoplay={{
                                delay: 4000,
                                disableOnInteraction: false,
                            }}
                            slidesPerView={1}
                            spaceBetween={20}
                            pagination={{
                                clickable: true,
                                el: '.swiper-pagination-custom',
                            }}
                            breakpoints={{
                                768: {
                                    slidesPerView: 2,
                                    spaceBetween: 30,
                                },
                                1200: {
                                    slidesPerView: 3,
                                    spaceBetween: 40,
                                },
                            }}
                            className='!pb-16'
                        >
                            {displayItems.map((testimonial, idx) => (
                                <SwiperSlide key={testimonial._id || testimonial.id || idx} className='h-auto'>
                                    <TestimonialItem {...testimonial} />
                                </SwiperSlide>
                            ))}
                        </Swiper>


                        <div className='swiper-pagination-custom flex justify-center gap-3 mt-2'></div>
                        {/* Custom Pagination */}
                        <Container variant='xl'>
                            <div className="flex flex-col md:flex-row items-center justify-between gap-8 mt-12 bg-linear-to-r from-secondary/10 to-secondary/30 p-8 rounded-3xl border border-secondary/20 relative overflow-hidden group">
                                {/* Decorative element */}
                                <div className="absolute -left-10 -top-10 w-32 h-32 bg-secondary/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>

                                <div className="relative z-10 text-center md:text-right">
                                    <Typography variant="h4" size="h5" color="white" className="font-bold mb-2">
                                        هل كنت أحد عملائي؟ 😊
                                    </Typography>
                                    <Typography color='secondary'>
                                        يسعدني جداً سماع رأيك ومشاركة تجربتك معي لمساعدتي على التحسن.
                                    </Typography>
                                </div>

                                <div className="relative z-10">
                                    <Link href="/testimonials/add">
                                        <Button
                                            variant="bg"
                                            className="h-14 px-10 rounded-2xl bg-secondary text-white font-bold hover:scale-105 transition-all shadow-xl shadow-secondary/20 flex items-center gap-3"
                                        >
                                            أضف تقييمك الآن
                                            <i className="bi bi-chat-heart text-xl"></i>
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </Container>
                    </motion.div>
                </div>
            </Container>

            <style jsx global>{`
                .testimonials-slider .swiper-pagination-bullet {
                    width: 12px;
                    height: 12px;
                    background: var(--secondary);
                    opacity: 0.3;
                    transition: all 0.3s ease;
                    border-radius: 50%;
                }
                .testimonials-slider .swiper-pagination-bullet-active {
                    opacity: 1;
                    transform: scale(1.2);
                    background: var(--secondary);
                }
            `}</style>
        </section>
    );
};

export default Testimonials;
