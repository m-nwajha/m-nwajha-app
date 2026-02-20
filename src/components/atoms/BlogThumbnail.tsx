'use client';

import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface BlogThumbnailProps {
    src: string;
    alt: string;
    detailsLink: string;
    previewLink: string;
}

const BlogThumbnail: FC<BlogThumbnailProps> = ({ src, alt, detailsLink, previewLink }) => {
    return (
        <div className="relative overflow-hidden h-60">
            <Image
                src={src}
                alt={alt}
                width={600}
                height={400}
                unoptimized
                className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                loading="lazy"
            />
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-linear-to-br from-secondary/80 to-secondary/90 flex items-center justify-center opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 backdrop-blur-[2px]">
                <div className="flex gap-4">
                    <Link
                        href={`/blogs/${detailsLink}`}
                        className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center text-xl hover:bg-secondary hover:text-white transition-all duration-300 shadow-lg"
                        title="View Details"
                    >
                        <i className="bi bi-arrow-up-right"></i>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BlogThumbnail;
