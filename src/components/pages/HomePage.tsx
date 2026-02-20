'use client';
import { FC } from 'react';
import Hero from '../organisms/Hero';
import About from '../organisms/About';
import Skills from '../organisms/Skills';
import Services from '../organisms/Services';
import Portfolio from '../organisms/Portfolio';
import Blogs from '../organisms/Blogs';
import Testimonials from '../organisms/Testimonials';
import Contact from '../organisms/Contact';

interface HomePageProps {
    portfolioData: any[];
    testimonialData: any[];
    blogsData: any[];
}


const HomePage: FC<HomePageProps> = ({ portfolioData, testimonialData, blogsData }) => {
    return (
        <>
            <Hero />
            <About />
            <Skills />
            <Services />
            <Portfolio projects={portfolioData} />
            <Blogs blogs={blogsData} />
            <Testimonials testimonials={testimonialData} />
            <Contact />
        </>
    );
};

export default HomePage;