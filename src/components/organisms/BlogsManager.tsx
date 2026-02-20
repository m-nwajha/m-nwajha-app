'use client';

import React, { useState } from 'react';
import { Table, THead, TBody, TR, TH, TD, Button, Badge, Box, useToast } from '@/components/ui';
import useAPI from '@/hooks/useAPI';
import BlogForm from './BlogForm';
import DashboardManagerHeader from '../molecules/DashboardManagerHeader';
import DashboardActionButtons from '../molecules/DashboardActionButtons';
import { ENDPOINTS } from '@/constants/endpoints';

interface BlogsManagerProps {
    initialBlogs: any[];
}

const BlogsManager: React.FC<BlogsManagerProps> = ({ initialBlogs }) => {
    const { showToast } = useToast();
    const [blogs, setBlogs] = useState(initialBlogs);
    const [showForm, setShowForm] = useState(false);
    const [editingBlog, setEditingBlog] = useState<any>(null);
    const { del, isLoading } = useAPI(ENDPOINTS.blogs);

    const handleDelete = async (id: string) => {
        const blog = blogs.find(b => b._id === id);
        if (window.confirm(`هل أنت متأكد من حذف المقال "${blog?.title || ''}"؟ لا يمكن التراجع عن هذا الإجراء.`)) {
            try {
                await del(id);
                setBlogs(blogs.filter(b => b._id !== id));
                showToast(`تم حذف المقال "${blog?.title || ''}" بنجاح`, 'success');
            } catch (error) {
                console.error('Failed to delete blog:', error);
                showToast('فشل حذف المقال. حاول مرة أخرى.', 'error');
            }
        }
    };

    const handleSuccess = (newBlog: any) => {
        if (editingBlog) {
            setBlogs(blogs.map(b => b._id === newBlog._id ? newBlog : b));
        } else {
            setBlogs([newBlog, ...blogs]);
        }
        setShowForm(false);
        setEditingBlog(null);
    };

    return (
        <Box className="blogs-manager space-y-6">
            <DashboardManagerHeader
                title="إدارة المقالات"
                subtitle="أضف ونقح مقالاتك التقنية وشارك معرفتك"
                icon="bi-journal-text"
                count={blogs.length}
                addButtonLabel="إضافة مقال جديد"
                onAdd={() => {
                    setEditingBlog(null);
                    setShowForm(true);
                }}
            />

            <Table>
                <THead>
                    <TR>
                        <TH>المقال</TH>
                        <TH>التصنيف</TH>
                        <TH>التقييم</TH>
                        <TH>تاريخ النشر</TH>
                        <TH className="text-center">الإجراءات</TH>
                    </TR>
                </THead>
                <TBody>
                    {blogs.map((blog) => (
                        <TR key={blog._id}>
                            <TD>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-white/10 overflow-hidden border border-white/10 text-[0]">
                                        <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-white">{blog.title}</span>
                                        <span className="text-[10px] text-light/40 truncate max-w-[200px]">{blog.description}</span>
                                    </div>
                                </div>
                            </TD>
                            <TD>
                                <Badge variant="outline" showHash={true} className="text-xs bg-secondary/5 text-secondary border-secondary/20">
                                    {blog.category}
                                </Badge>
                            </TD>
                            <TD>
                                <div className="flex items-center gap-1 text-yellow-500">
                                    <i className="bi bi-star-fill text-xs"></i>
                                    <span>{blog.rating || 0}</span>
                                </div>
                            </TD>
                            <TD className="text-light/40">
                                {new Date(blog.createdAt).toLocaleDateString('ar-EG')}
                            </TD>
                            <TD>
                                <DashboardActionButtons
                                    onEdit={() => {
                                        setEditingBlog(blog);
                                        setShowForm(true);
                                    }}
                                    onDelete={() => handleDelete(blog._id)}
                                    viewHref={`/blogs/${blog._id}`}
                                    isLoading={isLoading}
                                />
                            </TD>
                        </TR>
                    ))}
                    {blogs.length === 0 && (
                        <TR>
                            <TD className="text-center py-20 text-light/40 italic">
                                لا توجد مقالات لعرضها حالياً.. ابدأ بكتابة مقالك الأول!
                            </TD>
                        </TR>
                    )}
                </TBody>
            </Table>

            {showForm && (
                <BlogForm
                    blog={editingBlog}
                    onClose={() => setShowForm(false)}
                    onSuccess={handleSuccess}
                />
            )}
        </Box>
    );
};

export default BlogsManager;
