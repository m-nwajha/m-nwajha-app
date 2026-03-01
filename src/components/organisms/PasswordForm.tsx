'use client';

import React, { useState } from 'react';
import { Input, Button, useToast, Typography, Box } from '@/components/ui';
import useAPI from '@/hooks/useAPI';
import DashboardModal from '../molecules/DashboardModal';

interface PasswordFormProps {
    onClose: () => void;
}

const PasswordForm: React.FC<PasswordFormProps> = ({ onClose }) => {
    const { showToast } = useToast();
    const { post: changePassword, isLoading } = useAPI('/api/auth/change-password');

    const [passwords, setPasswords] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();

        if (passwords.newPassword !== passwords.confirmPassword) {
            return showToast('كلمات المرور الجديدة غير متطابقة', 'error');
        }

        try {
            const result = await changePassword({
                currentPassword: passwords.currentPassword,
                newPassword: passwords.newPassword,
            });

            if (result && result.success) {
                showToast('تم تغيير كلمة المرور بنجاح', 'success');
                onClose();
            }
        } catch (error: any) {
            showToast(error.message || 'فشل تغيير كلمة المرور', 'error');
        }
    };

    const footer = (
        <div className="flex justify-end gap-4">
            <Button type="button" onClick={onClose} variant="outline" className="rounded-xl px-8">إلغاء</Button>
            <Button
                type="submit"
                form="password-form"
                disabled={isLoading}
                className="rounded-xl px-12 bg-secondary text-white font-bold hover:scale-105 transition-all disabled:opacity-50 shadow-lg shadow-secondary/20"
            >
                {isLoading ? 'جاري التغيير...' : 'تغيير كلمة المرور'}
            </Button>
        </div>
    );

    return (
        <DashboardModal
            isOpen={true}
            onClose={onClose}
            title="تغيير كلمة المرور"
            icon="bi-shield-lock"
            maxWidth="max-w-xl"
            footer={footer}
        >
            <form id="password-form" onSubmit={handleSubmit} className="space-y-6 text-right">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-light/60 mb-2">كلمة المرور الحالية</label>
                        <Input
                            type="password"
                            value={passwords.currentPassword}
                            onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
                            placeholder="كلمة المرور القديمة"
                            required
                        />
                    </div>

                    <div className="h-px bg-white/5 my-2 mx-1"></div>

                    <div>
                        <label className="block text-sm font-medium text-light/60 mb-2">كلمة المرور الجديدة</label>
                        <Input
                            type="password"
                            value={passwords.newPassword}
                            onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                            placeholder="كلمة المرور الجديدة"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-light/60 mb-2">تأكيد كلمة المرور الجديدة</label>
                        <Input
                            type="password"
                            value={passwords.confirmPassword}
                            onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                            placeholder="أعد كتابة كلمة المرور"
                            required
                        />
                    </div>
                </div>
            </form>
        </DashboardModal>
    );
};

export default PasswordForm;
