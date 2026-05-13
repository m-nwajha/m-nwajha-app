'use client';

import { FC, ReactNode } from 'react';

interface PortfolioItemOverlayProps {
    children: ReactNode;
}

const PortfolioItemOverlay: FC<PortfolioItemOverlayProps> = ({ children }) => {
    return (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex justify-center items-center opacity-0 transition-all duration-500 ease-out group-hover:opacity-100">
            <div className="transform translate-y-5 transition-transform duration-500 delay-100 group-hover:translate-y-0">
                {children}
            </div>
        </div>
    );
};

export default PortfolioItemOverlay;
