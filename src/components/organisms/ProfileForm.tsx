'use client';

import React, { useState } from 'react';
import { Input, Button, useToast, Typography, Box } from '@/components/ui';
import useAPI from '@/hooks/useAPI';
import DashboardModal from '../molecules/DashboardModal';
import { useAuth } from '@/context/AuthContext';

interface ProfileFormProps {
    onClose: () => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ onClose }) => {
    const { user, updateContextUser } = useAuth();
    const { showToast } = useToast();
    const { patch: updateProfile, isLoading } = useAPI('/api/auth/profile');

    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
    });

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>(user?.image || '');

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
            const data = new FormData();
            data.append('name', formData.name);
            data.append('email', formData.email);
            if (imageFile) {
                data.append('image', imageFile);
            }

            const result = await updateProfile(data, true);

            if (result && result.success) {
                showToast('تم تحديث الملف الشخصي بنجاح', 'success');
                updateContextUser(result.data);
                onClose();
            }
        } catch (error: any) {
            showToast(error.message || 'فشل تحديث الملف الشخصي', 'error');
        }
    };

    const footer = (
        <div className="flex justify-end gap-4">
            <Button type="button" onClick={onClose} variant="outline" className="rounded-xl px-8">إلغاء</Button>
            <Button
                type="submit"
                form="profile-form"
                disabled={isLoading}
                className="rounded-xl px-12 bg-secondary text-white font-bold hover:scale-105 transition-all disabled:opacity-50 shadow-lg shadow-secondary/20"
            >
                {isLoading ? 'جاري الحفظ...' : 'حفظ التغييرات'}
            </Button>
        </div>
    );

    return (
        <DashboardModal
            isOpen={true}
            onClose={onClose}
            title="إعدادات الملف الشخصي"
            icon="bi-person-gear"
            maxWidth="max-w-xl"
            footer={footer}
        >
            <form id="profile-form" onSubmit={handleSubmit} className="space-y-6 text-right">
                <div className="flex flex-col items-center mb-8">
                    <div className="relative group cursor-pointer w-32 h-32 rounded-full border-2 border-dashed border-white/10 hover:border-secondary/50 overflow-hidden transition-all bg-white/5">
                        {imagePreview ? (
                            <img src={imagePreview} className="w-full h-full object-cover" />
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-light/40">
                                <i className="bi bi-camera text-3xl mb-1"></i>
                                <span className="text-[10px]">رفع صورة</span>
                            </div>
                        )}
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            accept="image/*"
                        />
                        <div className="absolute inset-x-0 bottom-0 bg-black/60 py-1 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                            <span className="text-white text-[10px] font-medium">تغيير الصورة</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-light/60 mb-2">الاسم بالكامل</label>
                        <Input
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="أدخل اسمك الكامل"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-light/60 mb-2">البريد الإلكتروني</label>
                        <Input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="example@nawjha.tech"
                            required
                        />
                    </div>
                </div>
            </form>
        </DashboardModal>
    );
};

export default ProfileForm;
