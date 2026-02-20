'use client';

import React, { useState } from 'react';
import { Input, TextArea, Button, Typography, Box, useToast, Badge } from '@/components/ui';
import { CN } from '@/utils/className';
import useAPI from '@/hooks/useAPI';
import DashboardModal from '../molecules/DashboardModal';

interface TestimonialFormProps {
    testimonial?: any;
    onClose: () => void;
    onSuccess: (data: any) => void;
}

const DashboardTestimonialForm: React.FC<TestimonialFormProps> = ({ testimonial, onClose, onSuccess }) => {
    const { showToast } = useToast();
    const { post, update, isLoading } = useAPI('/api/testimonials');
    const [rating, setRating] = useState(testimonial?.rating || 5);
    const [verified, setVerified] = useState(testimonial?.verified !== undefined ? testimonial.verified : true);
    const [formData, setFormData] = useState({
        name: testimonial?.name || '',
        role: testimonial?.role || '',
        company: testimonial?.company || '',
        content: testimonial?.content || '',
    });

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>(testimonial?.avatar || '');

    const smileys = [
        { value: 1, icon: 'bi-emoji-frown', label: 'سيء', color: 'text-red-500' },
        { value: 2, icon: 'bi-emoji-expressionless', label: 'مقبول', color: 'text-orange-500' },
        { value: 3, icon: 'bi-emoji-neutral', label: 'متوسط', color: 'text-yellow-500' },
        { value: 4, icon: 'bi-emoji-smile', label: 'جيد', color: 'text-green-500' },
        { value: 5, icon: 'bi-emoji-heart-eyes', label: 'ممتاز', color: 'text-pink-500' },
    ];

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const data = new FormData();
            data.append('name', formData.name);
            data.append('role', formData.role);
            data.append('company', formData.company);
            data.append('content', formData.content);
            data.append('rating', rating.toString());
            data.append('verified', verified.toString());

            if (imageFile) {
                data.append('avatar', imageFile);
            } else if (testimonial?.avatar) {
                data.append('avatar', testimonial.avatar);
            }

            let res;
            if (testimonial?._id) {
                res = await update(data, testimonial._id);
            } else {
                res = await post(data, true);
            }

            if (res && res.success) {
                showToast(testimonial ? 'تم تحديث التقييم بنجاح' : 'تم إضافة التقييم بنجاح', 'success');
                onSuccess(res.data);
            }
        } catch (error) {
            showToast('فشل حفظ التقييم. حاول مرة أخرى.', 'error');
        }
    };

    const footer = (
        <div className="flex gap-4">
            <Button
                type="submit"
                form="testimonial-form"
                disabled={isLoading}
                className="flex-1 h-14 bg-secondary text-white font-bold rounded-2xl shadow-lg shadow-secondary/20 transition-all hover:scale-[1.02]"
            >
                {isLoading ? 'جاري الحفظ...' : (testimonial ? 'تحديث التقييم' : 'إضافة التقييم')}
            </Button>
            <Button
                type="button"
                onClick={onClose}
                variant="outline"
                className="flex-1 h-14 rounded-2xl"
            >
                إلغاء
            </Button>
        </div>
    );

    return (
        <DashboardModal
            isOpen={true}
            onClose={onClose}
            title={testimonial ? 'تعديل تقييم' : 'إضافة تقييم جديد'}
            icon={testimonial ? 'bi-pencil-square' : 'bi-plus-lg'}
            footer={footer}
        >
            <form id="testimonial-form" onSubmit={handleSubmit} className="space-y-6 text-right">
                {/* Avatar & Verification Toggle */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-white/5 p-6 rounded-2xl border border-white/5">
                    <div className="flex flex-col items-center">
                        <div className="relative group cursor-pointer w-24 h-24 rounded-full border-2 border-dashed border-secondary/30 hover:border-secondary overflow-hidden transition-all bg-secondary/5">
                            {imagePreview ? (
                                <img src={imagePreview} className="w-full h-full object-cover" />
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full text-secondary/40">
                                    <i className="bi bi-person-bounding-box text-3xl"></i>
                                </div>
                            )}
                            <input type="file" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer z-10" accept="image/*" />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all pointer-events-none">
                                <span className="text-white text-[10px] font-medium">تغيير الصورة</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 bg-dark/40 p-4 rounded-xl border border-white/5">
                        <Typography className="text-sm font-medium">حالة التفعيل:</Typography>
                        <button
                            type="button"
                            onClick={() => setVerified(!verified)}
                            className={CN(
                                "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
                                verified ? "bg-secondary" : "bg-white/10"
                            )}
                        >
                            <span className={CN(
                                "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                                verified ? "-translate-x-5" : "translate-x-0"
                            )} />
                        </button>
                        <Badge variant={verified ? 'success' : 'outline'}>
                            {verified ? 'مفعل ويظهر' : 'معطل'}
                        </Badge>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-light/60 mb-2">اسم العميل</label>
                        <Input
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="مثال: أحمد محمد"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-light/60 mb-2">المسمى الوظيفي</label>
                        <Input
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            placeholder="مثال: مدير تقني"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-light/60 mb-2">الشركة (اختياري)</label>
                    <Input
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="مثال: شركة البرمجيات"
                    />
                </div>

                <Box className="flex flex-col items-center gap-4 py-4 bg-white/5 rounded-2xl border border-white/5">
                    <label className="text-sm font-medium text-light/60">التقييم</label>
                    <div className="flex items-center gap-4">
                        {smileys.map((smiley) => (
                            <button
                                key={smiley.value}
                                type="button"
                                onClick={() => setRating(smiley.value)}
                                className={CN(
                                    "flex flex-col items-center gap-2 transition-all duration-300 group",
                                    rating === smiley.value ? smiley.color + " scale-125" : "text-light/30 grayscale hover:grayscale-0"
                                )}
                            >
                                <i className={CN("bi text-3xl", smiley.icon, rating === smiley.value ? "bi-fill shadow-lg" : "")}></i>
                                <span className="text-[10px] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                    {smiley.label}
                                </span>
                            </button>
                        ))}
                    </div>
                </Box>

                <div>
                    <label className="block text-sm font-medium text-light/60 mb-2">محتوى التقييم</label>
                    <TextArea
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        placeholder="اكتب هنا محتوى التقييم..."
                        rows={4}
                        required
                    />
                </div>
            </form>
        </DashboardModal>
    );
};

export default DashboardTestimonialForm;
