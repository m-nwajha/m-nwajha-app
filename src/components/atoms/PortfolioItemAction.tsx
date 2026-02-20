'use client';

import { FC } from 'react';
import Link from 'next/link';
import { CN } from '@/utils/className';

interface PortfolioItemActionProps {
    href: string;
    icon: string;
    delayClass?: string;
}

const PortfolioItemAction: FC<PortfolioItemActionProps> = ({ href, icon, delayClass }) => {
    return (
        <Link
            href={href}
            className={CN(
                "w-11 h-11 flex items-center justify-center bg-primary/30 border border-primary/10 hover:bg-primary text-primary hover:text-white rounded-xl text-xl backdrop-blur-md transition-all duration-300 opacity-0 translate-y-5 group-hover:opacity-100 group-hover:translate-y-0",
                delayClass
            )}
        >
            <i className={CN("bi", icon)}></i>
        </Link>
    );
};

export default PortfolioItemAction;
