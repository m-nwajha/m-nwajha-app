'use client';

import { FC } from 'react';
import { Typography } from '../ui';
import { motion } from 'framer-motion';

interface BlogSocialShareProps {
    title: string;
    url: string;
}

const BlogSocialShare: FC<BlogSocialShareProps> = ({ title, url }) => {
    const encodedTitle = encodeURIComponent(title);
    const encodedUrl = encodeURIComponent(url);

    const shareLinks = [
        {
            name: 'Facebook',
            icon: 'bi-facebook',
            url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
            color: 'bg-[#1877F2]'
        },
        {
            name: 'Twitter',
            icon: 'bi-twitter-x',
            url: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
            color: 'bg-black'
        },
        {
            name: 'LinkedIn',
            icon: 'bi-linkedin',
            url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
            color: 'bg-[#0A66C2]'
        },
        {
            name: 'WhatsApp',
            icon: 'bi-whatsapp',
            url: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
            color: 'bg-[#25D366]'
        }
    ];

    return (
        <div className="blog-social-share mt-10 p-6 rounded-2xl bg-white/5 border border-white/10">
            <Typography variant="h6" className="font-semibold mb-4 text-white/90 text-center">
                مشاركة المقال
            </Typography>
            <div className="flex justify-center flex-wrap gap-4">
                {shareLinks.map((link, index) => (
                    <motion.a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${link.color} w-10 h-10 rounded-xl flex items-center justify-center text-white transition-all hover:scale-110 shadow-lg`}
                        whileHover={{ y: -5 }}
                        title={`Share on ${link.name}`}
                    >
                        <i className={`bi ${link.icon} text-xl`}></i>
                    </motion.a>
                ))}
            </div>
        </div>
    );
};

export default BlogSocialShare;
