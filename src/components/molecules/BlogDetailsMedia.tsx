'use client';
import Image from 'next/image';
import { Badge } from '../ui';
import { motion } from 'framer-motion';

interface BlogDetailsMediaProps {
    image: string;
    videoUrl?: string;
    tech?: string[];
}

const BlogDetailsMedia = ({ image, videoUrl, tech }: BlogDetailsMediaProps) => {
    // Function to extract YouTube ID
    const getYouTubeId = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const videoId = videoUrl ? getYouTubeId(videoUrl) : null;

    return (
        <div className="blog-details-media">
            <motion.div
                className="main-image mb-8 rounded-[25px] overflow-hidden shadow-2xl relative border border-white/10"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
            >
                <Image
                    src={image}
                    alt="Blog Cover"
                    width={1000}
                    height={600}
                    unoptimized
                    className="aspect-video object-cover w-full"
                />
            </motion.div>

            {videoId && (
                <motion.div
                    className="video-section mb-8 rounded-[25px] overflow-hidden shadow-2xl border border-white/10 bg-black/20 p-2"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="relative aspect-video rounded-[20px] overflow-hidden">
                        <iframe
                            className="absolute top-0 left-0 w-full h-full"
                            src={`https://www.youtube.com/embed/${videoId}`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default BlogDetailsMedia;
