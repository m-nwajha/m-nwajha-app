'use client';

import { SERVICES_DATA } from '@/constants/services';
import SectionHeading from '../atoms/SectionHeading';
import { Container, Grid } from '../ui';
import ServicesGrid from '../molecules/ServicesGrid';

const Services = () => {
    return (
        <section id='services' className='py-20'>
            <Container>
                <SectionHeading title={SERVICES_DATA.title} className='after:bg-[url(/assets/images/services-heading-img.svg)] after:-bottom-10' />
                <Grid sm={1} md={2} lg={3} gap={12}>
                    <ServicesGrid />
                </Grid>
            </Container>
        </section>
    );
};

export default Services;