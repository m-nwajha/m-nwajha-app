'use client';

import { FC } from 'react';
import Image from 'next/image';

interface PortfolioItemThumbnailProps {
    src: string;
    alt: string;
}

const PortfolioItemThumbnail: FC<PortfolioItemThumbnailProps> = ({ src, alt }) => {
    return (
        <figure className="relative m-0 overflow-hidden aspect-video">
            <Image
                src={src}
                height={500}
                width={500}
                unoptimized
                className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                alt={alt}
                loading="lazy"
            />
        </figure>
    );
};

export default PortfolioItemThumbnail;
