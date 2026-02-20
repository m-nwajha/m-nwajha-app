'use client';

import { Container, Grid } from '../ui';
import SectionHeading from '../atoms/SectionHeading';
import { CONTACT_DATA } from '@/constants/contact';
import ContactInfo from '../molecules/ContactInfo';
import ContactForm from '../molecules/ContactForm';
import { motion } from 'framer-motion';

const Contact = () => {
    return (
        <section id="contact" className="py-20 bg-dark relative z-1 after:absolute after:-z-1 after:inset-0 after:bg-[url(/assets/images/about-bg.svg)] after:opacity-10 overflow-hidden">
            <Container>
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <SectionHeading title={CONTACT_DATA.title} className="after:bg-[url(/assets/images/mail.svg)]" />
                </motion.div>

                <Grid sm={1} md={1} lg={12} gap={8}>
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="lg:col-span-7"
                    >
                        <ContactForm />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="lg:col-span-5"
                    >
                        <ContactInfo />
                    </motion.div>
                </Grid>
            </Container>
        </section>
    );
};

export default Contact;
