'use client';

import { ABOUT_DATA } from '@/constants/about';
import AboutLeft from '../molecules/AboutLeft';
import AboutRight from '../molecules/AboutRight';
import { Container, Grid } from '../ui';

const About = () => {
    return (
        <section id='about' className='py-12'>
            <Container >
                <Grid sm={1} md={1} lg={2} gap={2} textAlign='center'>
                    <AboutRight {...ABOUT_DATA} />
                    <AboutLeft />
                </Grid>
            </Container>
        </section>
    );
};

export default About;