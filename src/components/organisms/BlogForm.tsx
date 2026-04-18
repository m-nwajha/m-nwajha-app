'use client';

import React, { useState } from 'react';
import { Input, TextArea, Button, useToast } from '@/components/ui';
import useAPI from '@/hooks/useAPI';
import { BLOGS_DATA } from '@/constants/blogs';
import DashboardModal from '../molecules/DashboardModal';
import { CN } from '@/utils/className';
import { ENDPOINTS } from '@/constants/endpoints';

interface BlogFormProps {
    blog?: any;
    onClose: () => void;
    onSuccess: (blog: any) => void;
}

const BlogForm: React.FC<BlogFormProps> = ({ blog, onClose, onSuccess }) => {
    const isEdit = !!blog;
    const { showToast } = useToast();
    const { post, patch, isLoading } = useAPI(ENDPOINTS.blogs);

    const [formData, setFormData] = useState({
        title: blog?.title || '',
        category: blog?.category || 'Web Design',
        filter: blog?.filter || BLOGS_DATA.filters[1].id,
        description: blog?.description || '',
        content: blog?.content || '',
        tag: blog?.tag?.join(', ') || '',
        rating: blog?.rating || 5,
        link: blog?.link || '#',
        detailsLink: blog?.detailsLink || '#',
        videoUrl: blog?.videoUrl || '',
    });

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>(blog?.image || '');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();

        try {
            const tagArr = formData.tag.split(',').map((s: string) => s.trim()).filter(Boolean);

            const data = new FormData();
            data.append('title', formData.title);
            data.append('category', formData.category);
            data.append('filter', formData.filter);
            data.append('description', formData.description);
            data.append('content', formData.content);
            data.append('link', formData.link);
            data.append('videoUrl', formData.videoUrl);
            data.append('rating', String(formData.rating));
            data.append('tag', tagArr.join(','));

            // Append actual file for Cloudinary upload
            if (imageFile) {
                data.append('image', imageFile);
            } else if (blog?.image && blog.image.startsWith('http')) {
                // Keep existing Cloudinary URL if no new image selected
                data.append('image', blog.image);
            }

            let result;
            if (isEdit) {
                result = await patch(data, true, blog._id);
            } else {
                result = await post(data, undefined, true);
            }

            if (result && result.success) {
                const message = isEdit
                    ? `تم تعديل المقال "${formData.title}" بنجاح`
                    : `تم إضافة المقال "${formData.title}" بنجاح`;
                showToast(message, 'success');
                onSuccess(result.data);
            }
        } catch (error) {
            showToast('فشل حفظ البيانات. يرجى المحاولة مرة أخرى.', 'error');
        }
    };

    const footer = (
        <div className="flex justify-end gap-4">
            <Button type="button" onClick={onClose} variant="outline" className="rounded-xl px-8">إلغاء</Button>
            <Button
                type="submit"
                form="blog-form"
                disabled={isLoading}
                className="rounded-xl px-12 bg-secondary text-white font-bold hover:scale-105 transition-all disabled:opacity-50 shadow-lg shadow-secondary/20"
            >
                {isLoading ? 'جاري الحفظ...' : (isEdit ? 'حفظ التغييرات' : 'إضافة المقال')}
            </Button>
        </div>
    );

    return (
        <DashboardModal
            isOpen={true}
            onClose={onClose}
            title={isEdit ? 'تعديل مقال' : 'إضافة مقال جديد'}
            icon={isEdit ? 'bi-pencil-square' : 'bi-plus-lg'}
            maxWidth="max-w-4xl"
            footer={footer}
        >
            <form id="blog-form" onSubmit={handleSubmit} className="space-y-6 text-right">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-light/60 mb-2">عنوان المقال</label>
                            <Input
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="مثال: دليلك الشامل لتعلم React"
                                required
                            />
                        </div>


                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-light/60 mb-2">التصنيف</label>
                                <select
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-light focus:outline-none focus:border-secondary transition-all"
                                    value={formData.filter}
                                    onChange={(e) => {
                                        const selected = BLOGS_DATA.filters.find(f => f.id === e.target.value);
                                        setFormData({
                                            ...formData,
                                            filter: e.target.value,
                                            category: selected?.label || formData.category
                                        });
                                    }}
                                >
                                    {BLOGS_DATA.filters.filter(f => f.id !== '*').map(filter => (
                                        <option key={filter.id} value={filter.id} className="bg-dark-200">{filter.label}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-light/60 mb-2">التقييم (1-5)</label>
                                <Input
                                    type="number"
                                    min="1"
                                    max="5"
                                    step="0.1"
                                    value={formData.rating}
                                    onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-light/60 mb-2">وصف قصير (مقتطف)</label>
                            <TextArea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="اكتب وصفاً قصيراً يظهر في القائمة..."
                                rows={3}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-light/60 mb-2">الصورة البارزة</label>
                            <div className="relative group cursor-pointer h-40 rounded-2xl border-2 border-dashed border-white/10 hover:border-secondary/50 overflow-hidden transition-all bg-white/5">
                                {imagePreview ? (
                                    <img src={imagePreview} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full text-light/40">
                                        <i className="bi bi-image text-3xl mb-2"></i>
                                        <span className="text-sm">اضغط لرفع الصورة</span>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    accept="image/*"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-light/60 mb-2">الوسوم (فواصل)</label>
                            <Input
                                value={formData.tag}
                                onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                                placeholder="React, Frontend, Web"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-light/60 mb-2">رابط فيديو اليوتيوب</label>
                            <Input
                                value={formData.videoUrl}
                                onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                                placeholder="https://www.youtube.com/watch?v=..."
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-light/60 mb-2">محتوى المقال كاملاً</label>
                    <TextArea
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        placeholder="اكتب محتوى المقال هنا..."
                        rows={10}
                    />
                </div>
            </form>
        </DashboardModal>
    );
};

export default BlogForm;
