'use client';

import { FC, useState, useEffect } from 'react';
import { Typography, Badge } from '../ui';
import { motion } from 'framer-motion';
import BlogRatingScale from '../atoms/BlogRatingScale';
import BlogSocialShare from '../molecules/BlogSocialShare';
import BlogComments from '../molecules/BlogComments';
import Link from 'next/link';

interface BlogDetailsContentProps {
    blog: {
        _id: string;
        title: string;
        category: string;
        description: string;
        content?: string;
        rating?: number;
        createdAt?: string;
        tag?: string[];
    };
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
} as const;

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" }
    }
} as const;

const BlogDetailsContent: FC<BlogDetailsContentProps> = ({ blog }) => {
    const [pageUrl, setPageUrl] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setPageUrl(window.location.href);

            // Add copy buttons to code blocks
            const initCopyButtons = () => {
                const preElements = document.querySelectorAll('.blog-main-content pre');
                
                preElements.forEach((pre) => {
                    if (pre.parentElement?.classList.contains('code-block-wrapper')) return; // Already processed

                    // Create wrapper
                    const wrapper = document.createElement('div');
                    wrapper.className = 'code-block-wrapper';
                    wrapper.style.position = 'relative';
                    wrapper.style.width = '100%';
                    wrapper.style.direction = 'ltr';
                    wrapper.style.marginBottom = '2rem';
                    wrapper.style.marginTop = '2rem';
                    
                    // Remove margins from pre since wrapper handles it
                    (pre as HTMLElement).style.marginTop = '0';
                    (pre as HTMLElement).style.marginBottom = '0';
                    
                    // Wrap the pre element
                    pre.parentNode?.insertBefore(wrapper, pre);
                    wrapper.appendChild(pre);

                    // Create the button
                    const button = document.createElement('button');
                    button.className = 'copy-button';
                    button.style.position = 'absolute';
                    button.style.top = '12px';
                    button.style.right = '12px';
                    button.style.backgroundColor = 'rgba(255,255,255,0.1)';
                    button.style.border = '1px solid rgba(255,255,255,0.2)';
                    button.style.color = '#fff';
                    button.style.padding = '4px 8px';
                    button.style.borderRadius = '6px';
                    button.style.fontSize = '12px';
                    button.style.cursor = 'pointer';
                    button.style.zIndex = '10';
                    button.style.display = 'flex';
                    button.style.alignItems = 'center';
                    button.style.gap = '6px';
                    
                    button.innerHTML = '<i class="bi bi-clipboard"></i> Copy';

                    button.onmouseover = () => { button.style.backgroundColor = 'rgba(255,255,255,0.2)'; };
                    button.onmouseout = () => { button.style.backgroundColor = 'rgba(255,255,255,0.1)'; };

                    button.onclick = () => {
                        const code = pre.querySelector('code');
                        const textToCopy = code ? code.innerText : (pre as HTMLElement).innerText;
                        navigator.clipboard.writeText(textToCopy).then(() => {
                            button.innerHTML = '<i class="bi bi-check2" style="color:#4ade80"></i> Copied!';
                            button.style.backgroundColor = 'rgba(74, 222, 128, 0.2)';
                            button.style.borderColor = 'rgba(74, 222, 128, 0.4)';
                            setTimeout(() => {
                                button.innerHTML = '<i class="bi bi-clipboard"></i> Copy';
                                button.style.backgroundColor = 'rgba(255,255,255,0.1)';
                                button.style.borderColor = 'rgba(255,255,255,0.2)';
                            }, 2000);
                        });
                    };

                    wrapper.appendChild(button);
                });
            };

            // Run slightly after mount to ensure dangerouslySetInnerHTML has rendered
            setTimeout(initCopyButtons, 100);
        }
    }, [blog.content]);

    const displayDate = blog.createdAt
        ? new Date(blog.createdAt).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })
        : 'قريباً';

    return (
        <motion.div
            className="blog-details-content flex flex-col h-full lg:pl-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
        >
            <motion.div className="blog-meta flex flex-wrap justify-between items-center mb-6 gap-4" variants={itemVariants}>
                <div className="badge-wrapper">
                    <Badge variant="outline" className="text-secondary bg-secondary/10 border-secondary/20 font-semibold px-4 py-2">
                        {blog.category}
                    </Badge>
                </div>
                <div className="meta-item flex items-center text-sm text-light/70 font-medium">
                    <i className="bi bi-calendar-check text-secondary ml-2"></i>
                    <span>{displayDate}</span>
                </div>
            </motion.div>

            <motion.div variants={itemVariants}>
                <Typography variant="h2" color='white' size="h2" className="font-bold mb-6 leading-tight">
                    {blog.title}
                </Typography>
            </motion.div>

            <motion.div variants={itemVariants}>
                <Typography className="lead text-xl leading-relaxed text-light/90 mb-8 border-r-4 border-secondary pr-6 italic bg-white/5 py-4 rounded-l-2xl">
                    {blog.description}
                </Typography>
            </motion.div>

            <motion.div variants={itemVariants} className="blog-main-content">
                <div
                    className="prose prose-invert max-w-none text-light/80 leading-loose text-lg"
                    dangerouslySetInnerHTML={{ __html: blog.content || '<p>لا يوجد محتوى متاح حالياً.</p>' }}
                />
            </motion.div>

            {/* Tags/Slug Section for SEO */}

            {blog.tag && blog.tag.length > 0 && (
                <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-light/50 text-sm">الوسوم:</span>

                    <div className="tag-badges flex flex-wrap gap-2 mt-6">
                        {blog.tag.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.5 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                            >
                                <Link href={`/blogs/tag/${encodeURIComponent(item)}`} className="block transform transition-transform hover:scale-105 active:scale-95">
                                    <Badge variant="outline" showHash={true} className="cursor-pointer hover:border-secondary/40 hover:bg-secondary/5">
                                        {item}
                                    </Badge>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}

            {/* Social Share */}
            <motion.div variants={itemVariants}>
                <BlogSocialShare title={blog.title} url={pageUrl} />
            </motion.div>

            {/* Rating */}
            <motion.div variants={itemVariants}>
                <BlogRatingScale blogId={blog._id} initialRating={blog.rating} />
            </motion.div>

            {/* Comments */}
            {/* <motion.div variants={itemVariants} className="mt-8">
                <BlogComments />
            </motion.div> */}
        </motion.div>
    );
};

export default BlogDetailsContent;
