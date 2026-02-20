'use client';

import { FC, ReactNode } from 'react';

interface PortfolioItemOverlayProps {
    children: ReactNode;
}

const PortfolioItemOverlay: FC<PortfolioItemOverlayProps> = ({ children }) => {
    return (
        <div className="absolute inset-0 bg-linear-to-b to-transparent from-secondary/50 backdrop-saturate-100 backdrop-blur-[2px] flex flex-col justify-end p-6 opacity-0 translate-y-5 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-y-0">
            <div className="transform translate-y-5 transition-transform duration-500 delay-100 group-hover:translate-y-0">
                {children}
            </div>
        </div>
    );
};

export default PortfolioItemOverlay;
