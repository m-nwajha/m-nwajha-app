'use client';

import { Container, Grid } from '../ui';
import SkillsGrid from '../molecules/SkillsGrid';
import SkillsSummary from '../molecules/SkillsSummary';
import { SKILLS_DATA } from '@/constants/skills';
import SectionHeading from '../atoms/SectionHeading';

const Skills = () => {
    return (
        <section id='skills' className='py-20 bg-dark relative z-1 after:absolute after:-z-1 after:inset-0 after:bg-[url(/assets/images/about-bg.svg)] after:opacity-10'>
            <Container>
                <SectionHeading title={SKILLS_DATA.title} className='after:bg-[url(/assets/images/skills-head-img.png)]'/>
                <Grid sm={1} md={1} lg={12} gap={8}>
                    <div className='lg:col-span-8'>
                        <SkillsGrid />
                    </div>
                    <div className='lg:col-span-4'>
                        <SkillsSummary />
                    </div>
                </Grid>
            </Container>
        </section>
    );
};

export default Skills;
