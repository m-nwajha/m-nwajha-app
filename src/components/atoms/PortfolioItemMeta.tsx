'use client';

import { FC } from 'react';

interface PortfolioItemMetaProps {
    text: string;
}

const PortfolioItemMeta: FC<PortfolioItemMetaProps> = ({ text }) => {
    return (
        <span className="text-black/60 text-sm font-medium uppercase tracking-wider mb-2 block">
            {text}
        </span>
    );
};

export default PortfolioItemMeta;
