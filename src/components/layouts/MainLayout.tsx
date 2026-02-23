'use client';
import { FC, ReactNode } from 'react';
import Header from '../organisms/Header';
import Footer from '../organisms/Footer';
import ToTopBtn from '../atoms/ToTopBtn';
import WhatsappBtn from '../molecules/WhatsappBtn';

const MainLayout: FC<{ children: ReactNode; }> = ({ children }) => {
    return (
        <>
            <ToTopBtn />
            <WhatsappBtn />
            <Header />
            <main>
                {children}
            </main>
            <Footer />
        </>
    );
};

export default MainLayout;