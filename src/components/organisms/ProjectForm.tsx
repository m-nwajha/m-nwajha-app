'use client';

import React, { useState } from 'react';
import { Input, TextArea, Button, useToast } from '@/components/ui';
import useAPI from '@/hooks/useAPI';
import { PORTFOLIO_DATA } from '@/constants/portfolio';
import DashboardModal from '../molecules/DashboardModal';
import { CN } from '@/utils/className';

interface ProjectFormProps {
    project?: any;
    onClose: () => void;
    onSuccess: (project: any) => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ project, onClose, onSuccess }) => {
    const isEdit = !!project;
    const { showToast } = useToast();
    const { post, update, isLoading } = useAPI('/api/portfolio');

    const [formData, setFormData] = useState({
        title: project?.title || '',
        category: project?.category || PORTFOLIO_DATA.filters[1].id,
        description: project?.description || '',
        overview: project?.overview || '',
        challenge: project?.challenge || '',
        solutions: project?.solutions || '',
        client: project?.client || '',
        projectUrl: project?.projectUrl || '',
        githubUrl: project?.githubUrl || '',
        techStack: project?.techStack?.join(', ') || '',
        features: project?.features?.join('\n') || '',
    });

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>(project?.image || '');

    // Gallery States
    const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
    const [galleryPreviews, setGalleryPreviews] = useState<string[]>(project?.gallery || []);

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

    const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        setGalleryFiles(prev => [...prev, ...files]);

        files.forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setGalleryPreviews(prev => [...prev, reader.result as string]);
            };
            reader.readAsDataURL(file);
        });
    };

    const removeGalleryImage = (index: number) => {
        const totalExisting = project?.gallery?.length || 0;
        if (index >= totalExisting) {
            const fileIndex = index - totalExisting;
            setGalleryFiles(prev => prev.filter((_, i) => i !== fileIndex));
        }
        setGalleryPreviews(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();

        try {
            const data = new FormData();
            data.append('title', formData.title);
            data.append('category', formData.category);
            data.append('description', formData.description);
            data.append('overview', formData.overview);
            data.append('challenge', formData.challenge);
            data.append('solutions', formData.solutions);
            data.append('client', formData.client);
            data.append('projectUrl', formData.projectUrl);
            data.append('githubUrl', formData.githubUrl);

            const techStackArr = formData.techStack.split(',').map((s: string) => s.trim()).filter(Boolean);
            const featuresArr = formData.features.split('\n').map((s: string) => s.trim()).filter(Boolean);

            data.append('techStack', JSON.stringify(techStackArr));
            data.append('features', JSON.stringify(featuresArr));

            if (imageFile) {
                data.append('image', imageFile);
            } else if (project?.image) {
                data.append('image', project.image);
            }

            const existingGallery = galleryPreviews.filter(p => p.startsWith('http'));
            data.append('existingGallery', JSON.stringify(existingGallery));

            galleryFiles.forEach(file => {
                data.append('gallery', file);
            });

            let result;
            if (isEdit) {
                result = await update(data, project._id);
            } else {
                result = await post(data, true);
            }

            if (result && result.success) {
                const message = isEdit
                    ? `تم تعديل مشروع "${formData.title}" بنجاح`
                    : `تم إضافة مشروع "${formData.title}" بنجاح`;
                showToast(message, 'success');
                onSuccess(result.data);
            }
        } catch (error) {
            showToast('فشل حفظ البيانات. يرجى التأكد من الحقول والمحاولة مرة أخرى.', 'error');
        }
    };

    const footer = (
        <div className="flex justify-end gap-4">
            <Button type="button" onClick={onClose} variant="outline" className="rounded-xl px-8">إلغاء</Button>
            <Button
                type="submit"
                form="project-form"
                disabled={isLoading}
                className="rounded-xl px-12 bg-secondary text-white font-bold hover:scale-105 transition-all disabled:opacity-50 shadow-lg shadow-secondary/20"
            >
                {isLoading ? 'جاري الحفظ...' : (isEdit ? 'حفظ التغييرات' : 'إضافة المشروع')}
            </Button>
        </div>
    );

    return (
        <DashboardModal
            isOpen={true}
            onClose={onClose}
            title={isEdit ? 'تعديل مشروع' : 'إضافة مشروع جديد'}
            icon={isEdit ? 'bi-pencil-square' : 'bi-plus-lg'}
            maxWidth="max-w-5xl"
            footer={footer}
        >
            <form id="project-form" onSubmit={handleSubmit} className="space-y-8 text-right">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Right Column: Main Info */}
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-light/60 mb-2">عنوان المشروع</label>
                            <Input
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="مثال: تطبيق متجر إلكتروني"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-light/60 mb-2">التصنيف</label>
                                <select
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-light focus:outline-none focus:border-secondary transition-all"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                >
                                    {PORTFOLIO_DATA.filters.filter(f => f.id !== '*').map(filter => (
                                        <option key={filter.id} value={filter.id} className="bg-dark-200">{filter.label}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-light/60 mb-2">العميل</label>
                                <Input
                                    value={formData.client}
                                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                                    placeholder="اسم العميل"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-light/60 mb-2">وصف المشروع</label>
                            <TextArea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="اكتب وصفاً تفصيلياً للمشروع..."
                                rows={5}
                                required
                            />
                        </div>
                    </div>

                    {/* Left Column: Media & Links */}
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-light/60 mb-2">الصورة الرئيسية للمشروع</label>
                            <div className="relative group cursor-pointer h-40 rounded-2xl border-2 border-dashed border-white/10 hover:border-secondary/50 overflow-hidden transition-all bg-white/5">
                                {imagePreview ? (
                                    <img src={imagePreview} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full text-light/40">
                                        <i className="bi bi-image text-3xl mb-2"></i>
                                        <span className="text-sm">اضغط لرفع الصورة الرئيسية</span>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    accept="image/*"
                                />
                                {imagePreview && (
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                                        <span className="text-white text-xs font-medium">تغيير الصورة</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-light/60 mb-2">رابط الموقع</label>
                                <Input
                                    value={formData.projectUrl}
                                    onChange={(e) => setFormData({ ...formData, projectUrl: e.target.value })}
                                    placeholder="example.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-light/60 mb-2">رابط GitHub</label>
                                <Input
                                    value={formData.githubUrl}
                                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                                    placeholder="github.com/..."
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-light/60 mb-2">التقنيات المستخدمة (بفاصلة)</label>
                            <Input
                                value={formData.techStack}
                                onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                                placeholder="React, Tailwind, Node.js"
                            />
                            <div className="mt-3 flex flex-wrap gap-2">
                                {[
                                    'HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Express', 'NestJS', 'MongoDB',
                                    'PostgreSQL', 'MySQL', 'Prisma', 'Supabase', 'Firebase', 'Tailwind CSS', 'Bootstrap', 'MUI', 'Redux',
                                    'Zustand', 'GraphQL', 'Docker', 'Vercel', 'Netlify', 'Cloudinary', 'Framer Motion', 'Vite', 'Three.js'
                                ].map(tech => (
                                    <button
                                        key={tech}
                                        type="button"
                                        onClick={() => {
                                            const currentTechs = formData.techStack.split(',').map((t: string) => t.trim()).filter(Boolean);
                                            let newTechStack;
                                            if (currentTechs.includes(tech)) {
                                                newTechStack = currentTechs.filter((t: string) => t !== tech).join(', ');
                                            } else {
                                                newTechStack = [...currentTechs, tech].join(', ');
                                            }
                                            setFormData({ ...formData, techStack: newTechStack });
                                        }}
                                        className={CN(
                                            "px-3 py-1 text-[10px] rounded-full border transition-all duration-300",
                                            formData.techStack.split(',').map((t: string) => t.trim()).includes(tech)
                                                ? "bg-secondary/20 border-secondary text-secondary"
                                                : "bg-white/5 border-white/10 text-light/60 hover:border-secondary/50 hover:text-secondary/80"
                                        )}
                                    >
                                        {tech}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Gallery Section */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <label className="block text-sm font-medium text-light/60">معرض الصور (تظهر في السلايدر)</label>
                        <span className="text-xs text-light/40">{galleryPreviews.length} صور مختارة</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
                        {galleryPreviews.map((preview, index) => (
                            <div key={index} className="relative aspect-square rounded-xl overflow-hidden group border border-white/10 bg-white/5">
                                <img src={preview} className="w-full h-full object-cover" />
                                <button
                                    type="button"
                                    onClick={() => removeGalleryImage(index)}
                                    className="absolute top-1 right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-lg"
                                >
                                    <i className="bi bi-trash3 text-xs text-white"></i>
                                </button>
                            </div>
                        ))}
                        <label className="aspect-square rounded-xl border-2 border-dashed border-white/10 hover:border-secondary/50 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all hover:bg-white/5 group">
                            <i className="bi bi-plus-circle text-2xl text-light/20 group-hover:text-secondary group-hover:scale-110 transition-all"></i>
                            <span className="text-[10px] text-light/40 group-hover:text-secondary">إضافة صور</span>
                            <input
                                type="file"
                                multiple
                                onChange={handleGalleryChange}
                                className="hidden"
                                accept="image/*"
                            />
                        </label>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <label className="block text-sm font-medium text-light/60 mb-2">نظرة عامة على المشروع (اختياري)</label>
                        <TextArea
                            value={formData.overview}
                            onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
                            placeholder="صف المشروع بشكل عام وأهدافه..."
                            rows={4}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-light/60 mb-2">التحدي الأساسي (اختياري)</label>
                        <TextArea
                            value={formData.challenge}
                            onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                            placeholder="ما هي العقبات التي واجهتك؟"
                            rows={4}
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-light/60 mb-2">الحلول المتبعة (اختياري)</label>
                    <TextArea
                        value={formData.solutions}
                        onChange={(e) => setFormData({ ...formData, solutions: e.target.value })}
                        placeholder="كيف تم التغلب على التحديات؟"
                        rows={3}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-light/60 mb-2">الميزات الأساسية (كل ميزة في سطر)</label>
                    <TextArea
                        value={formData.features}
                        onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                        placeholder="الميزة الأولى&#10;الميزة الثانية"
                        rows={3}
                    />
                </div>
            </form>
        </DashboardModal>
    );
};

export default ProjectForm;
