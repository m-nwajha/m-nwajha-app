import { FC } from 'react';
import SectionHeading from '../atoms/SectionHeading';
import { Container } from '../ui';
import PortfolioGrid from '../molecules/PortfolioGrid';
import { PORTFOLIO_DATA } from '@/constants/portfolio';

interface PortfolioProps {
    projects: any[];
}

const Portfolio: FC<PortfolioProps> = ({ projects }) => {
    return (
        <section id='portfolio' className='py-20 bg-dark relative z-1 after:absolute after:-z-1 after:inset-0 after:bg-[url(/assets/images/about-bg.svg)] after:opacity-10'>
            <Container>
                <SectionHeading title={PORTFOLIO_DATA.title} className='after:bg-[url(/assets/images/misc.svg)] after:-bottom-10' />

                <PortfolioGrid initialData={projects} />
            </Container>
        </section>
    );
};

export default Portfolio;