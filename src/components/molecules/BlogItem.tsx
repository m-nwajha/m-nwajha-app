'use client';

import { FC } from 'react';
import { Box, Typography, Badge } from '../ui';
import BlogThumbnail from '../atoms/BlogThumbnail';
import BlogRating from '../atoms/BlogRating';

interface BlogItemProps {
    title: string;
    category: string;
    description: string;
    rating?: number;
    image?: string;
    tag: string[];
    link?: string;
    detailsLink: string;
}

import Link from 'next/link';

const BlogItem: FC<BlogItemProps> = ({
    title,
    category,
    description,
    rating = 5,
    image = '/assets/images/placeholder-blog.jpg',
    tag = [],
    link = '#',
    detailsLink
}) => {
    return (
        <article className="group bg-linear-to-b from-white/3 to-white/1 border border-white/5 rounded-3xl overflow-hidden transition-all duration-400 hover:-translate-y-2 hover:shadow-2xl hover:shadow-secondary/10 hover:border-secondary/20" >
            <BlogThumbnail
                src={image}
                alt={title}
                detailsLink={detailsLink}
                previewLink={image}
            />

            <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <Badge showHash={false}>{category}</Badge>
                    <BlogRating rating={rating} />
                </div>

                <Typography variant="h3" size="h5" color="white" className="font-bold mb-3 leading-tight transition-colors duration-300 group-hover:text-secondary line-clamp-1">
                    <Link href={`/blogs/${detailsLink}`}>
                        {title}
                    </Link>
                </Typography>

                <Typography variant="p" size="h6" color="light" className="mb-6 opacity-70 line-clamp-2 leading-relaxed h-12 line-clamp-3">
                    {description}
                </Typography>

                <div className="flex flex-wrap gap-2">
                    {tag.map((item, idx) => (
                        <Link key={idx} href={`/blogs/tag/${encodeURIComponent(item)}`} className="block transform transition-transform hover:scale-105 active:scale-95">
                            <Badge variant="outline" showHash={true} className="cursor-pointer hover:border-secondary/40 hover:bg-secondary/5">
                                {item}
                            </Badge>
                        </Link>
                    ))}
                </div>
            </div>
        </article >
    );
};

export default BlogItem;
