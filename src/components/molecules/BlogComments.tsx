'use client';

import { FC, useState } from 'react';
import { Typography, Button, Input, Box } from '../ui';
import { motion, AnimatePresence } from 'framer-motion';

interface Comment {
    id: string;
    author: string;
    date: string;
    content: string;
    avatar?: string;
}

const BlogComments: FC = () => {
    const [comments, setComments] = useState<Comment[]>([
        {
            id: '1',
            author: 'أحمد محمد',
            date: 'منذ يومين',
            content: 'مقال رائع جداً، شكراً لك على هذه المعلومات القيمة.',
            avatar: 'https://i.pravatar.cc/150?u=1'
        },
        {
            id: '2',
            author: 'سارة خالد',
            date: 'منذ 5 ساعات',
            content: 'أتفق معك تماماً في هذه النقاط، خصوصاً فيما يتعلق بتجربة المستخدم.',
            avatar: 'https://i.pravatar.cc/150?u=2'
        }
    ]);

    const [newComment, setNewComment] = useState({ author: '', content: '' });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.author || !newComment.content) return;

        const comment: Comment = {
            id: Date.now().toString(),
            author: newComment.author,
            date: 'الآن',
            content: newComment.content,
            avatar: `https://i.pravatar.cc/150?u=${Date.now()}`
        };

        setComments([comment, ...comments]);
        setNewComment({ author: '', content: '' });
    };

    return (
        <div className="blog-comments mt-12">
            <Typography variant="h4" className="font-bold mb-8 text-white flex items-center">
                <i className="bi bi-chat-dots text-secondary ml-3 text-2xl"></i>
                التعليقات ({comments.length})
            </Typography>

            {/* Comment Form */}
            <Box className="bg-white/5 border border-white/10 p-6 rounded-2xl mb-10">
                <Typography variant="h6" className="font-semibold mb-4 text-white/90">
                    أضف تعليقك
                </Typography>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Grid sm={1} md={1} gap={4}>
                        <Input
                            placeholder="الاسم"
                            value={newComment.author}
                            onChange={(e) => setNewComment({ ...newComment, author: e.target.value })}
                            className="bg-white/5 border-white/10 h-12 rounded-xl"
                        />
                        <textarea
                            placeholder="اكتب تعليقك هنا..."
                            value={newComment.content}
                            onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 min-h-[120px] text-white focus:border-secondary transition-all outline-none"
                        ></textarea>
                    </Grid>
                    <Button type="submit" variant="outline" className="px-8 py-3 rounded-xl">
                        نشر التعليق
                    </Button>
                </form>
            </Box>

            {/* Comments List */}
            <div className="space-y-6">
                <AnimatePresence>
                    {comments.map((comment) => (
                        <motion.div
                            key={comment.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="flex gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 animate-fade-in"
                        >
                            <div className="flex-shrink-0">
                                <img
                                    src={comment.avatar}
                                    alt={comment.author}
                                    className="w-12 h-12 rounded-full border-2 border-secondary/20"
                                />
                            </div>
                            <div className="flex-grow">
                                <div className="flex justify-between items-center mb-2">
                                    <h5 className="font-bold text-white">{comment.author}</h5>
                                    <span className="text-xs text-light/50">{comment.date}</span>
                                </div>
                                <p className="text-light/80 leading-relaxed text-sm">
                                    {comment.content}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

import { Grid } from '../ui';

export default BlogComments;
